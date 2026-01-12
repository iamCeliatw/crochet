import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

// Redis keys
const KEYS = {
  PAGE_VIEWS: "analytics:page_views",
  ORDER_SUBMISSIONS: "analytics:order_submissions",
  LAST_RESET: "analytics:last_reset",
  PROJECT_VIEWS_PREFIX: "analytics:project_views:",
};

// 記憶體備用存儲（當 Redis 不可用時）
const memoryStore = {
  pageViews: 0,
  projectViews: {} as Record<number, number>,
  orderSubmissions: 0,
};

// Redis 客戶端單例
let redisClient: ReturnType<typeof createClient> | null = null;
let redisConnectionFailed = false; // 記錄連接是否失敗，避免重複嘗試

// 獲取 Redis 客戶端
async function getRedisClient() {
  if (redisClient) return redisClient;
  if (redisConnectionFailed) return null; // 如果之前連接失敗，直接返回 null

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.log("📊 本地開發模式：使用記憶體存儲");
    redisConnectionFailed = true;
    return null;
  }

  try {
    redisClient = createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 5000, // 5 秒超時
      },
    });

    redisClient.on("error", (err) => {
      // 靜默處理錯誤，本地開發時會自動降級
      if (process.env.NODE_ENV === "development") {
        console.log("📊 Redis 不可用，使用記憶體存儲");
      } else {
        console.error("❌ Redis Client Error:", err);
      }
    });

    await redisClient.connect();
    console.log("✅ Redis 連接成功（Vercel 環境）");
    return redisClient;
  } catch {
    console.log("📊 本地開發：Redis 連接失敗，使用記憶體存儲");
    redisClient = null;
    redisConnectionFailed = true; // 標記連接失敗，避免重複嘗試
    return null;
  }
}

// 初始化（第一次使用時）
async function initAnalytics(redis: ReturnType<typeof createClient>) {
  try {
    const lastReset = await redis.get(KEYS.LAST_RESET);
    if (!lastReset) {
      await redis.set(KEYS.LAST_RESET, new Date().toISOString());
      await redis.set(KEYS.PAGE_VIEWS, "0");
      await redis.set(KEYS.ORDER_SUBMISSIONS, "0");
      console.log("✅ Analytics 初始化完成");
    }
  } catch (error) {
    console.error("❌ Analytics 初始化失敗:", error);
  }
}

// POST: 記錄分析事件
export async function POST(request: NextRequest) {
  let type: string | undefined;
  let projectId: number | undefined;

  try {
    const body = await request.json();
    type = body.type;
    projectId = body.projectId;

    const redis = await getRedisClient();

    // 如果 Redis 不可用，使用記憶體存儲
    if (!redis) {
      console.log("📊 使用記憶體存儲");
      switch (type) {
        case "page_view":
          memoryStore.pageViews++;
          break;
        case "project_view":
          if (projectId) {
            memoryStore.projectViews[projectId] =
              (memoryStore.projectViews[projectId] || 0) + 1;
          }
          break;
        case "order_submission":
          memoryStore.orderSubmissions++;
          break;
      }
      return NextResponse.json({ success: true, mode: "memory" });
    }

    // 使用 Redis
    await initAnalytics(redis);

    switch (type) {
      case "page_view":
        await redis.incr(KEYS.PAGE_VIEWS);
        break;

      case "project_view":
        if (projectId) {
          const key = `${KEYS.PROJECT_VIEWS_PREFIX}${projectId}`;
          await redis.incr(key);
        }
        break;

      case "order_submission":
        await redis.incr(KEYS.ORDER_SUBMISSIONS);
        break;
    }

    return NextResponse.json({ success: true, mode: "redis" });
  } catch (error) {
    console.error("❌ Track analytics error:", error);

    // 降級到記憶體存儲
    if (type) {
      switch (type) {
        case "page_view":
          memoryStore.pageViews++;
          break;
        case "project_view":
          if (projectId) {
            memoryStore.projectViews[projectId] =
              (memoryStore.projectViews[projectId] || 0) + 1;
          }
          break;
        case "order_submission":
          memoryStore.orderSubmissions++;
          break;
      }
    }

    return NextResponse.json({
      success: true,
      mode: "memory_fallback",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// GET: 讀取分析數據
export async function GET() {
  try {
    const redis = await getRedisClient();

    // 如果 Redis 不可用，返回記憶體數據
    if (!redis) {
      console.log("📊 返回記憶體數據");
      return NextResponse.json({
        pageViews: memoryStore.pageViews,
        projectViews: memoryStore.projectViews,
        orderSubmissions: memoryStore.orderSubmissions,
        mode: "memory",
      });
    }

    // 從 Redis 讀取數據
    const pageViews = parseInt((await redis.get(KEYS.PAGE_VIEWS)) || "0");
    const orderSubmissions = parseInt(
      (await redis.get(KEYS.ORDER_SUBMISSIONS)) || "0"
    );

    // 讀取所有專案點擊數
    const projectViewsKeys = await redis.keys(`${KEYS.PROJECT_VIEWS_PREFIX}*`);
    const projectViews: Record<number, number> = {};

    for (const key of projectViewsKeys) {
      const projectId = parseInt(key.replace(KEYS.PROJECT_VIEWS_PREFIX, ""));
      const views = parseInt((await redis.get(key)) || "0");
      projectViews[projectId] = views;
    }

    return NextResponse.json({
      pageViews,
      projectViews,
      orderSubmissions,
      mode: "redis",
    });
  } catch (error) {
    console.error("❌ 讀取數據失敗:", error);

    // 降級到記憶體數據
    return NextResponse.json({
      pageViews: memoryStore.pageViews,
      projectViews: memoryStore.projectViews,
      orderSubmissions: memoryStore.orderSubmissions,
      mode: "memory_fallback",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

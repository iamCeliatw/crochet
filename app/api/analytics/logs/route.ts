import { NextRequest, NextResponse } from "next/server";
import { createClient as createRedisClient } from "redis";

const KEYS = {
  CLICK_LOGS: "analytics:click_logs",
};

const REDIS_TIMEOUT_MS = 8000; // 整體請求超時，避免正式環境卡住

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms)
    ),
  ]);
}

// 獲取 Redis 客戶端（複製自 analytics/route.ts）
async function getRedisClient() {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    return null;
  }

  try {
    const client = createRedisClient({
      url: redisUrl,
      socket: {
        connectTimeout: 5000,
      },
    });

    client.on("error", () => {
      // 靜默處理錯誤
    });

    await client.connect();
    return client;
  } catch {
    return null;
  }
}

// GET: 獲取點擊記錄
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "50");
    const type = searchParams.get("type"); // 可選：page_view, project_view, order_submission
    const projectId = searchParams.get("projectId");

    const redis = await withTimeout(
      getRedisClient(),
      REDIS_TIMEOUT_MS,
      "getRedisClient"
    );

    if (!redis) {
      return NextResponse.json(
        {
          logs: [],
          total: 0,
          mode: "redis_error",
          error: "REDIS_URL not configured or Redis unavailable",
          hint: "Set REDIS_URL in your deployment environment (Vercel).",
        },
        { status: 500 }
      );
    }

    // 從 Redis 讀取（含超時）
    const logKey = KEYS.CLICK_LOGS;
    const rawLogs = await withTimeout(
      redis.lRange(logKey, 0, limit * 2),
      REDIS_TIMEOUT_MS,
      "lRange"
    ); // 多取一些以便過濾

    if (!rawLogs || !Array.isArray(rawLogs)) {
      return NextResponse.json({
        logs: [],
        total: 0,
        mode: "redis",
      });
    }

    let logs = rawLogs
      .map((log) => {
        if (typeof log !== "string") return null;
        try {
          return JSON.parse(log);
        } catch {
          return null;
        }
      })
      .filter((log): log is {
        type: string;
        projectId?: number | null;
        timestamp: string;
        ip: string;
        userAgent: string;
        isOwner?: boolean;
      } => log !== null);

    // 過濾
    if (type) {
      logs = logs.filter((log: { type: string }) => log.type === type);
    }
    if (projectId) {
      logs = logs.filter((log: { projectId?: number | null }) => log.projectId === parseInt(projectId));
    }

    // 排序（最新的在前）
    logs.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      logs: logs.slice(0, limit),
      total: logs.length,
      mode: "redis",
    });
  } catch (error) {
    console.error("❌ 讀取點擊記錄失敗:", error);

    return NextResponse.json({
      logs: [],
      total: 0,
      mode: "redis_error",
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}


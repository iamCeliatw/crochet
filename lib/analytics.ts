// 簡單的追蹤工具

export const trackPageView = async () => {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page_view" }),
    });
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

export const trackProjectView = async (projectId: number) => {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "project_view", projectId }),
    });
  } catch (error) {
    console.error("Failed to track project view:", error);
  }
};

export const trackOrderSubmission = async () => {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "order_submission" }),
    });
  } catch (error) {
    console.error("Failed to track order submission:", error);
  }
};

const FETCH_TIMEOUT_MS = 12000; // 正式環境 Redis 慢/不可達時不要無限等

export const getAnalytics = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const response = await fetch("/api/analytics", { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await response.json();
    if (!response.ok) return null; // 500 / timeout 等讓 admin 顯示「無法載入數據」
    return data;
  } catch (error) {
    console.error("Failed to get analytics:", error);
    return null;
  }
};

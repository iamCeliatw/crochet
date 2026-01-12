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

export const getAnalytics = async () => {
  try {
    const response = await fetch("/api/analytics");
    return await response.json();
  } catch (error) {
    console.error("Failed to get analytics:", error);
    return null;
  }
};

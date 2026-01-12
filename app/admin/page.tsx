"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/analytics";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await getAnalytics();
      setAnalytics(data);
      setLoading(false);
    };
    fetchAnalytics();

    // 每 30 秒更新一次
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-600"></div>
          <p className="text-sm text-[#666666]">載入中...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <p className="text-sm text-[#666666]">無法載入數據</p>
      </div>
    );
  }

  const totalProjectViews = Object.values(analytics.projectViews).reduce(
    (sum: number, count) => sum + (count as number),
    0
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-[#333333]">
            📊 網站數據分析
          </h1>
          <p className="text-sm text-[#666666]">
            上次重置：{new Date(analytics.lastReset).toLocaleString("zh-TW")}
          </p>
        </div>

        {/* 總覽卡片 */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-neutral-200">
            <p className="mb-1 text-sm text-[#666666]">總頁面訪問</p>
            <p className="text-3xl font-bold text-[#333333]">
              {analytics.pageViews}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-neutral-200">
            <p className="mb-1 text-sm text-[#666666]">作品總點擊</p>
            <p className="text-3xl font-bold text-[#333333]">
              {totalProjectViews}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-neutral-200">
            <p className="mb-1 text-sm text-[#666666]">訂單提交</p>
            <p className="text-3xl font-bold text-[#333333]">
              {analytics.orderSubmissions}
            </p>
          </div>
        </div>

        {/* 作品點擊排行 */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-neutral-200">
          <h2 className="mb-4 text-xl font-semibold text-[#333333]">
            作品點擊排行
          </h2>
          {Object.keys(analytics.projectViews).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(analytics.projectViews)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([projectId, views]) => (
                  <div
                    key={projectId}
                    className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0"
                  >
                    <span className="text-sm text-[#666666]">
                      作品 #{projectId}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                          style={{
                            width: `${((views as number) / totalProjectViews) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="min-w-[3rem] text-right text-sm font-semibold text-[#333333]">
                        {views} 次
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-sm text-[#999999]">尚無數據</p>
          )}
        </div>

        {/* 轉換率 */}
        {analytics.pageViews > 0 && (
          <div className="mt-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6 ring-1 ring-purple-100">
            <h3 className="mb-2 text-sm font-medium text-purple-900">
              💡 轉換率分析
            </h3>
            <div className="space-y-1 text-sm">
              <p className="text-purple-700">
                • 作品點擊率：
                {((totalProjectViews / analytics.pageViews) * 100).toFixed(1)}%
              </p>
              {totalProjectViews > 0 && (
                <p className="text-purple-700">
                  • 訂單轉換率：
                  {(
                    (analytics.orderSubmissions / totalProjectViews) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-[#999999]">
          數據每 30 秒自動更新
          {analytics.mode && ` • 模式：${analytics.mode === "memory" ? "記憶體（本地測試）" : "Vercel KV（持久化）"}`}
        </div>
      </div>
    </div>
  );
}


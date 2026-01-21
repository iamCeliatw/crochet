// 共享的記憶體存儲（用於本地開發，當 Redis 不可用時）

export const memoryStore = {
  lastReset: new Date().toISOString(),
  pageViews: 0,
  projectViews: {} as Record<number, number>,
  orderSubmissions: 0,
  clickLogs: [] as Array<{
    type: string;
    projectId?: number | null;
    timestamp: string;
    ip: string;
    userAgent: string;
    isOwner?: boolean;
  }>,
};


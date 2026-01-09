import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectTitle,
      name,
      contactMethod,
      contact,
      quantity,
      customization,
    } = body;

    // LINE Messaging API 設定
    const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const LINE_USER_ID = process.env.LINE_USER_ID;

    if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_USER_ID) {
      console.error("LINE credentials 未設定");
      return NextResponse.json(
        { error: "LINE credentials not configured. 請檢查 .env.local 檔案" },
        { status: 500 }
      );
    }

    // 組合訊息
    const message = [
      "🎨 新訂單詢問！",
      "",
      `📦 作品：${projectTitle}`,
      `👤 姓名：${name}`,
      `📞 聯絡方式：${contactMethod}`,
      `📱 聯絡資訊：${contact}`,
      `🔢 數量：${quantity}`,
      `✨ 客製化需求：${customization || "無"}`,
      "",
      `⏰ 時間：${new Date().toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
      })}`,
    ].join("\n");

    const linePayload = {
      to: LINE_USER_ID,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    };

    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(linePayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("LINE API 錯誤詳情:", JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        {
          error: "LINE API 錯誤",
          details: errorData,
          message: errorData.message || "未知錯誤",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ 發生錯誤:", error);
    return NextResponse.json(
      {
        error: "Failed to send notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

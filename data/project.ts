type Project = {
  id: number;
  slug: string;
  title: { [key: string]: string };
  category: { [key: string]: string };
  materials: { [key: string]: string };
  timeSpent: { [key: string]: string };
  description: { [key: string]: string };
  coverImage: string;
  images: string[];
  colorPalette: string[]; // Hex color codes for yarn colors
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "christmas-hairband",
    title: {
      "zh-TW": "聖誕髮帶",
      en: "Christmas Hairband",
      ja: "クリスマスヘアバンド",
    },
    category: {
      "zh-TW": "髮飾 / 日常使用",
      en: "Hair Accessory / Daily Use",
      ja: "ヘアアクセサリー / デイリーユース",
    },
    materials: {
      "zh-TW": "四股棉線、2.5mm 勾針",
      en: "4-ply cotton yarn, 2.5mm crochet hook",
      ja: "4本撚りコットン糸、2.5mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 2 小時",
      en: "About 2 hours",
      ja: "約2時間",
    },
    description: {
      "zh-TW": "聖誕髮帶，聖誕節快到了，來做一個聖誕髮帶吧！",
      en: "A festive Christmas hairband - perfect for the holiday season!",
      ja: "お祝い気分のクリスマスヘアバンド - ホリデーシーズンにぴったり！",
    },
    coverImage: "/projects/project-1_1.jpg",
    images: ["/projects/project-1_1.jpg", "/projects/project-1_2.jpg"],
    colorPalette: ["#C41E3A", "#228B22"],
  },
  {
    id: 2,
    slug: "grandmother-square-headphone-case",
    title: {
      "zh-TW": "祖母方格耳機包",
      en: "Granny Square Earphone Case",
      ja: "グラニースクエアのイヤホンケース",
    },
    category: {
      "zh-TW": "耳機包 / 日常使用",
      en: "Earphone Case / Daily Use",
      ja: "イヤホンケース / デイリーユース",
    },
    materials: {
      "zh-TW": "四股棉線、2.5mm 勾針",
      en: "4-ply cotton yarn, 2.5mm crochet hook",
      ja: "4本撚りコットン糸、2.5mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 2 小時",
      en: "About 2 hours",
      ja: "約2時間",
    },
    description: {
      "zh-TW": "祖母方格耳機包，來做一個祖母方格耳機包吧！",
      en: "A charming granny square earphone case - keeps your earphones safe and stylish!",
      ja: "魅力的なグラニースクエアのイヤホンケース - イヤホンを安全かつスタイリッシュに保ちます！",
    },
    coverImage: "/projects/project-2_1.jpg",
    images: ["/projects/project-2_1.jpg", "/projects/project-2_2.jpg"],
    colorPalette: ["#B4C7D9", "#F4C5D0", "#8FBC8F", "#A67B5B"],
  },
];

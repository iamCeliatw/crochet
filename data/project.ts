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
  {
    id: 3,
    slug: "flower-hairband",
    title: {
      "zh-TW": "花朵髮帶",
      en: "Flower Hairband",
      ja: "フラワーヘアバンド",
    },
    category: {
      "zh-TW": "髮飾 / 日常使用",
      en: "Hair Accessory / Daily Use",
      ja: "ヘアアクセサリー / デイリーユース",
    },
    materials: {
      "zh-TW": "四股棉線、3mm 勾針",
      en: "4-ply cotton yarn, 3mm crochet hook",
      ja: "4本撚りコットン糸、3mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 1.5 小時",
      en: "About 1.5 hours",
      ja: "約1.5時間",
    },
    description: {
      "zh-TW":
        "立體花朵造型髮帶，粉紫與灰藍的溫柔配色，為日常增添優雅氣息。輕巧設計，配戴一整天也不會有壓迫感。",
      en: "3D flower hairband in soft pink-purple and grey-blue - adding elegant touches to everyday life. Lightweight design for all-day comfort.",
      ja: "立体的なお花のヘアバンド。ピンクパープルとグレーブルーの優しい配色で、日常にエレガントな雰囲気をプラス。軽量デザインで一日中快適。",
    },
    coverImage: "/projects/project-3_1.jpg",
    images: ["/projects/project-3_1.jpg", "/projects/project-3_2.jpg"],
    colorPalette: ["#D8BFD8", "#8FA8B8", "#FFFFFF"],
  },
  {
    id: 4,
    slug: "shell-earphone-case",
    title: {
      "zh-TW": "貝殼耳機包",
      en: "Shell Earphone Case",
      ja: "シェル型イヤホンケース",
    },
    category: {
      "zh-TW": "耳機包 / 日常使用",
      en: "Earphone Case / Daily Use",
      ja: "イヤホンケース / デイリーユース",
    },
    materials: {
      "zh-TW": "四股棉線、3mm 勾針",
      en: "4-ply cotton yarn, 3mm crochet hook",
      ja: "4本撚りコットン糸、3mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 2 小時",
      en: "About 2 hours",
      ja: "約2時間",
    },
    description: {
      "zh-TW":
        "仿貝殼造型的耳機包，珊瑚橘搭配清新藍花點綴，讓日常小物也充滿海洋氣息。扎實針法保護你的耳機。",
      en: "Shell-inspired earphone case in coral orange with delicate blue flower accents - bringing ocean vibes to everyday essentials. Sturdy stitching protects your earphones.",
      ja: "貝殻をイメージしたイヤホンケース。コーラルオレンジに爽やかなブルーのお花がアクセント。海の雰囲気を日常に。しっかりとした編み目でイヤホンを保護。",
    },
    coverImage: "/projects/project-4_1.jpg",
    images: ["/projects/project-4_1.jpg", "/projects/project-4_2.jpg"],
    colorPalette: ["#F4A896", "#6B9CAF", "#FEFEFE"],
  },
  {
    id: 5,
    slug: "lace-sleeve-cuffs",
    title: {
      "zh-TW": "蕾絲袖套",
      en: "Lace Sleeve Cuffs",
      ja: "レース袖カバー",
    },
    category: {
      "zh-TW": "配件 / 日常使用",
      en: "Accessory / Daily Use",
      ja: "アクセサリー / デイリーユース",
    },
    materials: {
      "zh-TW": "四股棉線、3mm 勾針",
      en: "4-ply cotton yarn, 3mm crochet hook",
      ja: "4本撚りコットン糸、3mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 4 小時",
      en: "About 4 hours",
      ja: "約4時間",
    },
    description: {
      "zh-TW":
        "繁複的蕾絲花紋袖套，薰衣草紫與白色的層疊設計，展現細膩手工的魅力。每一針都是耐心與溫柔的堆疊。",
      en: "Intricate lace sleeve cuffs in lavender and white - showcasing delicate handcrafted charm. Each stitch is a layering of patience and tenderness.",
      ja: "繊細なレース模様の袖カバー。ラベンダーと白の重なりが美しい手仕事の魅力を表現。一針一針が丁寧さと優しさの積み重ね。",
    },
    coverImage: "/projects/project-5_1.jpg",
    images: ["/projects/project-5_1.jpg", "/projects/project-5_2.jpg"],
    colorPalette: ["#E6D5E8", "#FFFFFF"],
  },
  {
    id: 6,
    slug: "cat-coaster",
    title: {
      "zh-TW": "貓咪杯墊",
      en: "Cat Coaster",
      ja: "猫コースター",
    },
    category: {
      "zh-TW": "杯墊 / 居家使用",
      en: "Coaster / Home Use",
      ja: "コースター / ホームユース",
    },
    materials: {
      "zh-TW": "四股棉線、3mm 勾針",
      en: "4-ply cotton yarn, 3mm crochet hook",
      ja: "4本撚りコットン糸、3mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 1.5 小時",
      en: "About 1.5 hours",
      ja: "約1.5時間",
    },
    description: {
      "zh-TW":
        "圓潤可愛的珊瑚橘杯墊，溫暖的色調為桌面增添療癒感。簡約設計卻不失質感，讓喝茶時光更加舒心。",
      en: "Adorable round coaster in warm coral orange - adding healing vibes to your table. Simple yet textured design makes tea time more comforting.",
      ja: "ころんと可愛いコーラルオレンジのコースター。温かみのある色調でテーブルに癒しをプラス。シンプルながら質感のあるデザインで、ティータイムをより心地よく。",
    },
    coverImage: "/projects/project-6_1.jpg",
    images: ["/projects/project-6_1.jpg", "/projects/project-6_2.jpg"],
    colorPalette: ["#F58F84"],
  },
  {
    id: 7,
    slug: "mesh-cup-holder",
    title: {
      "zh-TW": "手混線網狀飲料提袋",
      en: "Earth Tone Mesh Cup Holder",
      ja: "アースカラーのメッシュドリンクホルダー",
    },
    category: {
      "zh-TW": "飲料提袋 / 日常使用",
      en: "Cup Holder / Daily Use",
      ja: "ドリンクホルダー / デイリーユース",
    },
    materials: {
      "zh-TW": "手混線、5mm 勾針",
      en: "Hand-mixed yarn, 5mm crochet hook",
      ja: "ハンドミックス糸、5mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 1.5 小時",
      en: "About 1.5 hours",
      ja: "約1.5時間",
    },
    description: {
      "zh-TW":
        "溫潤的手混線，編織出實用又時尚的飲料提袋。網狀設計透氣輕盈，提把舒適好握，陪你走過每個需要咖啡因的日子。無論是趕車站還是散步，都是你的溫暖小夥伴。",
      en: "Earthy tones meet everyday convenience in this cozy mesh cup holder. The open-weave design keeps it light and breathable, while the sturdy handle makes carrying your favorite drink effortless. A handcrafted companion for your daily coffee runs.",
      ja: "温かみのあるアースカラーの混紡糸で編んだ実用的なドリンクホルダー。メッシュデザインで軽やかに、しっかりとした持ち手で持ち運びも楽々。毎日のコーヒータイムに寄り添う、手作りの相棒です。",
    },
    coverImage: "/projects/project-7_1.jpg",
    images: ["/projects/project-7_1.jpg"],
    colorPalette: ["#C4A77D", "#D4C4A8", "#8B7355"],
  },
];

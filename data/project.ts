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
    id: 12,
    slug: "latte-flower-drawstring-pouch",
    title: {
      "zh-TW": "拿鐵花繩束口小袋",
      en: "Latte Flower Drawstring Pouch",
      ja: "ラテカラーのフラワー巾着ポーチ",
    },
    category: {
      "zh-TW": "束口小袋 / 日常使用",
      en: "Drawstring Pouch / Daily Use",
      ja: "巾着ポーチ / デイリーユース",
    },
    materials: {
      "zh-TW": "四股棉線、3mm 鉤針",
      en: "4-ply cotton yarn, 3mm crochet hook",
      ja: "4本撚りコットン糸、3mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 2.5 小時",
      en: "About 2.5 hours",
      ja: "約2.5時間",
    },
    description: {
      "zh-TW":
        "拿鐵棕的網格袋身搭配芥末黃花朵拉繩，像把秋日暖陽收進掌心。小巧卻實用，耳機、飾品或隨身小物都能被溫柔地收好。",
      en: "A tiny drawstring pouch in latte brown with mustard flower cord ends. The open mesh texture keeps it light, while the rounded shape neatly holds earbuds, rings, or other little essentials.",
      ja: "ラテブラウンのメッシュ袋に、マスタードイエローの花モチーフ紐を合わせた小さな巾着。軽やかなのに実用的で、イヤホンやアクセサリーなどの小物をやさしくまとめてくれます。",
    },
    coverImage: "/projects/project-12_1.jpeg",
    images: ["/projects/project-12_1.jpeg", "/projects/project-12_2.jpeg"],
    colorPalette: ["#AA9383", "#E5A92C", "#F3EEE9"],
  },
  {
    id: 11,
    slug: "ivory-lace-mini-tote-charm",
    title: {
      "zh-TW": "象牙白飲料提袋",
      en: "Ivory Drink Bag",
      ja: "アイボリーのドリンクバッグ",
    },
    category: {
      "zh-TW": "飲料提袋 / 日常使用",
      en: "Drink Bag / Daily Use",
      ja: "ドリンクバッグ / デイリーユース",
    },
    materials: {
      "zh-TW": "空心棉線、3mm 鉤針",
      en: "Hollow cotton yarn, 3mm crochet hook",
      ja: "空洞コットン糸、3mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 1 小時",
      en: "About 1 hour",
      ja: "約1時間",
    },
    description: {
      "zh-TW":
        "小小一只象牙白飲料提袋，中央鏤空花樣帶著細緻復古感。掛在包包或鑰匙圈上，就像替日常加上一點安靜又可愛的手作語氣。",
      en: "An ivory drink bag with delicate openwork lace through the center. Compact and elegant, it brings a quiet handcrafted touch to bags, keyrings, or any everyday carry setup.",
      ja: "中央の透かし編みが印象的な、アイボリー色のドリンクバッグ。小ぶりで上品な佇まいが、バッグやキーリングに手編みのやさしさを添えてくれます。",
    },
    coverImage: "/projects/project-11_1.jpeg",
    images: ["/projects/project-11_1.jpeg", "/projects/project-11_2.jpeg"],
    colorPalette: ["#E9E7E0", "#D8D6CF", "#F6F4EE"],
  },
  {
    id: 10,
    slug: "boho-horse-keychain",
    title: {
      "zh-TW": "波西彩條小馬鑰匙圈",
      en: "Boho Stripe Horse Keychain",
      ja: "ボヘミアンストライプの馬キーホルダー",
    },
    category: {
      "zh-TW": "鑰匙圈 / 日常使用",
      en: "Keychain / Daily Use",
      ja: "キーホルダー / デイリーユース",
    },
    materials: {
      "zh-TW": "四股棉線、3mm 鉤針",
      en: "4-ply cotton yarn, 3mm crochet hook",
      ja: "4本撚りコットン糸、3mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 3 小時",
      en: "About 3 hours",
      ja: "約3時間",
    },
    description: {
      "zh-TW":
        "帶著民族感彩條的小馬吊飾，紅、藍、綠、白交錯得很有節奏，尾巴流蘇更添俏皮。掛在鑰匙或包包上，每次拿起來都會被它可愛到。",
      en: "A playful horse keychain with boho-inspired red, blue, green, and white stripes. Finished with a tassel tail and tiny floral detail, it adds bold handmade character to keys or bags.",
      ja: "赤・青・緑・白のストライプが映える、ボヘミアンテイストの馬キーホルダー。しっぽのタッセルと小さなお花モチーフがアクセントで、鍵やバッグに楽しい手編み感をプラスします。",
    },
    coverImage: "/projects/project-10_1.jpeg",
    images: ["/projects/project-10_1.jpeg", "/projects/project-10_2.jpeg"],
    colorPalette: ["#AF3B2B", "#3A66B8", "#2F7A66", "#F5F3EC"],
  },
  {
    id: 9,
    slug: "lavender-frill-hair-tie",
    title: {
      "zh-TW": "薰霧紫波浪綁帶髮飾",
      en: "Lavender Frill Hair Tie",
      ja: "ラベンダーフリルのリボンヘアアクセ",
    },
    category: {
      "zh-TW": "髮飾 / 日常使用",
      en: "Hair Accessory / Daily Use",
      ja: "ヘアアクセサリー / デイリーユース",
    },
    materials: {
      "zh-TW": "柔霧手混線、5mm 鉤針",
      en: "Soft fluffy yarn, 5mm crochet hook",
      ja: "ふんわりファンシーヤーン、5mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 1.5 小時",
      en: "About 1.5 hours",
      ja: "約1.5時間",
    },
    description: {
      "zh-TW":
        "輕柔的薰霧紫配上立體波浪邊，綁起來像把一小段晚霞繫在髮間。柔軟線材貼膚不刺癢，日常綁馬尾或低辮都能多一點溫柔層次。",
      en: "A delicate lavender hair tie with sculpted frill edges and long ribbon tails. Soft to the touch and gentle on hair, it adds a dreamy handcrafted accent to ponytails, braids, or simple everyday styles.",
      ja: "やわらかなラベンダー色に、立体感のあるフリルを合わせたリボンヘアアクセ。肌あたりのやさしい糸で、ポニーテールや三つ編みに結ぶだけで手編みならではの温かみが生まれます。",
    },
    coverImage: "/projects/project-9_1.jpeg",
    images: ["/projects/project-9_1.jpeg", "/projects/project-9_2.jpeg"],
    colorPalette: ["#D1C2CF", "#BFAFBE", "#EEE7EB"],
  },
  {
    id: 8,
    slug: "blush-mesh-cup-holder",
    title: {
      "zh-TW": "奶霜粉網格飲料提袋",
      en: "Blush Mesh Cup Holder",
      ja: "ミルキーピンクのメッシュドリンクホルダー",
    },
    category: {
      "zh-TW": "飲料提袋 / 日常使用",
      en: "Cup Holder / Daily Use",
      ja: "ドリンクホルダー / デイリーユース",
    },
    materials: {
      "zh-TW": "混紡毛絨線、6mm 鉤針",
      en: "Blended fluffy yarn, 6mm crochet hook",
      ja: "ミックスファンシーヤーン、6mmかぎ針",
    },
    timeSpent: {
      "zh-TW": "約 2 小時",
      en: "About 2 hours",
      ja: "約2時間",
    },
    description: {
      "zh-TW":
        "奶霜白與櫻花粉交織出的網格提袋，輕盈卻有存在感。柔軟線材摸起來很療癒，提著冰咖啡出門時，整天都像被溫柔陪著。",
      en: "A cozy mesh cup holder woven in creamy white and blush pink. Lightweight yet eye-catching, with a soft fluffy texture that feels comforting in hand. A handcrafted daily companion for coffee runs and easy strolls.",
      ja: "ミルキーホワイトと淡いピンクが重なる、やさしい雰囲気のメッシュドリンクホルダー。軽やかなのに存在感があり、ふわっとした手触りで持つたびに心がほどけます。毎日のコーヒー時間に寄り添う手編みの一点です。",
    },
    coverImage: "/projects/project-8_1.jpeg",
    images: ["/projects/project-8_1.jpeg", "/projects/project-8_2.jpeg"],
    colorPalette: ["#F6EDE6", "#F2CFCB", "#B2AAA2"],
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
      "zh-TW": "手混線、5mm 鉤針",
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
      "zh-TW": "四股棉線、3mm 鉤針",
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
      "zh-TW": "四股棉線、3mm 鉤針",
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
      "zh-TW": "四股棉線、3mm 鉤針",
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
      "zh-TW": "四股棉線、3mm 鉤針",
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
      "zh-TW": "四股棉線、2.5mm 鉤針",
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
      "zh-TW": "四股棉線、2.5mm 鉤針",
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
];

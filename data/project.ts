type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  materials: string;
  timeSpent: string;
  description: string;
  coverImage: string;
  images: string[];
};
export const projects: Project[] = [
  {
    id: 1,
    slug: "sunny-tote-bag",
    title: "Sunny 日系手勾托特包",
    category: "包袋 / 日常使用",
    materials: "日本棉線、3.0mm 勾針",
    timeSpent: "約 8 小時",
    description:
      "以柔和的米白與鵝黃色為主調，搭配簡單的方格紋理。整體尺寸刻意做得偏小巧，適合短程外出或週末咖啡廳使用。提把部分加強密度，提升耐重度但仍維持柔軟觸感。",
    coverImage: "/images/projects/sunny-tote/cover.jpg",
    images: [
      "/images/projects/sunny-tote/cover.jpg",
      "/images/projects/sunny-tote/detail-1.jpg",
      "/images/projects/sunny-tote/detail-2.jpg",
    ],
  },
  {
    id: 2,
    slug: "pastel-coaster-set",
    title: "Pastel 漸層杯墊組",
    category: "居家小物",
    materials: "棉麻混紡線、2.5mm 勾針",
    timeSpent: "約 3 小時 / 組",
    description:
      "一組四入的漸層色杯墊，靈感來自清晨窗邊的光影。每一個杯墊使用不同的配色，但維持同一種花樣結構，讓桌面看起來有變化又不失統一感。",
    coverImage: "/images/projects/pastel-coaster/cover.jpg",
    images: [
      "/images/projects/pastel-coaster/cover.jpg",
      "/images/projects/pastel-coaster/detail-1.jpg",
      "/images/projects/pastel-coaster/detail-2.jpg",
    ],
  },
  {
    id: 3,
    slug: "forest-cardigan",
    title: "Forest 手勾短版外套",
    category: "服飾 / 上衣",
    materials: "羊毛線、3.5mm 勾針",
    timeSpent: "約 20 小時",
    description:
      "以深綠與咖啡色為基底，搭配粗針目營造森林質感。短版剪裁與略寬袖口讓穿搭更有層次。這件作品在收邊處做了較多嘗試，希望在保暖之外，仍然維持輕盈的視覺感。",
    coverImage: "/images/projects/forest-cardigan/cover.jpg",
    images: [
      "/images/projects/forest-cardigan/cover.jpg",
      "/images/projects/forest-cardigan/detail-1.jpg",
      "/images/projects/forest-cardigan/detail-2.jpg",
    ],
  },
];
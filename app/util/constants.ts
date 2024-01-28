export type DummyDataType = {
  id: number;
  title: string;
  mainImage: string;
  tags: string[];
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const DummyData: DummyDataType[] = [
  {
    id: 1,
    title: "【初心者必見】おすすめReact講座",
    mainImage: "/25330357_s 1.png",
    tags: ["React", "PHP"],
    category: "言語別おすすめ記事",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 2,
    title: "PHP講座",
    mainImage: "/25330357_s 1.png",
    tags: ["React", "PHP"],
    category: "言語別おすすめ記事",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 3,
    title: "Vueの入門講座",
    mainImage: "/25330357_s 1.png",
    tags: ["React", "Vue"],
    category: "言語別おすすめ記事",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 4,
    title: "【初心者必見】おすすめReact講座",
    mainImage: "/25330357_s 1.png",
    tags: ["React", "PHP"],
    category: "言語別おすすめ記事",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 5,
    title: "PHP講座",
    mainImage: "/25330357_s 1.png",
    tags: ["React", "PHP"],
    category: "言語別おすすめ記事",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 6,
    title: "Vueの入門講座",
    mainImage: "/25330357_s 1.png",
    tags: ["React", "Vue"],
    category: "言語別おすすめ記事",
    content:
      "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
];

export const CategoriesId: { [key: string]: string } = {
  0: "閲覧ランキング",
  1: "コラム",
  2: "言語別おすすめ記事",
  3: "必見ロードマップ",
  4: "スクールおすすめランキング",
  5: "おすすめ書籍",
  6: "おすすめ質問サイト",
  7: "独学おすすめサイト",
  8: "おすすめYouTube",
  9: "求人サイト",
  10: "転職対策",
  11: "ポートフォリオ",
};

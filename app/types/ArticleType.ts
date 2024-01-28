export type ArticleType = {
  id: string;
  title: string;
  tags: string[];
  category: {
    id: string;
    name: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
};

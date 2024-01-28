import { ArticleType } from "@/app/types/ArticleType";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getCategoryArticles = async (categoryId: string) => {
  const allArticles = await client.getList<ArticleType>({
    endpoint: "blogs",
    queries: {
      offset: 0,
      limit: 10,
      filters: `category[equals]${categoryId}`,
    },
  });

  return allArticles;
};

export const getCategoryList = async (categoryId: string) => {
  const allArticles = await client.getList<ArticleType>({
    endpoint: "blogs",
    queries: {
      offset: 0,
      limit: 50,
      filters: `category[equals]${categoryId}`,
    },
  });

  return allArticles;
};

export const getDetailArticle = async (contentId: string) => {
  const detailArticle = await client.getListDetail<ArticleType>({
    endpoint: "blogs",
    contentId,
  });

  return detailArticle;
};

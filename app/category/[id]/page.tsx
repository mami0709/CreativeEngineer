"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card } from "../../components/home/Card";
import { useRouter, usePathname } from "next/navigation";
import { ArticleType } from "@/app/types/ArticleType";
import { getCategoryList } from "../../lib/microcms/client";
import LoadingSpinner from "@/app/loading";

function CategoryList() {
  const router = useRouter();
  const pathname = usePathname();
  const [categoryName, setCategoryName] = useState("");
  const [categoryArticles, setCategoryArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategoryArticles = useCallback(async (categoryId: string) => {
    setIsLoading(true);
    try {
      const response = await getCategoryList(categoryId);
      if (response.contents && response.contents.length > 0) {
        const firstArticle = response.contents[0];
        const categoryName = firstArticle.category.name;
        setCategoryName(categoryName);
        setCategoryArticles(response.contents);
      } else {
        setCategoryName("カテゴリーが見つかりません");
        console.error("記事のデータが見つかりません");
      }
    } catch (error) {
      console.error("記事の取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // URLからカテゴリーIDを抽出
    const match = pathname.match(/\/category\/([a-zA-Z]+)/);
    if (match) {
      const categoryId = match[1];
      fetchCategoryArticles(categoryId);
    }
  }, [pathname, fetchCategoryArticles]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold mb-10">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {categoryArticles.map((article) => (
          <Card key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;

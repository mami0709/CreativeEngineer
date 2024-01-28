"use client";

import React, { useEffect, useState } from "react";
import { CategoriesId, DummyData, DummyDataType } from "../../util/constants";
import { Card } from "../../components/home/Card";
import { useRouter, usePathname } from "next/navigation";

function CategoryList() {
  const router = useRouter();
  const pathname = usePathname();
  const [categoryName, setCategoryName] = useState("");
  // カテゴリーに一致する記事のリスト
  const [categoryArticles, setCategoryArticles] = useState<DummyDataType[]>([]);

  useEffect(() => {
    // pathnameからIDを抽出
    const match = pathname.match(/\/category\/(\d+)/);
    if (match) {
      const id = match[1]; // URLから抽出したID
      const name = CategoriesId[id]; // IDに基づいてCategoriesIdからカテゴリー名を取得
      setCategoryName(name || "カテゴリーが見つかりません");

      // カテゴリー名に一致する記事をDummyDataから取得
      const articles = DummyData.filter((article) => article.category === name);
      setCategoryArticles(articles);
    }
  }, [pathname]);

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

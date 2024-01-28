"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArticleType } from "@/app/types/ArticleType";
import { getDetailArticle } from "../../lib/microcms/client";
import Image from "next/image";
import LoadingSpinner from "@/app/loading";

function ArticleDetail() {
  const pathname = usePathname();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticleDetail = useCallback(async (contentId: string) => {
    setIsLoading(true);
    try {
      const detailArticle = await getDetailArticle(contentId);
      setArticle(detailArticle);
    } catch (error) {
      console.error("記事の詳細の取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // URLからIDを抽出する
    const match = pathname.match(/\/articles\/([a-zA-Z0-9-]+)/);
    if (match) {
      const contentId = match[1];
      fetchArticleDetail(contentId);
    }
  }, [pathname, fetchArticleDetail]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return <div className="m-10">記事が見つかりません。</div>;
  }

  return (
    <div className="xl:m-14 md:m-10 p-8 xl:p-12 md:p-10 border border-gray-300 bg-white">
      <div className="mb-2">
        {article.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block rounded-full px-3 py-1 text-sm font-semibold border border-yellow-800 text-yellow-900 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="xl:flex justify-start items-center w-full pb-6">
        <h2 className="sm:pb-3 text-2xl font-bold flex-grow">
          {article.title}
        </h2>
        <div className="flex gap-4 items-center ml-auto">
          <div>
            <span>作成日:</span>
            {new Date(article.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span>更新日:</span>
            {new Date(article.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="relative w-full h-96">
        <Image
          src={article.eyecatch.url}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="bg-amber-500 text-white font-bold inline-block px-3 py-1 my-6">
        {article.category.name}
      </div>
      {/* TODO：目次機能つけたい */}

      {/* TODO: HTMLのスタイリング調整 */}
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

export default ArticleDetail;

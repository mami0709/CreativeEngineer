"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArticleType } from "@/app/types/ArticleType";
import { getDetailArticle } from "../../lib/microcms/client";
import Image from "next/image";
import LoadingSpinner from "@/app/loading";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";

function ArticleDetail() {
  const pathname = usePathname();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: session, status } = useSession();

  const fetchArticleDetail = useCallback(async () => {
    const match = pathname.match(/\/articles\/([a-zA-Z0-9-]+)/);
    if (match && session) {
      const contentId = match[1];
      setIsLoading(true);
      try {
        const detailArticle = await getDetailArticle(contentId);
        setArticle(detailArticle);
        // お気に入りの状態を確認
        if (session?.user?.id && detailArticle.id) {
          try {
            const response = await fetch(`/api/favorite/check`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                articleId: detailArticle.id,
                userId: session.user.id,
              }),
            });
            if (!response.ok) {
              throw new Error("お気に入りの状態の確認に失敗しました");
            }
            const data = await response.json();
            setIsFavorite(data.isFavorite);
          } catch (error) {
            console.error("お気に入りの状態の確認に失敗しました", error);
          }
        }
      } catch (error) {
        console.error("記事の詳細の取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [pathname, session]);

  useEffect(() => {
    // sessionが"取得できたらfetchArticleDetailを実行
    if (status !== "loading") {
      fetchArticleDetail();
    }
  }, [fetchArticleDetail, status]);

  const handleFavoriteClick = async () => {
    if (!article?.id || !session?.user?.id) {
      console.error("articleIdまたはuserIdがundefinedです。");
      return;
    }
    // APIコール前に状態をトグルする
    setIsFavorite((current) => !current);

    try {
      const response = await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: article.id,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("サーバーからのレスポンスがokではありません。");
      }
    } catch (error) {
      console.error("お気に入りの状態の更新に失敗しました", error);
      // エラーが発生した場合、状態を元に戻す
      setIsFavorite((current) => !current);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return <div className="m-10">記事が見つかりません。</div>;
  }

  return (
    <div className="xl:m-14 md:m-10 p-8 xl:p-12 md:p-10 border border-gray-300 bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-wrap">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block rounded-full px-3 py-1 text-sm font-semibold border border-yellow-800 text-yellow-900 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleFavoriteClick}
          className={`rounded-full p-2 transition duration-150 ease-in-out transform ${
            isFavorite
              ? "border border-red-500 scale-110"
              : "border border-gray-400"
          }`}
        >
          {isFavorite ? (
            <FaHeart color="#ef4444" size="27" />
          ) : (
            <IoIosHeartEmpty color="#9ca3af" size="27" />
          )}
        </button>
      </div>
      <div className="xl:flex justify-start items-center w-full pb-6">
        <h2 className="sm:pb-3 text-3xl font-bold flex-grow">
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

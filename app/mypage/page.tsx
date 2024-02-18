"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ArticleType } from "../types/ArticleType";
import { Card } from "../components/home/Card";

const MyPage = () => {
  const { data: session } = useSession();
  const [articlesDetails, setArticlesDetails] = useState<ArticleType[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (session?.user?.id) {
        const response = await fetch(
          `/api/favorite/list?userId=${session.user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          // articlesDetailsプロパティからデータを設定
          setArticlesDetails(data.articlesDetails);
        } else {
          console.error("お気に入り記事の取得に失敗しました");
        }
      }
    };

    fetchFavorites();
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={session?.user?.image || "/default_icon.png"}
            alt="user profile icon"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h2 className="text-lg ml-4 font-semibold">
            お名前：{session?.user?.name}
          </h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-10 mt-10 block">
        お気に入りした記事
      </span>
      <div className="flex items-center mb-20">
        {articlesDetails.length > 0 ? (
          <div className="flex flex-wrap items-center gap-6">
            {articlesDetails.map((article) => (
              <Card key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <p>まだお気に入りした記事がありません</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;

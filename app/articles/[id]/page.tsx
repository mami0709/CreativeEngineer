"use client";

import React, { useEffect, useState } from "react";
import { DummyData, DummyDataType } from "../../util/constants";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

function ArticleDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const [article, setArticle] = useState<DummyDataType | null>(null);

  useEffect(() => {
    // pathnameからIDを抽出する（例: '/articles/6' から '6' を取得）
    const match = pathname.match(/\/articles\/(\d+)/);
    if (match) {
      const id = parseInt(match[1]);
      const foundArticle = DummyData.find((article) => article.id === id);
      setArticle(foundArticle || null);
    }
  }, [pathname]); // pathnameが変更されたときにeffectを実行

  // 記事が見つからない場合は、メッセージを表示
  if (!article) {
    return <div>記事が見つかりません。</div>;
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
            {new Date(article.created_at).toLocaleDateString()}
          </div>
          <div>
            <span>更新日:</span>
            {new Date(article.updated_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="relative w-full h-96">
        <Image
          src={article.mainImage}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="bg-amber-500 text-white font-bold inline-block px-3 py-1 my-6">
        {article.category}
      </div>

      {/* TODO：目次機能つけたい */}

      <div>
        <p>{article.content}</p>
      </div>
    </div>
  );
}

export default ArticleDetail;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@/app/types/ArticleType";

const truncateText = (text: string, maxLength: number): string => {
  // HTMLタグを除去
  const strippedString = text.replace(/<[^>]+>/g, "");
  if (strippedString.length <= maxLength) {
    return strippedString;
  }
  return strippedString.substring(0, maxLength) + "...";
};

export const Card: React.FC<ArticleType> = ({
  id,
  title,
  eyecatch,
  content,
  tags,
  category,
  updatedAt,
  createdAt,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const isNew = (dateString: string) => {
    const updatedAtDate = new Date(dateString);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // 1ヶ月前の日付を取得

    return updatedAtDate > oneMonthAgo; // 更新日が1ヶ月前より後であればtrue
  };

  return (
    <Link href={`/articles/${id}`} passHref>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow relative">
        <div className="relative h-48 rounded-t-lg overflow-hidden">
          <Image
            className="rounded-t-lg"
            src={eyecatch.url}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 text-sm font-bold">
            {category.name}
          </div>
          {isNew(createdAt) && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-sm font-bold">
              New
            </div>
          )}
        </div>

        <div className="p-5 mb-6">
          <div className="mb-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded-full px-3 py-1 text-sm font-semibold border border-yellow-800 text-yellow-900 mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 overflow-hidden"
            style={{ maxHeight: "4rem", minHeight: "4rem" }}
          >
            {title}
          </h5>
          <p
            className="font-normal text-gray-400 overflow-hidden"
            style={{ maxHeight: "5.5rem" }}
          >
            {truncateText(content, 45)}
          </p>
        </div>

        <div className="absolute bottom-3 right-3 text-sm text-gray-600">
          {formatDate(updatedAt)}
        </div>
      </div>
    </Link>
  );
};

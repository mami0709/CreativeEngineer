import React from "react";
import Image from "next/image";
import Link from "next/link";

export type CardProps = {
  id: number;
  title: string;
  mainImage: string;
  content: string;
  tags: string[];
  category: string;
  updated_at: string;
  created_at: string;
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

export const Card: React.FC<CardProps> = ({
  id,
  title,
  mainImage,
  content,
  tags,
  category,
  updated_at,
  created_at,
}) => {
  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
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
            src={mainImage}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 text-sm font-bold">
            {category}
          </div>
          {isNew(created_at) && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-sm font-bold">
              New
            </div>
          )}
        </div>

        <div className="p-5 mb-6">
          <div className="mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block  rounded-full px-3 py-1 text-sm font-semibold border border-yellow-800 text-yellow-900 mr-2 mb-2"
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
            {truncateText(content, 35)}
          </p>
        </div>

        <div className="absolute bottom-3 right-3 text-sm text-gray-600">
          {formatDate(updated_at)}
        </div>
      </div>
    </Link>
  );
};

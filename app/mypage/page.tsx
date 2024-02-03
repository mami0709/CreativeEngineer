import React from "react";
import Image from "next/image";
// import { getDetailBook } from "../lib/microcms/client";
// import { BookType, Purchase } from "../types/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
// import Book from "../components/Book";

const MyPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user?.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-t-md"
          />
          <h2 className="text-lg ml-4 font-semibold">お名前：{user?.name}</h2>
        </div>
      </div>

      {/* <span className="font-medium text-lg mb-4 mt-4 block">
       お気に入りした記事
      </span>
      <div className="flex items-center gap-6">
        {detailBooks.map((detailBook: BookType) => (
          <Book key={detailBook.id} book={detailBook} />
        ))}
      </div> */}
    </div>
  );
};

export default MyPage;

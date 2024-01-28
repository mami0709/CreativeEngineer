"use client";

import React, { useCallback, useEffect, useState } from "react";
import { MainImage } from "./components/home/MainImage";
import Banners from "./components/home/Banners";
import { CardsContainer } from "./components/home/CardsContainer";
import ContactUsComponent from "./components/home/ContactUsComponent";
import { getCategoryArticles } from "./lib/microcms/client";

// アイコンインポート
import { TbLanguageHiragana } from "react-icons/tb";
import { FaCrown } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import LoadingSpinner from "./loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState({
    ranking: [],
    language: [],
    loadmap: [],
    school: [],
    book: [],
    question: [],
    study: [],
    youtube: [],
    job: [],
    jobchange: [],
    portfolio: [],
    column: [],
  });

  const fetchArticles = useCallback(async (categoryId: string) => {
    try {
      const data = await getCategoryArticles(categoryId);
      setArticles((prevArticles) => ({
        ...prevArticles,
        [categoryId]: data.contents,
      }));
    } catch (error) {
      console.error(`Error fetching ${categoryId} articles:`, error);
    }
  }, []);

  useEffect(() => {
    const categories = [
      "ranking",
      "language",
      "loadmap",
      "book",
      "question",
      "study",
      "school",
      "youtube",
      "job",
      "jobchange",
      "portfolio",
      "column",
    ];
    // すべてのカテゴリの記事を取得
    const fetchAllArticles = async () => {
      await Promise.all(
        categories.map((categoryId) => fetchArticles(categoryId))
      );
      setIsLoading(false);
    };

    fetchAllArticles();
  }, [fetchArticles]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* PC用の画像 */}
      <MainImage
        src="/home_image_pc.jpg"
        alt="home-image-pc"
        layout="fixed"
        className="hidden sm:block"
        width={2000}
        height={1000}
        priority
        textClassName="top-[25%] right-[5%] text-3xl"
      />
      {/* スマートフォン用の画像 */}
      <MainImage
        src="/home_image_sp.jpg"
        alt="home-image-sp"
        layout="fill"
        className="sm:hidden w-full h-80"
        textClassName="top-[25%] left-1/2 transform -translate-x-1/2 text-center text-xl w-3/4"
      />

      <Banners />

      <div className="bg-gradient-to-r from-blue-400 to-green-100 py-0.5">
        <CardsContainer
          cardsData={articles.ranking}
          moreButtonUrl="/category/ranking"
          categoryName="閲覧ランキング"
          categoryIcon={<FaCrown />}
        />
      </div>
      <CardsContainer
        cardsData={articles.language}
        moreButtonUrl="/category/language"
        categoryName="言語別おすすめ記事"
        categoryIcon={<TbLanguageHiragana />}
      />
      <CardsContainer
        cardsData={articles.loadmap}
        moreButtonUrl="/category/loadmap"
        categoryName="必見ロードマップ"
        categoryIcon={<FaRoad />}
      />
      <CardsContainer
        cardsData={articles.school}
        moreButtonUrl="/category/school"
        categoryName="スクールおすすめランキング"
        categoryIcon={<FaSchool />}
      />
      <div className="bg-gradient-to-r from-yellow-200 to-red-400 py-0.5">
        <CardsContainer
          cardsData={articles.column}
          moreButtonUrl="/category/column"
          categoryName="特集"
          categoryIcon={<FaCrown />}
        />
      </div>
      <CardsContainer
        cardsData={articles.book}
        moreButtonUrl="/category/book"
        categoryName="おすすめ書籍"
        categoryIcon={<FaBook />}
      />
      <CardsContainer
        cardsData={articles.question}
        moreButtonUrl="/category/question"
        categoryName="おすすめ質問サイト"
        categoryIcon={<FaHandPaper />}
      />
      <CardsContainer
        cardsData={articles.study}
        moreButtonUrl="/category/study"
        categoryName="独学おすすめサイト"
        categoryIcon={<FaPencilAlt />}
      />
      <CardsContainer
        cardsData={articles.youtube}
        moreButtonUrl="/category/youtube"
        categoryName="おすすめYouTube"
        categoryIcon={<FaYoutube />}
      />

      <ContactUsComponent />
    </div>
  );
}

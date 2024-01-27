import React from "react";
import { MainImage } from "./components/home/MainImage";
import Banners from "./components/home/Banners";
import { CardsContainer } from "./components/home/CardsContainer";
import { DummyData } from "./util/constants";
import { TbLanguageHiragana } from "react-icons/tb";
import { FaCrown } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import ContactUsComponent from "./components/home/ContactUsComponent";

export default function Home() {
  // APIからデータを取得する際は、ここでデータをフェッチし、cardsDataにセットする。
  // const [data, setData] = useState([]);
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
          cardsData={DummyData}
          moreButtonUrl="/desired-path"
          categoryName="閲覧ランキング"
          categoryIcon={<FaCrown />}
        />
      </div>
      <CardsContainer
        cardsData={DummyData}
        moreButtonUrl="/desired-path"
        categoryName="言語別おすすめ記事"
        categoryIcon={<TbLanguageHiragana />}
      />
      <CardsContainer
        cardsData={DummyData}
        moreButtonUrl="/desired-path"
        categoryName="必見ロードマップ"
        categoryIcon={<FaRoad />}
      />
      <CardsContainer
        cardsData={DummyData}
        moreButtonUrl="/desired-path"
        categoryName="スクールおすすめランキング"
        categoryIcon={<FaSchool />}
      />
      <div className="bg-gradient-to-r from-yellow-200 to-red-400 py-0.5">
        <CardsContainer
          cardsData={DummyData}
          moreButtonUrl="/desired-path"
          categoryName="特集"
          categoryIcon={<FaCrown />}
        />
      </div>
      <CardsContainer
        cardsData={DummyData}
        moreButtonUrl="/desired-path"
        categoryName="おすすめ書籍"
        categoryIcon={<FaBook />}
      />
      <CardsContainer
        cardsData={DummyData}
        moreButtonUrl="/desired-path"
        categoryName="おすすめ質問サイト"
        categoryIcon={<FaHandPaper />}
      />
      <CardsContainer
        cardsData={DummyData}
        moreButtonUrl="/desired-path"
        categoryName="独学おすすめサイト"
        categoryIcon={<FaPencilAlt />}
      />
      <CardsContainer
        cardsData={DummyData}
        moreButtonUrl="/desired-path"
        categoryName="おすすめYouTube"
        categoryIcon={<FaYoutube />}
      />

      <ContactUsComponent />
    </div>
  );
}

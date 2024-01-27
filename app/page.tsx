import React from "react";
import { MainImage } from "./components/home/MainImage";
import Banners from "./components/home/Banners";

export default function Home() {
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

      <h1>メインコンテンツ</h1>
    </div>
  );
}

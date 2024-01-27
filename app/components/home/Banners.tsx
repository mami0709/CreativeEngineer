"use client";

import Image from "next/image";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/banner_images/1.png",
  "/banner_images/2.png",
  "/banner_images/3.png",
  "/banner_images/4.png",
  "/banner_images/5.png",
  "/banner_images/6.png",
  "/banner_images/7.png",
  "/banner_images/8.png",
];

// 対応するURLを設定
const urls = ["/", "/", "/", "/", "/", "/", "/", "/"];

export default function Banners() {
  const slideSettings = {
    0: {
      slidesPerView: 1, //スライドの数
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1424: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1824: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings} // slidesPerViewを指定
      slidesPerView={"auto"} // ハイドレーションエラー対策
      centeredSlides={true} // スライドを中央に配置
      loop={true} // スライドをループさせる
      speed={1000} // スライドが切り替わる時の速度
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }} // スライド表示時間
      navigation // ナビゲーション（左右の矢印）
      pagination={{
        clickable: true,
      }} // ページネーション, クリックで対象のスライドに切り替わる
      className="2xl:max-w-7xl xl:max-w-7xl lg:max-w-5xl md:max-w-3xl max-w-xs my-10 "
    >
      {images.map((src: string, index: number) => (
        <SwiperSlide key={index}>
          <a href={urls[index]} target="_blank" rel="noopener noreferrer">
            <Image
              src={src}
              width={400}
              height={300}
              alt={`Slider Image ${index + 1}`}
              sizes="sm:w-72 sm:h-32"
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

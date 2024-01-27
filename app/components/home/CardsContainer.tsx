"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardProps } from "./Card";

type CardsContainerProps = {
  cardsData: CardProps[];
  moreButtonUrl: string;
  categoryName: string;
  categoryIcon: React.ReactNode;
};

export const CardsContainer: React.FC<CardsContainerProps> = ({
  cardsData,
  moreButtonUrl,
  categoryName,
  categoryIcon,
}) => {
  const router = useRouter();

  const handleMoreButtonClick = () => {
    router.push(moreButtonUrl);
  };

  const slideSettings = {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
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
      slidesPerView: 3.5,
      spaceBetween: 30,
    },
  };

  return (
    <div className="relative ">
      <div
        className="flex items-center absolute -top-14 left-6 px-4 font-semibold"
        style={{ zIndex: 50 }}
      >
        <span className="text-2xl mr-1">{categoryIcon}</span>
        <span
          onClick={handleMoreButtonClick}
          className="text-black py-2 cursor-pointer text-xl"
        >
          {categoryName}
        </span>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={slideSettings}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        speed={1000}
        navigation
        pagination={{
          clickable: true,
        }}
        className="2xl:max-w-7xl xl:max-w-7xl lg:max-w-5xl md:max-w-3xl max-w-xs my-28"
      >
        {cardsData.map((data) => (
          <SwiperSlide key={data.id}>
            <Card
              id={data.id}
              title={data.title}
              mainImage={data.mainImage}
              content={data.content}
              tags={data.tags}
              category={data.category}
              updated_at={data.updated_at}
              created_at={data.created_at}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={handleMoreButtonClick}
        className="absolute -bottom-10 right-6 text-blue-900 px-4 py-2 cursor-pointer underline"
        style={{ zIndex: 50 }}
      >
        もっと見る →
      </button>
    </div>
  );
};

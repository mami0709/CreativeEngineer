import Image from "next/image";
import React from "react";

type MainImageProps = {
  src: string;
  alt: string;
  layout: "fill" | "fixed";
  className: string;
  width?: number;
  height?: number;
  priority?: boolean;
  textClassName: string;
};

export const MainImage: React.FC<MainImageProps> = ({
  src,
  alt,
  layout,
  className,
  width,
  height,
  priority = false,
  textClassName,
}) => (
  <div className={`relative ${className}`}>
    <Image
      src={src}
      alt={alt}
      layout={layout}
      width={layout === "fixed" ? width : undefined}
      height={layout === "fixed" ? height : undefined}
      objectFit="cover"
      priority={priority}
    />
    <ImageText className={textClassName} />
  </div>
);

type ImageTextProps = {
  className: string;
};

const ImageText: React.FC<ImageTextProps> = ({ className }) => (
  <p className={`absolute text-white ${className}`}>
    駆け出しエンジニアを応援したい!
    <br />
    その熱い想いだけでこのサイトを作りました
    <br />
    会員登録などは一切不要です！存分にご活用してください！
  </p>
);

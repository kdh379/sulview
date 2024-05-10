"use client";

import Image from "next/image";
import { useState } from "react";

interface WhiskyImageProps {
  alt: string;
  images: string[];
}

export default function WhiskyImage({ alt, images }: WhiskyImageProps) {

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="mx-auto">
      <Image
        src={mainImage}
        width={300}
        height={300}
        alt={alt}
        className="max-h-[300px] object-contain"
      />
      <div className="mt-4 flex gap-x-4">
        {images.map((image) => (
          <Image
            key={image}
            src={image}
            width={50}
            height={50}
            alt={alt}
            className="max-h-20 w-auto cursor-pointer rounded-lg object-contain transition-transform hover:scale-105"
            onMouseOver={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};
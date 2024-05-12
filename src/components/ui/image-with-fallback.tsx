"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

export default function ImageWithFallback ({
  src,
  alt,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) {

  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  return (
    <Image
      alt={alt}
      src={error ? fallbackSrc : src}
      {...props}
      onError={setError}
    />
  );
}
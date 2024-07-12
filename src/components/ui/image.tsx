"use client";

import type { ImageProps } from "next/image";
import NextImage from "next/image";
import { useState } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface ImageWithFallbackProps extends ImageProps {
  fallback: string;
}

export default function Image({ src, alt, fallback, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState<React.SyntheticEvent<HTMLImageElement, Event> | null>(null);

  const {targetRef, isIntersecting} = useIntersectionObserver({
    rootMargin: "200px",
    threshold: 0.1,
  });

  return (
    <NextImage
      {...props}
      ref={targetRef}
      src={isIntersecting ? (error ? fallback : src) : ""}
      alt={alt}
      onError={setError}
    />
  );
}

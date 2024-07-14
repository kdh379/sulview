/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import type { ImageLoaderProps } from "@/lib/image-loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import imageLoader from "@/lib/image-loader";
import { cn } from "@/lib/utils";

type PlaceholderType = "blur" | "empty" | "none";

interface ImageWithFallbackProps extends ImageLoaderProps, React.HTMLAttributes<HTMLImageElement> {
  alt: string;
  fallback?: string;
  placeholder?: PlaceholderType;
}

const PLACEHOLDER_CLASSNAME: Record<PlaceholderType, string> = {
  none: "",
  blur: "blur-sm",
  empty: "invisible",
};

export default function Image({
  src,
  width,
  height,
  fit,
  format,
  quality,
  alt,
  placeholder = "none",
  fallback = "/whisky-placeholder.png", // TODO: 이미지 경로 수정
  className,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const {targetRef, isIntersecting} = useIntersectionObserver({
    rootMargin: "200px",
    threshold: 0.1,
  });

  const handleError = () => {
    setHasError(true);
  };

  return (
    <img
      {...props}
      ref={targetRef}
      src={imageLoader({
        src: hasError ? fallback : src,
        width,
        height,
        quality: isIntersecting ? quality : 5,
        fit,
        format,
      })}
      width={width}
      height={height}
      alt={alt}
      className={cn(
        "transition-[filter]",
        !isIntersecting && PLACEHOLDER_CLASSNAME[placeholder],
        className
      )}
      onError={handleError}
      aria-hidden={alt === ""}
    />
  );
}

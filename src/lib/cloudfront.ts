"use client";

type CloudfrontLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

// TODO: Cloudfront Lambda@Edge로 small, medium, large 이미지 생성
export default function cloudfrontLoader({ src, width, quality }: CloudfrontLoaderProps) {
  const cloudfront = process.env.NEXT_PUBLIC_CLOUDFRONT;

  // const sizeSuffix = width <= 300 ? "small" : width <= 600 ? "medium" : "large";
  // const pathname = src.replace(".webp", `-${sizeSuffix}.webp`);
  // const url = new URL(`${cloudfront}${pathname}`);

  const url = new URL(`${cloudfront}${src}`);
  url.searchParams.set("format", "auto");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());

  return url.href;
}

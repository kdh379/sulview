type ImageFormat = "webp" | "jpeg";
type ImageFit = "cover" | "contain" | "fill" | "inside" | "outside";

type CloudfrontLoaderProps = {
  src: string;
  width: number;
  height: number;
  quality?: number;
  fit?: ImageFit;
  format?: ImageFormat;
};

// TODO: Cloudfront Lambda@Edge로 small, medium, large 이미지 생성
export default function imageLoader({
  src,
  width,
  height,
  quality = 75,
  fit = "inside",
  format = "webp",
}: CloudfrontLoaderProps) {

  const url = new URL(src);
  url.searchParams.set("w", width.toString());
  url.searchParams.set("h", height.toString());
  url.searchParams.set("q", quality.toString());
  url.searchParams.set("t", fit);
  url.searchParams.set("f", format);

  return url.href;
}

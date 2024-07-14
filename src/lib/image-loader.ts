type ImageFormat = "webp" | "jpeg";
type ImageFit = "cover" | "contain" | "fill" | "inside" | "outside";

export type ImageLoaderProps = {
  src: string;
  width: number;
  height: number;
  quality?: number;
  fit?: ImageFit;
  format?: ImageFormat;
};

export default function imageLoader({
  src,
  width,
  height,
  quality = 75,
  fit = "inside",
  format = "webp",
}: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", width.toString());
  url.searchParams.set("h", height.toString());
  url.searchParams.set("q", quality.toString());
  url.searchParams.set("t", fit);
  url.searchParams.set("f", format);

  return url.href;
}

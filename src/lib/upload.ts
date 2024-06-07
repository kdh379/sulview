import { imageConverter } from "upload-images-converter";

import { FilePreview } from "@/components/uploader";

type Options = {
  maxLength?: number;
};

const getImageSize = (imageFile: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      resolve({ width, height });
    };

    reader.onload = () => {
      img.src = reader.result?.toString() ?? "";
    };

    reader.readAsDataURL(imageFile);

    img.onerror = (error) => {
      reject(error);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export async function convertImageToWebP(file: File, options?: Options) {
  const { maxLength = 1280 } = options || {};

  const { width: originWidth, height: originHeight } = await getImageSize(file);

  const { width, height } = calculateAspectRatioFit({
    width: originWidth,
    height: originHeight,
    maxLength,
  });

  const webP = await imageConverter({
    files: [file],
    width,
    height,
  });

  if (webP.length === 0) throw new Error("Failed to convert image to WebP");

  return webP[0];
}

export const createPreviewMedia = (media: File) =>
  Object.assign(media, {
    preview: URL.createObjectURL(media),
  });

export const calculateAspectRatioFit = ({
  width,
  height,
  maxLength,
}: {
  width: number;
  height: number;
  maxLength: number;
}) => {
  if (width <= maxLength && height <= maxLength) return { width, height };

  const ratio = width / height;

  if (width > height)
    return {
      width: maxLength,
      height: Number((maxLength / ratio).toFixed(1)),
    };
  else
    return {
      width: Number((maxLength * ratio).toFixed(1)),
      height: maxLength,
    };
};

export const convertURLtoImage = async (url: string): Promise<FilePreview> => {
  const response = await fetch(url, {
    method: "GET",
  });
  const blob = await response.blob();
  const filename = url.split("/").pop();
  const file = new File([blob], filename ?? "file");

  return createPreviewMedia(file);
};

"use client";

import { CloudUpload, Eye, Trash } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { convertURLtoImage, createPreviewMedia } from "@/lib/upload";

export type FilePreview = File & { preview: string };

const MAX_FILES = 5;

const DROPZONE_MSG_BOX: { [key: string]: string } = {
  title: "파일을 가져오는 중 오류가 발생했습니다.",
  "file-invalid-type": "png, jpg, jpeg, webP 형식의 이미지 파일만 업로드할 수 있습니다.",
  "file-too-large": "파일 크기가 너무 큽니다.",
  "too-many-files": `최대 ${MAX_FILES}개의 파일까지 업로드할 수 있습니다.`,
};

interface UploaderProps {
  defaultImages?: string[];
  disabled?: boolean;
  onChange?: (files: FilePreview[]) => void;
}

export default function Uploader({ defaultImages = [], disabled, onChange }: UploaderProps) {
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDropRejected: (events) => {
      toast({
        variant: "destructive",
        title: DROPZONE_MSG_BOX["title"],
        description: events
          .map((event) => event.errors.map((error) => DROPZONE_MSG_BOX[error.code] || error.message))
          .join("\n"),
        duration: 3000,
      });
    },
    onDrop: (acceptedFiles) => {
      if (files.length + acceptedFiles.length > MAX_FILES) {
        toast({
          variant: "destructive",
          title: DROPZONE_MSG_BOX["title"],
          description: DROPZONE_MSG_BOX["too-many-files"],
          duration: 3000,
        });

        return;
      }

      setFiles([...files, ...acceptedFiles.map((file) => createPreviewMedia(file))]);

      onChange?.([...files, ...acceptedFiles.map((file) => createPreviewMedia(file))]);
    },
  });

  const initFiles = React.useCallback(async (urls: string[]) => {
    const files = await Promise.all(urls.map(convertURLtoImage));

    setFiles(files);
    onChange?.(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (defaultImages.length > 0) initFiles(defaultImages);
  }, [defaultImages, initFiles]);

  return (
    <div className="grid auto-rows-min grid-cols-3 gap-4">
      <Button
        variant="dashed"
        className="text-muted-foreground col-span-3 h-32 w-full flex-col"
        disabled={files.length >= MAX_FILES || disabled}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CloudUpload className="size-12" />
        <span className="sr-only">Upload</span>
        <p className="mt-2 text-sm">사진을 이곳에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      </Button>
      {files.map((file, index) => (
        <div
          key={file.name}
          className="border-border before:bg-accent relative rounded-md border p-4 before:absolute before:size-[calc(100%-2rem)] before:rounded-md before:opacity-0 before:transition-opacity before:hover:opacity-50"
        >
          <Image
            className="size-full rounded-md object-cover transition-colors"
            src={file.preview}
            alt={file.name}
            width={112}
            height={112}
          />
          <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center whitespace-nowrap text-center opacity-0 transition-opacity hover:opacity-100">
            <Button size="icon" variant="link" disabled={disabled}>
              <Eye className="text-accent-foreground size-6" />
            </Button>
            <Button
              size="icon"
              variant="link"
              disabled={disabled}
              onClick={() => {
                setFiles(files.filter((_, i) => i !== index));
                onChange?.(files.filter((_, i) => i !== index));
              }}
            >
              <Trash className="text-accent-foreground size-6" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

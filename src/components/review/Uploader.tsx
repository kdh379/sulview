
import { CloudUpload, Eye, Trash } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createPreviewMedia } from "@/lib/upload";

export type FilePreview = File & { preview: string };

const MAX_FILES = 5;

const DROPZONE_MSG_BOX: {[key: string]: string} = {
  "file-invalid-type": "png, jpg, jpeg, webP 형식의 이미지 파일만 업로드할 수 있습니다.",
  "file-too-large": "파일 크기가 너무 큽니다.",
};

interface UploaderProps {
  disabled?: boolean;
  onChange?: (files: FilePreview[]) => void;
}

export default function Uploader({disabled, onChange}: UploaderProps) {
  const [files, setFiles] = React.useState<FilePreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDropRejected: (events) => {

      toast({
        variant: "destructive",
        title: "파일을 가져오는 중 오류가 발생했습니다.",
        description: events.map((event) => event.errors.map((error) => DROPZONE_MSG_BOX[error.code] || error.message)).join("\n"),
        duration: 3000,
      });
    },
    onDrop: (acceptedFiles) => {
      if(files.length + acceptedFiles.length > MAX_FILES) {
        toast({
          variant: "destructive",
          title: `최대 ${MAX_FILES}개의 파일까지 업로드할 수 있습니다.`,
          duration: 3000,
        });

        return;
      }

      setFiles([
        ...files,
        ...acceptedFiles.map((file) => createPreviewMedia(file)),
      ]);

      onChange?.([
        ...files,
        ...acceptedFiles.map((file) => createPreviewMedia(file)),
      ]);
    },
  });

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <Button
        variant="dashed"
        className="text-muted-foreground col-span-3 h-32 w-full flex-col"
        disabled={files.length >= MAX_FILES || disabled}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CloudUpload className="size-12" />
        <span className="sr-only">Upload</span>
        <p className="mt-2 text-sm">
              파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.
        </p>
      </Button>
      {files.map((file, index) => (
        <div 
          key={file.name}
          className="border-border before:bg-primary relative rounded-md border p-4 before:absolute before:size-[calc(100%-2rem)] before:rounded-md before:opacity-0 before:transition-opacity before:hover:opacity-50"
        >
          <Image
            className="size-full rounded-md object-cover transition-colors"
            src={file.preview}
            alt={file.name}
            width={112}
            height={112}
          />
          <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center whitespace-nowrap text-center opacity-0 transition-opacity hover:opacity-100">
            <Button
              size="icon"
              variant="link"
              disabled={disabled}
            >
              <Eye className="text-primary-foreground size-6" />
            </Button>
            <Button
              size="icon"
              variant="link"
              disabled={disabled}
              onClick={() => {
                setFiles(files.filter((_, i) => i !== index));
              }}
            >
              <Trash className="text-primary-foreground size-6" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
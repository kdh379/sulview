"use client";

import { useFormContext } from "react-hook-form";
import { InfoIcon } from "lucide-react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Uploader, type FilePreview } from "@/components/ui/uploader";
import { TasteInput } from "@/components/write/form-field/taste-input";
import WhiskyInput from "@/components/write/form-field/whisky-input";

interface NoteFormFieldsProps {
  images: string[];
  setFiles: (files: FilePreview[]) => void;
}

function NoteFormFields({ images, setFiles }: NoteFormFieldsProps) {

  const form = useFormContext();

  return (
    <>
      <FormField
        name="images"
        control={form.control}
        render={() => (
          <FormItem>
            <FormLabel className="flex items-center">
              사진
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="text-muted-foreground ml-2 inline-block size-4" />
                </TooltipTrigger>
                <TooltipContent side="right">webp 형식으로 변환되어 저장됩니다.</TooltipContent>
              </Tooltip>
            </FormLabel>
            <FormControl>
              <Uploader
                defaultImages={images}
                disabled={form.formState.isSubmitting}
                onChange={(files) => setFiles(files)}
              />
            </FormControl>
            <FormDescription>최대 5장까지 업로드 가능합니다.</FormDescription>
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-y-4">
        <WhiskyInput />
        <TasteInput />
      </div></>
  );
}

export default NoteFormFields;
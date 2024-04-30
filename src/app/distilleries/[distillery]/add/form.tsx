"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Check, InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

import WhiskyFields from "@/app/distilleries/[distillery]/add/whisky-fields";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Uploader, { FilePreview } from "@/components/uploader";
import { handleApiError } from "@/lib/api";
import { convertImageToWebP } from "@/lib/upload";
import { customErrorMap } from "@/lib/zod";

const WhiskyFormSchema = z.object({
  name: z.string().min(1),
  bottler: z.enum(["distillery", "independent"], {
    required_error: "병입 방식을 선택해주세요.",
  }),
  abv: z.string().min(1),
  caskTypes: z.array(z.object({
    value: z.string(),
  })),
  independentDistillery: z.string(),
  aged: z.string(),
  images: z.array(z.string()),
  caskNumber: z.string(),
  bottled: z.string(),
  distilleryName: z.string(),
});
z.setErrorMap(customErrorMap);

export type WhiskyFormSchemaType = z.infer<typeof WhiskyFormSchema>;

interface WhiskyAddFormProps {
  distilleryName: string;
}

export default function WhiskyAddForm({ distilleryName }: WhiskyAddFormProps) {

  const { uploadToS3 } = useS3Upload();
  const router = useRouter();
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const form = useForm<WhiskyFormSchemaType>({
    resolver: zodResolver(WhiskyFormSchema),
    defaultValues: {
      name: "",
      abv: "",
      independentDistillery: "",
      aged: "",
      caskTypes: [{
        value: "",
      }],
      caskNumber: "",
      bottled: "",
      images: [],
      distilleryName,
    },
  });

  const {
    mutate: handleAddWhisky,
  } = useMutation(
    (data: WhiskyFormSchemaType) => axios.post("/api/whisky", data),
    {
      onSuccess: () => {
        router.push(`/whiskies/${form.getValues("name")}`);
      },
      onError: (err: AxiosError<ActionError>) => {
        if(err.response?.data)
          handleApiError(err.response.data, form);
      },
    }
  );

  const onSubmit = async () => {

    const bottler = form.getValues("bottler");

    if(bottler === "independent" && form.getValues("independentDistillery") === "")
      return form.setError("independentDistillery", { type: "required" });


    console.log(files);

    for(const file of files) {
      const webP = await convertImageToWebP(file);

      console.log(webP);
      
      
      // const { url } = await uploadToS3(webP);

      // form.setValue("images", [...form.getValues("images"), new URL(url).pathname]);
    }

    // handleAddWhisky(form.getValues());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 grid auto-rows-max grid-cols-2 gap-8"
      >
        <WhiskyFields />
        <FormField
          name="images"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel className="flex items-center">
                사진
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="text-muted-foreground ml-2 size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    webp 형식으로 변환되어 저장됩니다.
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Uploader
                  disabled={form.formState.isSubmitting}
                  onChange={(files) => setFiles(files)}
                />
              </FormControl>
              <FormDescription>
                최대 5장까지 업로드 가능합니다.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="col-span-2 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            type="submit"
            isLoading={form.formState.isSubmitting}
            className="w-24"
          >
            <Check className="mr-2 size-4" />
            추가
          </Button>
        </div>
      </form>
    </Form>
  );
}
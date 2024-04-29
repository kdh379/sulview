
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

import { AutoComplete } from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Uploader, { FilePreview } from "@/components/uploader";
import data from "@/data/distillery-regions.json";
import { handleApiError } from "@/lib/api";
import { convertImageToWebP } from "@/lib/upload";
import { customErrorMap } from "@/lib/zod";

const distilleryFormSchema = z.object({
  images: z.array(z.string()),
  name: z.string().min(1),
  region: z.string().min(1),
});
z.setErrorMap(customErrorMap);

type DistilleryFormValues = z.infer<typeof distilleryFormSchema>;

export default function DistilleryForm() {

  const { uploadToS3 } = useS3Upload();
  const router = useRouter();
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const form = useForm<DistilleryFormValues>({
    resolver: zodResolver(distilleryFormSchema),
    defaultValues: {
      images: [],
      name: "",
      region: "",
    },
  });

  const {
    mutate: handleAddDistillery,
  } = useMutation(
    (data: DistilleryFormValues) => axios.post("/api/distillery", data),
    {
      onSuccess: () => {
        router.push(`/distilleries/${form.getValues("name")}`);
      },
      onError: (err: AxiosError<ActionError>) => {
        if(err.response?.data)
          handleApiError(err.response.data, form);
      },
    }
  );

  const onSubmit = async(data: DistilleryFormValues) => {

    if(files.length === 0)
      return form.setError("images", { type: "min", message: "사진을 업로드해주세요." });

    for(const file of files) {
      const webP = await convertImageToWebP(file);
      
      const { url } = await uploadToS3(webP);

      form.setValue("images", 
        [...form.getValues("images"), `${process.env.NEXT_PUBLIC_CLOUDFRONT}${new URL(url).pathname}`]);
    }

    handleAddDistillery(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pb-8">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  사진
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Uploader onChange={(files) => setFiles(files)} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                    증류소 / 독립 병입자
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="글렌알라키" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={() => (
              <FormItem>
                <FormLabel className="flex justify-between">
                    지역
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <AutoComplete
                    itemList={data.distilleryRegions.map((region) => ({
                      value: region,
                      label: region,
                    }))}
                    onValueChange={(value) => form.setValue("region", value)}
                    placeholder="스페이사이드"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div
          className="flex items-center justify-end gap-2"
        >
          <Button
            variant="outline"
            disabled={form.formState.isSubmitting}
          >
                취소
          </Button>
          <Button
            type="submit"
            isLoading={form.formState.isSubmitting}
          >
              추가
          </Button>
        </div>
      </form>
    </Form>
  );
}
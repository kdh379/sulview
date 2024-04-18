"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useS3Upload } from "next-s3-upload";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ReviewFormHeader from "@/components/review/ReviewFormHeader";
import Uploader, { FilePreview } from "@/components/review/Uploader";
import WhiskyInput from "@/components/review/WhiskyInput";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { convertImageToWebP } from "@/lib/upload";

const formSchema = z.object({
  name: z.string(),
  score: z.coerce.number().min(0).max(100).multipleOf(0.1),
  images: z.array(z.string()),
  distillery: z.string(),
  bottler: z.string(),
  age: z.string(),
  abv: z.string(),
  caskType: z.array(z.string()),
  caskNumber: z.number().int(),
  content: z.string().min(1),
  nose: z.string(),
  noseScore: z.number().int(),
  palate: z.string(),
  palateScore: z.number().int(),
  finish: z.string(),
  finishScore: z.number().int(),
});

const WHISKY_LIST = [
  {
    label: "와일드 터키 레어브리드",
    value: "와일드 터키 레어브리드",
  },
  {
    label: "GlenAllachie 15-year-old",
    value: "GlenAllachie 15-year-old",
  },
];


export default function ReviewForm() {

  const { uploadToS3 } = useS3Upload();
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      score: 0,
      images: [],
      caskType: [
        " ",
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    for(const file of files) {
      const webP = await convertImageToWebP(file);
      
      const { url } = await uploadToS3(webP);

      form.setValue("images", [...form.getValues("images"), url]);
    }

    console.log(form.getValues());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
      >
        <ReviewFormHeader />
        <Card>
          <CardHeader>
            <CardTitle>
              <FormField
                name="name"
                control={form.control}
                render={
                  () => (
                    <FormItem className="flex-1">
                      <FormLabel>위스키</FormLabel>
                      <FormControl>
                        <AutoComplete
                          emptyMessage="직접 입력"
                          itemList={WHISKY_LIST}
                          onValueChange={(value) => form.setValue("name", value)}
                          className="text-xl"
                          placeholder="와일드 터키"
                        />
                      </FormControl>
                      <FormDescription>
                          위스키 선택 시 자동으로 정보를 불러옵니다.
                      </FormDescription>
                    </FormItem>
                  )
                }
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid max-w-3xl auto-rows-max grid-cols-3 gap-4">
            <WhiskyInput />
            <div
              className="col-span-2"
            >
              <FormField
                name="images"
                control={form.control}
                render={
                  () => (
                    <FormItem>
                      <FormLabel>사진</FormLabel>
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
                  )
                }
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
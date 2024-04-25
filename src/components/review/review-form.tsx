"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useS3Upload } from "next-s3-upload";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ReviewFormHeader from "@/components/review/review-form-header";
import TasteInput from "@/components/review/taste-input";
import Uploader, { FilePreview } from "@/components/review/uploader";
import WhiskyInputField from "@/components/review/whisky-input";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { convertImageToWebP } from "@/lib/upload";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1),
  score: z.coerce.number().min(0).max(100).multipleOf(0.1),
  images: z.array(z.string()),
  distillery: z.coerce.number(),
  bottler: z.string(),
  age: z.string(),
  abv: z.string(),
  caskType: z.array(z.string()),
  caskNumber: z.string(),
  nose: z.string(),
  noseScore: z.coerce.number().min(0).max(100).int(),
  palate: z.string(),
  palateScore: z.coerce.number().min(0).max(100).int(),
  finish: z.string(),
  finishScore: z.coerce.number().min(0).max(100).int(),
  content: z.string(),
});

type ReviewFormValues = z.infer<typeof formSchema>;

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
  const [detailReviewVisible, setDetailReviewVisible] = React.useState(false);
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      score: 0,
      images: [],
      distillery: -1,
      bottler: "",
      age: "",
      abv: "",
      caskType: [
        " ",
      ],
      caskNumber: "",
      content: "",
      nose: "",
      noseScore: 0,
      palate: "",
      palateScore: 0,
      finish: "",
      finishScore: 0,
    },
  });

  const onSubmit = async (values: ReviewFormValues) => {

    for(const file of files) {
      const webP = await convertImageToWebP(file);
      
      const { url } = await uploadToS3(webP);

      form.setValue("images", [...form.getValues("images"), new URL(url).pathname]);
    }

    console.log(form.getValues());
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
      >
        <ReviewFormHeader />
        <Card>
          <CardHeader>
            <CardTitle>
              <FormField
                name="name"
                control={form.control}
                render={() => (
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
                )}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid max-w-3xl auto-rows-max grid-cols-3 gap-4">
              <WhiskyInputField />
              <FormField
                name="images"
                control={form.control}
                render={() => (
                  <FormItem className="col-span-2">
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
                )}
              />
            </div>
            <Separator className="my-8 h-[2px]" />
            <TasteInput className={cn(
              "hidden",
              detailReviewVisible && "block"
            )} />
            <Button
              variant={detailReviewVisible ? "destructive" : "outline"}
              size="sm"
              className="mb-4"
              onClick={() => setDetailReviewVisible(!detailReviewVisible)}
            >
                테이스팅 노트 {detailReviewVisible ? "제거" : "추가"}
            </Button>
            <FormField
              control={form.control}
              name="content"
              render={({field}) => (
                <FormItem>
                  <FormLabel>총평</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-24"
                      placeholder="시간을 두고 에어레이션 시키면서 오래동안 먹고싶다."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
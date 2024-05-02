"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { InfoIcon, Minus, NotebookPen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Uploader from "@/components/uploader";
import { handleApiError } from "@/lib/api";
import { convertImageToWebP } from "@/lib/upload";
import { cn } from "@/lib/utils";
import { customErrorMap } from "@/lib/zod";

const ReviewFormSchema = z.object({
  score: z.coerce.number().min(0).max(100).multipleOf(0.1),
  content: z.string(),
  nose: z.string(),
  noseScore: z.coerce.number().min(0).max(100).optional(),
  palate: z.string(),
  palateScore: z.coerce.number().min(0).max(100).optional(),
  finish: z.string(),
  finishScore: z.coerce.number().min(0).max(100).optional(),
  images: z.array(z.string()),
  whiskyId: z.number(),
});
z.setErrorMap(customErrorMap);

type ReviewFormSchemaType = z.infer<typeof ReviewFormSchema>;

interface FieldSetProps {
  name: string;
  legend: string;
};

function FieldSet({ name, legend }: FieldSetProps) {

  const form = useFormContext();
  const { error } = useFormField();

  return (
    <li>
      <fieldset>
        <legend className={cn(
          "text-sm font-medium leading-none",
          error && "text-destructive"
        )}
        >
          {legend}
        </legend>
        <FormField
          name={`${name}Score`}
          control={form.control}
          render={
            ({field}) => (
              <FormItem className="-mt-8 ml-8 flex items-center">
                <FormLabel className="sr-only">{name} 점수</FormLabel>
                <div className="ml-8 flex gap-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      const { value } = field;
                      form.setValue(`${name}Score`, value > 0 ? value - 1 : 0);
                    }}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <FormControl>
                    <Input 
                      {...field}
                      className="w-12 text-center"
                      value={field.value ?? ""}
                      onFocus={(e) => e.target.select()}
                    />
                  </FormControl>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      const { value } = field;
                      form.setValue(`${name}Score`, value < 100 ? value + 1 : 100);
                    }}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </FormItem>
            )
          }
        />
        <FormField
          name={name}
          control={form.control}
          render={
            ({field}) => (
              <FormItem className="mt-2">
                <FormLabel>
                  <span className="sr-only">Nose</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[90px]"
                    placeholder="과일, 견과류, 다크초콜릿, 오크"
                  />
                </FormControl>
              </FormItem>
            )
          }
        />
      </fieldset>
    </li>
  );
}

function TasteInput({className} : {className?: string}) {

  return (
    <ul className={cn("mb-4 space-y-8", className)}>
      <FieldSet name="nose" legend="Nose" />
      <FieldSet name="palate" legend="Palate" />
      <FieldSet name="finish" legend="Finish" />
    </ul>
  );
}

interface WhiskyReviewFormProps {
  whiskyId: number;
}

export default function WhiskyReviewForm({ whiskyId }: WhiskyReviewFormProps) {
  const [tasteVisible, setTasteVisible] = useState(false);
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const {uploadToS3} = useS3Upload();
  const form = useForm<ReviewFormSchemaType>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      whiskyId,
      score: 0,
      content: "",
      nose: "",
      palate: "",
      finish: "",
      images: [],
    },
  });
  const {
    isLoading,
    mutate: handleAddReview,
  } = useMutation(
    (data: ReviewFormSchemaType) => axios.post("/api/review", data),
    {
      onSuccess: () => {
        router.refresh();
      },
      onError: (err: AxiosError<ActionError>) => {
        if(err.response?.data)
          handleApiError(err.response.data, form);
      },
    }
  );

  const onSubmit = async() => {
    for(const file of files) {
      const webP = await convertImageToWebP(file);
      
      const { url } = await uploadToS3(webP);

      form.setValue("images", 
        [...form.getValues("images"), `${process.env.NEXT_PUBLIC_CLOUDFRONT}${new URL(url).pathname}`]);
    }

    if(!tasteVisible) {
      form.setValue("nose", "");
      form.setValue("noseScore", -1);
      form.setValue("palate", "");
      form.setValue("palateScore", -1);
      form.setValue("finish", "");
      form.setValue("finishScore", -1);
    }

    handleAddReview(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="pt-6">
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FormField
                  control={form.control}
                  name="score"
                  render={({field}) => (
                    <FormItem className="mb-8">
                      <FormLabel className="text-xl font-bold">
                        <span>RATING</span>
                        <span className="ml-2 text-2xl font-bold">{field.value}</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => form.setValue("score", value[0])}
                          name={field.name}
                          defaultValue={[field.value ?? 0]}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <TasteInput className={cn(
                  "hidden",
                  tasteVisible && "block"
                )} />
                <Button
                  variant={tasteVisible ? "destructive" : "outline"}
                  size="sm"
                  className="mb-4"
                  onClick={() => setTasteVisible(!tasteVisible)}
                >
              테이스팅 노트 {tasteVisible ? "제거" : "추가"}
                </Button>
                <FormField
                  control={form.control}
                  name="content"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>리뷰</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-24"
                          placeholder="적극 추천하는 위스키. 재구매 의사 있음."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              isLoading={isLoading}
              className="ml-auto w-full sm:w-auto"
              size="lg"
            >
              <NotebookPen className="mr-2 size-4" />
              리뷰 작성
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
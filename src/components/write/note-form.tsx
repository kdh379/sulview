"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { noteTable } from "@/db/schema";
import { handleApiError } from "@/lib/api";
import { convertImageToWebP } from "@/lib/upload";
import { customErrorMap } from "@/lib/zod";
import NoteFormFields from "@/components/write/form-field/note-form-fields";

const NoteFormSchema = z.object({
  whiskyName: z.string().min(1).max(255),
  abv: z.string().min(0).max(255),
  aged: z.string().min(0).max(255),
  caskTypes: z.array(
    z.object({
      value: z.string().max(255),
    }),
  ),
  score: z.coerce.number().min(0).max(100),
  review: z.string().min(1).max(1000),
  nose: z.string().max(1000),
  noseScore: z.coerce.number().min(0).max(100).nullable(),
  palate: z.string().max(1000),
  palateScore: z.coerce.number().min(0).max(100).nullable(),
  finish: z.string().max(1000),
  finishScore: z.coerce.number().min(0).max(100).nullable(),
  images: z.array(z.string()),
});
z.setErrorMap(customErrorMap);

export type NoteFormSchemaType = z.infer<typeof NoteFormSchema>;

function includesSubString(arr: string[], str: string) {
  return arr.some((item) => item.includes(str));
}

interface NoteFormProps extends NoteFormSchemaType {
  onSubmitted?: () => void;
}

function NoteForm({ onSubmitted, ...props }: NoteFormProps) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const { uploadToS3 } = useS3Upload();
  const form = useForm<NoteFormSchemaType>({
    resolver: zodResolver(NoteFormSchema),
    defaultValues: {
      ...props,
      noseScore: props.noseScore === -1 ? null : props.noseScore,
      palateScore: props.palateScore === -1 ? null : props.palateScore,
      finishScore: props.finishScore === -1 ? null : props.finishScore,
    },
  });
  const {
    mutate: handleSubmit,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: NoteFormSchemaType) => axios.post("/api/note", data),
    onSuccess: (res) => {
      const { data } = res;
      router.push(`/note/${data.id}`);
      onSubmitted?.();
    },
    onError: (err: AxiosError<ActionError>) => {
      if (err.response?.data) handleApiError(err.response.data, form);
    },
  });


  const onSubmit = async () => {
    const images = props.images.filter((image) => files.some((file) => image.includes(file.name)));
    form.setValue("images", images);

    for (const file of files) {
      if (includesSubString(props.images, file.name)) continue;

      const webP = await convertImageToWebP(file);
      const { url } = await uploadToS3(webP);

      form.setValue("images", [
        ...form.getValues("images"),
        `${process.env.NEXT_PUBLIC_CLOUDFRONT}${new URL(url).pathname}`,
      ]);
    }

    handleSubmit(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid-cols-2 gap-4 lg:grid">
        <NoteFormFields
          images={props.images}
          setFiles={setFiles}
        />
        <div className="col-span-2 my-4 flex justify-end">
          <Button
            type="submit"
            isLoading={form.formState.isSubmitting || isPending}
            disabled={isSuccess}
            className="w-full sm:w-[200px]"
            size="lg"
          >
            <NotebookPen className="mr-2 size-4" />
            리뷰 작성
          </Button>
        </div>
      </form>
    </Form>
  );
}

function NoteAddForm() {
  return (
    <NoteForm
      whiskyName=""
      aged=""
      abv=""
      caskTypes={[{
        value: "",
      }]}
      score={0}
      review=""
      nose=""
      noseScore={null}
      palate=""
      palateScore={null}
      finish=""
      finishScore={null}
      images={[]}
    />
  );
}

type Note = typeof noteTable.$inferSelect;
function NoteEditForm({ note, onSubmitted }: { note: Note; onSubmitted?: () => void }) {
  return (
    <NoteForm
      whiskyName={note.whiskyName}
      aged={note.aged}
      abv={note.abv}
      caskTypes={note.caskTypes.map((caskType) => ({ value: caskType }))}
      score={note.score}
      review={note.review}
      nose={note.nose}
      noseScore={note.noseScore ?? null}
      palate={note.palate}
      palateScore={note.palateScore ?? null}
      finish={note.finish}
      finishScore={note.finishScore ?? null}
      images={note.images}
      onSubmitted={onSubmitted}
    />
  );
}

export { NoteAddForm, NoteEditForm };
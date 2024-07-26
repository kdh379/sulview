"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookPen } from "lucide-react";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { noteTable } from "@/db/schema";
import { convertImageToWebP } from "@/lib/upload";
import { customErrorMap } from "@/lib/zod";
import NoteFormFields from "@/components/write/form-field/note-form-fields";
import { useSubmitNote } from "@/hooks/useSubmitNote";

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

interface NoteFormProps {
  initialValues: NoteFormSchemaType;
  onSubmit: (data: NoteFormSchemaType) => void;
  isPending: boolean;
  isSuccess: boolean;
  submitText: string;
}

function NoteForm({
  initialValues,
  isPending,
  isSuccess,
  submitText,
  onSubmit,
}: NoteFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { uploadToS3 } = useS3Upload();
  const form = useForm<NoteFormSchemaType>({
    resolver: zodResolver(NoteFormSchema),
    defaultValues: initialValues,
  });


  const handleSubmit = async () => {
    const images = initialValues.images.filter((image) => files.some((file) => image.includes(file.name)));
    form.setValue("images", images);

    for (const file of files) {
      // 이미 업로드된 파일은 건너뜀.
      if (includesSubString(initialValues.images, file.name)) continue;

      const webP = await convertImageToWebP(file);
      const { url } = await uploadToS3(webP);

      form.setValue("images", [
        ...form.getValues("images"),
        `${process.env.NEXT_PUBLIC_CLOUDFRONT}${new URL(url).pathname}`,
      ]);
    }

    onSubmit(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid-cols-2 gap-4 lg:grid">
        <NoteFormFields
          images={initialValues.images}
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
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function NoteAddForm() {
  const {
    mutate,
    isPending,
    isSuccess,
  } = useSubmitNote({
    isEdit: false,
  });

  const handleSubmit = (data: NoteFormSchemaType) => {
    mutate(data);
  };

  return (
    <NoteForm
      initialValues={{
        whiskyName: "",
        aged: "",
        abv: "",
        caskTypes: [],
        score: 0,
        review: "",
        nose: "",
        noseScore: null,
        palate: "",
        palateScore: null,
        finish: "",
        finishScore: null,
        images: [],
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isSuccess={isSuccess}
      submitText="등록"
    />
  );
}

type Note = typeof noteTable.$inferSelect;
function NoteEditForm({ note }: { note: Note; }) {
  const {
    mutate,
    isPending,
    isSuccess,
  } = useSubmitNote({
    isEdit: true,
  });

  const handleSubmit = (data: NoteFormSchemaType) => {
    mutate({
      ...note,
      ...data,
      id: note.id,
    });
  };

  return (
    <NoteForm
      initialValues={{
        whiskyName: note.whiskyName,
        aged: note.aged,
        abv: note.abv,
        caskTypes: note.caskTypes.map((cask) => ({ value: cask })),
        score: note.score,
        review: note.review,
        nose: note.nose,
        noseScore: note.noseScore === -1 ? null : note.noseScore,
        palate: note.palate,
        palateScore: note.palateScore === -1 ? null : note.palateScore,
        finish: note.finish,
        finishScore: note.finishScore === -1 ? null : note.finishScore,
        images: note.images,
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isSuccess={isSuccess}
      submitText="수정"
    />
  );
}

export { NoteAddForm, NoteEditForm };
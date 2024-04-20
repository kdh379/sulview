ALTER TABLE "distillery" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "whisky" ALTER COLUMN "abv" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "whisky" ALTER COLUMN "age" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "whisky" ALTER COLUMN "caskType" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "review" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "review" ADD COLUMN "images" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "distillery" DROP COLUMN IF EXISTS "country";
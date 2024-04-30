ALTER TABLE "whisky" RENAME COLUMN "caskType" TO "caskTypes";--> statement-breakpoint
ALTER TABLE "whisky" RENAME COLUMN "image" TO "images";--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "whisky" ALTER COLUMN "images" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "whisky" ADD COLUMN "independentDistillery" text NOT NULL;--> statement-breakpoint
ALTER TABLE "whisky" ADD COLUMN "bottled" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "distillery" ADD CONSTRAINT "distillery_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whisky" ADD CONSTRAINT "whisky_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

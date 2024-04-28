ALTER TABLE "review" DROP CONSTRAINT "review_userId_user_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "review_id_whiskyId_userId_pk";--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_id_whiskyId_createdBy_pk" PRIMARY KEY("id","whiskyId","createdBy");--> statement-breakpoint
ALTER TABLE "distillery" ADD COLUMN "images" text[] NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "review" ("createdBy");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "review" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "review" DROP COLUMN IF EXISTS "userName";--> statement-breakpoint
ALTER TABLE "review" DROP COLUMN IF EXISTS "password";
CREATE TABLE IF NOT EXISTS "distillery" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"region" text NOT NULL,
	"country" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"createdBy" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"id" text PRIMARY KEY NOT NULL,
	"whiskyId" text NOT NULL,
	"userId" text NOT NULL,
	"userName" text NOT NULL,
	"password" text NOT NULL,
	"score" integer NOT NULL,
	"nose" text NOT NULL,
	"noseScore" integer NOT NULL,
	"palate" text NOT NULL,
	"palateScore" integer NOT NULL,
	"finish" text NOT NULL,
	"finishScore" integer NOT NULL,
	"createdAt" timestamp NOT NULL,
	"createdBy" text NOT NULL,
	CONSTRAINT "review_whiskyId_userId_pk" PRIMARY KEY("whiskyId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whisky" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"distilleryId" text NOT NULL,
	"bottler" text NOT NULL,
	"abv" integer NOT NULL,
	"age" integer NOT NULL,
	"caskType" text NOT NULL,
	"caskNumber" text NOT NULL,
	"image" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"createdBy" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "whisky_idx" ON "review" ("whiskyId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "review" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "distillery_idx" ON "whisky" ("distilleryId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "whisky" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_whiskyId_whisky_id_fk" FOREIGN KEY ("whiskyId") REFERENCES "whisky"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whisky" ADD CONSTRAINT "whisky_distilleryId_distillery_id_fk" FOREIGN KEY ("distilleryId") REFERENCES "distillery"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

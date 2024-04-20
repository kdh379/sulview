CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "distillery" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"region" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"createdBy" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"id" serial NOT NULL,
	"whiskyId" integer NOT NULL,
	"userId" text NOT NULL,
	"userName" text NOT NULL,
	"password" text NOT NULL,
	"images" text[] NOT NULL,
	"score" integer NOT NULL,
	"nose" text NOT NULL,
	"noseScore" integer NOT NULL,
	"palate" text NOT NULL,
	"palateScore" integer NOT NULL,
	"finish" text NOT NULL,
	"finishScore" integer NOT NULL,
	"createdAt" timestamp NOT NULL,
	"createdBy" text NOT NULL,
	CONSTRAINT "review_id_whiskyId_userId_pk" PRIMARY KEY("id","whiskyId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whisky" (
	"id" serial PRIMARY KEY NOT NULL,
	"distilleryId" integer NOT NULL,
	"name" text NOT NULL,
	"bottler" text NOT NULL,
	"abv" text NOT NULL,
	"age" text NOT NULL,
	"caskType" text[] NOT NULL,
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
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whisky" ADD CONSTRAINT "whisky_distilleryId_distillery_id_fk" FOREIGN KEY ("distilleryId") REFERENCES "distillery"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

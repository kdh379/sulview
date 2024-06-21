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
	"images" text[] NOT NULL,
	"createdAt" timestamp NOT NULL,
	"createdBy" text NOT NULL,
	CONSTRAINT "distillery_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "note" (
	"id" serial NOT NULL,
	"whiskyName" text NOT NULL,
	"abv" text NOT NULL,
	"caskTypes" text[] NOT NULL,
	"age" text NOT NULL,
	"images" text[] NOT NULL,
	"score" integer NOT NULL,
	"content" text NOT NULL,
	"nose" text NOT NULL,
	"noseScore" integer NOT NULL,
	"palate" text NOT NULL,
	"palateScore" integer NOT NULL,
	"finish" text NOT NULL,
	"finishScore" integer NOT NULL,
	"embedding" vector(1536) NOT NULL,
	"createdAt" timestamp NOT NULL,
	"createdBy" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"id" serial NOT NULL,
	"whiskyId" integer NOT NULL,
	"createdBy" text NOT NULL,
	"images" text[] NOT NULL,
	"score" integer NOT NULL,
	"content" text NOT NULL,
	"nose" text NOT NULL,
	"noseScore" integer NOT NULL,
	"palate" text NOT NULL,
	"palateScore" integer NOT NULL,
	"finish" text NOT NULL,
	"finishScore" integer NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "review_id_whiskyId_createdBy_pk" PRIMARY KEY("id","whiskyId","createdBy")
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
	"role" text DEFAULT 'user' NOT NULL,
	"image" text,
	CONSTRAINT "user_name_unique" UNIQUE("name"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
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
	"createdBy" text NOT NULL,
	"name" text NOT NULL,
	"bottler" text NOT NULL,
	"abv" text NOT NULL,
	"independentDistillery" text NOT NULL,
	"age" text NOT NULL,
	"caskTypes" text[] NOT NULL,
	"caskNumber" text NOT NULL,
	"bottled" text NOT NULL,
	"images" text[] NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "distillery" ADD CONSTRAINT "distillery_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_whiskyId_whisky_id_fk" FOREIGN KEY ("whiskyId") REFERENCES "public"."whisky"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whisky" ADD CONSTRAINT "whisky_distilleryId_distillery_id_fk" FOREIGN KEY ("distilleryId") REFERENCES "public"."distillery"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whisky" ADD CONSTRAINT "whisky_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "note" USING btree ("createdBy");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "embedding_idx" ON "note" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "distillery_idx" ON "whisky" USING btree ("distilleryId");
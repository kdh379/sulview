import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name").unique(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const distilleryTable = pgTable("distillery", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  region: text("region").notNull(),
  images: text("images").array().notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  createdBy: text("createdBy").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const whiskyTable = pgTable(
  "whisky",
  {
    id: serial("id").primaryKey(),
    distilleryId: integer("distilleryId").notNull().references(() => distilleryTable.id, { onDelete: "cascade" }),
    createdBy: text("createdBy").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    bottler: text("bottler").notNull(),
    abv: text("abv").notNull(),
    independentDistillery: text("independentDistillery").notNull(),
    aged: text("age").notNull(),
    caskTypes: text("caskTypes").array().notNull(),
    caskNumber: text("caskNumber").notNull(),
    bottled: text("bottled").notNull(),
    images: text("images").array().notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  },
  (whisky) => ({
    distilleryIdx: index("distillery_idx").on(whisky.distilleryId),
  })
);

export const reviewTable = pgTable(
  "review",
  {
    id: serial("id"),
    whiskyId: integer("whiskyId").notNull().references(() => whiskyTable.id, { onDelete: "cascade" }),
    createdBy: text("createdBy").notNull().references(() => users.id, { onDelete: "cascade" }),
    images: text("images").array().notNull(),
    score: integer("score").notNull(),
    nose: text("nose").notNull(),
    noseScore: integer("noseScore").notNull(),
    palate: text("palate").notNull(),
    palateScore: integer("palateScore").notNull(),
    finish: text("finish").notNull(),
    finishScore: integer("finishScore").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  },
  (review) => ({
    compoundKey: primaryKey({ columns: [review.id, review.whiskyId, review.createdBy] }),
    whiskyIdx: index("whisky_idx").on(review.whiskyId),
    createdByIdx: index("user_idx").on(review.createdBy),
  })
);
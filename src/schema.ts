import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
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

export const distillery = pgTable("distillery", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  country: text("country").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  createdBy: text("createdBy").notNull(),
});

export const whisky = pgTable(
  "whisky",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    distilleryId: text("distilleryId").notNull().references(() => distillery.id, { onDelete: "cascade" }),
    bottler: text("bottler").notNull(),
    abv: integer("abv").notNull(),
    age: integer("age").notNull(),
    caskType: text("caskType").notNull(),
    caskNumber: text("caskNumber").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    createdBy: text("createdBy").notNull(),
  },
  (whisky) => ({
    distilleryIdx: index("distillery_idx").on(whisky.distilleryId),
    nameIdx: index("name_idx").on(whisky.name),
  })
);

export const review = pgTable(
  "review",
  {
    whiskyId: text("whiskyId").notNull().references(() => whisky.id, { onDelete: "cascade" }),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    userName: text("userName").notNull(),
    password: text("password").notNull(),
    score: integer("score").notNull(),
    nose: text("nose").notNull(),
    noseScore: integer("noseScore").notNull(),
    palate: text("palate").notNull(),
    palateScore: integer("palateScore").notNull(),
    finish: text("finish").notNull(),
    finishScore: integer("finishScore").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    createdBy: text("createdBy").notNull(),
  },
  (review) => ({
    compoundKey: primaryKey({ columns: [review.whiskyId, review.userId] }),
    whiskyIdx: index("whisky_idx").on(review.whiskyId),
    userIdx: index("user_idx").on(review.userId),
  })
);
// TODO - userId가 없으면 password를 사용하여 수정, 삭제 가능. client에서 변조할 수도 있으므로 저장 시 server에서 검증 필요
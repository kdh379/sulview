import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import Nodemailer from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";

import { html } from "@/components/template/nodemailer";
import { db } from "@/db/drizzle";

import { siteConfig } from "./config/site";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      name: siteConfig.name,
      async sendVerificationRequest(params) {
        const { identifier, url, provider } = params;
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: `${siteConfig.name} <${provider.from}>`,
          subject: `${siteConfig.name} 로그인`,
          html: html({ url, name: identifier.split("@")[0] }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`(${failed.join(", ")}) 이메일 전송에 실패했습니다`);
        }
      },
    }),
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ...profile };
      },
    }),
    Naver({
      profile(profile) {
        return { role: profile.role ?? "user", ...profile };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verifyRequest=1",
  },
  secret: process.env.AUTH_SECRET,
});

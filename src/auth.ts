import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";

import { html } from "@/components/template/nodemailer";
import { db } from "@/core/db";

import { siteConfig } from "./config/site";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
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
  ],
  callbacks: {
    async session({ session, user }) {
      
      session.userId = user.id;
      session.user.name = !user.name ? user.email.split("@")[0] : user.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verifyRequest=1",
  },
  secret: process.env.AUTH_SECRET,
});
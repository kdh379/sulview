import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { auth } from "@/auth";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "술뷰",
  description: "위스키 리뷰 사이트",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ko">
      <body className={cn(pretendard.className, "antialiased transition ease-in-out")}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

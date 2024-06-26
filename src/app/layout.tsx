import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";

import NicknameFormDialog from "@/components/layout/nickname-form-dialog";
import Sidebar from "@/components/layout/sidebar";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import MobileHeader from "@/components/layout/mobile-header";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
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
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(pretendard.className, "min-h-screen antialiased transition ease-in-out")}>
        <NextTopLoader color="hsla(221.2 83.2% 53.3%)" />
        <Providers>
          <MobileHeader />
          <Sidebar />
          <main className="md:ml-sidebar px-2 py-6 md:px-4">{children}</main>
          <Toaster />
          <NicknameFormDialog open={user && user.name === null ? true : false} />
        </Providers>
      </body>
    </html>
  );
}

import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import AppHeader from "@/components/layout/app-header";
import Footer from "@/components/layout/footer";
import NicknameFormDialog from "@/components/layout/nickname-form-dialog";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";

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
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(pretendard.className, "antialiased transition ease-in-out")}>
        <Providers>
          <div className="border-border flex min-h-screen flex-col border-b">
            <AppHeader />
            <div className="container flex-1 py-6">
              {children}
            </div>
          </div>
          <Footer />
          <Toaster />
          <NicknameFormDialog open={user && user.name === null ? true : false} />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import React from "react";
import ClientContext from "@/components/ClientContext";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

/*
 * 元数据此前是 create-next-app 的占位：title "one piece"、description "write something..."，
 * 没有 metadataBase、没有 openGraph —— 分享出去的链接是一张空白卡片，陌生人拿不到任何身份信息。
 * 现在所有文案与地址都取自 lib/site.ts，一处改全站生效。
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // 子页只需要写自己的名字（"文章" / "碎碎念"），站名在这里统一补。
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "zh_CN",
    url: "/",
    images: [{ url: OG_IMAGE, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  // 只在根上声明 RSS 的发现链接；刻意不设 canonical —— 写在 layout 里的 canonical 会被所有页面继承，
  // 等于让每个页面都自称是首页。
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="zh-cn">
    <body className="h-full markdown-body">
      <ClientContext>
        <SiteHeader />
        {children}
        <SiteFooter />
      </ClientContext>
    </body>
  </html>
);
export default RootLayout;

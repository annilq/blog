import type { Metadata } from "next";
import React from "react";
import ClientContext from "@/components/ClientContext";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "one piece",
  description: "write something...",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="zh-cn">
    <body className="h-full text-foreground bg-background transition-all text-sm markdown-body">
      <ClientContext>
        <SiteHeader />
        {children}
      </ClientContext>
    </body>
  </html>
);
export default RootLayout;

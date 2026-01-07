import type { Metadata } from "next";
import React from "react";
import ClientContext from "@/components/ClientContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "one piece",
  description: "write something...",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, params }) => (
  <html lang="zh-cn">
    <body className="h-full text-foreground bg-background transition-all text-sm markdown-body">
      <ClientContext>
        {children}
      </ClientContext>
    </body>
  </html>
);
export default RootLayout;

import type { Metadata } from "next";
import React, { PropsWithChildren } from "react";
import ClientContext from "@/components/ClientContext";
import Layout from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "one piece",
  description: "write something...",
};

const RootLayout: React.ComponentType<PropsWithChildren> = ({ children }) => (
  <html lang="zh-cn">
    <body className="h-full text-foreground bg-background container max-w-4xl transition-all mx-auto px-10">
      <ClientContext>
        <Layout>
          {children}
        </Layout>
      </ClientContext>
    </body>
  </html>
);
export default RootLayout;

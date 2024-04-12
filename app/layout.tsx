import type { Metadata } from "next";
import React, { PropsWithChildren } from "react";
import ClientContext from "@/components/ClientContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "one piece",
  description: "write something...",
};

const RootLayout: React.ComponentType<PropsWithChildren> = ({ children }) => (
  <html lang="zh-cn">
    <body className="h-full text-foreground bg-background transition-all">
      <ClientContext>
        {children}
      </ClientContext>
    </body>
  </html>
);
export default RootLayout;

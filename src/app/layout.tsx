import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quote tier",
  description: "A quote tier",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: dancingScript.style.fontFamily,
        },
      }}
    >
      <html lang="en">
        <body
          className={`${dancingScript.className} flex min-h-screen flex-col`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ConfigProvider>
  );
}

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { App, ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Caudex } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const font = Caudex({ weight: "400", subsets: ["latin"] });

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
          fontFamily: font.style.fontFamily,
        },
      }}
    >
      <html lang="en">
        <body className={`${font.className} flex min-h-screen flex-col`}>
          <App>
            <Header />
            <main className="mx-auto flex w-2/3 flex-1 justify-center">
              {children}
            </main>
            <Footer />
          </App>
        </body>
      </html>
    </ConfigProvider>
  );
}

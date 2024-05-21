import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Add a quote",
  description: "Add a quote",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="mx-auto w-5/6 flex-1">{children}</main>;
}

import type { Metadata } from "next";
import "./globals.scss";
import React from "react";

export const metadata: Metadata = {
  title: "Wedding App",
  description: "Sam-Mel Wedding App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

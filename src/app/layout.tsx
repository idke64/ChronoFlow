import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "ChronoFlow",
  description: "etc",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"], // Choose the appropriate weights you're using
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

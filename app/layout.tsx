import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Suspense } from "react";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Transkin - Transport Business Management",
  description:
    "Your entire transport business, simplified. Manage vehicles, drivers, contracts, and finances with one powerful app.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`py-20 font-sans ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/kinshasa-transport-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-900/95" />

        <Header />
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}

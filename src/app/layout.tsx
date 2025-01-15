import Header from "@/components/Header";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Luxe Bites",
  description: "Luxe Bites is a luxury food delivery service.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className={"container mx-auto p-2"}>
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

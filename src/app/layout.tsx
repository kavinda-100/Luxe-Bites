import { ThemeProvider } from "@/Providers/ThemeProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import React from "react";

// providers
import TanstackProvider from "../Providers/TanstackProvider";
import { AuthProvider } from "../Providers/AuthProvider";

// shadcn components
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Luxe Bites",
  description: "Luxe Bites is a luxury food delivery service.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
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
            <TanstackProvider>
              {children}
              <Toaster />
            </TanstackProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}

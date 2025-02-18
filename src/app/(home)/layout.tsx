import React from "react";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={"container mx-auto p-2"}>
      <Header />
      {children}
    </main>
  );
}

import React from "react";
import Header from "@/components/Header";
import Footer from "../../components/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={"container mx-auto p-2"}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}

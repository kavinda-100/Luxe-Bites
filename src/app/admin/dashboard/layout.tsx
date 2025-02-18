import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className={"container mx-auto p-2"}>{children}</main>;
}

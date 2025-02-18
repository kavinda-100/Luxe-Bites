"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanstackProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
export default TanstackProvider;

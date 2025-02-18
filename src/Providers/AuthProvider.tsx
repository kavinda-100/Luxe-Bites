"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <KindeProvider>{children}</KindeProvider>;
};

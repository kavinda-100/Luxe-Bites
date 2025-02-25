"use client";

import { useMutation } from "@tanstack/react-query";
import { getUserByEmail } from "../../../actions/users";
import { toast } from "sonner";
import React from "react";
import type { Role } from "@prisma/client";

type userType = {
  id: string;
  kindUserId: string;
  email: string;
  name: string | null;
  profilePicture: string | null;
  role: Role;
  banned: boolean;
  bannedAt: Date | null;
  bannedReason: string | null;
  createdAt: Date;
};

export const useGetUserByEmail = () => {
  const [user, setUser] = React.useState<userType | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => getUserByEmail(email),
    onSuccess: (data) => {
      console.log(data);
      setUser(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    userMutate: mutate,
    isUserLoading: isPending,
    user,
  };
};

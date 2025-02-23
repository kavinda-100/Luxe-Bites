"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../actions/users";

export const useGetAllUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { data, isLoading, error };
};

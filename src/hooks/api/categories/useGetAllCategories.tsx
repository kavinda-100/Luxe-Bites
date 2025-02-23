"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../actions/categoryAction";

export const useGetAllCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return {
    data,
    isLoading,
    error,
  };
};

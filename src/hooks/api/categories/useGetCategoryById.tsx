"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../../actions/categoryAction";

export const useGetCategoryById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => getCategoryById(id),
  });

  return { data, isLoading, error };
};

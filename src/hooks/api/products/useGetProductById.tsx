"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../actions/products";

export const useGetProductById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => getProductById(id),
  });

  return { data, isLoading, error };
};

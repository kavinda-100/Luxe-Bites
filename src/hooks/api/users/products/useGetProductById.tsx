"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../../actions/users/products";

export function useGetProductById(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => getProductById({ id }),
  });

  return {
    ProductData: data,
    isProductDataLoading: isLoading,
    isProductDataError: error,
  };
}

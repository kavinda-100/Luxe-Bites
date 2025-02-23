"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../../actions/products";

export const useGetAllProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { data, isLoading, error };
};

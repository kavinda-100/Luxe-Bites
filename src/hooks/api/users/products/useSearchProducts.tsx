"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProductsByName } from "../../../../actions/users/products";
import React from "react";

export const useSearchProducts = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchProductsByName", { searchTerm }],
    queryFn: async () => searchProductsByName({ searchTerm }),
  });

  return {
    searchProducts: data,
    isSearchLoading: isLoading,
    searchError: error,
    setSearchTerm,
  };
};

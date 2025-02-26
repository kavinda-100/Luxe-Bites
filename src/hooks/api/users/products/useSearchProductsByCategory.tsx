"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProductsByCategory } from "../../../../actions/users/products";

export const useSearchProductsByCategory = () => {
  const [categoryName, setCategoryName] = React.useState<string | null>(null);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchProductsByCategory", categoryName],
    queryFn: async ({ pageParam }) =>
      searchProductsByCategory({ categoryName, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log("lastPage", lastPage);
      // console.log("allPages", allPages);
      return lastPage?.data.products.length > 0
        ? allPages.length + 1
        : undefined;
    },
  });
  //* This is how map function should be used in "infiniteQuery" its map function inside a map function
  //* console.log(data?.pages.map((page) => page?.data?.data.map((post: PostType) => post.title)));

  return {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setCategoryName,
  };
};

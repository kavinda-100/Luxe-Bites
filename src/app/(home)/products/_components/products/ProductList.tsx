"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { useCategorySelectStore } from "../../../../../store/useCategorySelectStore";
import { useSearchProductsByCategory } from "../../../../../hooks/api/users/products/useSearchProductsByCategory";
import { Skeleton } from "../../../../../components/ui/skeleton";

const ProductList = () => {
  const { ref, inView } = useInView();
  const { selectedCategory } = useCategorySelectStore();
  // get products based on selected category
  const {
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    status,
    setCategoryName,
  } = useSearchProductsByCategory();

  React.useEffect(() => {
    setCategoryName(selectedCategory);
  }, [selectedCategory, setCategoryName]);

  React.useEffect(() => {
    const fetchNext = async () => {
      if (inView && hasNextPage) {
        await fetchNextPage();
      }
    };
    void fetchNext();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section className={"container mx-auto"}>
      {status === "pending" && (
        <div className={"h-auto w-full p-2"}>
          <p>Loading...</p>
        </div>
      )}
      {status === "error" && (
        <div className={"h-auto w-full p-2"}>
          <p>Error: {error?.message}</p>
        </div>
      )}
      {status === "success" &&
        data?.pages.map((page) => {
          return page.data.products.map((product) => (
            <p key={product.id}>{product.name}</p>
          ));
        })}

      <ProductCardSkeleton />

      {isFetchingNextPage && (
        <div className={"h-auto w-full p-2"}>
          <p>Loading...</p>
        </div>
      )}
      {hasNextPage && <div ref={ref} />}
    </section>
  );
};
export default ProductList;

const ProductCardSkeleton = () => {
  return (
    <div className="grid h-auto w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className={"h-[300px] w-full"} />
      ))}
    </div>
  );
};

"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { useCategorySelectStore } from "../../../../../store/useCategorySelectStore";
import { useSearchProductsByCategory } from "../../../../../hooks/api/users/products/useSearchProductsByCategory";
import { ProductCardSkeleton } from "../../../../../components/ProductCardSkeleton";
import ProductCard from "./ProductCard";
import Image from "next/image";

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

  const noProductsFound =
    status === "success" && data?.pages[0]?.data.products.length === 0;

  return (
    <section className={"container mx-auto"}>
      {status === "pending" && <ProductCardSkeleton length={6} />}
      {status === "error" && (
        <div className={"h-auto w-full p-2"}>
          <p>Error: {error?.message}</p>
        </div>
      )}
      {noProductsFound && (
        <div
          className={
            "container mx-auto flex h-fit w-full flex-col items-center justify-center gap-2"
          }
        >
          <p className={"animate-bounce text-center font-semibold"}>
            Ops! No products found
          </p>
          <Image
            src={"/animations/Cooking.gif"}
            alt={"no products found"}
            width={300}
            height={300}
          />
        </div>
      )}
      <div
        className={
          "container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {status === "success" &&
          data?.pages.map((page) => {
            return page.data.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                description={product.description}
                price={product.price}
                discount={product.discount}
                stock={product.stock}
                reviews={product.reviews}
                wishlists={product.wishlists}
              />
            ));
          })}
      </div>

      {isFetchingNextPage && <ProductCardSkeleton length={3} />}
      {hasNextPage && <div ref={ref} />}
    </section>
  );
};
export default ProductList;

"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getWishList } from "../../../actions/users/products/wishList";
import { ProductCardSkeleton } from "../../../components/ProductCardSkeleton";
import Image from "next/image";
import ProductCard from "../products/_components/products/ProductCard";

const WishListPage = () => {
  const { ref, inView } = useInView();
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["wishList"],
    queryFn: async ({ pageParam }) => getWishList({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log("lastPage", lastPage);
      // console.log("allPages", allPages);
      return lastPage?.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  React.useEffect(() => {
    const fetchNext = async () => {
      if (inView && hasNextPage) {
        await fetchNextPage();
      }
    };
    void fetchNext();
  }, [inView, hasNextPage, fetchNextPage]);

  const noProductsFound = status === "success" && data?.pages[0]?.length === 0;

  if (status === "pending") {
    return <ProductCardSkeleton length={6} />;
  }

  if (status === "error") {
    return (
      <section className={"container mx-auto text-center text-red-500"}>
        Error: {error.name}
      </section>
    );
  }

  return (
    <section className={"container mx-auto"}>
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
      <div className={"grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"}>
        {status === "success" &&
          data?.pages.map((page) => {
            return page.map((product) => (
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
export default WishListPage;

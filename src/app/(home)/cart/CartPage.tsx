"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../../actions/users/products/cart";
import { ProductCardSkeleton } from "../../../components/ProductCardSkeleton";
import Image from "next/image";

const CartPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
  });

  const isNoItems = data?.cartItems.length === 0;

  if (isLoading) {
    return <ProductCardSkeleton length={6} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className={"container mx-auto"}>
      {isNoItems ? (
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
      ) : (
        <div>Cart items</div>
      )}
    </section>
  );
};
export default CartPage;

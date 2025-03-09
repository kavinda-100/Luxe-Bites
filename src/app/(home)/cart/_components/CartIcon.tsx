"use client";

import React from "react";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCartItemsCount } from "../../../../actions/users/products/cart";
import { cn } from "../../../../lib/utils";

const CartIcon = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart-count"],
    queryFn: getCartItemsCount,
  });

  console.log({ error: error });

  return (
    <div className={"relative"}>
      {isLoading ? (
        <Loader2 className={"size-5 animate-spin"} />
      ) : (
        <>
          <Link href={"/cart"}>
            <ShoppingCartIcon className={"size-5"} />
          </Link>
          <span
            className={cn(
              "absolute -right-2 -top-2 rounded-full px-0.5 py-0.5 text-xs",
              {
                "font-bold text-red-500": data?.count != 0,
              },
            )}
          >
            {data?.count ?? 0}
          </span>
        </>
      )}
    </div>
  );
};
export default CartIcon;

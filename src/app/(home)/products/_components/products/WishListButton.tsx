"use client";

import React from "react";
import { useAddRemoveFromWishList } from "../../../../../hooks/api/products/useAddRemoveFromWishList";
import { HeartIcon, Loader2 } from "lucide-react";
import { cn } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { toast } from "sonner";

type WishListButtonProps = {
  id: string;
  wishlists: { productId: string; id: string }[];
  className?: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

const WishListButton = ({
  id,
  wishlists,
  className,
  variant,
}: WishListButtonProps) => {
  const { wishListMutate, isWisListIsPending, isWishListError, setProductId } =
    useAddRemoveFromWishList();

  if (isWishListError) {
    toast.error(isWishListError.message);
  }

  const handleAddToWishList = () => {
    setProductId(id);
    wishListMutate();
  };
  const isProductInWishList =
    wishlists?.some((p) => p.productId === id) ?? false;

  return (
    <Button
      onClick={handleAddToWishList}
      variant={variant}
      className={cn("max-w-[150px]", className)}
      disabled={isWisListIsPending}
    >
      {isWisListIsPending ? (
        <Loader2 className={"size-6 animate-spin"} />
      ) : (
        <HeartIcon
          className={cn("size-6", {
            "fill-red-500 text-red-500": isProductInWishList,
          })}
        />
      )}
    </Button>
  );
};
export default WishListButton;

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrRemoveFromWishList } from "../../../actions/users/products/wishList";
import { toast } from "sonner";
import React from "react";

export function useAddRemoveFromWishList() {
  const queryClient = useQueryClient();
  const [productId, setProductId] = React.useState<string>("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => addOrRemoveFromWishList({ productId }),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["product", productId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["searchProductsByCategory"],
        });
        //TODO: Revalidate the wishlist
      }
    },
    onError: (e) => {
      console.log("Error in useAddRemoveFromWishList", e);
      toast.error(e.message);
    },
  });

  return {
    wishListMutate: mutate,
    isWisListIsPending: isPending,
    isWishListError: error,
    setProductId,
  };
}

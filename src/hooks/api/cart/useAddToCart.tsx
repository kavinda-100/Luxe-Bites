"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../../actions/users/products/cart";
import { toast } from "sonner";

export function useAddToCart() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) =>
      addToCart({
        productId,
        quantity,
      }),
    onSuccess: async (s) => {
      if (s.success) {
        toast.success("Product added to cart");
        await queryClient.invalidateQueries({ queryKey: ["cart-count"] }); //TODO: fix this - cart-count
        await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return {
    addToCartMutate: mutate,
    addToCartIsPending: isPending,
  };
}

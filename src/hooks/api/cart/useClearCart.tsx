"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../../../actions/users/products/cart";
import { toast } from "sonner";

export function useClearCart() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => clearCart(),
    onSuccess: async (res) => {
      if (res.success) {
        toast.success(res.message);
        await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    clearCartMutate: mutate,
    isClearCartPending: isPending,
  };
}

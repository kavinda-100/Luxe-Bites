"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProducts } from "../../../actions/products";
import { toast } from "sonner";

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (ids: string | string[]) => deleteProducts(ids),
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error deleting products: ", error);
      toast.error(error.message);
    },
  });

  return { deleteProductsMutate: mutate, isDeleteProductsPending: isPending };
};

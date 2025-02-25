"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategories } from "../../../actions/categoryAction";
import { toast } from "sonner";

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (ids: string | string[]) => deleteCategories(ids),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};

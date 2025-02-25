"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdvertisements } from "../../../actions/advertisementsAction";
import { toast } from "sonner";

export const useDeleteAdvertisements = () => {
  // query client
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (ids: string | string[]) => deleteAdvertisements(ids),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("Error deleting advertisements", error);
    },
  });

  return {
    deleteAdvertisements: mutate,
    isDeleteAdvertisementsPending: isPending,
  };
};

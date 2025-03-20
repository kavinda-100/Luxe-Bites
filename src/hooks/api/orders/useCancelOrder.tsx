"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelOrder } from "../../../actions/orders";
import { toast } from "sonner";

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      orderId,
      cancelReason,
      cancelBy,
    }: {
      orderId: string;
      cancelReason: string;
      cancelBy: "Admin" | "User";
    }) => CancelOrder({ orderId, cancelReason, cancelBy }),
    onSuccess: async (res, variables) => {
      if (res.success) {
        toast.success(res.message);
        await queryClient.invalidateQueries({
          queryKey: ["orders", "order", variables.orderId],
        });
      }
    },
    onError: (e) => {
      console.log("Error in useCancelOrder", e);
      toast.error(e.message);
    },
  });

  return { mutate, isPending };
}

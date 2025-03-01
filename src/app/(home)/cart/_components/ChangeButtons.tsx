"use client";

import React from "react";
import { Button } from "../../../../components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItemQuantity } from "../../../../actions/users/products/cart";
import { toast } from "sonner";

type CartItemProps = {
  id: string;
  quantity: number;
};

export const ChangeButtons = ({ id, quantity }: CartItemProps) => {
  const [quantityValue, setQuantityValue] = React.useState(quantity);
  const debouncedQuantity = useDebounce(quantityValue, 1000);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      cartItemId,
      newQuantity,
    }: {
      cartItemId: string;
      newQuantity: number;
    }) => updateCartItemQuantity({ cartItemId, newQuantity }),
    onSuccess: async (r) => {
      if (r.success) {
        console.log("Successfully updated cart item quantity");
        toast.success("Successfully updated cart item quantity");
        await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      }
    },
    onError: (e) => {
      console.log("Error updating cart item quantity", e);
      toast.error(e.message);
    },
  });

  React.useEffect(() => {
    if (debouncedQuantity !== quantity) {
      mutate({ cartItemId: id, newQuantity: debouncedQuantity });
    }
  }, [debouncedQuantity, id, mutate, quantity]);

  const handleIncrement = async () => {
    const newQuantity = quantityValue + 1;
    setQuantityValue(newQuantity);
  };

  const handleDecrement = async () => {
    if (quantityValue > 1) {
      const newQuantity = quantityValue - 1;
      setQuantityValue(newQuantity);
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={handleIncrement}
        disabled={isPending}
      >
        <PlusIcon className={"size-4"} />
      </Button>
      <Button variant={"ghost"} size={"sm"}>
        {quantityValue}
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={handleDecrement}
        disabled={isPending}
      >
        <MinusIcon className={"size-4"} />
      </Button>
    </>
  );
};

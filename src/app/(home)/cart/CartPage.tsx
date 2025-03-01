"use client";

import React from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  clearCart,
  getCartItems,
  removeCartItem,
} from "../../../actions/users/products/cart";
import { ChangeButtons } from "./_components/ChangeButtons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Loader2, TrashIcon } from "lucide-react";
import { formatCurrency } from "../../../lib/utils";
import { Skeleton } from "../../../components/ui/skeleton";
import { toast } from "sonner";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const CartPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
  });

  const isNoItems = data?.cartItems.length === 0;

  if (isLoading) {
    return <Skeleton className={"container mx-auto min-h-screen w-full"} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const total = data?.cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const totalDiscount = data?.cartItems.reduce((acc, item) => {
    return acc + (item.product.discount ?? 0);
  }, 0);

  return (
    <section className={"container mx-auto"}>
      <section className={"mt-10 flex flex-col gap-10 lg:flex-row"}>
        <section className={"w-full"}>
          {isNoItems ? (
            <div
              className={
                "container mx-auto flex h-fit w-full flex-col items-center justify-center gap-2"
              }
            >
              <p className={"animate-bounce text-center font-semibold"}>
                Ops! No products found
              </p>
              <Image
                src={"/animations/Cooking.gif"}
                alt={"no products found"}
                width={300}
                height={300}
              />
            </div>
          ) : (
            <>
              <div className={"flex flex-col gap-3"}>
                <Table>
                  <TableCaption>
                    Your cart contains {data?.cartItems.length} items
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Number</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Discount</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.cartItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage
                              src={item.product.image}
                              alt={item.product.name}
                            />
                            <AvatarFallback>
                              {item.product.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.product.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.product.discount ?? 0)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.product.price * item.quantity)}
                        </TableCell>
                        <TableCell className="text-right">
                          <ChangeButtons
                            id={item.id}
                            quantity={item.quantity}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <DeleteCartItem Id={item.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={7}>Total</TableCell>
                      <TableCell className="text-md text-right font-bold">
                        {formatCurrency(total ?? 0)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </>
          )}
        </section>
        {/*  separate component */}
        <section className={"min-w-[300px]"}>
          <CheckOutSection
            totalItems={data?.cartItems.length ?? 0}
            totalPrice={total ?? 0}
            totalDiscount={totalDiscount ?? 0}
          />
        </section>
      </section>
    </section>
  );
};
export default CartPage;

// cart item delete component
function DeleteCartItem({ Id }: { Id: string }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: string }) =>
      removeCartItem({ cartItemId }),
    onSuccess: async (r) => {
      if (r.success) {
        toast.success(r.message);
        await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      }
    },
    onError: (e) => {
      toast.error(e.message);
      console.log("Error removing cart item", e);
    },
  });

  const handleRemoveCartItem = (cartItemId: string) => {
    mutate({ cartItemId });
  };

  return (
    <>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => handleRemoveCartItem(Id)}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className={"size-4 animate-spin text-red-500"} />
        ) : (
          <TrashIcon className={"size-4 text-red-500"} />
        )}
      </Button>
    </>
  );
}

// checkout section component
function CheckOutSection({
  totalItems,
  totalPrice,
  totalDiscount,
}: {
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
}) {
  const queryClient = useQueryClient();

  const { mutate: clearMutation, isPending: isClearCartPending } = useMutation({
    mutationFn: () => clearCart(),
    onSuccess: async (r) => {
      if (r.success) {
        toast.success(r.message);
        await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <section className={"w-full p-2"}>
      <div className={"flex flex-col gap-4"}>
        <h1 className={"flex items-center gap-2 text-xl font-bold"}>
          <IoBagCheckOutline className={"size-5 text-green-500"} />
          Check Out
        </h1>
        <div className={"flex justify-between"}>
          <p className={"text-md font-semibold text-muted-foreground"}>
            Total Items
          </p>
          <p className={"text-md font-semibold"}>{totalItems}</p>
        </div>
        <div className={"flex justify-between"}>
          <p className={"text-md font-semibold text-muted-foreground"}>
            Total Discount
          </p>
          <p className={"text-md font-semibold"}>
            {formatCurrency(totalDiscount)}
          </p>
        </div>
        <div className={"flex justify-between"}>
          <p className={"text-md font-semibold text-muted-foreground"}>
            Total Price
          </p>
          <p className={"text-md font-semibold"}>
            {formatCurrency(totalPrice)}
          </p>
        </div>
      </div>
      <div className={"mt-6 flex flex-col gap-3"}>
        <Button>
          <MdOutlineShoppingCartCheckout className={"size-4"} />
          Check Out
        </Button>
        <Button
          variant={"outline"}
          className={"text-red-500"}
          onClick={() => clearMutation()}
          disabled={isClearCartPending}
        >
          {isClearCartPending ? (
            <Loader2 className={"size-4 animate-spin text-red-500"} />
          ) : (
            <>
              <TrashIcon className={"size-4 text-red-500"} />
              Clear Cart
            </>
          )}
        </Button>
      </div>
    </section>
  );
}

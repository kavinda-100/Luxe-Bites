"use client";

import React from "react";
import Image from "next/image";
import { buttonVariants } from "../../../../../components/ui/button";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../../../../../lib/utils";
import { useClearCart } from "../../../../../hooks/api/cart/useClearCart";

const SuccessPage = () => {
  const { clearCartMutate } = useClearCart();

  React.useEffect(() => {
    clearCartMutate();
  }, [clearCartMutate]);

  return (
    <section
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center"
      }
    >
      <div className={"flex flex-col gap-3"}>
        <Image
          src={"/animations/delivery-Boy.gif"}
          alt={"delivery-Boy"}
          width={400}
          height={200}
        />
        <div className={"flex w-full items-center justify-center gap-3"}>
          <CheckCircleIcon className={"size-4 text-green-500"} />
          <p className={"font-semibold"}>
            Your order has been placed successfully
          </p>
        </div>
        <Link href={"/orders"} className={cn(buttonVariants())}>
          See the order
          <ArrowRightIcon className={"size-4"} />
        </Link>
      </div>
    </section>
  );
};
export default SuccessPage;

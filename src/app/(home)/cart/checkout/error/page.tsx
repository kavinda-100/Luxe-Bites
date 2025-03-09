import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { MdErrorOutline } from "react-icons/md";
import { buttonVariants } from "../../../../../components/ui/button";
import { cn } from "../../../../../lib/utils";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <section
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center"
      }
    >
      <div className={"flex flex-col gap-3"}>
        <Image
          src={"/animations/error.svg"}
          alt={"delivery-Boy"}
          width={400}
          height={200}
          className={"animate-bounce object-contain"}
        />
        <div className={"flex w-full items-center justify-center gap-3"}>
          <MdErrorOutline className={"size-6 text-red-500"} />
          <p className={"font-semibold"}>
            Something went wrong while processing your order
          </p>
        </div>
        <Link href={"/dashboard"} className={cn(buttonVariants())}>
          See the order
          <ArrowRightIcon className={"size-4"} />
        </Link>
      </div>
    </section>
  );
};
export default ErrorPage;

import { Skeleton } from "./ui/skeleton";
import React from "react";

export const ProductCardSkeleton = ({ length }: { length: number }) => {
  return (
    <div className="container mx-auto grid h-auto w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} className={"h-[300px] w-full"} />
      ))}
    </div>
  );
};

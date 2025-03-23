"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../actions/products";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { calculateDiscountedPrice, cn, formatCurrency } from "../lib/utils";
import { useZoomImage } from "../hooks/useZoomImage";
import { useRouter } from "next/navigation"; // For loading state

const FeaturedProducts = () => {
  const { position, handleMouseMove } = useZoomImage();
  const router = useRouter();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });

  const handleViewDetails = (id: string) => {
    router.push(`/products/${id}`);
  };

  if (error)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <section className="container mx-auto my-16">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">Featured Items</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Best-rated food items loved by our customers.
        </p>
      </div>

      {/* Products Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-lg" />
            ))
          : products?.map(
              ({ id, name, description, price, discount, image }) => (
                <Card
                  key={id}
                  className={
                    "group flex cursor-pointer flex-col justify-between p-0 shadow-none hover:bg-muted/30 hover:shadow-md"
                  }
                >
                  <CardHeader className={"sr-only"}>
                    <CardTitle className={"sr-only"}>{name}</CardTitle>
                  </CardHeader>
                  {/* image */}
                  <div className={"relative mb-2 h-[300px] w-full"}>
                    <div
                      className="image-container"
                      style={{
                        height: "300px",
                      }}
                      onMouseMove={(e) => handleMouseMove(e)}
                    >
                      <img
                        src={image}
                        alt={name}
                        className={"zoom-image"}
                        style={{
                          transformOrigin: `${position.x}% ${position.y}%`,
                        }}
                      />
                    </div>
                  </div>
                  <CardContent
                    className={"text-md flex flex-col gap-2"}
                    onClick={() => handleViewDetails(id)}
                  >
                    <div
                      className={
                        "text-md text-pretty font-medium text-muted-foreground"
                      }
                    >
                      {description}
                    </div>
                    <div className={"flex justify-between gap-3"}>
                      <p className={"flex gap-2 text-lg"}>
                        <span
                          className={cn("font-mono font-semibold", {
                            "text-muted-foreground line-through":
                              discount != null && discount > 0,
                          })}
                        >
                          {formatCurrency(price)}
                        </span>
                        {discount != null && discount > 0 && (
                          <span className={"font-mono font-extrabold"}>
                            {formatCurrency(
                              calculateDiscountedPrice(price, discount ?? 0),
                            )}
                          </span>
                        )}
                      </p>
                      <p className={"font-mono text-lg font-bold"}>
                        {discount}% off
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
      </div>
    </section>
  );
};

export default FeaturedProducts;

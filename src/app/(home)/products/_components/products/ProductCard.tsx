"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  calculateDiscountedPrice,
  cn,
  formatCurrency,
} from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useZoomImage } from "../../../../../hooks/useZoomImage";
import WishListButton from "./WishListButton";

type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  discount: number | null;
  stock: number;
  reviews: number;
  wishlists: { productId: string; id: string }[];
};

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  discount,
  wishlists,
}: ProductCardProps) => {
  const router = useRouter();
  const { position, handleMouseMove } = useZoomImage();

  const handleViewDetails = () => {
    router.push(`/products/${id}`);
  };

  return (
    <Card
      className={
        "group flex cursor-pointer flex-col justify-between p-0 shadow-none hover:bg-muted/30 hover:shadow-md"
      }
      onClick={handleViewDetails}
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
        <div className={"absolute right-5 top-5 hidden p-2 group-hover:block"}>
          <WishListButton id={id} wishlists={wishlists} variant={"outline"} />
        </div>
      </div>
      <CardContent className={"text-md flex flex-col gap-2"}>
        <div
          className={"text-md text-pretty font-medium text-muted-foreground"}
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
                {formatCurrency(calculateDiscountedPrice(price, discount ?? 0))}
              </span>
            )}
          </p>
          <p className={"font-mono text-lg font-bold"}>{discount}% off</p>
        </div>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <Button*/}
      {/*    onClick={handleViewDetails}*/}
      {/*    className={"w-full"}*/}
      {/*    variant={"outline"}*/}
      {/*  >*/}
      {/*    View Details*/}
      {/*    <ChevronRight className={"size-4"} />*/}
      {/*  </Button>*/}
      {/*</CardFooter>*/}
    </Card>
  );
};
export default ProductCard;

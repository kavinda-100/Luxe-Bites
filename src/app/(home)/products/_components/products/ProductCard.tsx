"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { formatCurrency, formatLargeNumber } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  discount: number | null;
  stock: number;
  reviews: number;
};

const ProductCard = ({
  id,
  name,
  description,
  reviews,
  price,
  stock,
  image,
  discount,
}: ProductCardProps) => {
  const router = useRouter();
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleViewDetails = () => {
    router.push(`/products/${id}`);
  };

  return (
    <Card
      className={
        "flex cursor-pointer flex-col justify-between border-none p-0 shadow-sm hover:bg-muted/30 hover:shadow-md"
      }
    >
      <CardHeader className={"relative h-[300px] w-full"}>
        <CardTitle className={"sr-only"}>{name}</CardTitle>
        <div
          className="image-container"
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
      </CardHeader>
      <CardContent className={"text-md flex flex-col gap-2 font-medium"}>
        <div className={"flex justify-between gap-3"}>
          <HighlightWrapper>
            <p>{formatCurrency(price)}</p>
          </HighlightWrapper>
          <HighlightWrapper>
            <p>{discount}% off</p>
          </HighlightWrapper>
        </div>
        <p className={"text-md line-clamp-2 text-pretty font-medium"}>
          {description}
        </p>
        <div className={"flex justify-between gap-3"}>
          <p className={"text-sm font-semibold text-muted-foreground"}>
            <span className={"text-md font-mono text-primary"}>{stock}</span> in
            stocks
          </p>
          <p className={"text-sm font-semibold text-muted-foreground"}>
            <span className={"text-md font-mono text-primary"}>
              {formatLargeNumber(reviews)}
            </span>{" "}
            reviews
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleViewDetails}
          className={"w-full"}
          variant={"outline"}
        >
          View Details
          <ChevronRight className={"size-4"} />
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;

const HighlightWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      className={
        "inline-flex w-fit items-center rounded-md bg-primary/10 px-2 py-1 font-mono text-sm font-bold text-primary ring-1 ring-inset ring-primary/10"
      }
    >
      {children}
    </span>
  );
};

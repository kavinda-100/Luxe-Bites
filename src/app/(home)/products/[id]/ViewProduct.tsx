"use client";

import React from "react";
import { useGetProductById } from "../../../../hooks/api/users/products/useGetProductById";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useZoomImage } from "../../../../hooks/useZoomImage";
import {
  calculateDiscountedPrice,
  cn,
  formatCurrency,
  formatLargeNumber,
  formatRelativeTime,
} from "../../../../lib/utils";
import StarRating from "../_components/products/StarRating";
import { Button } from "../../../../components/ui/button";
import {
  Loader2,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import PostReview from "../_components/products/PostReview";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import ReviewChat from "../_components/products/ReviewChat";
import WishListButton from "../_components/products/WishListButton";
import { useAddToCart } from "../../../../hooks/api/cart/useAddToCart";

type ViewProductProps = {
  id: string;
};

const ViewProduct = ({ id }: ViewProductProps) => {
  const { ProductData, isProductDataLoading, isProductDataError } =
    useGetProductById(id);
  const { addToCartMutate, addToCartIsPending } = useAddToCart();
  const { position, handleMouseMove } = useZoomImage();
  const [quantity, setQuantity] = React.useState(1);

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const subtractQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCartMutate({ productId: id, quantity });
  };

  return (
    <section className={"container mx-auto mt-6"}>
      <div className={"w-full"}>
        {isProductDataLoading && <Skeleton className={"h-screen w-full"} />}
        {isProductDataError && (
          <p className={"mt-4 text-center font-medium text-red-500"}>
            {isProductDataError.message}
          </p>
        )}
        {/* Image and main details */}
        {ProductData && (
          <div className={"flex flex-col gap-12 lg:flex-row"}>
            {/* image */}
            <div
              className="image-container"
              style={{
                height: "400px",
                maxWidth: "600px",
              }}
              onMouseMove={(e) => handleMouseMove(e)}
            >
              <img
                src={ProductData.data.image}
                alt={ProductData.data.name}
                className={"zoom-image"}
                style={{
                  transformOrigin: `${position.x}% ${position.y}%`,
                  maxWidth: "600px",
                }}
              />
            </div>
            {/* details */}
            <div className={"flex flex-col gap-4"}>
              <h1 className={"text-pretty text-3xl font-bold"}>
                {ProductData.data.name}
              </h1>
              <p
                className={
                  "text-pretty text-lg font-medium text-muted-foreground"
                }
              >
                {ProductData.data.description}
              </p>
              <div className={"flex justify-between gap-3"}>
                <p className={"flex gap-3 text-3xl"}>
                  <span
                    className={cn("font-semibold", {
                      "text-muted-foreground line-through":
                        ProductData.data.discount != null &&
                        ProductData.data.discount > 0,
                    })}
                  >
                    {formatCurrency(ProductData.data.price)}
                  </span>
                  {ProductData.data.discount != null &&
                    ProductData.data.discount > 0 && (
                      <span className={"font-extrabold"}>
                        {formatCurrency(
                          calculateDiscountedPrice(
                            ProductData.data.price,
                            ProductData.data.discount ?? 0,
                          ),
                        )}
                      </span>
                    )}
                </p>
                <p className={"text-xl font-bold"}>
                  {ProductData.data.discount}% off
                </p>
              </div>
              <div className={"flex flex-col gap-2"}>
                <StarRating reviews={ProductData.data.reviewsCount} />
                <p className={"text-md font-medium"}>
                  {formatLargeNumber(ProductData.data.stock)}{" "}
                  <span className={"text-muted-foreground"}>In Stocks</span>
                </p>
                <p className={"text-md font-medium"}>
                  {formatLargeNumber(ProductData.data.rating ?? 0)}{" "}
                  <span className={"text-muted-foreground"}>Ratings</span>
                </p>
              </div>
              <div className={"flex items-center gap-3"}>
                <Button variant={"outline"} onClick={addQuantity}>
                  <PlusIcon className={"size-6"} />
                </Button>
                <p className={"text-xl font-bold"}>{quantity}</p>
                <Button variant={"outline"} onClick={subtractQuantity}>
                  <MinusIcon className={"size-6"} />
                </Button>
              </div>
              <div className={"flex items-center gap-3"}>
                <Button
                  className={"w-full"}
                  onClick={handleAddToCart}
                  disabled={addToCartIsPending}
                >
                  {addToCartIsPending ? (
                    <Loader2 className={"size-5 animate-spin"} />
                  ) : (
                    <div className={"flex items-center gap-2"}>
                      <ShoppingCartIcon className={"size-5"} />
                      <span>Add to Cart</span>
                    </div>
                  )}
                </Button>
                <WishListButton
                  id={id ?? ProductData.data.id}
                  wishlists={ProductData.data.wishlists}
                  variant={"outline"}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/*  reviews and sub details */}
      <div className={"mt-6 flex w-full flex-col gap-12 lg:flex-row"}>
        {/* reviews */}
        <div className={"flex w-full flex-col gap-3 lg:w-8/12"}>
          {/* view reviews */}
          <div
            className={
              "flex max-h-[300px] w-full flex-col gap-3 overflow-y-auto"
            }
          >
            {ProductData?.data.reviews.length === 0 && (
              <p className={"text-center font-medium text-muted-foreground"}>
                No reviews yet
              </p>
            )}
            {ProductData?.data.reviews.map((review) => (
              <ReviewsCard
                key={`${review.ratingAmount}-${review.createdAt.toLocaleString()}`}
                comment={review.comment}
                createdAt={review.createdAt}
                email={review.user.email}
                image={review.user.profilePicture ?? ""}
                rating={review.ratingAmount}
                userName={review.user.name ?? "Anonymous"}
              />
            ))}
          </div>
          {/* post reviews */}
          <PostReview Id={ProductData?.data.id ?? ""} />
        </div>
        {/* reviews chart */}
        <div className={"w-full lg:w-4/12"}>
          <ReviewChat productId={ProductData?.data.id ?? ""} />
        </div>
      </div>
    </section>
  );
};
export default ViewProduct;

type PostReviewProps = {
  comment: string;
  rating: number;
  createdAt: Date;
  userName: string;
  email: string;
  image: string;
};

function ReviewsCard({
  comment,
  createdAt,
  email,
  rating,
  image,
  userName,
}: PostReviewProps) {
  return (
    <div className={"mb-2 h-auto w-full p-2 shadow-sm"}>
      {/* user details */}
      <div className={"flex gap-3"}>
        <Avatar>
          <AvatarImage src={image} alt={userName} />
          <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-sm font-bold"}>{userName}</p>
          <p className={"text-xs text-muted-foreground"}>{email}</p>
          {/* rating and comment */}
          <div className={"mt-2 flex flex-col gap-2"}>
            {/* ratings */}
            <div className={"flex items-center gap-2"}>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  className={cn("size-5 cursor-pointer", {
                    "fill-yellow-500 text-yellow-500": i < rating,
                  })}
                />
              ))}
            </div>
            {/*  comment */}
            <p className={"text-pretty text-sm font-normal"}>{comment}</p>
            {/* date */}
            <p className={"text-xs text-muted-foreground"}>
              {formatRelativeTime(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { Loader2, SendIcon, StarIcon, Undo2Icon } from "lucide-react";
import { cn } from "../../../../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "../../../../../actions/users/Reviews";
import { toast } from "sonner";

const PostReview = ({ Id }: { Id: string }) => {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const queryClient = useQueryClient();

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  const handleUndo = () => {
    if (rating > 0) {
      setRating(rating - 1);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      comment,
      rating,
      productId,
    }: {
      comment: string;
      rating: number;
      productId: string;
    }) => postReview({ comment, rating, productId }),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        setRating(0);
        setComment("");
        await queryClient.invalidateQueries({ queryKey: ["product", Id] });
      }
    },
    onError: (e) => {
      toast.error(e.message);
      console.log("Error in postReview", e);
    },
  });

  const handlePostReview = () => {
    if (comment.trim() === "") {
      toast.error("Please write a comment");
      return;
    }
    mutate({ comment, rating, productId: Id });
  };

  return (
    <div className={"w-full p-2"}>
      <p className={"text-md font-medium text-muted-foreground"}>
        Post Your Review
      </p>

      <div className={"mt-4 flex max-w-5xl flex-col gap-3"}>
        {/* rating */}
        <div className={"flex items-center gap-2"}>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={cn("size-5 cursor-pointer", {
                "fill-yellow-500 text-yellow-500": i < rating,
              })}
              onClick={() => handleRating(i)}
            />
          ))}
          {rating > 0 && (
            <Undo2Icon
              className={"size-4 cursor-pointer"}
              onClick={handleUndo}
            />
          )}
        </div>
        {/* comment */}
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={"Comment..."}
          className={"w-full"}
        />
        <Button onClick={handlePostReview} className={"w-fit"}>
          {isPending ? (
            <Loader2 className={"size-4 animate-spin"} />
          ) : (
            <>
              <SendIcon className={"size-4"} />
              Post
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
export default PostReview;

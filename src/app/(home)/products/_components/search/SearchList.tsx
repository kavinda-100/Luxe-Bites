"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { useRouter } from "next/navigation";

type SearchListProps = {
  id: string;
  name: string;
  image: string;
};

const SearchList = ({ id, name, image }: SearchListProps) => {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div
      onClick={handleSearchClick}
      className={
        "my-2 flex w-full cursor-pointer items-center gap-3 rounded-md border-b bg-muted p-2"
      }
    >
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <p
        className={
          "line-clamp-1 text-pretty text-sm font-medium tracking-tight"
        }
      >
        {name}
      </p>
    </div>
  );
};
export default SearchList;

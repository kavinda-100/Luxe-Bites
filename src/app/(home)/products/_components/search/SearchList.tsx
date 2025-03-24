"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { useRouter } from "next/navigation";
import { ArrowRight, CirclePlusIcon } from "lucide-react";

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
        "group my-2 flex w-full cursor-pointer items-center gap-3 rounded-md border-b bg-muted p-2"
      }
    >
      <CirclePlusIcon
        className={"size-5 text-muted-foreground group-hover:text-primary"}
      />
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <p
        className={
          "line-clamp-1 w-full text-pretty text-sm font-medium tracking-tight group-hover:text-primary"
        }
      >
        {name}
      </p>
      <ArrowRight
        className={
          "size-5 font-bold text-muted-foreground group-hover:text-primary"
        }
      />
    </div>
  );
};
export default SearchList;

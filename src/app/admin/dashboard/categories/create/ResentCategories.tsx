"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getResentCategories } from "../../../../../actions/categoryAction";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { formatDate } from "../../../../../lib/utils";
import StatusMessage from "../../../../../components/status/StatusMessage";

const ResentCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["resent-categories"],
    queryFn: getResentCategories,
  });
  if (isLoading)
    return (
      <section className={"container mx-auto"}>
        <Skeleton className={"container mx-auto h-full w-full rounded-md"} />
      </section>
    );
  if (error)
    return (
      <section
        className={
          "container mx-auto flex flex-col items-center justify-center"
        }
      >
        <StatusMessage message={error.message} type={"error"} />
      </section>
    );
  return (
    <section className={"container mx-auto mt-5 flex flex-col gap-4"}>
      <h2 className={"text-md text-center font-semibold"}>Resent Categories</h2>
      {data?.resentCategories?.map((category) => (
        <div
          className={
            "container mx-auto space-y-4 rounded-md bg-background p-4 shadow-sm"
          }
          key={category.id}
        >
          <div className={"flex w-full justify-between gap-6"}>
            <p className={"truncate text-sm font-medium"}>{category.name}</p>
            <p className={"text-sm font-medium text-muted-foreground"}>
              {formatDate(category.createdAt)}
            </p>
          </div>
          <div className={"w-full"}>
            <p
              className={
                "line-clamp-2 text-sm font-medium text-muted-foreground"
              }
            >
              {category.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
export default ResentCategories;

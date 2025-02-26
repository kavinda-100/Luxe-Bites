"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetAllCategories } from "../../../../../hooks/api/categories/useGetAllCategories";
import { CirclePlusIcon } from "lucide-react";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useCategorySelectStore } from "../../../../../store/useCategorySelectStore";
import { cn } from "../../../../../lib/utils";

const Categories = () => {
  const { data, isLoading, error } = useGetAllCategories();
  const { selectedCategory, setSelectedCategory } = useCategorySelectStore();

  return (
    <div className="container mx-auto my-4">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex items-center gap-3">
          {
            // Loading State
            isLoading && <Skeleton className={"h-[40px] w-full"} />
          }
          {
            // Error State
            error && (
              <div className="flex items-center gap-2 rounded-md border border-gray-100 bg-red-100 px-4 py-2">
                <div className="h-4 w-4 rounded-md bg-red-400"></div>
                <span className="text-sm text-red-400">
                  Failed to load categories
                </span>
              </div>
            )
          }
          {data?.categories.map((category) => {
            return (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "group flex cursor-pointer items-center gap-2 rounded-md border border-gray-100 bg-muted/30 px-4 py-2 transition-all duration-300 ease-in-out hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-600",
                  {
                    "border-primary bg-primary/10 dark:border-primary dark:bg-primary/10":
                      selectedCategory === category.name,
                  },
                )}
              >
                {/* Circle Icon Inside the Div */}
                <CirclePlusIcon className="size-4 scale-50 opacity-50 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:text-primary group-hover:opacity-100" />
                <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-primary dark:text-gray-400">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Categories;

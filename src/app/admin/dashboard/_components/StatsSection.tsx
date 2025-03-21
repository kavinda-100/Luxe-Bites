"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatistics } from "../../../../actions/admin";
import { Skeleton } from "../../../../components/ui/skeleton";

const StatsSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStatistics,
  });
  if (isLoading) {
    return (
      <div
        className={
          "container mx-auto grid min-h-[250px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5"
        }
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className={"h-full w-full"} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  console.log(data);

  return <div>StatsSection</div>;
};
export default StatsSection;

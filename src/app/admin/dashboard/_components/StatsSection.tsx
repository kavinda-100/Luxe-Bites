"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatistics } from "../../../../actions/admin";
import { Skeleton } from "../../../../components/ui/skeleton";
import { LucideIcon } from "lucide-react";

const StatsSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStatistics,
  });
  if (isLoading) {
    return (
      <div
        className={
          "container mx-auto grid min-h-[250px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className={"h-full w-full"} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return <section className={"container mx-auto"}>StatsSection</section>;
};
export default StatsSection;

type cardProrps = {
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  icon: LucideIcon;
};

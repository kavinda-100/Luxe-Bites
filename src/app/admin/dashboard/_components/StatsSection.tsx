"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatistics } from "../../../../actions/admin";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  ArrowDown01,
  ArrowUp10,
  CirclePlusIcon,
  LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

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

  return (
    <section className={"container mx-auto"}>
      <div
        className={
          "grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        <StatsCard
          label={"Revenue"}
          total={data?.revenue.total ?? 0}
          lastMonth={data?.revenue.lastMonth ?? 0}
          thisMonth={data?.revenue.thisMonth ?? 0}
          isIncreasing={data?.revenue.isIncreasing ?? false}
          percentageChange={data?.revenue.percentageChange ?? 0}
          icon={CirclePlusIcon}
        />
      </div>
    </section>
  );
};
export default StatsSection;

type cardProps = {
  label: string;
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  icon: LucideIcon;
};

const StatsCard = ({
  label,
  icon: Icon,
  percentageChange,
  total,
  thisMonth,
  lastMonth,
  isIncreasing,
}: cardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"flex items-center gap-3"}>
          <Icon className={"size-5 text-primary"} />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex justify-between gap-3"}>
        <div className={"flex flex-col gap-3"}>
          <p className={"font-mono text-3xl font-semibold"}>{total}</p>
          <p className={"text-md font-normal"}>Total</p>
        </div>

        <div className={"text-md flex flex-col items-center gap-2 font-normal"}>
          <p>
            <span className={"font-mono text-lg font-semibold"}>
              {thisMonth}
            </span>{" "}
            This month
          </p>
          {isIncreasing ? (
            <ArrowUp10 className={"size-5 text-emerald-500"} />
          ) : (
            <ArrowDown01 className={"size-5 text-red-500"} />
          )}
          <p>
            <span className={"font-mono text-lg font-semibold"}>
              {lastMonth}
            </span>{" "}
            Last month
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className={"text-sm font-normal text-foreground/60"}>
          {isIncreasing ? (
            <p>Increased By {Math.floor(percentageChange)}%</p>
          ) : (
            <p>Decreased By {Math.floor(percentageChange)}%</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

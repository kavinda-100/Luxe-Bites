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
import { NumberTicker } from "../../../../components/animations/magicui/NumberTicker";

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
          isMoney={true}
        />
        <StatsCard
          label={"Orders"}
          total={data?.order.total ?? 0}
          lastMonth={data?.order.lastMonth ?? 0}
          thisMonth={data?.order.thisMonth ?? 0}
          isIncreasing={data?.order.isIncreasing ?? false}
          percentageChange={data?.order.percentageChange ?? 0}
          icon={CirclePlusIcon}
        />
        <StatsCard
          label={"Categories"}
          total={data?.category.total ?? 0}
          lastMonth={data?.category.lastMonth ?? 0}
          thisMonth={data?.category.thisMonth ?? 0}
          isIncreasing={data?.category.isIncreasing ?? false}
          percentageChange={data?.category.percentageChange ?? 0}
          icon={CirclePlusIcon}
        />
        <StatsCard
          label={"Products"}
          total={data?.product.total ?? 0}
          lastMonth={data?.product.lastMonth ?? 0}
          thisMonth={data?.product.thisMonth ?? 0}
          isIncreasing={data?.product.isIncreasing ?? false}
          percentageChange={data?.product.percentageChange ?? 0}
          icon={CirclePlusIcon}
        />
        <StatsCard
          label={"Active Products"}
          total={data?.productActive.total ?? 0}
          lastMonth={data?.productActive.lastMonth ?? 0}
          thisMonth={data?.productActive.thisMonth ?? 0}
          isIncreasing={data?.productActive.isIncreasing ?? false}
          percentageChange={data?.productActive.percentageChange ?? 0}
          icon={CirclePlusIcon}
        />
        <StatsCard
          label={"Users"}
          total={data?.user.total ?? 0}
          lastMonth={data?.user.lastMonth ?? 0}
          thisMonth={data?.user.thisMonth ?? 0}
          isIncreasing={data?.user.isIncreasing ?? false}
          percentageChange={data?.user.percentageChange ?? 0}
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
  isMoney?: boolean;
};

const StatsCard = ({
  label,
  icon: Icon,
  percentageChange,
  total,
  thisMonth,
  lastMonth,
  isIncreasing,
  isMoney = false,
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
          {isMoney ? (
            <span className={"flex items-center gap-1 text-3xl"}>
              $
              <NumberTicker
                value={total}
                decimalPlaces={2}
                className={"font-mono text-3xl font-semibold"}
              />
            </span>
          ) : (
            <NumberTicker
              value={total}
              className={"font-mono text-3xl font-semibold"}
            />
          )}
          <p className={"text-md font-normal"}>Total</p>
        </div>

        <div className={"text-md flex flex-col items-center gap-2 font-normal"}>
          <p>
            {isMoney ? (
              <>
                $
                <NumberTicker
                  value={thisMonth}
                  className={"font-mono text-lg font-semibold"}
                  decimalPlaces={2}
                />{" "}
              </>
            ) : (
              <>
                <NumberTicker
                  value={thisMonth}
                  className={"font-mono text-lg font-semibold"}
                />{" "}
              </>
            )}
            This month
          </p>
          {isIncreasing ? (
            <ArrowUp10 className={"size-5 text-emerald-500"} />
          ) : (
            <ArrowDown01 className={"size-5 text-red-500"} />
          )}
          <p>
            {isMoney ? (
              <>
                $
                <NumberTicker
                  value={lastMonth}
                  className={"font-mono text-lg font-semibold"}
                  decimalPlaces={2}
                />{" "}
              </>
            ) : (
              <>
                <NumberTicker
                  value={lastMonth}
                  className={"font-mono text-lg font-semibold"}
                />{" "}
              </>
            )}
            Last month
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className={"text-sm font-normal text-foreground/60"}>
          {isIncreasing ? (
            <p>
              Increased By{" "}
              {Math.ceil(percentageChange === -100 ? 0 : percentageChange)}%
            </p>
          ) : (
            <p>
              Decreased By{" "}
              {Math.ceil(percentageChange === -100 ? 0 : percentageChange)}%
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

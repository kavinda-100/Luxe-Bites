"use client";

import React from "react";
import { UsersChart } from "./UsersChart";
import type { ChartConfig } from "../../../../../../components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "../../../../../../actions/admin";
import { Skeleton } from "../../../../../../components/ui/skeleton";

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// const chartData = [
//   { month: "January", visitors: 186 },
//   { month: "February", visitors: 305 },
//   { month: "March", visitors: 237 },
//   { month: "April", visitors: 73 },
//   { month: "May", visitors: 209 },
//   { month: "June", visitors: 214 },
//   { month: "July", visitors: 80 },
//   { month: "August", visitors: 189 },
//   { month: "September", visitors: 120 },
//   { month: "October", visitors: 290 },
//   { month: "November", visitors: 150 },
//   { month: "December", visitors: 180 },
// ];

const UserChartPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["usersChartData"],
    queryFn: getAdminUsers,
  });

  if (isLoading) {
    return <Skeleton className={"container mx-auto min-h-[300px] w-full"} />;
  }

  if (error) {
    return (
      <div className={"container mx-auto"}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  console.log(data);

  return (
    <section className={"container mx-auto"}>
      <UsersChart chartConfig={chartConfig} chartData={data ?? []} />
    </section>
  );
};
export default UserChartPage;

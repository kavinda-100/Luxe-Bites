"use client";

import React from "react";
import type { ChartConfig } from "../../../../../../components/ui/chart";
import { SalesChart } from "./SalesChart";

const chartConfig = {
  Sales: {
    label: "Sales",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const chartData = [
  { date: "2025-03-01", orders: 222, revenue: 150 },
  { date: "2025-03-02", orders: 97, revenue: 180 },
  { date: "2025-03-03", orders: 167, revenue: 120 },
  { date: "2025-03-04", orders: 242, revenue: 260 },
];

const startDate = new Date("2025-01-01");
const newChartData = Array.from({ length: 90 }).map((_, index) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + index);
  return {
    date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    orders: Math.ceil(Math.random() * 1000),
    revenue: Math.ceil(Math.random() * 1000),
  };
});

console.log(newChartData);

const SalesPage = () => {
  const [timeRange, setTimeRange] = React.useState("90d");
  return (
    <section className={"container mx-auto"}>
      <SalesChart
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        chartConfig={chartConfig}
        chartData={newChartData ?? []}
      />
    </section>
  );
};
export default SalesPage;

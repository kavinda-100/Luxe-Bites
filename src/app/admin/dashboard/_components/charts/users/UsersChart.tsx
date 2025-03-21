"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as React from "react";
import { UsersIcon } from "lucide-react";

type UsersChartType = {
  chartConfig: ChartConfig;
  chartData: any[];
};

export function UsersChart({ chartConfig, chartData }: UsersChartType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"flex items-center gap-3"}>
          <UsersIcon className={"size-5 text-primary"} />
          Users
        </CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={"max-h-[300px] w-full"}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="visitors"
              type="natural"
              fill="var(--color-visitors)"
              fillOpacity={0.4}
              stroke="var(--color-visitors)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../../../actions/notifications";
import { Skeleton } from "../../../../components/ui/skeleton";

const NotificationSection = () => {
  const [filter, setFilter] = React.useState<"all" | "unread" | "read">("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", { filter }],
    queryFn: () => getAllNotifications({ filter }),
  });
  console.log(data);

  return (
    <Card
      className={
        "h-full w-3/12 max-w-[300px] shadow-sm transition-all duration-200 ease-linear"
      }
    >
      <CardHeader className={"flex flex-col gap-3"}>
        <CardTitle>Notifications</CardTitle>
        {/* select filters */}
        <Select value={filter} onValueChange={setFilter as any}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className={"flex flex-col gap-3"}>
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <NotificationLoadingCard key={index} />
          ))}
        {error && <div>{error.message}</div>}
      </CardContent>
    </Card>
  );
};
export default NotificationSection;

const NotificationLoadingCard = () => {
  return <Skeleton className="h-20 w-full" />;
};

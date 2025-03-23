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
import { Button } from "../../../../components/ui/button";
import { TrashIcon, CheckIcon, RefreshCcwIcon } from "lucide-react";
import NotificationCard from "./NotificationCard";

const NotificationSection = () => {
  const [filter, setFilter] = React.useState<"all" | "unread" | "read">("all");

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
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
        <CardTitle className={"sr-only"}>Notifications</CardTitle>
        <div className={"flex justify-between gap-2"}>
          <h1 className={"text-lg font-semibold"}>Notifications</h1>
          <Button variant={"ghost"} size={"icon"} onClick={() => refetch()}>
            {isRefetching ? (
              <RefreshCcwIcon className={"size-3 animate-spin"} />
            ) : (
              <RefreshCcwIcon className={"size-3"} />
            )}
          </Button>
        </div>
        <div className={"flex justify-between gap-2"}>
          <Button variant={"outline"} size={"sm"}>
            <CheckIcon className={"size-3"} />
            Mark all as read
          </Button>
          <Button variant={"outline"} size={"sm"}>
            <TrashIcon className={"size-3"} />
            Clear all
          </Button>
        </div>
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
        {/*  notifications */}
        {data?.map((notification) => (
          <NotificationCard
            key={notification.id}
            id={notification.id}
            orderId={notification.orderId}
            state={notification.state}
            read={notification.read}
            createdAt={notification.createdAt}
          />
        ))}
      </CardContent>
    </Card>
  );
};
export default NotificationSection;

const NotificationLoadingCard = () => {
  return <Skeleton className="h-20 w-full" />;
};

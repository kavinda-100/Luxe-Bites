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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  clearAllNotifications,
  getAllNotifications,
  markAllAsRead,
} from "../../../../actions/notifications";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Button } from "../../../../components/ui/button";
import { TrashIcon, CheckIcon, RefreshCcwIcon, Loader2 } from "lucide-react";
import NotificationCard from "./NotificationCard";
import { toast } from "sonner";

const NotificationSection = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = React.useState<"all" | "unread" | "read">("all");

  //get all notifications
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["notifications", { filter }],
    queryFn: () => getAllNotifications({ filter }),
  });

  // clear all notifications
  const { mutate: clearAllMutation, isPending: isClearingAllIsPending } =
    useMutation({
      mutationFn: clearAllNotifications,
      onSuccess: async (res) => {
        if (res.success) {
          await queryClient.invalidateQueries({ queryKey: ["notifications"] });
          toast.success(res.message);
        }
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  // mark all as read
  const {
    mutate: markAllAsReadMutation,
    isPending: isMarkingAllAsReadPending,
  } = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: async (res) => {
      if (res.success) {
        await queryClient.invalidateQueries({ queryKey: ["notifications"] });
        toast.success(res.message);
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

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
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => markAllAsReadMutation()}
          >
            {!isMarkingAllAsReadPending ? (
              <div className={"flex items-center gap-2"}>
                <CheckIcon className={"size-3"} />
                Mark all as read
              </div>
            ) : (
              <Loader2 className={"size-3 animate-spin"} />
            )}
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => clearAllMutation()}
          >
            {!isClearingAllIsPending ? (
              <div className={"flex items-center gap-2"}>
                <TrashIcon className={"size-3"} />
                Clear all
              </div>
            ) : (
              <Loader2 className={"size-3 animate-spin"} />
            )}
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
            updatedAt={notification.updatedAt}
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

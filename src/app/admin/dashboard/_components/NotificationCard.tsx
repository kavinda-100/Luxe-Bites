"use client";

import React from "react";
import type { State } from "@prisma/client";
import { cn } from "../../../../lib/utils";
import { ClipboardCopy, CopyIcon, FolderIcon } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "../../../../components/ui/separator";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsRead } from "../../../../actions/notifications";

type NotificationCardProps = {
  id: string;
  orderId: string;
  state: State;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};
const NotificationCard = ({
  createdAt,
  updatedAt,
  read,
  orderId,
  state,
  id,
}: NotificationCardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOrderIdCopied, setIsOrderIdCopied] = React.useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => markAsRead(id),
    onSuccess: async () => {
      console.log("Marked as read if of notification", id);
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  console.log("isPending of markAsRead", isPending);

  const handelOrderClick = () => {
    mutate();
    router.push(`/admin/dashboard/orders/manage?orderId=${orderId}`);
  };

  return (
    <div
      className={cn("rounded-md border px-2 py-1", {
        "bg-muted/50": !read,
        "bg-background": read,
      })}
    >
      <div
        className={"mt-3 cursor-pointer text-pretty"}
        onClick={handelOrderClick}
      >
        {state === "NEWORDER" ? (
          <div className={"flex flex-col gap-1"}>
            <p className={"text-md flex items-center gap-3"}>
              <FolderIcon className={"size-4 text-primary"} />
              New Order Received
            </p>
            <p className={"text-xs"}>{createdAt.toDateString()}</p>
          </div>
        ) : (
          <div className={"flex flex-col gap-1"}>
            <p className={"text-md flex items-center gap-3"}>
              <FolderIcon className={"size-4 text-red-500"} />
              Order Canceled
            </p>
            <p className={"text-xs"}>{updatedAt.toDateString()}</p>
          </div>
        )}
      </div>

      <Separator className={"my-3"} />

      <div className={"flex items-center gap-1 text-xs font-normal"}>
        <p>Order Id - </p>
        <div className={"flex items-center gap-2"}>
          <span>{orderId.slice(0, 15) + "..."}</span>
          {isOrderIdCopied ? (
            <ClipboardCopy
              className={"size-3 cursor-pointer text-emerald-500"}
            />
          ) : (
            <CopyIcon
              className={"size-3 cursor-pointer text-emerald-500"}
              onClick={async () => {
                await navigator.clipboard.writeText(orderId ?? "");
                setIsOrderIdCopied(true);
                toast.success("Order ID copied to clipboard");
                setInterval(() => {
                  setIsOrderIdCopied(false);
                }, 3000);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default NotificationCard;

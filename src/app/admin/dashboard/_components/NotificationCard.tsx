"use client";

import React from "react";
import type { State } from "@prisma/client";
import { cn } from "../../../../lib/utils";
import { ClipboardCopy, CopyIcon } from "lucide-react";
import { toast } from "sonner";

type NotificationCardProps = {
  id: string;
  orderId: string;
  state: State;
  read: boolean;
  createdAt: Date;
};
const NotificationCard = ({
  createdAt,
  read,
  orderId,
  state,
  id,
}: NotificationCardProps) => {
  const [isOrderIdCopied, setIsOrderIdCopied] = React.useState(false);

  return (
    <div
      className={cn("rounded-md border px-2 py-1", {
        "bg-muted/50": read,
        "bg-background": !read,
      })}
    >
      <div className={"flex justify-between gap-1 text-xs font-normal"}>
        <p className={"font-semibold"}>Order Id: </p>
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

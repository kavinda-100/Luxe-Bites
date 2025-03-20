"use client";

import React from "react";
import { Label } from "../../../../../../components/ui/label";
import { Textarea } from "../../../../../../components/ui/textarea";
import { Button } from "../../../../../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, BanIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Separator } from "../../../../../../components/ui/separator";
import type { OrderStatus } from "@prisma/client";

type ModifyOrderProps = {
  orderID: string;
  orderStatus: OrderStatus;
};

const ModifyOrder = ({ orderID, orderStatus }: ModifyOrderProps) => {
  return (
    <section className={"container mx-auto p-2"}>
      {/*  change the order status */}
      <ChangeStatus orderID={orderID} orderStatus={orderStatus} />

      <Separator className="my-6" />

      {/* Cancel the order */}
      <CancelOrder orderID={orderID} />

      <Separator className="my-6" />

      {/*  delete the order */}
      <DeleteOrder orderID={orderID} />
    </section>
  );
};
export default ModifyOrder;

type ChangeStatusProps = {
  orderID: string;
  orderStatus: OrderStatus;
};
const ChangeStatus = ({ orderStatus, orderID }: ChangeStatusProps) => {
  // PENDING
  // PROCESSING
  // SHIPPED
  // DELIVERED
  // CANCELLED
  const oldStatus =
    orderStatus === "PENDING"
      ? "PENDING"
      : orderStatus === "PROCESSING"
        ? "PROCESSING"
        : orderStatus === "SHIPPED"
          ? "SHIPPED"
          : orderStatus === "DELIVERED"
            ? "DELIVERED"
            : "CANCELLED";
  const disabledButton = orderStatus === "CANCELLED";
  const [status, setStatus] = React.useState(oldStatus);

  return (
    <section
      className={
        "container mx-auto flex flex-col gap-4 rounded-md bg-muted/40 p-4"
      }
    >
      <Label className={"text-md font-semibold"}>Change order status</Label>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={status} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">
            <span className="text-yellow-500">Pending</span>
          </SelectItem>
          <SelectItem value="PROCESSING">
            <span className="text-blue-500">Processing</span>
          </SelectItem>
          <SelectItem value="SHIPPED">
            <span className="text-green-500">Shipped</span>
          </SelectItem>
          <SelectItem value="DELIVERED">
            <span className="text-emerald-300">Delivered</span>
          </SelectItem>
        </SelectContent>
      </Select>
      <Button className={"w-fit"} variant={"outline"} disabled={disabledButton}>
        <PencilIcon className="h-4 w-4" />
        Change
      </Button>
    </section>
  );
};

type CancelOrderProps = {
  orderID: string;
};
const CancelOrder = ({ orderID }: CancelOrderProps) => {
  const [cancelReason, setCancelReason] = React.useState("");
  return (
    <section
      className={
        "container mx-auto flex flex-col gap-4 rounded-md bg-muted/40 p-4"
      }
    >
      <Label className={"text-md font-semibold"}>Cancel The order</Label>
      <Textarea
        placeholder={"Type the reason for canceling the order"}
        className={"w-full"}
        rows={3}
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
      />
      <Button className={"w-fit"} variant={"outline"}>
        <BanIcon className="h-4 w-4" />
        Cancel
      </Button>
    </section>
  );
};

type DeleteOrderProps = {
  orderID: string;
};
const DeleteOrder = ({ orderID }: DeleteOrderProps) => {
  return (
    <section
      className={
        "container mx-auto flex flex-col gap-4 rounded-md bg-muted/40 p-4"
      }
    >
      <Label className={"text-md font-semibold"}>Delete The order</Label>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Hold On!</AlertTitle>
        <AlertDescription>
          This action is irreversible, are you sure you want to delete this
          order?
        </AlertDescription>
      </Alert>
      <Button className={"w-fit"} variant={"destructive"}>
        <TrashIcon className="h-4 w-4" />
        Delete
      </Button>
    </section>
  );
};

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

const ModifyOrder = () => {
  return (
    <section className={"container mx-auto p-2"}>
      {/*  change the order status */}
      <ChangeStatus />

      <Separator className="my-6" />

      {/* Cancel the order */}
      <CancelOrder />

      <Separator className="my-6" />

      {/*  delete the order */}
      <DeleteOrder />
    </section>
  );
};
export default ModifyOrder;

const ChangeStatus = () => {
  return (
    <section
      className={
        "container mx-auto flex flex-col gap-4 rounded-md bg-muted/50 p-4"
      }
    >
      <Label className={"text-md font-semibold"}>Change order status</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Button className={"w-fit"} variant={"outline"}>
        <PencilIcon className="h-4 w-4" />
        Change
      </Button>
    </section>
  );
};

const CancelOrder = () => {
  const [cancelReason, setCancelReason] = React.useState("");
  return (
    <section
      className={
        "container mx-auto flex flex-col gap-4 rounded-md bg-muted/50 p-4"
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

const DeleteOrder = () => {
  return (
    <section
      className={
        "container mx-auto flex flex-col gap-4 rounded-md bg-muted/50 p-4"
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

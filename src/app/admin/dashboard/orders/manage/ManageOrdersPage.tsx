"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useGetOrderById } from "../../../../../hooks/api/orders/useGetOrderById";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { toast } from "sonner";

const ManageOrdersPage = () => {
  // Get the email from the URL query params.
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [newOrderId, setNewOrderId] = React.useState<string | undefined>(
    orderId ?? "",
  );
  const { data, isLoading, error, setOrderId, setEnableQuery } =
    useGetOrderById();

  React.useEffect(() => {
    if (newOrderId) {
      setOrderId(newOrderId);
      setEnableQuery(true);
    }
  }, [newOrderId, setEnableQuery, setOrderId]);

  if (isLoading) {
    return <Skeleton className={"container mx-auto h-screen"} />;
  }

  if (error) {
    toast.error(error.message);
    return <div>Error: {error.message}</div>;
  }

  const handleSearch = () => {
    if (!newOrderId) {
      toast.error("Please enter order ID");
      return;
    }
    setOrderId(newOrderId);
    setEnableQuery(true);
  };
  console.log({ data });

  return (
    <section className={"container mx-auto"}>
      <div className={"flex w-full flex-col gap-3"}>
        <Label>Order ID</Label>
        <div className={"flex items-center gap-2 lg:w-1/2"}>
          <Input
            placeholder={"Enter order ID"}
            value={newOrderId}
            onChange={(e) => setNewOrderId(e.target.value)}
          />
          <Button variant={"secondary"} onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};
export default ManageOrdersPage;

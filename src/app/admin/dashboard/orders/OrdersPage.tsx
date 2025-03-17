"use client";

import React from "react";
import { useRightSideBar } from "../../../../store/useRightSideBar";
import { useGetAllOrders } from "../../../../hooks/api/orders/useGetAllOrders";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { TableComponent } from "../../../../components/table/TableComponent";
import { OrdersColumns } from "./_table/OrdersColumns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrdersPage = () => {
  const { close } = useRightSideBar();
  const { data, isLoading, error, setDate, setStatus, status, date } =
    useGetAllOrders();

  React.useEffect(() => {
    close();
  }, [close]);

  if (isLoading) {
    return (
      <section className={"container mx-auto"}>
        <Skeleton className={"h-full min-h-screen"} />
      </section>
    );
  }

  if (error) {
    return <div className={"container mx-auto"}>Error: {error.message}</div>;
  }
  return (
    <section className={"container mx-auto"}>
      <Card className={"mx-auto w-full max-w-6xl border-none shadow-sm"}>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>Manage your Orders</CardDescription>
        </CardHeader>
        <CardContent className={"flex flex-col gap-3"}>
          <div className={"flex w-full justify-end gap-3"}>
            <div>
              <Select value={date} onValueChange={setDate as any}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Yesterday">Yesterday</SelectItem>
                  <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                  <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                  <SelectItem value="All time">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/*PENDING PROCESSING SHIPPED DELIVERED CANCELLED*/}
            <div>
              <Select value={status} onValueChange={setStatus as any}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TableComponent
            columns={OrdersColumns}
            data={data ?? []}
            NameForFilter={"userEmail"}
            FilterInputPlaceholder={"Search by user email"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default OrdersPage;

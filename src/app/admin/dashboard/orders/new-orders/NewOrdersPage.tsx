"use client";

import React from "react";
import { useRightSideBar } from "../../../../../store/useRightSideBar";
import { useGetAllOrders } from "../../../../../hooks/api/orders/useGetAllOrders";
import { Skeleton } from "../../../../../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { TableComponent } from "../../../../../components/table/TableComponent";
import { NewOrdersColumns } from "../_table/NewOrdersColumns";

const NewOrdersPage = () => {
  const { close } = useRightSideBar();
  const { data, isLoading, error, setDate, setStatus, status } =
    useGetAllOrders();

  React.useEffect(() => {
    close();
  }, [close]);

  React.useEffect(() => {
    setDate("Today");
  }, [setDate]);

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
            columns={NewOrdersColumns}
            data={data ?? []}
            NameForFilter={"userEmail"}
            FilterInputPlaceholder={"Search by user email"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default NewOrdersPage;

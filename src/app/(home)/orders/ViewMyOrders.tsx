"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../../actions/users/orders";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { TableComponent } from "../../../components/table/TableComponent";
import { MyOrdersColumns } from "./_components/OrderClounms";

const ViewMyOrders = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  if (isLoading) {
    return <Skeleton className={"container mx-auto mt-6 min-h-screen"} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data);

  return (
    <section className={"container mx-auto mt-6"}>
      <Card className={"mx-auto w-full max-w-6xl border-none shadow-sm"}>
        <CardHeader>
          <CardTitle>All Your Orders</CardTitle>
          <CardDescription>Manage your Orders</CardDescription>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={MyOrdersColumns}
            data={data ?? []}
            NameForFilter={"quantity"}
            FilterInputPlaceholder={"Search by quantity"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default ViewMyOrders;

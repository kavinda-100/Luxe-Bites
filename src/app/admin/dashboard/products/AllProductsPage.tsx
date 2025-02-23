"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { TableComponent } from "../../../../components/table/TableComponent";
import { useGetAllProducts } from "../../../../hooks/api/products/useGetAllProducts";
import { Skeleton } from "../../../../components/ui/skeleton";
import { AllProductsColumns } from "./_table/Colunm";
import { useRightSideBar } from "../../../../store/useRightSideBar";

const AllProductsPage = () => {
  const { close } = useRightSideBar();
  const { data, isLoading, error } = useGetAllProducts();

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
          <CardTitle>All Products</CardTitle>
          <CardDescription>Manage your Products</CardDescription>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={AllProductsColumns}
            data={data ?? []}
            NameForFilter={"name"}
            FilterInputPlaceholder={"Search by Product name"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default AllProductsPage;

"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useGetAllCategories } from "../../../../hooks/api/categories/useGetAllCategories";
import { Skeleton } from "../../../../components/ui/skeleton";
import { TableComponent } from "../../../../components/table/TableComponent";
import { categoriesColumns } from "./_table/Colunms";

const CategoriesPage = () => {
  const { data, isLoading, error } = useGetAllCategories();

  if (isLoading) {
    return (
      <section className={"container mx-auto"}>
        <Skeleton className={"h-full w-full"} />
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
          <CardTitle>All Categories</CardTitle>
          <CardDescription>Manage your categories</CardDescription>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={categoriesColumns}
            data={data?.categories ?? []}
            NameForFilter={"name"}
            FilterInputPlaceholder={"Search by category name"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default CategoriesPage;

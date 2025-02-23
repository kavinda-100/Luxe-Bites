"use client";

import React from "react";
import { useRightSideBar } from "../../../../store/useRightSideBar";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { TableComponent } from "../../../../components/table/TableComponent";
import { useGetAllAdvertisements } from "../../../../hooks/api/advertisement/useGetAllAdvertisements";
import { AdvertisementColumns } from "./_table/Columns";

const AdvertisementPage = () => {
  const { close } = useRightSideBar();
  const { data, isLoading, error } = useGetAllAdvertisements();

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
          <CardTitle>All Advertisements</CardTitle>
          <CardDescription>Manage your Advertisements</CardDescription>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={AdvertisementColumns}
            data={data ?? []}
            NameForFilter={"title"}
            FilterInputPlaceholder={"Search by title"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default AdvertisementPage;

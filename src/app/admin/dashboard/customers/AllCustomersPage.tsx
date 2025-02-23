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
import { AllUsersColumns } from "./_table/Columns";
import { useGetAllUsers } from "../../../../hooks/api/users/useGetAllUsers";

const AllCustomersPage = () => {
  const { close } = useRightSideBar();
  const { data, isLoading, error } = useGetAllUsers();

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
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage your Users</CardDescription>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={AllUsersColumns}
            data={data ?? []}
            NameForFilter={"email"}
            FilterInputPlaceholder={"Search by user email"}
          />
        </CardContent>
      </Card>
    </section>
  );
};
export default AllCustomersPage;

"use client";

import React from "react";
import { useRightSideBar } from "../../../store/useRightSideBar";
import { cn } from "../../../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const RightSideBar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { isOpen } = useRightSideBar();

  return (
    <section className={"container mx-auto flex gap-3 p-2"}>
      <section
        className={cn("w-full", {
          "w-9/12": isOpen,
        })}
      >
        {children}
      </section>
      {isOpen && (
        <Card
          className={
            "h-full w-3/12 max-w-[300px] shadow-sm transition-all duration-200 ease-linear"
          }
        >
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      )}
    </section>
  );
};
export default RightSideBar;

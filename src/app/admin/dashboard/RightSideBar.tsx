"use client";

import React from "react";
import { useRightSideBar } from "../../../store/useRightSideBar";
import { cn } from "../../../lib/utils";
import NotificationSection from "./_components/NotificationSection";

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
      {isOpen && <NotificationSection />}
    </section>
  );
};
export default RightSideBar;

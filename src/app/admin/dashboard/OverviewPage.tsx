"use client";

import React from "react";
import StatsSection from "./_components/StatsSection";
import { useRightSideBar } from "../../../store/useRightSideBar";
import { Component } from "../../../components/DemoChart";
import SalesPage from "./_components/charts/Sales";

const OverviewPage = () => {
  const { close } = useRightSideBar();

  React.useEffect(() => {
    close();
  }, [close]);
  return (
    <section className={"container mx-auto flex flex-col gap-4"}>
      {/* Overview */}
      <h1 className={"text-md font-medium text-foreground/80"}>Overview</h1>
      <StatsSection />

      {/*Sales*/}
      <h1 className={"text-md font-medium text-foreground/80"}>Sales</h1>
      <Component />
      <SalesPage />
    </section>
  );
};
export default OverviewPage;

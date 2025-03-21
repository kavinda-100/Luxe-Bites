"use client";

import React from "react";
import StatsSection from "./_components/StatsSection";
import { useRightSideBar } from "../../../store/useRightSideBar";
import SalesPage from "./_components/charts/Sales";
import OrdersChartPage from "./_components/charts/orders";

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
      <SalesPage />

      {/*Orders*/}
      <h1 className={"text-md font-medium text-foreground/80"}>Orders</h1>
      <OrdersChartPage />
    </section>
  );
};
export default OverviewPage;

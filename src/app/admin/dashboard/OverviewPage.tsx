"use client";

import React from "react";
import StatsSection from "./_components/StatsSection";
import { useRightSideBar } from "../../../store/useRightSideBar";
import SalesPage from "./_components/charts/Sales";
import OrdersChartPage from "./_components/charts/orders";
import UserChartPage from "./_components/charts/users";

const OverviewPage = () => {
  const { close } = useRightSideBar();

  React.useEffect(() => {
    close();
  }, [close]);
  return (
    <section className={"container mx-auto flex flex-col gap-4"}>
      {/* Overview */}
      <StatsSection />

      {/*Sales*/}
      <SalesPage />

      {/*Orders*/}
      <OrdersChartPage />

      {/*Users*/}
      <UserChartPage />
    </section>
  );
};
export default OverviewPage;

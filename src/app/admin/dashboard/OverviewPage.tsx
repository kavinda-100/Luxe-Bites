"use client";

import React from "react";
import StatsSection from "./_components/StatsSection";

const OverviewPage = () => {
  return (
    <section className={"container mx-auto flex flex-col gap-4"}>
      <h1 className={"text-md font-medium text-foreground/80"}>Overview</h1>
      <StatsSection />
    </section>
  );
};
export default OverviewPage;

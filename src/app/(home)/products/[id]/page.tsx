import React from "react";
import ViewProduct from "./ViewProduct";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ViewProduct id={id} />;
};
export default Page;

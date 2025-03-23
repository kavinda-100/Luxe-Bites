import React from "react";
import ViewMyFullOrder from "./ViewMyFullOrder";

const Page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  return <ViewMyFullOrder orderId={orderId} />;
};
export default Page;

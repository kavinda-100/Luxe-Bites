import React from "react";

const Page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  return <div>Page</div>;
};
export default Page;

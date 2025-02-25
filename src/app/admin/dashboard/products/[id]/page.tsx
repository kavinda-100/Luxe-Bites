import React from "react";
import ViewProductPage from "./ViewProductPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ViewProductPage id={id} />;
};
export default Page;

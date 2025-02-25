import React from "react";
import ViewAdvertisementPage from "./ViewAdvertisementPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ViewAdvertisementPage id={id} />;
};
export default Page;

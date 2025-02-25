import React from "react";
import ViewCategoryPage from "./ViewCategoryPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return <ViewCategoryPage id={id} />;
};
export default Page;

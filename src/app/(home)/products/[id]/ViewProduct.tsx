"use client";

import React from "react";

type ViewProductProps = {
  id: string;
};

const ViewProduct = ({ id }: ViewProductProps) => {
  return <section className={"container mx-auto"}>ViewProduct : {id}</section>;
};
export default ViewProduct;

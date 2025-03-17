"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const ManageOrdersPage = () => {
  // Get the email from the URL query params.
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return <div>ManageOrdersPage - {orderId}</div>;
};
export default ManageOrdersPage;

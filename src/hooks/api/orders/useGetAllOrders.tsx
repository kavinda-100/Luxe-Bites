"use client";

import type { OrderStatus } from "@prisma/client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../../actions/orders";

export function useGetAllOrders() {
  const [status, setStatus] = useState<OrderStatus>("PROCESSING");
  const [date, setDate] = useState<
    | "Today"
    | "Yesterday"
    | "Last 7 days"
    | "Last 30 days"
    | "Last 90 days"
    | "All time"
  >("All time");

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", { status, date }],
    queryFn: async () => getOrders({ status, date }),
  });

  return {
    status,
    setStatus,
    date,
    setDate,
    data,
    isLoading,
    error,
  };
}

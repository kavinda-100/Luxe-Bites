"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../../actions/orders";

export function useGetOrderById() {
  const [orderId, setOrderId] = React.useState<string>("");
  const [EnableQuery, setEnableQuery] = React.useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    enabled: EnableQuery,
    queryKey: ["order", orderId],
    queryFn: async () => getOrderById(orderId),
  });

  return {
    data,
    isLoading,
    error,
    setOrderId,
    setEnableQuery,
  };
}

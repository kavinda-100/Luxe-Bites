"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyOrderById } from "../../../../actions/users/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

const ViewMyFullOrder = ({ orderId }: { orderId: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getMyOrderById", { orderId }],
    queryFn: async () => getMyOrderById({ orderId }),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="mb-4 h-10 w-full" />
        <Skeleton className="mb-4 h-20 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500">
        <XCircle className="mx-auto mb-2 h-12 w-12" />
        <p>Failed to load order details. Please try again.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-500">
        <p>No order details found.</p>
      </div>
    );
  }

  const {
    orderId: id,
    totalAmount,
    status,
    isPaid,
    createdAt,
    products,
    shippingDetails,
  } = data;

  return (
    <section className="container mx-auto p-6">
      {/* Order Overview */}
      <Card className="mb-6 border-none bg-muted/50 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              Order ID: <span className="font-medium">{id}</span>
            </p>
            <Badge
              variant="outline"
              className={`px-3 py-1 text-white ${getStatusColor(status)}`}
            >
              {status}
            </Badge>
          </div>
          <p className="mt-2 text-gray-700">
            Placed on:{" "}
            <span className="font-medium">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-700">
            Total Amount:{" "}
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </p>
          <div className="mt-2 flex items-center gap-2">
            {isPaid ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
            <span className="text-gray-700">
              {isPaid ? "Paid" : "Not Paid"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Product List */}
      <Card className="mb-6 border-none bg-muted/50 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Ordered Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipping Details */}
      <Card className={"border-none bg-muted/50 shadow-none"}>
        <CardHeader>
          <CardTitle className="text-lg">Shipping Details</CardTitle>
        </CardHeader>
        <CardContent>
          {shippingDetails.length === 0 ? (
            <p className="text-gray-500">No shipping details available.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {shippingDetails.map((detail, index) => (
                <div key={index} className="rounded-md border p-4">
                  <p className="font-medium">
                    {detail.firstName} {detail.lastName}
                  </p>
                  <p className="text-gray-700">
                    {detail.address}, {detail.city}, {detail.state} -{" "}
                    {detail.zip}
                  </p>
                  <p className="text-gray-700">{detail.country}</p>
                  <p className="text-gray-700">Phone: {detail.phone}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/*  cancel the order */}
    </section>
  );
};

// Helper function to get badge color based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500";
    case "PROCESSING":
      return "bg-blue-500";
    case "SHIPPED":
      return "bg-indigo-500";
    case "DELIVERED":
      return "bg-green-500";
    case "CANCELLED":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default ViewMyFullOrder;

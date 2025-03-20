"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useGetOrderById } from "../../../../../hooks/api/orders/useGetOrderById";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency, formatDate } from "../../../../../lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ClipboardCopy, CopyIcon } from "lucide-react";

const ManageOrdersPage = () => {
  // Get the email from the URL query params.
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [newOrderId, setNewOrderId] = React.useState<string | undefined>(
    orderId ?? "",
  );
  const [isOrderIdCopied, setIsOrderIdCopied] = React.useState(false);
  const { data, isLoading, error, setOrderId, setEnableQuery } =
    useGetOrderById();

  React.useEffect(() => {
    if (newOrderId) {
      setOrderId(newOrderId);
      setEnableQuery(true);
    }
  }, [newOrderId, setEnableQuery, setOrderId]);

  if (isLoading) {
    return <Skeleton className={"container mx-auto h-screen"} />;
  }

  if (error) {
    toast.error(error.message);
    return <div>Error: {error.message}</div>;
  }

  const handleSearch = () => {
    if (!newOrderId) {
      toast.error("Please enter order ID");
      return;
    }
    setOrderId(newOrderId);
    setEnableQuery(true);
  };

  return (
    <section className={"container mx-auto"}>
      {/* search */}
      <div className={"flex w-full flex-col gap-3"}>
        <Label>Order ID</Label>
        <div className={"flex items-center gap-2 lg:w-1/2"}>
          <Input
            placeholder={"Enter order ID"}
            value={newOrderId}
            onChange={(e) => setNewOrderId(e.target.value)}
          />
          <Button variant={"secondary"} onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Order Details */}
      <Card className="border-none bg-muted/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className={"flex flex-col gap-4"}>
          <div className="flex justify-between gap-2">
            <strong>Order ID:</strong>
            <span
              className={
                "ml-2 flex items-center gap-2 font-medium text-muted-foreground"
              }
            >
              {isOrderIdCopied ? (
                <ClipboardCopy
                  className={"size-4 cursor-pointer text-emerald-500"}
                />
              ) : (
                <CopyIcon
                  className={"size-4 cursor-pointer text-emerald-500"}
                  onClick={async () => {
                    await navigator.clipboard.writeText(data?.orderId ?? "");
                    setIsOrderIdCopied(true);
                    toast.success("Order ID copied to clipboard");
                    setInterval(() => {
                      setIsOrderIdCopied(false);
                    }, 3000);
                  }}
                />
              )}
              {data?.orderId}
            </span>
          </div>
          <div className={"flex justify-between gap-2"}>
            <strong>Pay:</strong>
            <Badge variant={data?.isPaid ? "default" : "destructive"}>
              {data?.isPaid ? "Paid" : "Pending Payment"}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <p className={"flex justify-between gap-2"}>
              <strong>Status:</strong>
              <span
                className={cn("text-md", {
                  "text-green-700": data?.status === "DELIVERED",
                  "text-yellow-700": data?.status === "SHIPPED",
                  "text-blue-700": data?.status === "PROCESSING",
                  "text-gray-700": data?.status === "PENDING",
                  "text-red-700": data?.status === "CANCELLED",
                })}
              >
                {data?.status === "DELIVERED"
                  ? "Delivered"
                  : data?.status === "SHIPPED"
                    ? "Shipped"
                    : data?.status === "PROCESSING"
                      ? "Processing"
                      : data?.status === "PENDING"
                        ? "Pending"
                        : data?.status === "CANCELLED"
                          ? "Cancelled"
                          : "Unknown"}
              </span>
            </p>
            <p className={"text-md flex justify-between gap-2"}>
              <strong>Product Count:</strong>
              <span className={"font-mono text-lg text-muted-foreground"}>
                {data?.productCount}
              </span>
            </p>
            <p className={"text-md flex justify-between gap-2"}>
              <strong>Total Amount:</strong>
              <span className={"font-mono text-lg text-muted-foreground"}>
                {formatCurrency(data?.totalAmount ?? 0)}
              </span>
            </p>
            <p className={"text-md flex justify-between gap-2"}>
              <strong>Ordered At:</strong>
              <span className={"text-lg text-muted-foreground"}>
                {formatDate(data?.createdAt ?? new Date())}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* User Information */}
      <Card className="border-none bg-muted/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">User Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <img
            src={data?.user.avatar ?? "/placeholder-avatar.png"}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{data?.user.email}</p>
            <p className="text-sm text-muted-foreground">
              User ID: {data?.user.id}
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Shipping Information */}
      <Card className="border-none bg-muted/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Shipping Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2">
            <p>
              <strong>Name:</strong> {data?.shippingDetails.firstName}{" "}
              {data?.shippingDetails.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {data?.shippingDetails.phone}
            </p>
            <p>
              <strong>Address:</strong> {data?.shippingDetails.address},{" "}
              {data?.shippingDetails.city}
            </p>
            <p>
              <strong>State:</strong> {data?.shippingDetails.state},{" "}
              {data?.shippingDetails.country} - {data?.shippingDetails.zipCode}
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Products Ordered */}
      <Card className="border-none bg-muted/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Products Ordered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.products.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-lg border p-3"
              >
                <img
                  src={product.image || "/placeholder-product.png"}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
export default ManageOrdersPage;

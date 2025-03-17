import type { OrderStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../../../components/ui/button";
import { ArrowUpDown, CopyIcon, MoreHorizontal } from "lucide-react";
import { cn, formatCurrency, formatDate } from "../../../../../lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";

type OrdersColumnsType = {
  orderId: string;
  userId: string;
  userEmail: string;
  productCount: number;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  isPaid: boolean;
  createdAt: Date;
};

export const OrdersColumns: ColumnDef<OrdersColumnsType>[] = [
  {
    accessorKey: "userEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.original.userEmail ?? "N/A";
      return <p className={"font-medium"}>{email}</p>;
    },
  },
  {
    accessorKey: "productCount",
    header: "ProductCount",
    cell: ({ row }) => {
      const productCount = row.original.productCount ?? 0;
      return <p className={"font-medium"}>{productCount}</p>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.original.quantity ?? 0;
      return <p className={"font-medium"}>{quantity}</p>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "TotalAmount",
    cell: ({ row }) => {
      const totalAmount = row.original.totalAmount ?? 0;
      return <p className={"font-medium"}>{formatCurrency(totalAmount)}</p>;
    },
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => {
      const isPaid = row.original.isPaid ?? false;
      return (
        <span
          className={cn("rounded-md border px-2 py-1", {
            "border-green-200 bg-green-100 text-green-700": isPaid,
            "border-red-200 bg-red-100 text-red-700": !isPaid,
          })}
        >
          {isPaid ? "Paid" : "Not Paid"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status ?? "PENDING";
      return (
        <span
          className={cn("rounded-md border px-2 py-1", {
            "border-green-200 bg-green-100 text-green-700":
              status === "DELIVERED",
            "border-yellow-200 bg-yellow-100 text-yellow-700":
              status === "SHIPPED",
            "border-blue-200 bg-blue-100 text-blue-700":
              status === "PROCESSING",
            "border-gray-200 bg-gray-100 text-gray-700": status === "PENDING",
            "border-red-200 bg-red-100 text-red-700": status === "CANCELLED",
          })}
        >
          {status === "DELIVERED"
            ? "Delivered"
            : status === "SHIPPED"
              ? "Shipped"
              : status === "PROCESSING"
                ? "Processing"
                : status === "PENDING"
                  ? "Pending"
                  : status === "CANCELLED"
                    ? "Cancelled"
                    : "Unknown"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt ?? new Date();
      return <p className={"font-medium"}>{formatDate(createdAt)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const orderId = row.original.orderId;
      const userId = row.original.userId;
      const userEmail = row.original.userEmail;

      const copyOrderId = async () => {
        await navigator.clipboard.writeText(orderId);
        toast.success("Order ID copied to clipboard");
      };
      const copyUserEmail = async () => {
        await navigator.clipboard.writeText(userEmail);
        toast.success("User Email copied to clipboard");
      };
      const copyUserId = async () => {
        await navigator.clipboard.writeText(userId);
        toast.success("User ID copied to clipboard");
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => copyOrderId()}
              className={"flex cursor-pointer items-center gap-3"}
            >
              <CopyIcon className={"size-3"} />
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyUserId()}
              className={"flex cursor-pointer items-center gap-3"}
            >
              <CopyIcon className={"size-3"} />
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyUserEmail()}
              className={"flex cursor-pointer items-center gap-3"}
            >
              <CopyIcon className={"size-3"} />
              Copy User Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];

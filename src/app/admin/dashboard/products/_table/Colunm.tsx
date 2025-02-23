"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import {
  ArrowUpDown,
  CopyIcon,
  MoreHorizontal,
  PencilIcon,
} from "lucide-react";
import { cn, formatDate } from "../../../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";

type Column = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  stock: number;
  image: string;
  categoryId: string;
  active: boolean;
  rating: number | null;
  createdAt: Date;
  categoryName: string;
};

export const AllProductsColumns: ColumnDef<Column>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const Image = row.original.image ?? "N/A";
      const name = row.original.name ?? "N/A";
      return (
        <Avatar>
          <AvatarImage src={Image} alt="Product Image" />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name ?? "N/A";
      return <p className={"font-medium"}>{name}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description ?? "N/A";
      return (
        <p className={"font-medium"}>{description.slice(0, 20) + "..."}</p>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price ?? "N/A";
      return <p className={"font-medium"}>{price}</p>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.original.discount ?? "N/A";
      return <p className={"font-medium"}>{discount}</p>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.original.stock ?? "N/A";
      return <p className={"font-medium"}>{stock}</p>;
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.original.active ?? false;
      return (
        <span
          className={cn("rounded-md border px-2 py-1", {
            "border-green-200 bg-green-100 text-green-700": active,
            "border-red-200 bg-red-100 text-red-700": !active,
          })}
        >
          {active ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating ?? 0;
      return <p className={"font-medium"}>{rating}</p>;
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
      const id = row.original.id;
      const categoryId = row.original.categoryId;

      const copyCategoryId = async () => {
        await navigator.clipboard.writeText(categoryId);
        toast.success("Category ID copied to clipboard");
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
            <DropdownMenuItem className={"cursor-pointer"}>
              <Link
                href={`/admin/dashboard/products/${id}`}
                className={"flex items-center gap-3"}
              >
                <PencilIcon className={"size-3"} />
                View/Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyCategoryId()}
              className={"flex cursor-pointer items-center gap-3"}
            >
              <CopyIcon className={"size-3"} />
              Copy Category ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];

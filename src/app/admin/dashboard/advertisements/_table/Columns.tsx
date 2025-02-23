"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import { ArrowUpDown, MoreHorizontal, PencilIcon } from "lucide-react";
import { cn, formatDate } from "../../../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import Link from "next/link";

type ColumnType = {
  id: string;
  title: string;
  description: string | null;
  active: boolean;
  link: string | null;
  createdAt: Date;
};

export const AdvertisementColumns: ColumnDef<ColumnType>[] = [
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
    accessorKey: "title",
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
      const name = row.original.title ?? "N/A";
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
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const url = row.original.link ?? "#";
      return (
        <Link
          href={url}
          className={"font-medium hover:text-blue-500 hover:underline"}
        >
          Click
        </Link>
      );
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
                href={`/admin/dashboard/advertisements/${id}`}
                className={"flex items-center gap-3"}
              >
                <PencilIcon className={"size-3"} />
                View/Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];

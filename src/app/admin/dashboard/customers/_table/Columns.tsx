"use client";

import type { Role } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../../../components/ui/button";
import {
  ArrowUpDown,
  CopyIcon,
  MoreHorizontal,
  PencilIcon,
} from "lucide-react";
import { cn, formatDate } from "../../../../../lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import Link from "next/link";

type Column = {
  id: string;
  kindUserId: string;
  email: string;
  name: string | null;
  profilePicture: string | null;
  role: Role;
  banned: boolean;
  createdAt: Date;
};

export const AllUsersColumns: ColumnDef<Column>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "profilePicture",
    header: "Image",
    cell: ({ row }) => {
      const Image = row.original.profilePicture ?? "N/A";
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
    accessorKey: "email",
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
      const email = row.original.email;
      return <p className={"font-medium"}>{email}</p>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <p
          className={cn("font-medium", {
            "text-green-500": role === "ADMIN",
          })}
        >
          {role === "ADMIN" ? "Admin" : role === "USER" ? "User" : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "banned",
    header: "Banned",
    cell: ({ row }) => {
      const banned = row.original.banned;
      return (
        <p
          className={cn("font-medium", {
            "text-red-500": banned,
            "text-green-500": !banned,
          })}
        >
          {banned ? "Yes" : "No"}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <p className={"font-medium"}>{formatDate(createdAt)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.kindUserId;
      const email = row.original.email;

      const copyCategoryId = async () => {
        await navigator.clipboard.writeText(id);
        toast.success("User ID copied to clipboard");
      };

      const copyEmail = async () => {
        await navigator.clipboard.writeText(email);
        toast.success("Email copied to clipboard");
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
            <DropdownMenuItem>
              <Link
                href={`/admin/dashboard/customers/manage?email=${email}`}
                className={"flex cursor-pointer items-center gap-3"}
              >
                <PencilIcon className={"size-3"} />
                Manage User
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyCategoryId()}
              className={"flex cursor-pointer items-center gap-3"}
            >
              <CopyIcon className={"size-3"} />
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyEmail()}
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

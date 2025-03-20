import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import {
  BlocksIcon,
  ChevronUp,
  FolderCog,
  FolderIcon,
  FoldersIcon,
  Grid2X2Icon,
  Home,
  LogOutIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  User2,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

// Menu items.

const products = [
  {
    title: "All Products",
    url: "/admin/dashboard/products", // all product lists
    icon: ShoppingBagIcon,
  },
  {
    title: "Create Product",
    url: "/admin/dashboard/products/create", // create product
    icon: ShoppingBasketIcon,
  },
];

const orders = [
  {
    title: "All Orders",
    url: "/admin/dashboard/orders", // all orders
    icon: FoldersIcon,
  },
  {
    title: "Today Orders",
    url: "/admin/dashboard/orders/new-orders", // new orders
    icon: FolderIcon,
  },
  {
    title: "Manage Orders",
    url: "/admin/dashboard/orders/manage", // manage orders (accept, reject, update shipping status, etc.) by searching the order id
    icon: FolderCog,
  },
];

const customers = [
  {
    title: "All Customers",
    url: "/admin/dashboard/customers", // all customers
    icon: UsersIcon,
  },
  {
    title: "Mange Customer",
    url: "/admin/dashboard/customers/manage?email=", // manage customers (search by customer id, update customer details, etc.)
    icon: UserIcon,
  },
];

const categories = [
  {
    title: "All Categories",
    url: "/admin/dashboard/categories", // all categories
    icon: BlocksIcon,
  },
  {
    title: "Create Category",
    url: "/admin/dashboard/categories/create", // create category
    icon: Grid2X2Icon,
  },
];

export async function AppSidebar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <Sidebar variant={"floating"}>
      <SidebarHeader>
        <Link href={"/"}>
          <h1
            className={
              "cursor-pointer text-nowrap font-mono text-2xl font-bold tracking-tight"
            }
          >
            <span className={"font-extrabold text-primary/90"}>Luxe</span> Bites
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/admin/dashboard"}>
                    <Home />
                    Overview
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* orders */}
        <SidebarGroup>
          <SidebarGroupLabel>Orders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {orders.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* products */}
        <SidebarGroup>
          <SidebarGroupLabel>Products</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {products.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* customers */}
        <SidebarGroup>
          <SidebarGroupLabel>Customers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customers.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={
                  "flex w-full items-center justify-between gap-2 px-3"
                }
              >
                <p className={"capitalize"}>{user?.family_name ?? "User"}</p>
                <ChevronUp className={"size-4"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <User2 className={"size-4"} />
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOutIcon className={"size-4"} />
                  <LogoutLink>Sign Out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

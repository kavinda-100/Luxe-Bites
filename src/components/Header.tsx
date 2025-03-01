import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronDownIcon,
  HeartIcon,
  Menu,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";

// Kinde auth Imports
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import CartIcon from "../app/(home)/cart/_components/CartIcon";

const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  // console.log("header", { user });
  const isUserAuthenticated = await isAuthenticated();

  return (
    <header
      className={"container mx-auto flex items-center justify-between gap-3"}
    >
      <Link href={"/"}>
        <h1
          className={
            "cursor-pointer text-nowrap font-mono text-2xl font-bold tracking-tight"
          }
        >
          <span className={"font-extrabold text-primary/90"}>Luxe</span> Bites
        </h1>
      </Link>
      <NavLinks isMobile={false} />
      <div className={"hidden items-center justify-evenly gap-3 lg:flex"}>
        {!isUserAuthenticated && (
          <>
            <Button variant={"outline"} asChild>
              <LoginLink>Sign In</LoginLink>
            </Button>
            <Button asChild>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </>
        )}
        {isUserAuthenticated && (
          <>
            <Button variant={"outline"} asChild>
              <LogoutLink>Sign Out</LogoutLink>
            </Button>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={"flex cursor-pointer items-center gap-2"}>
              <Avatar>
                <AvatarImage src={user?.picture ?? " "} />
                <AvatarFallback>
                  {user?.family_name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ChevronDownIcon className={"size-3"} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"end"}>
            <DropdownMenuItem>
              <Link href={"/wishlist"} className={"flex items-center gap-2"}>
                <HeartIcon className={"size-3"} />
                <span>Wishlist</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/cart"} className={"flex items-center gap-2"}>
                <ShoppingCartIcon className={"size-3"} />
                <span>Cart</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/profile"} className={"flex items-center gap-2"}>
                <UserIcon className={"size-3"} />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CartIcon />
        <ModeToggle size={"icon"} />
      </div>
      <div className={"block lg:hidden"}>
        <MobileHeader />
      </div>
    </header>
  );
};
export default Header;

const MobileHeader = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className={"size-6"} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>
              <h2
                className={
                  "cursor-pointer text-nowrap font-mono text-2xl font-bold tracking-tight"
                }
              >
                <span className={"font-extrabold text-primary/90"}>Luxe</span>{" "}
                Bites
              </h2>
            </Link>
          </SheetTitle>
          <SheetContent>
            <div className={"flex items-center justify-center gap-3"}>
              <h4>Hi, {user?.family_name ?? "User"}</h4>
              <Avatar>
                <AvatarImage src={user?.picture ?? " "} />
                <AvatarFallback>
                  {user?.family_name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ModeToggle size={"icon"} />
            </div>
            <div className={"my-2 w-full border border-t"} />
            <NavLinks isMobile={true} />
            <div className={"my-2 w-full border border-t"} />
            <div className={"flex flex-col gap-3"}>
              {!isUserAuthenticated && (
                <>
                  <Button variant={"outline"} asChild>
                    <LoginLink>Sign In</LoginLink>
                  </Button>
                  <Button asChild>
                    <RegisterLink>Sign Up</RegisterLink>
                  </Button>
                </>
              )}
              {isUserAuthenticated && (
                <Button variant={"outline"} asChild>
                  <LogoutLink>Sign Out</LogoutLink>
                </Button>
              )}
            </div>
            <div className={"mt-3 flex w-full flex-col gap-3"}>
              <Button variant={"outline"} asChild className={"w-full"}>
                <Link href={"/wishlist"} className={"flex items-center gap-2"}>
                  <HeartIcon className={"size-3"} />
                  <span>Wishlist</span>
                </Link>
              </Button>
              <Button variant={"outline"} asChild className={"w-full"}>
                <Link href={"/cart"} className={"flex items-center gap-2"}>
                  <ShoppingCartIcon className={"size-3"} />
                  <span>Cart</span>
                </Link>
              </Button>
              <Button variant={"outline"} asChild className={"w-full"}>
                <Link href={"/profile"} className={"flex items-center gap-2"}>
                  <UserIcon className={"size-3"} />
                  <span>Profile</span>
                </Link>
              </Button>
            </div>
          </SheetContent>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

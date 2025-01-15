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
import { Menu } from "lucide-react";

const isAuthenticated = true;

const Header = () => {
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
        {!isAuthenticated && (
          <>
            <Button variant={"outline"}>Sign In</Button>
            <Button>Sign Up</Button>
          </>
        )}
        {isAuthenticated && (
          <>
            <Button variant={"outline"}>Sign Out</Button>
          </>
        )}
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
        <ModeToggle />
      </div>
      <div className={"block lg:hidden"}>
        <MobileHeader />
      </div>
    </header>
  );
};
export default Header;

const MobileHeader = () => {
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
              <h4>Hi, User</h4>
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback>K</AvatarFallback>
              </Avatar>
              <ModeToggle />
            </div>
            <div className={"my-2 w-full border border-t"} />
            <NavLinks isMobile={true} />
            <div className={"my-2 w-full border border-t"} />
            <div className={"flex flex-col gap-3"}>
              {!isAuthenticated && (
                <>
                  <Button variant={"outline"}>Sign In</Button>
                  <Button>Sign Up</Button>
                </>
              )}
              {isAuthenticated && <Button variant={"outline"}>Sign Out</Button>}
            </div>
          </SheetContent>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

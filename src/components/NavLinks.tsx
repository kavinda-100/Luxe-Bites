"use client";

import React from "react";
import Link from "next/link";
import { ChefHat, House, PhoneCall, Store } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const navLinks = [
  {
    title: "Home",
    href: "/",
    icon: <House className={"size-3"} />,
  },
  {
    title: "About",
    href: "/about",
    icon: <Store className={"size-3"} />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <PhoneCall className={"size-3"} />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <ChefHat className={"size-3"} />,
  },
];

const NavLinks = ({ isMobile }: { isMobile: boolean }) => {
  const pathname = usePathname();
  return (
    <>
      {isMobile ? (
        <nav className={"flex flex-col gap-3"}>
          {navLinks.map((link, index) => (
            <Button
              key={index}
              variant={"ghost"}
              className={cn("w-full", {
                "text-primary": pathname === link.href,
              })}
              asChild
            >
              <Link href={link.href}>
                <div className={"flex items-center justify-center gap-2"}>
                  {link.icon}
                  <span className={"text-md font-semibold"}>{link.title}</span>
                </div>
              </Link>
            </Button>
          ))}
        </nav>
      ) : (
        <nav className={"hidden items-center justify-evenly gap-3 lg:flex"}>
          {navLinks.map((link, index) => (
            <Button
              key={index}
              variant={"ghost"}
              className={cn("", {
                "text-primary": pathname === link.href,
              })}
              asChild
            >
              <Link href={link.href}>
                <div className={"flex items-center justify-center gap-2"}>
                  {link.icon}
                  <span className={"text-md font-semibold"}>{link.title}</span>
                </div>
              </Link>
            </Button>
          ))}
        </nav>
      )}
    </>
  );
};
export default NavLinks;

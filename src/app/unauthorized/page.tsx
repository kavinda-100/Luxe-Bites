import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BanIcon } from "lucide-react";

const Unauthorized = () => {
  return (
    <section
      className={
        "container mx-auto flex h-screen flex-col items-center justify-center"
      }
    >
      <div
        className={
          "flex w-full max-w-[300px] flex-col items-center justify-center rounded px-3 py-2"
        }
      >
        <BanIcon className={"size-[300px] text-red-500"} />
        <p className={"mt-2 text-sm text-muted-foreground"}>
          Unauthorized! Please Sign In To Shop{" "}
          <Link href={"/"} className={"text-primary"}>
            here
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Unauthorized;

import React from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const RedirectPage = () => {
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
        <Image
          src={"/animations/Cooking.gif"}
          alt={"loading-animation"}
          width={1000}
          height={1000}
          className={"size-full object-cover"}
        />
        <p className={"mt-2 text-sm text-muted-foreground"}>
          Redirecting... If you are not redirected in a few seconds, click{" "}
          <Link href={"/"} className={"text-primary"}>
            here
          </Link>
        </p>
      </div>
    </section>
  );
};
export default RedirectPage;

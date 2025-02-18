"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "../../actions/AuthActions";
import { useRouter } from "next/navigation";

const RedirectPage = () => {
  const router = useRouter();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { mutate } = useMutation({
    mutationFn: async () => verifyUser(),
    onSuccess: (data) => {
      if (data.success) {
        router.push("/");
      }
    },
    onError: (error) => {
      router.push(`/error?message=${error.message}`);
    },
  });

  React.useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <section
      className={
        "container mx-auto flex h-screen flex-col items-center justify-center"
      }
    >
      {/*<div className="] absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>*/}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] dark:[background-size:16px_16px]"></div>

      <div
        className={
          "flex w-full max-w-[300px] flex-col items-center justify-center gap-3 rounded px-3 py-2"
        }
      >
        <Image
          src={"/animations/Cooking.gif"}
          alt={"loading-animation"}
          width={1000}
          height={1000}
          className={"size-full object-cover"}
        />
        <p className={"text-center text-sm text-muted-foreground"}>
          Verifying your credentials, please wait...
        </p>
        <div className={"text-center text-sm text-muted-foreground"}>
          If you are not redirected in a 60 seconds,{" "}
          <span className={"mx-3 text-center text-sm text-muted-foreground"}>
            {count > 60 ? (
              <Link href={"/"} className={"text-primary"}>
                click here
              </Link>
            ) : (
              <p className={"font-bold text-primary"}>{count}</p>
            )}
          </span>
        </div>
      </div>
    </section>
  );
};
export default RedirectPage;

"use client";

import React from "react";
import { BanIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const router = useRouter();

  const GoBack = () => {
    router.back();
  };

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
        <BanIcon className={"size-[300px] animate-bounce text-red-500"} />
        <p
          className={
            "mt-2 text-center text-sm text-muted-foreground text-red-500"
          }
        >
          {message}
        </p>
        <p className={"mt-2 text-center text-sm text-muted-foreground"}>
          Please Try to Sign In Again{" "}
          <Link
            href={`/api/auth/login?post_login_redirect_url=/`}
            className={"text-primary"}
          >
            Sign In
          </Link>
        </p>
        <div
          onClick={GoBack}
          className={"mt-4 flex cursor-pointer items-center gap-3"}
        >
          <BiArrowBack className={"text-primary"} />
          <p>Go back</p>
        </div>
      </div>
    </section>
  );
};
export default ErrorPage;

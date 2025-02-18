import React from "react";
import Link from "next/link";
import { BanIcon } from "lucide-react";

type UnauthorizedProps = {
  post_login_redirect_url: string | null;
};

const Unauthorized = ({ post_login_redirect_url }: UnauthorizedProps) => {
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
        <p className={"mt-2 text-2xl font-bold text-red-500"}>Unauthorized!</p>
        <p className={"mt-2 text-sm text-muted-foreground"}>
          Please Sign In To Shop{" "}
          <Link
            href={`/api/auth/login?post_login_redirect_url=${post_login_redirect_url ?? "/"}`}
            className={"text-primary"}
          >
            here
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Unauthorized;

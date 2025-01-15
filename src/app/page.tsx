import { AnimatedShinyTextDemo } from "../components/animations/AnimatedShinyTextDemo";
import ButtonRotatingBackgroundGradient from "../components/animations/ButtonRotatingBackgroundGradient";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <>
      <section className={"container mx-auto"}>
        {/*<div className="] absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>*/}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] dark:[background-size:16px_16px]"></div>

        <AnimatedShinyTextDemo />
        <div
          className={
            "mx-auto flex max-w-3xl flex-col items-center justify-center"
          }
        >
          <Link href={"/"}>
            <ButtonRotatingBackgroundGradient text={"Order Now"} />
          </Link>
        </div>
      </section>
    </>
  );
}

import { AnimatedShinyTextDemo } from "../../components/animations/AnimatedShinyTextDemo";
import ButtonRotatingBackgroundGradient from "../../components/animations/ButtonRotatingBackgroundGradient";
import Link from "next/link";
import React from "react";
import { TypewriterEffect } from "../../components/animations/aceternity/typewriter-effect";

const words = [
  { text: "Welcome" },
  { text: "To" },
  { text: "The" },
  {
    text: "Luxe",
    className: "text-primary/70 dark:text-primary",
  },
  {
    text: "Bites",
    className: "text-primary dark:text-primary",
  },
];

export default function HomePage() {
  return (
    <>
      <section className={"container mx-auto"}>
        {/*<div className="] absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>*/}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] dark:[background-size:16px_16px]"></div>

        {/* Hero section */}
        <section
          className={
            "container mx-auto mt-20 flex flex-col items-center justify-center"
          }
        >
          <div className={"mx-auto w-full max-w-3xl"}>
            <AnimatedShinyTextDemo />
          </div>

          <div className={"mx-auto my-6 w-full max-w-3xl"}>
            <TypewriterEffect words={words} />
          </div>
          <div
            className={
              "mx-auto flex max-w-3xl flex-col items-center justify-center"
            }
          >
            <Link href={"/public"}>
              <ButtonRotatingBackgroundGradient text={"Order Now"} />
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}

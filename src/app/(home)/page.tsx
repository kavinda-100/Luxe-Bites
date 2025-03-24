import { AnimatedShinyTextDemo } from "../../components/animations/AnimatedShinyTextDemo";
import ButtonRotatingBackgroundGradient from "../../components/animations/ButtonRotatingBackgroundGradient";
import Link from "next/link";
import React from "react";
import { TypewriterEffect } from "../../components/animations/aceternity/typewriter-effect";
import { Testimonials } from "../../components/animations/eldoraui/testimonals";
import HowItWorks from "../../components/animations/HowItWorks";
import FeaturedProducts from "../../components/FeaturedProducts";

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
            <Link href={"/products"}>
              <ButtonRotatingBackgroundGradient text={"Order Now"} />
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <section className="container relative z-10 mx-auto mb-8 mt-4 h-[700px] w-full overflow-hidden rounded-lg bg-background">
          <Testimonials />
        </section>
      </section>
    </>
  );
}

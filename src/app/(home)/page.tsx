import { AnimatedShinyTextDemo } from "../../components/animations/AnimatedShinyTextDemo";
import ButtonRotatingBackgroundGradient from "../../components/animations/ButtonRotatingBackgroundGradient";
import Link from "next/link";
import React from "react";
import { TypewriterEffect } from "../../components/animations/aceternity/typewriter-effect";
import { Testimonials } from "../../components/animations/eldoraui/testimonals";

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

const steps = [
  {
    title: "Browse Menu",
    description: "Explore our delicious menu and pick your favorites.",
  },
  {
    title: "Place Order",
    description: "Add items to your cart and proceed to checkout.",
  },
  {
    title: "Enjoy Your Meal",
    description: "Sit back and relax while we prepare your food.",
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

        {/* how it works */}
        <section
          id="how-it-works"
          className="container mx-auto mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-primary">How It Works</h2>
          <div className="mt-8 flex flex-col gap-8 md:flex-row">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900"
              >
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container relative z-10 mx-auto mb-8 mt-4 h-[700px] w-full overflow-hidden rounded-lg bg-background">
          <Testimonials />
        </section>
      </section>
    </>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { Marquee } from "./marquee";
import React from "react";

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-primary/50 p-1 py-0.5 font-bold text-primary dark:bg-primary/50 dark:text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;

  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
        // light styles
        "border border-neutral-200 bg-background shadow-sm",
        // dark styles
        "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
      {...props}
    >
      <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
        </div>
      </div>

      <div className="flex w-full select-none items-center justify-start gap-5">
        <Image
          width={40}
          height={40}
          src={img ?? ""}
          alt={name}
          className="size-10 rounded-full ring-1 ring-border ring-offset-4"
        />

        <div>
          <p className="font-medium text-muted-foreground">{name}</p>
          <p className="text-xs font-normal text-muted-foreground/80">{role}</p>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Food Blogger",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
    description: (
      <p>
        Luxe Bites has completely transformed my dining experience.
        <Highlight>
          Their gourmet food items are top-notch and always fresh.
        </Highlight>{" "}
        A must-try for any food enthusiast.
      </p>
    ),
  },
  {
    name: "Samantha Lee",
    role: "Culinary Expert",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        Luxe Bites&apos;s selection of food items has drastically improved my
        culinary creations.
        <Highlight>
          The quality and variety are unmatched, making it easy to create
          high-quality dishes effortlessly.
        </Highlight>{" "}
        Highly recommend it to fellow chefs.
      </p>
    ),
  },
  {
    name: "Raj Patel",
    role: "Restaurant Owner",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        As a restaurant owner, I need reliable suppliers. Luxe Bites&apos;s
        premium food items and timely delivery have made it an essential part of
        our supply chain.
        <Highlight>Our customers love the quality of our dishes.</Highlight>
      </p>
    ),
  },
  {
    name: "Emily Chen",
    role: "Home Chef",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        Luxe Bites&apos;s pre-packaged meals have made it so easy to prepare
        delicious and healthy meals at home.
        <Highlight>
          It&apos;s perfect for busy individuals who still want to eat well.
        </Highlight>{" "}
        A must-have for any home chef.
      </p>
    ),
  },
  {
    name: "Michael Brown",
    role: "Food Critic",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        Luxe Bites&apos;s gourmet food items have elevated my dining reviews.
        <Highlight>
          The feedback on their products is phenomenal.
        </Highlight>{" "}
        It&apos;s a game-changer for food critics and enthusiasts.
      </p>
    ),
  },
  {
    name: "Linda Wu",
    role: "Nutritionist",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        Luxe Bites&apos;s healthy food options have simplified meal planning for
        my clients.
        <Highlight>
          Building nutritious and delicious meal plans has never been this
          efficient.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Carlos Gomez",
    role: "Fitness Trainer",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        Luxe Bites&apos;s protein-packed snacks have helped my clients stay
        energized and healthy.
        <Highlight>
          It&apos;s revolutionized how we approach fitness nutrition.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Aisha Khan",
    role: "E-commerce Specialist",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        Luxe Bites&apos;s beautifully crafted food items have completely
        transformed our online store.
        <Highlight>
          Customers love the dynamic shopping experience and the quality of the
          products.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Tom Chen",
    role: "Health Coach",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        Luxe Bites has made it easy to create user-friendly, accessible meal
        plans for my clients.
        <Highlight>
          It&apos;s a crucial part of our health coaching system.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Sofia Patel",
    role: "Teacher",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    description: (
      <p>
        Luxe Bites&apos;s education-focused food kits have doubled our
        platform&apos;s usability.
        <Highlight>
          It&apos;s tailor-made for addressing student and teacher needs.
        </Highlight>{" "}
      </p>
    ),
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="container py-10">
      <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        What People Are Saying
      </h2>
      <h3 className="mx-auto mb-8 max-w-lg text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Don&apos;t just take our word for it. Here&apos;s what{" "}
        <span className="text-foreground">real people</span> are saying about{" "}
        <span className="from-fg-onAccent text-primary">Luxe Bites</span>
      </h3>
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CreditCard, ShoppingCartIcon, Truck } from "lucide-react"; // Icons

const steps = [
  {
    title: "Place Your Order",
    description: "Select your favorite meals and add them to your cart.",
    icon: ShoppingCartIcon,
  },
  {
    title: "Processing Payment",
    description: "Your payment is securely processed.",
    icon: CreditCard,
  },
  {
    title: "Delivered to Your Doorstep",
    description: "Your food is on the way! Enjoy your meal.",
    icon: Truck,
  },
];

export default function HowItWorks() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % steps.length);
    }, 2500); // Change steps every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      className="container mx-auto mt-16 flex-col items-center justify-center text-center"
    >
      <h2 className="text-3xl font-bold text-primary">How It Works</h2>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        Seamless Ordering Process in Three Steps!
      </p>

      {/* Centered Layout with Equal Width */}
      <div className="relative mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-10 px-4 md:grid-cols-3 md:px-0">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{
                scale: step === index ? 1.1 : 1,
                opacity: step === index ? 1 : 0.6,
              }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col items-center justify-center rounded-lg p-6 shadow-lg transition-all ${
                step === index
                  ? "bg-primary/10 dark:bg-primary/20"
                  : "bg-white dark:bg-gray-900"
              }`}
            >
              <Icon
                className={`h-14 w-14 ${step === index ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}
              />
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src="/about-hero.jpg"
          alt="Luxe Bites - About Us"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold">About Luxe Bites</h1>
          <p className="text-lg">Bringing Fresh Local Food to Your Doorstep</p>
        </div>
      </div>

      {/* Who We Are Sectioned. */}
      <div className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <Image
          src="/local-food.jpg"
          alt="Local Food"
          width={500}
          height={400}
          className="rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold">Who We Are</h2>
          <p className="mt-4 text-gray-600">
            Luxe Bites is a one-stop e-commerce platform connecting local food
            shops with customers who love fresh and organic food. We aim to
            support small businesses while delivering high-quality meals and
            groceries.
          </p>
        </div>
      </div>

      {/* Our Mission & Vision */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Luxe Bites is dedicated to **making local food accessible**, promoting
          **sustainability**, and ensuring **fast & fresh delivery**. We believe
          in empowering local food businesses and providing the best for our
          customers.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
        <Card className="p-6">
          <CardContent>
            <Image
              src="/fresh-food.jpg"
              alt="Fresh Food"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">Fresh & Organic</h3>
            <p className="mt-2 text-gray-600">
              We source food directly from trusted local shops.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent>
            <Image
              src="/local-support.jpeg"
              alt="Support Local"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">Support Local Shops</h3>
            <p className="mt-2 text-gray-600">
              Your purchases help small food businesses grow.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent>
            <Image
              src="/fast-delivery.jpg"
              alt="Fast Delivery"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">
              Fast & Reliable Delivery
            </h3>
            <p className="mt-2 text-gray-600">
              Enjoy fresh food at your doorstep in no time.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((review) => (
            <Card key={review} className="p-6">
              <CardContent>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="mt-2 text-gray-700">
                  &#34;Luxe Bites made my life easier! The food is fresh and
                  delivery is quick!&#34;
                </p>
                <p className="mt-2 text-gray-500">- Happy Customer</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

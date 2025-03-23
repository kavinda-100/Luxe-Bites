"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold">Contact Us</h1>
      <p className="mt-2 text-center text-gray-600">
        Have questions? Reach out to us, and we'll be happy to assist you.
      </p>

      {/* Contact Info */}
      <div className="mt-12 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
        <div>
          <Mail className="mx-auto text-primary" size={40} />
          <h3 className="mt-2 text-lg font-semibold">Email Us</h3>
          <p className="text-gray-600">support@luxebites.com</p>
        </div>
        <div>
          <Phone className="mx-auto text-primary" size={40} />
          <h3 className="mt-2 text-lg font-semibold">Call Us</h3>
          <p className="text-gray-600">+1 234 567 890</p>
        </div>
        <div>
          <MapPin className="mx-auto text-primary" size={40} />
          <h3 className="mt-2 text-lg font-semibold">Our Location</h3>
          <p className="text-gray-600">123 Luxe Bites St, Food City, USA</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="mx-auto mt-12 max-w-lg space-y-4">
        <Input placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Textarea placeholder="Your Message" required />
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </section>
  );
};

export default ContactUs;

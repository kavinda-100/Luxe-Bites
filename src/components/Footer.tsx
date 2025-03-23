import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="bg-background py-12 text-foreground">
      <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-3">
        {/* Branding & Description */}
        <div>
          <h2 className="text-2xl font-bold">Luxe Bites</h2>
          <p className="mt-2 text-gray-400">
            Your one-stop platform for fresh & delicious local food, delivered
            fast.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary">
                Our Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold">Get in Touch</h3>
          <p className="mt-2 flex items-center gap-2 text-gray-400">
            <Mail className="text-primary" size={18} /> support@luxebites.com
          </p>
          <div className="mt-4 flex space-x-4">
            <Link href="#" className="hover:text-primary">
              <SlSocialFacebook className={"size-6"} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <FaInstagram className={"size-6"} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <CiTwitter className={"size-6"} />
            </Link>
          </div>

          {/* Newsletter Signup */}
          <h3 className="mt-6 text-xl font-semibold">
            Subscribe to our Newsletter
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-none bg-muted"
            />
            <Button className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 pt-4 text-center text-muted-foreground">
        &copy; {new Date().getFullYear()} Luxe Bites. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

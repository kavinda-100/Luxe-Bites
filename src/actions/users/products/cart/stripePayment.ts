"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { z } from "zod";
import { zodCartShippingDetails } from "../../../../zod/cart";
import { prisma } from "../../../../server/db";
import { stripe } from "@/lib/stripe";
import { AllowedCountries } from "../../../../constants";

const DOMAIN_NAME =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.DOMAIN_NAME;

const covertToCents = (amount: number) => {
  return Math.round(amount * 100);
};

export const stripePayment = async (
  data: z.infer<typeof zodCartShippingDetails>,
) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const validatedData = zodCartShippingDetails.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Invalid Shipping Details");
    }
    // get the all the items in the cart
    const cart = await prisma.cart.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }
    // calculate the total amount
    const totalAmount = cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    // calculate the total quantity
    const totalQuantity = cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    // create the order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        quantity: totalQuantity,
        productIds: cart.map((item) => item.productId),
        isPaid: false,
      },
    });
    if (!order) {
      throw new Error("Error creating order");
    }
    // create the shipping details
    const shippingDetails = await prisma.shippingDetails.create({
      data: {
        userId: user.id,
        orderId: order.id,
        firstName: validatedData.data.firstName,
        lastName: validatedData.data.lastName,
        address: validatedData.data.address,
        city: validatedData.data.city,
        state: validatedData.data.state,
        zip: validatedData.data.zip,
        country: validatedData.data.country,
        phone: validatedData.data.phone,
      },
    });
    if (!shippingDetails) {
      throw new Error("Error creating shipping details");
    }
    // create the line items for the stripe payment
    const lineItems = cart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: [item.product.image],
          },
          unit_amount: covertToCents(item.product.price), // convert to cents
        },
        quantity: item.quantity,
      };
    });
    const customer = await stripe.customers.create({
      email: user.email!,
    });
    // create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      metadata: {
        orderId: order.id,
      },
      mode: "payment",
      success_url: `${DOMAIN_NAME}/cart/checkout/success?order_id=${order.id}`,
      cancel_url: `${DOMAIN_NAME}/cart/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: AllowedCountries,
      },
      customer: customer.id,
      // expires at 30 minutes (min value is 30 minutes)
      expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
    });
    if (!session) {
      throw new Error("Error creating stripe session");
    }
    // clear the cart
    await prisma.cart.deleteMany({
      where: {
        userId: user.id,
      },
    });
    // return the session url
    return {
      success: true,
      message: "Session created successfully",
      url: session.url,
    };
  } catch (e: unknown) {
    console.log("Error in stripePayment", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
};

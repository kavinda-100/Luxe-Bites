import type { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import { prisma } from "../../../../server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export async function POST(req: Request) {
  console.log("POST /api/webhooks/stripe route hit.");
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let user: User | null = null;
  try {
    const body = await req.text();
    const header = await headers();
    const signature = header.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET_KEY,
    );

    const data = event.data;
    const eventType = event.type;

    switch (eventType) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items", "customer_details"],
          },
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details!;
        const lineItems = session.line_items?.data ?? [];
        console.log("lineItems -checkout.session.completed", lineItems);

        if (customerDetails.email) {
          user = await prisma.user.findUnique({
            where: {
              email: customerDetails.email,
            },
          });
          if (!user) {
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 },
            );
          }
          console.log("User found -checkout.session.completed", user);
          if (!user.StripeId) {
            const updatedUser = await prisma.user.update({
              where: {
                email: customerDetails.email,
              },
              data: {
                StripeId: customerId,
              },
            });
            if (updatedUser) {
              console.log(
                "User StripeId is updated -checkout.session.completed",
                updatedUser,
              );
            } else {
              console.log(
                "User StripeId is not updated -checkout.session.completed",
                updatedUser,
              );
            }
          }
          // onetime purchase
          const { orderId } = session.metadata as { orderId: string };

          await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              status: "PROCESSING",
              isPaid: true,
            },
          });
        }
        break;
      }
      case "checkout.session.expired": {
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
        );
        await prisma.order.delete({
          where: { id: session.metadata!.orderId },
        });
        break;
      }
      default:
        console.log(`Unhandled event type: ${eventType}`);
        break;
    }

    console.log("Event processed successfully");
    return NextResponse.json({ received: true });
  } catch (e: unknown) {
    console.log("Error in POST /api/webhooks/stripe", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "../../../../server/db";

const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export async function POST(req: Request) {
  console.log("POST /api/webhooks/stripe route hit.");

  try {
    const body = await req.text();
    const header = await headers();
    const signature = header.get("stripe-signature");

    if (!signature) {
      console.error("No signature in webhook");
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET_KEY,
    );

    console.log("Webhook event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const orderId = session.metadata?.orderId;
      if (!orderId) {
        console.error("No order ID in session metadata");
        return NextResponse.json(
          { error: "Invalid metadata" },
          { status: 400 },
        );
      }

      const user = await prisma.user.findUnique({
        where: { email: session.metadata?.customerEmail },
      });

      if (!user) {
        console.error(
          "User not found for email:",
          session.metadata?.customerEmail,
        );
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (!user.StripeId) {
        await prisma.user.update({
          where: { id: user.id },
          data: { StripeId: session.customer as string },
        });
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PROCESSING",
          isPaid: true,
        },
      });

      console.log("Order updated successfully:", orderId);
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        console.error(
          "No order ID in session metadata for -checkout.session.expired",
        );
        return NextResponse.json(
          { error: "Invalid metadata" },
          { status: 400 },
        );
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "CANCELLED",
        },
      });

      console.log("Order cancelled due to expired session:", orderId);
    }

    console.log("Webhook event handled successfully");
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}

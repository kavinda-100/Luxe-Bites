"use server";

import { checkIsAdmin } from "../../AuthActions";
import { prisma } from "../../../server/db";

export async function searchProductsByName({
  searchTerm,
}: {
  searchTerm: string;
}) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // if no search term, return null
    if (!searchTerm) {
      return { success: true, data: null };
    }
    // search for products
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return { success: true, data: products };
  } catch (e: unknown) {
    console.log("Error in useSearchProducts", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

"use server";

import type { z } from "zod";
import { checkIsAdmin } from "../AuthActions";
import { productSchema } from "../../zod/products";
import { zodIssueToString } from "../../zod/utils";
import { prisma } from "../../server/db";

export async function createProduct(product: z.infer<typeof productSchema>) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // validate product data
    const validatedProduct = productSchema.safeParse(product);
    if (!validatedProduct.success) {
      throw new Error("Invalid product data");
    }
    // check if category exists
    const category = await prisma.category.findUnique({
      where: { id: product.categoryId },
    });
    if (!category) {
      throw new Error("Category does not exist");
    }
    // create product
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        discount: parseFloat(product.discount ?? "0"),
        image: product.image,
        active: product.active,
        rating: 0.0,
      },
    });
    if (!createdProduct) {
      throw new Error("Error creating product");
    }
    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (e: unknown) {
    console.log("Error creating product: ", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

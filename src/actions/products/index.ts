"use server";

import type { z } from "zod";
import { checkIsAdmin } from "../AuthActions";
import { productSchema } from "../../zod/products";
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
    throw new Error("Internal server cancel");
  }
}

export async function getAllProducts() {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      image: product.image,
      categoryId: product.categoryId,
      active: product.active,
      rating: product.rating,
      createdAt: product.createdAt,
      categoryName: product.category.name,
    }));
  } catch (e: unknown) {
    console.log("Error getting all products: ", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server cancel");
  }
}

export async function getProductById(id: string) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        discount: true,
        stock: true,
        image: true,
        categoryId: true,
        active: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      image: product.image,
      categoryId: product.categoryId,
      active: product.active,
      categoryName: product.category.name,
    };
  } catch (e: unknown) {
    console.log("Error getting product by id: ", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server cancel");
  }
}

export async function updateProduct({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof productSchema>;
}) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const validatedProduct = productSchema.safeParse(data);
    if (!validatedProduct.success) {
      throw new Error("Invalid product data");
    }
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        discount: parseFloat(data.discount ?? "0"),
        image: data.image,
        active: data.active,
      },
    });
    if (!updatedProduct) {
      throw new Error("Error updating product");
    }
    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (e: unknown) {
    console.log("Error updating product: ", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server cancel");
  }
}

export async function deleteProducts(ids: string | string[]) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const productIds = Array.isArray(ids) ? ids : [ids];
    // check if products exist
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    // if not all products exist, throw cancel
    if (products.length !== productIds.length) {
      throw new Error("Product not found");
    }
    // delete products
    const deletedProducts = await prisma.product.deleteMany({
      where: { id: { in: productIds } },
    });
    if (!deletedProducts) {
      throw new Error("Error deleting product");
    }
    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (e: unknown) {
    console.log("Error deleting product: ", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server cancel");
  }
}

// get featured products that have a rating of 3 or more and higher reviews and limit to 4
export const getFeaturedProducts = async () => {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        rating: {
          gte: 3,
        },
      },
      orderBy: {
        reviews: {
          _count: "desc",
        },
      },
      take: 4,
      include: {
        category: true,
        reviews: true,
      },
    });

    return featuredProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.image,
      description: product.description,
    }));
  } catch (e: unknown) {
    console.log("Error getting featured products: ", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
};

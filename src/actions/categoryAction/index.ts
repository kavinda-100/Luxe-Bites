"use server";

import type { z } from "zod";
import { categoriesSchema } from "../../zod/categories";
import { zodIssueToString } from "../../zod/utils";
import { prisma } from "../../server/db";
import { checkIsAdmin } from "../AuthActions";

export async function createCategory(data: z.infer<typeof categoriesSchema>) {
  try {
    // get user.
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
      // return { success: false, message: "Unauthorized" };
    }
    // validate data.
    const validData = categoriesSchema.safeParse(data);
    if (!validData.success) {
      throw new Error(zodIssueToString(validData.error.errors));
      // return {
      //   success: false,
      //   message: zodIssueToString(validData.error.errors),
      // };
    }
    // check if category exists.
    const existingCategory = await prisma.category.findFirst({
      where: { name: data.name },
      select: { name: true },
    });
    if (existingCategory?.name) {
      throw new Error("Category already exists");
      // return { success: false, message: "Category already exists" };
    }
    // create category.
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    if (!newCategory) {
      throw new Error("Error creating category");
      // return { success: false, message: "Error creating category" };
    }
    // return success.
    return { success: true, message: "Category created successfully" };
  } catch (e: unknown) {
    console.log("Error creating category", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function getResentCategories() {
  try {
    // get user.
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
      // return { success: false, message: "Unauthorized" };
    }
    const resentCategories = await prisma.category.findMany({
      take: 5,
      select: { id: true, name: true, description: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    return { resentCategories };
  } catch (e: unknown) {
    console.log("Error getting resent categories", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function getAllCategories() {
  try {
    // get user.
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, createdAt: true, description: true },
    });
    return { categories };
  } catch (e: unknown) {
    console.log("Error getting all categories", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function getCategoryById(id: string) {
  try {
    // get user.
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const category = await prisma.category.findUnique({
      where: { id },
      select: { id: true, name: true, createdAt: true, description: true },
    });
    return { category };
  } catch (e: unknown) {
    console.log("Error getting category by id", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

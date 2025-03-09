"use server";

import type { z } from "zod";
import { categoriesSchema } from "../../zod/categories";
import { zodIssueToString } from "../../zod/utils";
import { prisma } from "../../server/db";
import { checkIsAdmin, checkIsUser } from "../AuthActions";

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
      //   message: zodIssueToString(validData.cancel.errors),
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
    throw new Error("Internal server cancel");
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
    throw new Error("Internal server cancel");
  }
}

export async function getAllCategories() {
  try {
    // get user.
    const user = await checkIsUser();
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
    throw new Error("Internal server cancel");
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
    throw new Error("Internal server cancel");
  }
}

export async function updateCategory({
  data,
  id,
}: {
  data: z.infer<typeof categoriesSchema>;
  id: string;
}) {
  try {
    // get user.
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // validate data.
    const validData = categoriesSchema.safeParse(data);
    if (!validData.success) {
      throw new Error(zodIssueToString(validData.error.errors));
    }
    // check if category exists.
    const existingCategory = await prisma.category.findUnique({
      where: { id: id },
    });
    if (!existingCategory) {
      throw new Error("Category Don't exists");
    }
    // update category.
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    if (!updatedCategory) {
      throw new Error("Error updating category");
    }
    return { success: true, message: "Category updated successfully" };
  } catch (e: unknown) {
    console.log("Error updating category", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server cancel");
  }
}

export async function deleteCategories(ids: string | string[]) {
  try {
    // get user.
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // ensure ids is an array
    const categoryIds = Array.isArray(ids) ? ids : [ids];

    // check if all categories exist.
    const existingCategories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
    });

    if (existingCategories.length !== categoryIds.length) {
      console.log(
        "categories don't exist",
        { existingCategories },
        { categoryIds },
      );
      const message =
        categoryIds.length === 1
          ? "Category doesn't exist"
          : "Categories don't exist";
      throw new Error(message);
    }

    // delete categories.
    await prisma.category.deleteMany({
      where: { id: { in: categoryIds } },
    });

    return { success: true, message: "Categories deleted successfully" };
  } catch (e: unknown) {
    console.log("Error deleting categories", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server cancel");
  }
}

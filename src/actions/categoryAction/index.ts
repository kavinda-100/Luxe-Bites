"use server";

import type { z } from "zod";
import { categoriesSchema } from "../../zod/categories";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { zodIssueToString } from "../../zod/utils";
import { prisma } from "../../server/db";

export async function createCategory(data: z.infer<typeof categoriesSchema>) {
  try {
    // get user.
    const { getUser } = getKindeServerSession();
    const user = await getUser();
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

"use server";

import type { z } from "zod";
import { categoriesSchema } from "../../zod/categories";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { zodIssueToString } from "../../zod/utils";
import { prisma } from "../../server/db";

export async function createCategory(data: z.infer<typeof categoriesSchema>) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const validData = categoriesSchema.safeParse(data);
    if (!validData.success) {
      throw new Error(zodIssueToString(validData.error.errors));
    }
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    if (!newCategory) {
      throw new Error("Error creating category");
    }
    return { success: true, message: "Category created successfully" };
  } catch (e: unknown) {
    console.log("Error creating category", e);
    throw new Error("Internal server error");
  }
}

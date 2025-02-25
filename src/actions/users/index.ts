"use server";

import { checkIsAdmin } from "../AuthActions";
import { prisma } from "../../server/db";
import type { z } from "zod";
import { zodUserSchema } from "../../zod/user";

export async function getAllUsers() {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await prisma.user.findMany({
      select: {
        id: true,
        kindUserId: true,
        email: true,
        name: true,
        profilePicture: true,
        role: true,
        createdAt: true,
      },
    });
  } catch (e: unknown) {
    console.log("Error fetching all users", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const newUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        kindUserId: true,
        email: true,
        name: true,
        profilePicture: true,
        role: true,
        createdAt: true,
      },
    });
    if (!newUser) {
      throw new Error("User not found");
    }
    return newUser;
  } catch (e: unknown) {
    console.log("Error fetching user by email", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function updateUserByEmail({
  email,
  data,
}: {
  email: string;
  data: z.infer<typeof zodUserSchema>;
}) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // Validate the data.
    const validatedData = zodUserSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Invalid data");
    }
    // Check if the user exists.
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      throw new Error("User not found");
    }
    // Update the user by email.
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        role: data.role,
      },
    });

    return { success: true };
  } catch (e: unknown) {
    console.log("Error updating user by email", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

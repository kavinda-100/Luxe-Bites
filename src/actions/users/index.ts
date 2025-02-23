"use server";

import { checkIsAdmin } from "../AuthActions";
import { prisma } from "../../server/db";

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

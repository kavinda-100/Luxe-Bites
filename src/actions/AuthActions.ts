"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../server/db";

export async function verifyUser() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      console.log("Unauthorized - Kinde Auth User", { user });
      throw new Error("Unauthorized");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        kindUserId: user.id,
      },
    });
    if (!existingUser) {
      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          kindUserId: user.id,
          email: user.email!,
          name: user?.family_name + " " + user?.given_name,
          profilePicture: user?.picture,
        },
      });
      if (!newUser) {
        console.log("Error in creating new user: ", { newUser });
        throw new Error("Internal Server Error");
      }
      return {
        success: true,
      };
    }
    // do nothing if user exists
    return {
      success: true,
    };
  } catch (e: unknown) {
    console.log("Error in verifyUser: ", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function checkUserRole(userId: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        kindUserId: userId,
      },
      select: {
        role: true,
      },
    });
    if (!existingUser) {
      console.log("Unauthorized - User not found", { existingUser });
      return null;
    }
    return existingUser.role;
  } catch (e: unknown) {
    console.log("Error in checkUserRole: ", e);
    return null;
  }
}

export async function checkIsAdmin() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      console.log("Unauthorized - Kinde Auth User", { user });
      return null;
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        kindUserId: user.id,
      },
      select: {
        role: true,
      },
    });
    if (!existingUser) {
      console.log("Unauthorized - User not found", { existingUser });
      return null;
    }
    if (existingUser.role !== "ADMIN") {
      console.log("Unauthorized - User is not an Admin", { existingUser });
      return null;
    }
    return user;
  } catch (e: unknown) {
    console.log("Error in checkIsAdmin: ", e);
    return null;
  }
}

export async function checkIsUser() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      console.log("Unauthorized - Kinde Auth User", { user });
      return null;
    }
    return user;
  } catch (e: unknown) {
    console.log("Error in checkIsUser: ", e);
    return null;
  }
}

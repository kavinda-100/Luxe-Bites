"use server";

import { checkIsAdmin } from "../AuthActions";
import type { z } from "zod";
import { AdvertisementSchema } from "../../zod/Advertisement";
import { prisma } from "../../server/db";

export async function createAdvertisement(
  data: z.infer<typeof AdvertisementSchema>,
) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // validate the data
    const validatedData = AdvertisementSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Invalid data");
    }
    // create the advertisement
    const advertisement = await prisma.advertisement.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        active: data.active,
        link: data.link,
      },
    });
    if (!advertisement) {
      throw new Error("Failed to create advertisement");
    }
    return { success: true, message: "Advertisement created successfully" };
  } catch (e: unknown) {
    console.log("Error creating advertisement", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function getAllAdvertisements() {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const advertisements = await prisma.advertisement.findMany();
    return advertisements.map((advertisement) => ({
      id: advertisement.id,
      title: advertisement.title,
      description: advertisement.description,
      active: advertisement.active,
      link: advertisement.link,
      createdAt: advertisement.createdAt,
    }));
  } catch (e: unknown) {
    console.log("Error getting advertisements", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

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

export async function getAdvertisementById(id: string) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const advertisement = await prisma.advertisement.findUnique({
      where: {
        id,
      },
    });
    if (!advertisement) {
      throw new Error("Advertisement not found");
    }
    return {
      id: advertisement.id,
      title: advertisement.title,
      description: advertisement.description,
      imageUrl: advertisement.imageUrl,
      videoUrl: advertisement.videoUrl,
      active: advertisement.active,
      link: advertisement.link,
    };
  } catch (e: unknown) {
    console.log("Error getting advertisement", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function updateAdvertisement({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof AdvertisementSchema>;
}) {
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
    // check if the advertisement exists
    const advertisementExists = await prisma.advertisement.findUnique({
      where: {
        id,
      },
    });
    if (!advertisementExists) {
      throw new Error("Advertisement not found");
    }
    // update the advertisement
    const advertisement = await prisma.advertisement.update({
      where: {
        id,
      },
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
      throw new Error("Failed to update advertisement");
    }
    return { success: true, message: "Advertisement updated successfully" };
  } catch (e: unknown) {
    console.log("Error updating advertisement", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function deleteAdvertisements(ids: string | string[]) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const adIds = Array.isArray(ids) ? ids : [ids];
    // check if the advertisements exist
    const advertisements = await prisma.advertisement.findMany({
      where: { id: { in: adIds } },
    });
    // if any of the advertisements do not exist, throw an error
    if (advertisements.length !== adIds.length) {
      throw new Error("Advertisement not found");
    }
    // delete the advertisements
    const deletedAdvertisements = await prisma.advertisement.deleteMany({
      where: { id: { in: adIds } },
    });
    if (!deletedAdvertisements) {
      throw new Error("Failed to delete advertisements");
    }
    return { success: true, message: "Advertisements deleted successfully" };
  } catch (e: unknown) {
    console.log("Error deleting advertisements", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

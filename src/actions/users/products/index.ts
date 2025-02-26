"use server";

import { checkIsAdmin } from "../../AuthActions";
import { prisma } from "../../../server/db";

export async function searchProductsByName({
  searchTerm,
}: {
  searchTerm: string;
}) {
  try {
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // if no search term, return null
    if (!searchTerm) {
      return { success: true, data: null };
    }
    // search for products
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return { success: true, data: products };
  } catch (e: unknown) {
    console.log("Error in useSearchProducts", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function searchProductsByCategory({
  categoryName,
  pageParam = 1,
}: {
  categoryName: string | null;
  pageParam: number;
}) {
  try {
    // check if user is admin
    const user = await checkIsAdmin();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const take = 5;
    const skip = (pageParam - 1) * take;

    let products, totalProducts;
    // if no category name, return all products
    // if category name, return products in that category
    // if page param, return products in that page by default 1
    // limit 5 products per page
    // skip (page - 1) * 5 => skip 0 for page 1, skip 10 for page 2

    // search for products
    // if no category name, return all products
    if (!categoryName) {
      products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          price: true,
          discount: true,
          stock: true,
          rating: true,
          _count: {
            select: {
              reviews: true,
            },
          },
          active: true,
          createdAt: true,
          categoryId: true,
        },
        take,
        skip,
      });
      totalProducts = await prisma.product.count();
    } else {
      products = await prisma.product.findMany({
        where: {
          category: {
            name: categoryName,
          },
        },
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          price: true,
          discount: true,
          stock: true,
          rating: true,
          _count: {
            select: {
              reviews: true,
            },
          },
          active: true,
          createdAt: true,
          categoryId: true,
        },
        take,
        skip,
      });
      totalProducts = await prisma.product.count({
        where: {
          category: {
            name: categoryName,
          },
        },
      });
    }

    // format products
    const FormatedProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        reviews: product._count.reviews,
      };
    });

    return {
      success: true,
      data: {
        products: FormatedProducts,
        meta: {
          page: pageParam,
          totalProducts: totalProducts,
          totalPages: Math.ceil(totalProducts / take), // 10/5 = 2
        },
      },
    };
  } catch (e: unknown) {
    console.log("Error in useSearchProducts", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

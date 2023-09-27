"use server";

import { type Category, type Product, type Provider } from "@prisma/client";

import database from "@/lib/database";

export type ModifiedProducts = ({
  providers: Provider[];
  category: Category | null;
} & Product)[];

/**
 * Retrieves a list of products based on the provided category ID.
 *
 * @param {Object} params - Parameters for retrieving products.
 * @param {string} params.categoryId - The ID of the category to filter products.
 * @returns {Promise<ModifiedProducts | null>} - A promise that resolves to an array of modified products or null if an error occurs.
 */
async function getProducts({
  categoryId,
}: {
  categoryId: string;
}): Promise<ModifiedProducts | null> {
  try {
    const products = await database.product.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        providers: true,
        category: true,
      },
    });
    return products ?? null;
  } catch (error) {
    return null;
  }
}

export default getProducts;

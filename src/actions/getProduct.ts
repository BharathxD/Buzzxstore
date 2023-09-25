/**
 * Retrieves a product based on the provided product ID.
 *
 * @param {Object} params - Parameters for retrieving the product.
 * @param {string} params.productId - The ID of the product to retrieve.
 * @returns {Promise<ModifiedProducts | null>} - A promise that resolves to the modified product or null if an error occurs.
 */
"use server";

import type { Product, Provider } from "@prisma/client";

import database from "@/lib/database";

export type ModifiedProducts = { providers: Provider[] } & Product;

/**
 * Retrieves a product based on the provided product ID.
 *
 * @param {Object} params - Parameters for retrieving the product.
 * @param {string} params.productId - The ID of the product to retrieve.
 * @returns {Promise<ModifiedProducts | null>} - A promise that resolves to the modified product or null if an error occurs.
 */
async function getProduct({
  productId,
}: {
  productId: string;
}): Promise<ModifiedProducts | null> {
  try {
    const products = await database.product.findFirst({
      where: {
        id: productId,
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

export default getProduct;

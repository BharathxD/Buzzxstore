/**
 * Retrieves a list of categories.
 *
 * @returns {Promise<Category[] | null>} - A promise that resolves to an array of categories or null if an error occurs.
 */
"use server";

import { type Category } from "@prisma/client";

import database from "@/lib/database";

/**
 * Retrieves a list of categories.
 *
 * @returns {Promise<Category[] | null>} - A promise that resolves to an array of categories or null if an error occurs.
 */
async function getCategories(): Promise<Category[] | null> {
  try {
    const categories = await database.category.findMany();
    return categories ?? null;
  } catch (error) {
    return null;
  }
}

export default getCategories;

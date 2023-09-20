"use server";

import { type Category } from "@prisma/client";

import database from "@/lib/database";

async function getCategories(): Promise<Category[] | null> {
  try {
    const categories = await database.category.findMany();
    return categories ?? null;
  } catch (error) {
    return null;
  }
}

export default getCategories;

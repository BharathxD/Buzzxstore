"use server";

import type { Category, Product } from "@prisma/client";

import database from "@/lib/database";

export type ModifiedProducts = (Product & { Category: Category | null })[];

async function getAllProducts(): Promise<ModifiedProducts | null> {
  try {
    const products = await database.product.findMany({
      include: { Category: true },
    });
    return products ?? null;
  } catch (error) {
    return null;
  }
}

export default getAllProducts;

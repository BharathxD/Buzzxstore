"use server";

import type { Category, Product, Provider } from "@prisma/client";

import database from "@/lib/database";

export type ModifiedProducts = (Product & { category: Category | null, providers: Provider[] })[];

async function getAllProducts(): Promise<ModifiedProducts | null> {
  try {
    const products = await database.product.findMany({
      include: { category: true, providers: true },
    });
    return products ?? null;
  } catch (error: unknown) {
    return null;
  }
}

export default getAllProducts;

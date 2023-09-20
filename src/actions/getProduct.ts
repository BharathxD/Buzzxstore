"use server";

import type { Product, Provider } from "@prisma/client";

import database from "@/lib/database";

export type ModifiedProducts = { providers: Provider[] } & Product;

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
        Category: true,
      },
    });
    return products ?? null;
  } catch (error) {
    return null;
  }
}

export default getProduct;

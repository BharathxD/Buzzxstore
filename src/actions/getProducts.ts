"use server";

import { type Category, type Product, type Provider } from "@prisma/client";

import database from "@/lib/database";

export type ModifiedProducts = ({
  providers: Provider[];
  category: Category | null;
} & Product)[];

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

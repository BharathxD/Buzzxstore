"use server";

import database from "@/lib/database";
import { Product } from "@prisma/client";

export type ModifiedProducts = Product[];

async function getAllProducts(): Promise<ModifiedProducts | null> {
    try {
        const products = await database.product.findMany();
        return products ?? null;
    } catch (error) {
        return null;
    }
}

export default getAllProducts;

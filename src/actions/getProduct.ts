"use server";

import database from "@/lib/database";
import { Product, Provider } from "@prisma/client";

export type ModifiedProducts = ({ providers: Provider[] } & Product);

async function getProduct({ productId }: { productId: string }): Promise<ModifiedProducts | null> {
    try {
        const products = await database.product.findFirst({
            where: {
                id: productId
            },
            include: {
                providers: true,
                Category: true
            }
        });
        return products ?? null;
    } catch (error) {
        return null;
    }
}

export default getProduct;

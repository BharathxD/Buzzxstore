"use server";

import database from "@/lib/database";
import { Product, Provider } from "@prisma/client";

export type ModifiedProducts = ({ providers: Provider[] } & Product)[];

async function getProducts({ categoryId }: { categoryId: string }): Promise<ModifiedProducts | null> {
    try {
        const products = await database.product.findMany({
            where: {
                Category: {
                    id: categoryId
                }
            },
            include: {
                providers: true
            }
        });
        return products ?? null;
    } catch (error) {
        return null;
    }
}

export default getProducts;

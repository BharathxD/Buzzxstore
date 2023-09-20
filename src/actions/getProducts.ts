"use server";

import database from "@/lib/database";
import { Category, Product, Provider } from "@prisma/client";

export type ModifiedProducts = ({ providers: Provider[], Category: Category | null } & Product)[];

async function getProducts({ categoryId }: { categoryId: string }): Promise<ModifiedProducts | null> {
    try {
        const products = await database.product.findMany({
            where: {
                Category: {
                    id: categoryId
                }
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

export default getProducts;

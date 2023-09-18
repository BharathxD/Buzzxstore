"use server";

import database from "@/lib/database";
import { Category } from "@prisma/client";

async function getCategories(): Promise<Category[] | null> {
    try {
        const categories = await database.category.findMany();
        return categories ?? null;
    } catch (error) {
        return null;
    }
}

export default getCategories;

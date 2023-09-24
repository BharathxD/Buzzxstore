import type { Category, Product, Provider } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

const comparePrices = (a: (Product & { category: Category | null; providers: Provider[] }), b: (Product & { category: Category | null; providers: Provider[] })) => {
  const priceA = a.providers
    .map(({ price }) => +price.replace(/,/g, ""))
    .sort((a, b) => b - a)[0];
  const priceB = b.providers
    .map(({ price }) => +price.replace(/,/g, ""))
    .sort((a, b) => b - a)[0];

  if (priceA < priceB) return -1;
  else if (priceA > priceB) return 1;
  return 0;
};

export { cn, ensureStartsWith, comparePrices };

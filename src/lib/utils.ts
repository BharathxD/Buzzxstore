import type { Product } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

const comparePrices = (a: Product, b: Product) => {
  const priceA = parseFloat(a.price.replace(/,/g, ""));
  const priceB = parseFloat(b.price.replace(/,/g, ""));

  if (priceA < priceB) return -1;
  else if (priceA > priceB) return 1;
  return 0;
};

export { cn, ensureStartsWith, comparePrices };

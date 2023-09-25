import type { Category, Product, Provider } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Ensure that a string starts with a specified substring.
 *
 * @param {string} stringToCheck - The string to check.
 * @param {string} startsWith - The substring to ensure the string starts with.
 * @returns {string} - The modified string.
 */
const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

/**
* Compare the prices of two products.
*
* @param {Product & { category: Category | null; providers: Provider[] }} a - The first product to compare.
* @param {Product & { category: Category | null; providers: Provider[] }} b - The second product to compare.
* @returns {number} - A negative number if `a` is cheaper, a positive number if `b` is cheaper, or 0 if they have the same price.
*/
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

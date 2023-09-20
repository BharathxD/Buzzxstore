"use client";

import { useState } from "react";
import Link from "next/link";
import { ModifiedProducts } from "@/actions/getProducts";
import { Category, Product } from "@prisma/client";
import { comparePrices } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { Filter } from "lucide-react";
import { GridTileImage } from "./grid-tile-image";
import Label from "./ui/label";

interface ProductDisplayProps {
  products: ModifiedProducts | (Product & { Category: Category | null })[];
  isHomepage?: boolean;
}

/**
 * Displays a list of products.
 * @param {ProductDisplayProps} props - The product display component props.
 */
export function ProductDisplay({ products, isHomepage }: ProductDisplayProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  if (!products?.length) return null;

  // Create a copy of the products array to avoid mutating the original data
  let sortedProducts = [...products];

  // Sort the products based on the user's selection
  if (sortOrder === "asc") {
    sortedProducts = sortedProducts.sort(comparePrices);
  } else if (sortOrder === "desc") {
    sortedProducts = sortedProducts.sort((a, b) => comparePrices(b, a));
  }

  const categoryTitle = isHomepage
    ? "All products"
    : products[0].Category?.name ?? "";

  return (
    <div className="w-full flex items-center justify-center flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-3xl font-extrabold leading-tight tracking-tighter text-transparent capitalize truncate">
          {categoryTitle}
        </h1>
        <Select
          onValueChange={(value: "asc" | "desc" | "none") =>
            setSortOrder(value)
          }
          defaultValue="none"
        >
          <SelectTrigger className="w-min bg-neutral-800 text-neutral-300 border-neutral-700 rounded-full inline-flex gap-2">
            <Filter className="ml-auto md:ml-2" />
            <span className="hidden md:block">Filter</span>
          </SelectTrigger>
          <SelectContent
            align="end"
            className="bg-neutral-950 text-neutral-300 border-neutral-700"
          >
            <SelectGroup>
              <SelectItem value="asc">Low to high</SelectItem>
              <SelectItem value="desc">High to low</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectItem value="none" aria-selected="true">
                None
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ul className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {sortedProducts.map((product, i) => (
          <li key={`${product.id}${i}`} className="relative h-full w-full">
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price,
                  currencyCode: "INR",
                }}
                src={product.image}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
              <Label title={product.name} amount={product.price} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

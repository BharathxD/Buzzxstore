"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { type ModifiedProducts } from "@/actions/getProducts";
import { type Category, type Product } from "@prisma/client";
import { Filter } from "lucide-react";

import { cn, comparePrices } from "@/lib/utils";
import useOnClickOutside from "@/hooks/useClickOutside";

import { GridTileImage } from "./grid-tile-image";
import { Button } from "./ui/button";
import Label from "./ui/label";
import { Select, SelectContent, SelectTrigger } from "./ui/select";

interface ProductDisplayProps {
  products: ModifiedProducts | (Product & { Category: Category | null })[];
  isHomepage?: boolean;
}

/**
 * Enum for sorting order options.
 */
enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
  None = "none",
}

const ProductDisplay = ({ products, isHomepage }: ProductDisplayProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Ascending);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setOpen(false));

  if (!products?.length) return null;

  // Create a copy of the products array to avoid mutating the original data
  let sortedProducts = [...products];

  // Sort the products based on the user's selection
  if (sortOrder === SortOrder.Ascending) {
    sortedProducts = sortedProducts.sort(comparePrices);
  } else if (sortOrder === SortOrder.Descending) {
    sortedProducts = sortedProducts.sort((a, b) => comparePrices(b, a));
  }

  const categoryTitle = isHomepage
    ? "All products"
    : products[0]?.Category?.name ?? "";

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4">
      <header className="flex w-full items-center justify-between">
        <h1 className="truncate bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-3xl font-extrabold capitalize leading-tight tracking-tighter text-transparent">
          {categoryTitle}
        </h1>
        <Select
          onValueChange={(value: SortOrder) => setSortOrder(value)}
          defaultValue={SortOrder.None}
          open={open}
        >
          <SelectTrigger
            className="inline-flex w-min gap-2 rounded-full border-neutral-700 bg-neutral-800 text-neutral-300"
            onClick={() => setOpen(true)}
            aria-label="Open Sort Options"
          >
            <Filter className="ml-auto md:ml-2" />
            <span className="hidden md:block">Filter</span>
          </SelectTrigger>
          <SelectContent
            sideOffset={5}
            align="end"
            className="border-neutral-700 bg-neutral-800 text-neutral-300"
            ref={selectRef}
          >
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                onClick={() => {
                  setSortOrder(SortOrder.Ascending);
                  setOpen(false);
                }}
                className={cn(
                  sortOrder === SortOrder.Ascending &&
                    "bg-neutral-50 text-neutral-900"
                )}
              >
                Low to High
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSortOrder(SortOrder.Descending);
                  setOpen(false);
                }}
                className={cn(
                  sortOrder === SortOrder.Descending &&
                    "bg-neutral-50 text-neutral-900"
                )}
              >
                High to Low
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSortOrder(SortOrder.None);
                  setOpen(false);
                }}
                className={cn(
                  sortOrder === SortOrder.None &&
                    "bg-neutral-50 text-neutral-900"
                )}
              >
                None
              </Button>
            </div>
          </SelectContent>
        </Select>
      </header>
      <ul className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {sortedProducts.map((product, i) => (
          <li key={`${product.id}_${i}`} className="relative h-full w-full">
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
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                fill
              />
              <Label title={product.name} amount={product.price} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductDisplay;

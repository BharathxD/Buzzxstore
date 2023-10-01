"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { type ModifiedProducts } from "@/actions/getProducts";
import type { Category, Product, Provider } from "@prisma/client";
import { Filter } from "lucide-react";

import { cn, comparePrices } from "@/lib/utils";
import useOnClickOutside from "@/hooks/use-on-click-outside";

import { GridTileImage } from "./grid-tile-image";
import { Button } from "./ui/button";
import Label from "./ui/label";
import { Select, SelectContent, SelectTrigger } from "./ui/select";

interface ProductDisplayProps {
  products:
    | ModifiedProducts
    | (Product & { category: Category | null; providers: Provider[] })[];
  isHomepage?: boolean;
}

/**
 * Enum for sorting order options.
 */
enum SORT_ORDER {
  Ascending = "asc",
  Descending = "desc",
  None = "none",
}

const ProductDisplay = ({ products, isHomepage }: ProductDisplayProps) => {
  const [sortOrder, setSortOrder] = useState<SORT_ORDER>(SORT_ORDER.Ascending);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setOpen(false));

  const categoryTitle = useMemo(() => {
    if (isHomepage) return "All products";
    return products[0]?.category?.name ?? "";
  }, [isHomepage, products]);

  const sortedProducts = useMemo(() => {
    if (!products?.length) return [];

    const sorted = [...products];

    if (sortOrder === SORT_ORDER.Ascending) 
      return sorted.sort(comparePrices);
    else if (sortOrder === SORT_ORDER.Descending)
      return sorted.sort((a, b) => comparePrices(b, a));

    return sorted;
  }, [products, sortOrder]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <header className="flex w-full items-center justify-between">
        <h1 className="truncate bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-3xl font-extrabold capitalize leading-tight tracking-tighter text-transparent">
          {categoryTitle}
        </h1>
        <Select
          onValueChange={(value: SORT_ORDER) => setSortOrder(value)}
          defaultValue={SORT_ORDER.None}
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
                  setSortOrder(SORT_ORDER.Ascending);
                  setOpen(false);
                }}
                className={cn(
                  sortOrder === SORT_ORDER.Ascending &&
                    "bg-neutral-50 text-neutral-900"
                )}
              >
                Low to High
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSortOrder(SORT_ORDER.Descending);
                  setOpen(false);
                }}
                className={cn(
                  sortOrder === SORT_ORDER.Descending &&
                    "bg-neutral-50 text-neutral-900"
                )}
              >
                High to Low
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSortOrder(SORT_ORDER.None);
                  setOpen(false);
                }}
                className={cn(
                  sortOrder === SORT_ORDER.None &&
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
        {sortedProducts.map((product, i) => {
          const amount = product.providers
            .map(({ price }) => +price.replace(/,/g, ""))
            .sort((a, b) => b - a)[0];
          return (
            <li key={`${product.id}_${i}`} className="relative h-full w-full">
              <Link
                href={`/product/${product.id}`}
                className="relative h-full w-full"
              >
                <GridTileImage
                  alt={product.name}
                  label={{
                    title: product.name,
                    amount,
                    currencyCode: "INR",
                  }}
                  src={product.image}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  fill
                />
                <Label title={product.name} amount={amount} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductDisplay;

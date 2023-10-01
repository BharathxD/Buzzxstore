"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { type ModifiedProducts } from "@/actions/getProducts";
import type { Category, Product, Provider } from "@prisma/client";
import { Filter } from "lucide-react";

import { cn, comparePrices } from "@/lib/utils";

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

  if (!products?.length) return null;

  const sortOptions = [
    { label: "Low to High", value: SORT_ORDER.Ascending },
    { label: "High to Low", value: SORT_ORDER.Descending },
    { label: "None", value: SORT_ORDER.None },
  ];

  const categoryTitle = isHomepage
    ? "All products"
    : products[0]?.category?.name ?? "";

  const handleSortChange = (value: SORT_ORDER) => {
    setSortOrder(value);
    setOpen(false);
  };

  const sortedProducts = [...products].sort(comparePrices);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <header className="flex w-full items-center justify-between">
        <h1 className="truncate bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-3xl font-extrabold capitalize leading-tight tracking-tighter text-transparent">
          {categoryTitle}
        </h1>
        <Select
          onValueChange={handleSortChange}
          defaultValue={SORT_ORDER.None}
          open={open}
        >
          <SelectTrigger
            className="inline-flex w-min items-center gap-2 rounded-full border-neutral-700 bg-neutral-800 text-neutral-300"
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
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="ghost"
                  onClick={() => handleSortChange(option.value)}
                  className={cn(
                    sortOrder === option.value &&
                      "bg-neutral-50 text-neutral-900"
                  )}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </SelectContent>
        </Select>
      </header>
      <ul className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {sortedProducts.map((product, i) => {
          const amount = Math.max(
            ...product.providers.map(
              (provider) => +provider.price.replace(/,/g, "")
            )
          );
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

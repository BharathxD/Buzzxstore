import { Fragment } from "react";
import Link from "next/link";
import type { Product, Provider } from "@prisma/client";
import { FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";

import { cn } from "@/lib/utils";

import Price from "./ui/price";

interface ProductDetails {
  product: { providers: Provider[] } & Product;
}

const ProductDetails = ({ product }: ProductDetails) => {
  const maxLength = 80;
  const maxDescriptionLength = 500;
  const displayText =
    product.name.length > maxLength
      ? product.name.substring(0, maxLength) + "..."
      : product.name;
  const displayDescription =
    product.description.length > maxDescriptionLength
      ? product.description.substring(0, maxDescriptionLength) + "..."
      : product.description;
  return (
    <Fragment>
      <div className="mb-6 flex flex-col gap-4 border-b border-neutral-700 pb-6 pt-3">
        <h1 className="bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-[25px] font-extrabold leading-tight tracking-tighter text-transparent md:text-[48px]">
          {displayText}
        </h1>
        <div
          className={cn(
            "mr-auto flex w-full items-center justify-between gap-5 rounded-full text-white",
            product.providers.length > 1
              ? "flex-col md:flex-row"
              : "flex-row md:flex-row"
          )}
        >
          <span className="text-2xl md:text-3xl">
            <Price
              amount={
                product.providers
                  .map(({ price }) => +price.replace(/,/g, ""))
                  .sort((a, b) => b - a)[0]
              }
            />
          </span>
          <span className="inline-flex gap-2">
            {product.providers.map(({ id, name, link }, i) => {
              switch (name) {
                case "Amazon":
                  return (
                    <Link
                      key={`${id}_${i}`}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      target="_blank"
                      href={link}
                    >
                      <FaAmazon size={20} />
                      <span className="text-base font-semibold">Amazon</span>
                    </Link>
                  );
                case "Flipkart":
                  return (
                    <Link
                      key={`${id}_${i}`}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      target="_blank"
                      href={link}
                    >
                      <SiFlipkart size={20} />
                      <span className="text-base font-semibold">Flipkart</span>
                    </Link>
                  );
                default:
                  return null;
              }
            })}
          </span>
        </div>
      </div>
      <div className="prose prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:underline hover:prose-a:text-neutral-300 prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 prose-a:text-white prose-strong:text-white mx-auto mb-6 max-w-6xl text-base leading-snug text-neutral-300">
        {displayDescription}
      </div>
    </Fragment>
  );
};

export default ProductDetails;

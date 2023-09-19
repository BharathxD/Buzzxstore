import { Fragment } from "react";
import Price from "./ui/price";
import { Product } from "@prisma/client";
import { Provider } from "@prisma/client";
import { FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      <div className="flex flex-col border-b gap-4 pt-3 pb-6 mb-6 border-neutral-700">
        <h1 className="bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-3xl font-extrabold leading-tight tracking-tighter text-transparent text-[25px] md:text-[48px]">
          {displayText}
        </h1>
        <div
          className={cn(
            "w-full flex items-center justify-between mr-auto rounded-full text-white gap-5",
            product.providers.length > 1
              ? "flex-col md:flex-row"
              : "flex-row md:flex-row"
          )}
        >
          <span className="text-2xl md:text-3xl">
            <Price amount={product.price} />
          </span>
          <span className="inline-flex gap-2">
            {product.providers.map(({ id, name, link }) => {
              switch (name) {
                case "amazon":
                  return (
                    <Link
                      key={id}
                      className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-4"
                      target="_blank"
                      href={link}
                    >
                      <FaAmazon size={20} />
                      <span className="font-semibold text-base">Amazon</span>
                    </Link>
                  );
                case "flipkart":
                  return (
                    <Link
                      key={id}
                      className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-4"
                      target="_blank"
                      href={link}
                    >
                      <SiFlipkart size={20} />
                      <span className="font-semibold text-base">Flipkart</span>
                    </Link>
                  );
                default:
                  return null;
              }
            })}
          </span>
        </div>
      </div>
      <div className="mb-6 text-base leading-snug text-neutral-300 prose mx-auto max-w-6xl prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 prose-headings:text-white prose-a:text-white prose-strong:text-white">
        {displayDescription}
      </div>
    </Fragment>
  );
};

export default ProductDetails;

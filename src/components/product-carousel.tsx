import Link from "next/link";
import { type ModifiedProducts } from "@/actions/getAllProducts";
import getProducts from "@/actions/getProducts";

import { cn } from "@/lib/utils";

import GridTileImageV2 from "./grid-tile-image-v2";

interface ProductCarouselProps {
  categoryId: string;
  currentProductId: string;
}

const ProductCarousel = async ({
  categoryId,
  currentProductId,
}: ProductCarouselProps) => {
  let products: ModifiedProducts | undefined | null = await getProducts({
    categoryId,
  });

  if (currentProductId) {
    products = products?.filter(({ id }) => id !== currentProductId);
  }

  if (!products || products.length === 0) return null;

  return (
    <div
      className={cn(
        "mt-4 max-w-[92vw] rounded-xl border border-neutral-800 bg-black p-4"
      )}
    >
      <h2 className="mb-4 text-2xl font-bold text-neutral-300">
        Related Products
      </h2>
      <ul className="no-scrollbar flex gap-4 overflow-x-auto ">
        {products.map((product, i) => (
          <li
            key={`${product.id}_${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImageV2
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCarousel;

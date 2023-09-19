import Link from "next/link";
import { GridTileImage } from "./grid-tile-image";
import Label from "./ui/label";
import { ModifiedProducts } from "@/actions/getProducts";
import { Product } from "@prisma/client";

interface ProductDisplayProps {
  products: ModifiedProducts | Product[];
}

export async function ProductDisplay({ products }: ProductDisplayProps) {
  if (!products?.length) return null;
  return (
    <div className="w-full flex items-center justify-center">
      <ul className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {products.map((product, i) => (
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

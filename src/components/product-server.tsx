import { Fragment } from "react";
import ProductImage from "./product-image";
import ProductDetails from "./product-description";
import { Product, Provider } from "@prisma/client";
import EmptyState from "./not-found";
import ProductCarousel from "./product-carousel";

interface ProductServerProps {
  productPromise: () => Promise<({ providers: Provider[] } & Product) | null>;
}

const ProductServer = async ({ productPromise }: ProductServerProps) => {
  const product = await productPromise();
  if (!product)
    return (
      <EmptyState
        title="No product found"
        subtitle="Head back to homepage"
        resetLabel="Homepage"
        showReset
      />
    );
  return (
    <div className="mx-auto max-w-screen-2xl md:px-4">
      <div className="flex flex-col rounded-xl border gap-4 p-8 border-neutral-800 bg-black md:p-12 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full lg:basis-3/6 flex items-center justify-center bg-white rounded-lg p-4">
          <ProductImage
            imageUrl={product.image}
            alt={`${product.name} Product Image`}
          />
        </div>
        <div className="w-full basis-full lg:basis-3/6 text-white">
          <ProductDetails product={product} />
        </div>
      </div>
      <ProductCarousel
        categoryId={product.categoryId!}
        currentProductId={product.id}
      />
    </div>
  );
};

export default ProductServer;

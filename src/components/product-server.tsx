import type { Product, Provider } from "@prisma/client";

import EmptyState from "./not-found";
import ProductCarousel from "./product-carousel";
import ProductDetails from "./product-description";
import ProductImage from "./product-image";

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
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-800 bg-black p-8 md:p-12 lg:flex-row lg:gap-8">
        <div className="flex h-full w-full basis-full items-center justify-center rounded-lg bg-white p-4 lg:basis-3/6">
          <ProductImage
            imageUrl={product.image}
            alt={`${product.name} Product Image`}
          />
        </div>
        <div className="w-full basis-full text-white lg:basis-3/6">
          <ProductDetails product={product} />
        </div>
      </div>
      <ProductCarousel
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        categoryId={product.categoryId!}
        currentProductId={product.id}
      />
    </div>
  );
};

export default ProductServer;

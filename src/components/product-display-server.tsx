import { ModifiedProducts } from "@/actions/getAllProducts";
import EmptyState from "./not-found";
import { ProductDisplay } from "./product-display";
import { Product, Provider } from "@prisma/client";

interface ProductDisplayServerProps {
  productPromise: () => Promise<ModifiedProducts | null>;
  isHomepage?: boolean;
}

const ProductDisplayServer = async ({
  productPromise,
  isHomepage,
}: ProductDisplayServerProps) => {
  const products = await productPromise();
  if (!products || products.length === 0) return <EmptyState showReset />;
  return <ProductDisplay products={products} isHomepage={isHomepage} />;
};

export default ProductDisplayServer;

import { ModifiedProducts } from "@/actions/getAllProducts";
import EmptyState from "./not-found";
import { ProductDisplay } from "./product-display";

interface ProductDisplayServerProps {
  productPromise: () => Promise<ModifiedProducts | null>;
}

const ProductDisplayServer = async ({
  productPromise,
}: ProductDisplayServerProps) => {
  const products = await productPromise();
  if (!products || products.length === 0) return <EmptyState showReset />;
  return <ProductDisplay products={products} />;
};

export default ProductDisplayServer;

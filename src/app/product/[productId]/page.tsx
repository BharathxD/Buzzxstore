import getProduct from "@/actions/getProduct";
import ProductServer from "@/components/product-server";
import ProductPageSkeleton from "@/components/ui/ProductPageSkeleton";
import { Suspense } from "react";

interface ProductsProps {
  params: {
    productId: string;
  };
}

const Products = async ({ params: { productId } }: ProductsProps) => {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductServer productPromise={() => getProduct({ productId })} />
    </Suspense>
  );
};

export default Products;

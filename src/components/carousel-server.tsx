import { ModifiedProducts } from "@/actions/getAllProducts";
import { Product } from "@prisma/client";
import EmptyState from "./not-found";
import { Carousel } from "./carousel";

interface CarouselProps {
  productPromise: () => Promise<ModifiedProducts | null>;
}

const CarouselServer = async ({ productPromise }: CarouselProps) => {
  const products = await productPromise();
  if (!products || products.length === 0) return <EmptyState showReset />;
  return <Carousel products={products} />;
};

export default CarouselServer;

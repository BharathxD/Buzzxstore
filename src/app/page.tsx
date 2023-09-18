"use server";

import getAllProducts from "@/actions/getAllProducts";
import { Carousel } from "@/components/carousel";
import CarouselServer from "@/components/carousel-server";
import EmptyState from "@/components/not-found";
import ProductSkeleton from "@/components/ui/product-skeleton";
import { Suspense } from "react";

interface HomeProps {
  searchParams: {
    category: string;
  };
}

export default async function Home({ searchParams: { category } }: HomeProps) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <CarouselServer productPromise={() => getAllProducts()} />
    </Suspense>
  );
}

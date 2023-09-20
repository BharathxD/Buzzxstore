const ProductSkeleton = () => {
  return (
    <div className="grid h-full w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="aspect-square h-full w-full animate-pulse rounded-lg bg-neutral-700"
        ></div>
      ))}
    </div>
  );
};

export default ProductSkeleton;

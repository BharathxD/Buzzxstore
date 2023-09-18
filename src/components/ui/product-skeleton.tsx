const ProductSkeleton = () => {
  return (
    <div className="w-full h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="bg-neutral-700 aspect-square w-full h-full rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default ProductSkeleton;

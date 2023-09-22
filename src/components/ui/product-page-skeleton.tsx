const ProductPageSkeleton = () => {
  return (
    <div className="mx-auto max-w-screen-2xl animate-pulse md:px-4">
      <div className="flex h-[90vh] w-[90vw] flex-col items-center gap-4 rounded-lg border border-neutral-800 bg-black p-8 md:w-full md:p-12 lg:flex-row lg:gap-8">
        <div className="flex h-full w-full basis-full items-center justify-center rounded-lg lg:basis-3/6">
          <div className="aspect-square h-full w-full rounded-lg bg-neutral-700 md:h-[40vw]"></div>
        </div>
        <div className="flex w-full basis-full flex-col gap-4 text-white lg:basis-3/6">
          <div className="flex aspect-square h-[40vw] w-full flex-col items-center justify-start gap-4">
            <div className="h-[20rem] w-full rounded-lg bg-neutral-700"></div>
            <div className="mr-auto flex h-20 w-full items-center justify-between gap-5 rounded-lg text-white">
              <div className="h-10 w-[40%] rounded-lg bg-neutral-700"></div>
              <div className="h-10 w-[40%] rounded-lg bg-neutral-700"></div>
            </div>
          </div>
          <div className="h-[100%] w-full rounded-lg bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;

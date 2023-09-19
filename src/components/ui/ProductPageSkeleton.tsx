const ProductPageSkeleton = () => {
  return (
    <div className="mx-auto max-w-screen-2xl md:px-4">
      <div className="w-[90vw] h-[90vh] flex flex-col rounded-xl items-center border gap-4 p-8 border-neutral-800 bg-black md:p-12 lg:flex-row lg:gap-8 md:w-full">
        <div className="h-full w-full basis-full lg:basis-3/6 flex items-center justify-center rounded-lg py-6">
          <div className="h-[70vw] md:h-[40vw] rounded-xl aspect-square bg-neutral-700 animate-pulse"></div>
        </div>
        <div className="w-full basis-full lg:basis-3/6 text-white">
          <div className="h-[40vw] w-full aspect-square animate-pulse flex flex-col items-center justify-start gap-2">
            <div className="h-20 w-full rounded-lg bg-neutral-700"></div>
            <div className="h-20 w-full rounded-lg flex items-center justify-between mr-auto text-white gap-5">
              <div className="w-[40%] h-10 bg-neutral-700 rounded-lg"></div>
              <div className="w-[40%] h-10 bg-neutral-700 rounded-lg"></div>
            </div>
            <div className="h-[50%] w-full bg-neutral-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;

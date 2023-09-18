"use client";

import { useCallback, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { debounce } from "lodash";
import { Layers, Loader2, Search } from "lucide-react";
import { useQuery } from "react-query";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@prisma/client";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const {
    data: queryResults,
    refetch,
    isFetching,
    isFetched,
  } = useQuery<Product[]>({
    queryFn: async () => {
      if (searchInput.length === 0) return [];
      const response: AxiosResponse<Product[]> = await axios.get(
        `/api/products/search/?query=${searchInput}`
      );
      return response.data;
    },
    queryKey: ["search-query"],
    enabled: searchInput.length > 0,
  });
  const request = debounce(() => refetch());
  const debounceRequest = useCallback(() => request(), [request]);
  return (
    <Dialog>
      <DialogTrigger asChild aria-label="Search">
        <button className="relative flex items-center justify-center gap-2 md:px-5 hover:cursor-pointer bg-neutral-800 p-2 rounded-full md:rounded-md">
          <p className="text-neutral-400 hidden md:block">
            Search for products
          </p>
          <Search className="text-neutral-50" />
        </button>
      </DialogTrigger>
      <DialogContent
        className="top-[7.5%] w-[90%] rounded-md border-2 bg-neutral-900 border-zinc-800 md:top-[25%]"
        showClose={false}
      >
        <div className="flex h-full w-full flex-col items-center gap-2 pl-2">
          <input
            type="text"
            className="h-[90%] w-full bg-transparent text-lg text-neutral-50 outline-none"
            value={searchInput}
            autoFocus
            onChange={async (event) => {
              setSearchInput(event.target.value);
              await debounceRequest();
            }}
            placeholder="Search products..."
          />
          {searchInput.length > 0 && (
            <div className="absolute inset-x-0 top-[110%] h-fit max-h-[60vh] w-full overflow-hidden overflow-y-scroll rounded-md border-2 border-zinc-800 shadow backdrop-blur-sm bg-zinc-950/75">
              {!isFetching && (
                <div className="w-full h-20 flex items-center justify-center text-neutral-50 gap-4">
                  <Loader2 className="animate-spin" />
                  <span className="truncate">
                    Fetching the best products for you...
                  </span>
                </div>
              )}
              {!isFetched &&
                !isFetching &&
                (queryResults?.length ?? 0) === 0 && (
                  <p className="inline-flex h-fit w-full items-center justify-center gap-2 p-5 text-lg text-neutral-50">
                    No results found.
                  </p>
                )}
              {(queryResults?.length ?? 0) > 0 && (
                <ul className="list-none">
                  {queryResults?.map((product) => (
                    <li key={product.id}>
                      <a
                        className="inline-flex h-fit w-full items-center gap-2 p-5 text-lg hover:bg-zinc-800 text-neutral-50 hover:text-zinc-300"
                        href={`/product/${product.id}`}
                      >
                        <Layers className="mr-2 h-8 w-8" />
                        <p>{product.name}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;

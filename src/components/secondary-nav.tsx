"use server";

import { Ampersand, ArrowDown, ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import OtherCategories from "./other-categories";
import getCategories from "@/actions/getCategories";
import Link from "next/link";

const SecondaryNav = async () => {
  const categories = await getCategories();
  if (!categories) return null;
  const splitIndex = 4;
  const firstCategorySplit = categories.slice(0, splitIndex);
  const secondCategorySplit = categories.slice(splitIndex);
  return (
    <div className="no-scrollbar fixed z-50 bg-neutral-900/90 backdrop-blur-md h-[7vh] inset-x-0 min-h-20 p-2 flex flex-row top-[10vh] border-b border-b-neutral-700 overflow-x-scroll w-full">
      <div className="flex flex-row md:justify-center items-center gap-4 w-full px-4">
        {firstCategorySplit?.map(({ id, name }) => {
          return (
            <Link
              key={id}
              href={`/category/${id}`}
              className="duration-200 min-w-max text-zinc-400 hover:text-zinc-100 inline-flex items-center justify-center"
            >
              {name}
            </Link>
          );
        })}
        <OtherCategories categories={secondCategorySplit} />
      </div>
    </div>
  );
};

export default SecondaryNav;

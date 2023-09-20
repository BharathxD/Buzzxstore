"use server";

import OtherCategories from "./other-categories";
import getCategories from "@/actions/getCategories";
import Link from "next/link";
import NavItem from "./nav-item";

const SecondaryNav = async () => {
  const categories = await getCategories();
  if (!categories) return null;
  const splitIndex = 4;
  const firstCategorySplit = categories.slice(0, splitIndex);
  const secondCategorySplit = categories.slice(splitIndex);
  return (
    <div className="no-scrollbar fixed z-50 bg-neutral-900/90 backdrop-blur-md h-[7vh] inset-x-0 min-h-20 p-2 flex flex-row top-[10vh] border-b border-b-neutral-700 overflow-x-scroll w-full">
      <div className="flex flex-row md:justify-center items-center gap-4 w-full px-4">
        {firstCategorySplit?.map(({ id, name }) => (
          <NavItem id={id} name={name} />
        ))}
        <OtherCategories categories={secondCategorySplit} />
      </div>
    </div>
  );
};

export default SecondaryNav;

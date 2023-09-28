"use server";

import getCategories from "@/actions/getCategories";

import NavItem from "./nav-item";
import OtherCategories from "./other-categories";
import HomeButton from "./ui/home-button";

const SPLIT_INDEX = 4;

const SecondaryNav = async () => {
  const categories = await getCategories();
  if (!categories) return null;
  const firstCategorySplit = categories.slice(0, SPLIT_INDEX);
  const secondCategorySplit = categories.slice(SPLIT_INDEX);
  return (
    <div className="no-scrollbar flex h-[7vh] w-full flex-row overflow-x-scroll border-b border-b-neutral-700 bg-neutral-900/90 p-2 backdrop-blur-md">
      <div className="flex w-full flex-row items-center gap-4 px-4 md:justify-center">
        <HomeButton />
        {firstCategorySplit?.map(({ id, name }) => (
          <NavItem id={id} name={name} />
        ))}
        <OtherCategories categories={secondCategorySplit} />
      </div>
    </div>
  );
};

export default SecondaryNav;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NavItem = ({ id, name }: { id: string; name: string }) => {
  const pathname = usePathname();
  const isCurrentPathActive = pathname === `/category/${id}`;
  return (
    <Link
      href={`/category/${id}`}
      className={cn(
        "inline-flex min-w-max items-center justify-center text-zinc-400 duration-200 hover:text-zinc-100",
        isCurrentPathActive &&
          "rounded-md bg-neutral-700 px-2 py-1 text-zinc-100"
      )}
    >
      {name}
    </Link>
  );
};

export default NavItem;

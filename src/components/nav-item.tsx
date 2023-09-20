"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ id, name }: { id: string; name: string }) => {
  const pathname = usePathname();
  const isCurrentPathActive = pathname === `/category/${id}`;
  return (
    <Link
      href={`/category/${id}`}
      className={cn(
        "duration-200 min-w-max text-zinc-400 hover:text-zinc-100 inline-flex items-center justify-center",
        isCurrentPathActive && "py-1 px-2 bg-neutral-700 rounded-md text-zinc-100"
      )}
    >
      {name}
    </Link>
  );
};

export default NavItem;

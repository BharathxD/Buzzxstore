"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Link from "next/link";
import { Category } from "@prisma/client";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

const OtherCategories = ({ categories }: { categories: Category[] }) => {
  const modalRef = useRef(null);
  const triggerClickOutside = () => {
    const outsideElement = document.getElementById("modal-element");
    if (outsideElement) {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      outsideElement.dispatchEvent(clickEvent);
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className="outline-none duration-200 text-zinc-400 hover:text-zinc-100 items-center justify-center gap-2"
        asChild
      >
        <Button
          id="modal-element"
          variant="link"
          className="duration-200 text-zinc-400 hover:text-zinc-100 inline-flex items-center justify-center"
        >
          <span>More</span>
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={modalRef}
        showClose={false}
        className="overflow-y-scroll p-4 backdrop-blur-md bg-neutral-950/80 border-neutral-700 max-h-[75vh] rounded-lg md:max-h-[90vh] max-w-[90vw] w-[80vw]"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {categories.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/category/${item.id}`}
                className="bg-neutral-900 border border-neutral-700 p-4 md:aspect-square flex items-center justify-center rounded-md hover:text-zinc-100 text-center text-xl font-medium duration-150 lg:text-2xl text-zinc-200 group-hover:text-white font-display"
                onClick={triggerClickOutside}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtherCategories;

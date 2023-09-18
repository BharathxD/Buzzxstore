"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Ampersand, ArrowLeft, X } from "lucide-react";
import SearchBar from "./search-bar";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <div
        className={`fixed inset-x-0 max-h-[10vh] top-0 z-50 bg-neutral-900 duration-200 border-b border-b-neutral-700`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <SearchBar />
          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100 font-bold"
          >
            <Image
              alt="BuzzXStore logo"
              src="/assets/logo.png"
              height={100}
              width={100}
              className="object-fit"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

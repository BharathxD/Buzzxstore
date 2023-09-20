"use client";

import type { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold text-neutral-50">{title}</div>
      <div className="mt-1 text-neutral-200">{subtitle}</div>
    </div>
  );
};

export default Heading;

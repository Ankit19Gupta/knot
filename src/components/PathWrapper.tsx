"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function PathWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const className =
    path === "/book"
      ? "p-0 text-black bg-white 2xl:p-0"
      : "pt-5 p-4 pb-0 md:p-6 2xl:p-12 2xl:pl-10 text-black bg-white md:border-black";

  return <div className={className}>{children}</div>;
}

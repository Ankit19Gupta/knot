"use client";
import { useState, useEffect } from "react";

export const useResponsive = (breakpoint: number = 768) => {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsBelow(window.innerWidth > breakpoint);

    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, [breakpoint]);

  return isBelow;
};

"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { ReactNode, useEffect } from "react";

const AosProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  }, []);

  return children;
};

export { AosProvider };

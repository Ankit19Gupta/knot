import AboutPage from "@/components/pages/AboutPage";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "The Wedding Sutra.in",
  description: "The-Wedding-Sutra",
};

const page = () => {
  return (
    <div>
      <AboutPage />
    </div>
  );
};

export default page;

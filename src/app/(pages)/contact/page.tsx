import ContactPage from "@/components/pages/contactPage";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "The Wedding Sutra.in",
  description: "The-Wedding-Sutra",
};
const page = () => {
  return (
    <div>
      <ContactPage />
    </div>
  );
};

export default page;

import React from "react";
import BookingPage from "@/components/pages/BookingPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Wedding Sutra.in",
  description: "The-Wedding-Sutra",
};
const page = () => {
  return (
    <div>
      <BookingPage />
    </div>
  );
};

export default page;

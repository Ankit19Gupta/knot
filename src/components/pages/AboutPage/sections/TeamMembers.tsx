"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import TeamMemberData from "@/dummyData/TeamMemeber.json";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

gsap.registerPlugin(ScrollTrigger);

const TeamMemberCard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const teamMembers = useMemo(() => TeamMemberData, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const cardWidth = scrollContainer.clientWidth;
    scrollContainer.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center md:mt-10 lg:mt-0"
          data-aos="fade-up"
        >
          Team Members
        </h2>

        {/* Mobile View - Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-6 scroll-smooth scrollbar-hide"
          data-aos="flip-left"
        >
          {teamMembers.map((card, idx) => (
            <Card
              key={card.id}
              className="relative min-w-[85%] h-[400px] snap-start shrink-0 overflow-hidden rounded-xl shadow-2xl bg-transparent group"
            >
              <div className="absolute inset-0 bg-red-900 grayscale group-hover:grayscale-0 transition-all duration-500">
                {!imageLoaded[idx] && (
                  <Skeleton
                    height="100%"
                    width="100%"
                    className="absolute inset-0"
                  />
                )}
                <Image
                  src={card.src || "/placeholder.jpg"}
                  alt={card.name}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                  className={`object-cover transition-opacity duration-300 ${
                    imageLoaded[idx] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, [idx]: true }))
                  }
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <CardContent className="absolute bottom-0 left-0 w-full p-6 pt-10 text-center z-10">
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-200 transition">
                  {card.name}
                </h3>
                <p className="text-gray-200 group-hover:text-white transition">
                  {card.designation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center mt-4 md:hidden">
          {teamMembers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-2 rounded-full mx-1 transition-all duration-300 focus:outline-none ${
                activeIndex === idx ? "bg-gray-700 w-5" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>

        {/* Desktop Grid View */}
        <div
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
          data-aos="flip-left"
        >
          {teamMembers.map((card, idx) => (
            <Card
              key={card.id}
              className="group relative w-full h-[400px] overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.03] hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-red-900 grayscale group-hover:grayscale-0 transition-all duration-500">
                {!imageLoaded[idx] && (
                  <Skeleton
                    height="100%"
                    width="100%"
                    className="absolute inset-0"
                  />
                )}
                <Image
                  src={card.src || "/placeholder.jpg"}
                  alt={card.name}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                  className={`object-cover transition-opacity duration-300 ${
                    imageLoaded[idx] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, [idx]: true }))
                  }
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <CardContent className="absolute bottom-0 left-0 w-full p-6 pt-10 text-center z-10">
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-200 transition">
                  {card.name}
                </h3>
                <p className="text-gray-200 group-hover:text-white transition">
                  {card.designation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMemberCard;

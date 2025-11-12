"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import videoData from "@/dummyData/Data.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type VideoItem = {
  title: string;
  video: string;
  url: string;
};

export const Cards = () => {
  const typedVideoData: VideoItem[] = videoData;

  const [videoVisible, setVideoVisible] = useState<boolean[]>(
    Array(typedVideoData.length).fill(false)
  );

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const observers = useRef<(IntersectionObserver | null)[]>([]);

  useEffect(() => {
    const localObservers: (IntersectionObserver | null)[] = [];

    itemsRef.current.forEach((el, index) => {
      if (!el) return;

      observers.current[index]?.disconnect();

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVideoVisible((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.current[index] = observer;
      localObservers.push(observer);
    });

    return () => {
      localObservers.forEach((obs) => obs?.disconnect());
    };
  }, [typedVideoData]);

  return (
    <div className="w-full">
      {/* Heading */}
      <div
        className="flex justify-center flex-col gap-3 items-center mb-3"
        data-aos="fade-right"
      >
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight">
          PICTURES OF GRATITUDE
        </h2>
        <h3 className="text-xs sm:text-base uppercase tracking-wider font-medium">
          HERE&apos;S WHAT OUR COUPLES HAVE TO SAY
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative" data-aos="fade-up">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto"
        >
          <CarouselContent className="ml-0 flex gap-2 sm:gap-4">
            {typedVideoData.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 p-0 sm:pr-4"
              >
                <div
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="rounded-sm overflow-hidden bg-white shadow-lg transition hover:shadow-xl group relative p-4 sm:p-6"
                >
                  <a href={item.url} target="_blank">
                    {/* ✅ Portrait Mode Applied */}
                    <div className="relative w-full aspect-[2/3]">
                      {!videoVisible[index] ? (
                        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-sm" />
                      ) : (
                        <Image
                          alt={item.title}
                          src={item.video}
                          width={400}
                          height={600}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-4 bg-gradient-to-t from-black/40 to-transparent text-white z-10">
                        <h3 className="font-bold text-xs sm:text-sm mt-1 text-center">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="absolute -bottom-10 md:-top-14.5 lg:-top-14.5 right-0 flex items-center justify-between md:items-start p-6 w-full md:w-[120px]">
            <CarouselPrevious
              className="static translate-y-0 rounded-full bg-black border-black text-black cursor-pointer hover:text-red-400"
              style={{ backgroundColor: "#EFEFEF" }}
            />
            <CarouselNext
              className="static translate-y-0 rounded-full bg-[#EFEFEF] border-black hover:text-red-400 text-black cursor-pointer"
              style={{ backgroundColor: "#EFEFEF" }}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Cards;

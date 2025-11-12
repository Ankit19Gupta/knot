"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlayCircle } from "lucide-react";
import videoData from "@/dummyData/videoData.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VideoItem = {
  title: string;
  video: string;
};

export const Videos = () => {
  const typedVideoData: VideoItem[] = videoData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean[]>(
    Array(typedVideoData.length).fill(false)
  );
  const [videoVisible, setVideoVisible] = useState<boolean[]>(
    Array(typedVideoData.length).fill(false)
  );

  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const observers = useRef<(IntersectionObserver | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      }

      itemsRef.current.forEach((item) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const localObservers: (IntersectionObserver | null)[] = [];

    itemsRef.current.forEach((el, index) => {
      if (!el) return;

      // Clean up old observer if exists
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

  const handleVideoLoaded = (index: number) => {
    setVideoLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2
          ref={headingRef}
          className="text-2xl md:text-3xl 2xl:text-4xl font-bold"
        >
          Cinematic Memories
        </h2>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto"
        >
          <CarouselContent className="ml-0 flex gap-2">
            {typedVideoData.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 pl-0 md:pr-4"
              >
                <div
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="rounded-lg overflow-hidden bg-white shadow-lg transition hover:shadow-xl group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative w-full aspect-3/2">
                    {/* Skeleton while loading */}
                    {!videoLoaded[index] && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 z-0" />
                    )}

                    {/* Lazy loaded video */}
                    {videoVisible[index] && (
                      <video
                        src={item.video}
                        preload="none"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onCanPlay={() => handleVideoLoaded(index)}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/40 to-transparent text-white z-10">
                      <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                    </div>

                    {hoveredIndex === index && (
                      <button
                        onClick={() => window.open(item.video, "_blank")}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition z-20"
                      >
                        <PlayCircle className="w-12 h-12 text-white opacity-90 hover:opacity-100 transition cursor-pointer" />
                      </button>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute -top-14 md:-top-14.5 right-0 flex gap-2">
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

export default Videos;

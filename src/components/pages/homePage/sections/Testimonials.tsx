"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Thank you so much capturing such special moments, we cried every single time we watched it!",
    author: "MAHEK SINGH",
    image: "/gallery/image1.webp",
    blur: "/gallery/image1-blur.jpg",
  },
  {
    quote:
      "The photos exceeded our expectations. Every emotion was captured beautifully!",
    author: "PRIYA & RAHUL",
    image: "/gallery/image2.webp",
    blur: "/gallery/image2-blur.jpg",
  },
  {
    quote:
      "Working with you was the best decision we made for our wedding day. The memories will last forever.",
    author: "ANANYA SHARMA",
    image: "/gallery/image3.avif",
    blur: "/gallery/image3-blur.jpg",
  },
  {
    quote:
      "Working with you was the best decision we made for our wedding day. The memories will last forever.",
    author: "ANANYA SHARMA",
    image: "/gallery/image4.avif",
    blur: "/gallery/image4-blur.jpg",
  },
  {
    quote:
      "Working with you was the best decision we made for our wedding day. The memories will last forever.",
    author: "ANANYA SHARMA",
    image: "/gallery/image5.webp",
    blur: "/gallery/image5-blur.jpg",
  },
  {
    quote:
      "Working with you was the best decision we made for our wedding day. The memories will last forever.",
    author: "ANANYA SHARMA",
    image: "/gallery/image5.webp",
    blur: "/gallery/image5-blur.jpg",
  },
  {
    quote:
      "Working with you was the best decision we made for our wedding day. The memories will last forever.",
    author: "ANANYA SHARMA",
    image: "/gallery/image5.webp",
    blur: "/gallery/image5-blur.jpg",
  },
];

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState<boolean[]>(
    new Array(testimonials.length).fill(false)
  );

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        subheadingRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert(); // proper cleanup
    };
  }, []);

  return (
    <section className="bg-[#f7f7f7] py-12">
      <div className="mx-auto max-w-7xl 2xl:max-w-none space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <h3
            ref={headingRef}
            className="text-sm sm:text-base uppercase tracking-wider font-medium"
          >
            HERE&apos;S WHAT OUR COUPLES HAVE TO SAY
          </h3>
          <h2
            ref={subheadingRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight"
          >
            PICTURES OF GRATITUDE
          </h2>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full overflow-hidden"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="mx-auto">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 min-w-0" // ✅ Locks sizing
              >
                <Card className="h-full flex flex-col justify-between bg-white text-black shadow-md">
                  <CardContent className="p-0">
                    {" "}
                    {/* ✅ Removed extra padding */}
                    {/* <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
                      {!loadedIndexes[index] && (
                        <div className="absolute inset-0 animate-pulse bg-gray-200 z-0" />
                      )}
                      <Image
                        src={testimonial.image}
                        alt={`Testimonial by ${testimonial.author}`}
                        fill
                        placeholder="blur"
                        priority={index < 2}
                        blurDataURL={testimonial.blur}
                        onLoad={() =>
                          setLoadedIndexes((prev) => {
                            const updated = [...prev];
                            updated[index] = true;
                            return updated;
                          })
                        }
                        className={cn(
                          "object-contain object-center transition-opacity duration-500",
                          loadedIndexes[index] ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div> */}
                    <div className="relative aspect-[2/3] w-full  overflow-hidden rounded-md">
                      {!loadedIndexes[index] && (
                        <div className="absolute inset-0 animate-pulse bg-gray-200 z-0" />
                      )}
                      <Image
                        src={testimonial.image}
                        alt={`Testimonial by ${testimonial.author}`}
                        fill
                        placeholder="blur"
                        priority={index < 2}
                        blurDataURL={testimonial.blur}
                        onLoad={() =>
                          setLoadedIndexes((prev) => {
                            const updated = [...prev];
                            updated[index] = true;
                            return updated;
                          })
                        }
                        className={cn(
                          "object-contain object-center transition-opacity duration-500",
                          loadedIndexes[index] ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-center text-base sm:text-lg">
                      {testimonial.quote}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="justify-center text-sm font-medium">
                    - {testimonial.author}
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-1 hidden sm:flex hover:text-black cursor-pointer" />
          <CarouselNext className="-right-4 hidden sm:flex hover:text-black cursor-pointer" />
        </Carousel>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 gap-1.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full cursor-pointer transition-all",
                current === index ? "w-6 bg-gray-500" : "bg-gray-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

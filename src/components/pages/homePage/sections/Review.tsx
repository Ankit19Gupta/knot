"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const reviewCards = [
  {
    src: "/reviews/review1.jpg",
    alt: "Gourav & Ambika",
    name: "Gourav & Ambika",
    date: "23 July 2025",
    text: "Thanks Wedding Sutra for capturing this memorial moment so perfectly 🥰",
    rating: 5,
  },
  {
    src: "/reviews/review2.jpg",
    alt: "Amrit & Sneha",
    name: "Amrit & Sneha",
    date: "21 July 2025",
    text: "I'm so grateful for your talent and hard work. Thank you for the amazing photos.",
    rating: 5,
  },
  {
    src: "/reviews/review3.jpg",
    alt: "Debasish & Tamannah",
    name: "Debasish & Tamannah",
    date: "10 July 2025",
    text: "Thank you so much for the wonderful photography & videography.",
    rating: 5,
  },
  {
    src: "/reviews/review4.jpg",
    alt: "Joydeep & Krishna",
    name: "Joydeep & Krishna",
    date: "3 March 2025",
    text: "Each photo, video & highlight is beautiful.",
    rating: 5,
  },
  {
    src: "/reviews/review5.jpg",
    alt: "Subrata & Jayita",
    name: "Subrata & Jayita",
    date: "15 Nov 2023",
    text: "The team really captured every moment beautifully.",
    rating: 5,
  },
];

const ReviewCard = ({
  image,
  loaded,
  onClick,
}: {
  image: (typeof reviewCards)[0];
  loaded: boolean;
  onClick: () => void;
}) => (
  <div
    className="w-[300px] sm:w-[260px] flex-shrink-0 rounded-3xl overflow-hidden shadow-lg bg-white flex flex-col items-center cursor-pointer transition-transform hover:scale-[1.02]"
    onClick={onClick}
  >
    <div className="relative w-full h-[300px]">
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        className={`object-contain transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 640px) 260px, 300px"
      />
    </div>
  </div>
);

const Review = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLHeadingElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    (typeof reviewCards)[0] | null
  >(null);
  const gsapTimelineRef = useRef<gsap.core.Tween | null>(null);

  const cardSetWithGap = () => {
    const elements: React.ReactNode[] = [];
    for (let i = 0; i < 5; i++) {
      reviewCards.forEach((card, index) => {
        elements.push(
          <ReviewCard
            key={`set${i}-card${index}`}
            loaded={loaded}
            image={card}
            onClick={() => setSelectedImage(card)}
          />
        );
      });
      elements.push(
        <div key={`gap-${i}`} className="w-[300px] sm:w-[260px] shrink-0" />
      );
    }
    return elements;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = scrollRef.current;
      if (!el) return;

      const scrollAmount = el.scrollWidth / 2;

      const tween = gsap.to(el, {
        x: -scrollAmount,
        duration: 90,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % scrollAmount),
        },
      });

      gsapTimelineRef.current = tween;
    }, scrollRef);

    return () => {
      ctx.revert();
    };
  }, [loaded]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headingRef.current) return;
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
            toggleActions: "play none none reverse",
          },
        }
      );
      // subHeading animation
      if (!subHeadingRef.current) return;
      gsap.fromTo(
        subHeadingRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subHeadingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (gsapTimelineRef.current) {
      if (selectedImage) {
        gsapTimelineRef.current.pause();
      } else {
        gsapTimelineRef.current.play();
      }
    }
  }, [selectedImage]);

  return (
    <div className="overflow-hidden relative bg-white py-16">
      <div className="flex justify-end mb-6 md:mb-0">
        <Link
          href={
            "https://www.google.com/search?sca_esv=e7c1514da748dd1c&sxsrf=AE3TifMSlAHw5cCbXV8kLDfFug4NhNbE-g:1756124587818&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E6FAmyEX84m0g_Dw7PWDOyCLT1BFbjxqPILttfqib1d9Nw678rn0NHHwikGxKZhxH3TTAsBwbgYKmYYX3qGuRCW8FKBY42DMU_CPXaRi7qCbQ2AGNg%3D%3D&q=The+Wedding+Sutra.in+Reviews&sa=X&ved=2ahUKEwi-1_Px-aWPAxUBzjgGHYsnN5sQ0bkNegQIOBAE&biw=1280&bih=585&dpr=1.5&zx=1756124614591&no_sw_cr=1#lrd=0x3753f54b508e0893:0xfff3e6108d72c2b1,3,,,,"
          }
          target="_blank"
        >
          <button className="text-sm md:text-base px-4 md:px-6 py-2 md:py-2 bg-black text-white rounded-xl cursor-pointer">
            Write Your Review
          </button>
        </Link>
      </div>
      <h2
        ref={headingRef}
        className="text-2xl md:text-3xl font-bold text-center text-gray-800"
      >
        Client Reviews
      </h2>
      <h3
        ref={subHeadingRef}
        className="text-xs sm:text-base text-center mb-10 mt-1 uppercase tracking-wider font-medium"
      >
        HERE&apos;S WHAT OUR COUPLES HAVE TO SAY
      </h3>

      <div className="relative h-[380px] sm:h-[360px] w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 flex gap-6 w-max will-change-transform"
        >
          {cardSetWithGap()}
        </div>
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent
          className="w-[95vw] max-w-[500px] sm:max-w-[600px] md:max-w-[700px] 2xl:max-w-[1200px] 
                   bg-white p-0 overflow-hidden rounded-2xl 2xl:rounded-3xl 
                   shadow-2xl animate-in fade-in-90 slide-in-from-bottom-10 duration-500 
                   [&>button]:hidden"
        >
          <DialogHeader>
            <DialogTitle className="text-black text-2xl 2xl:text-4xl pl-3 2xl:p-6 mt-2 text-start">
              Client Review
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            {selectedImage && (
              <>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={700}
                  height={500}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />

                <DialogClose asChild>
                  <button className="absolute -top-12 2xl:-top-22 right-4 text-white bg-black/60 hover:bg-black/80 p-1.5 rounded-full cursor-pointer">
                    <X className="h-5 w-5 2xl:h-10 2xl:w-10" />
                  </button>
                </DialogClose>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Review;

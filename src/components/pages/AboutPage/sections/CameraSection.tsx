/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Text from "./Text";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  "/camera/1.1.jpg",
  "/camera/1.jpg",
  "/camera/5.jpg",
  "/camera/8.jpg",
  "/camera/41.jpg",
  "/camera/51.jpg",
  "/camera/63.jpg",
];

export default function CameraSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    photoRefs.current = photos.map((_, i) => photoRefs.current[i] ?? null);
  }, []);

  const setPhotoRef = (index: number) => (el: HTMLDivElement | null) => {
    photoRefs.current[index] = el;
  };

  useEffect(() => {
    let ctx: gsap.Context;
    let mm: gsap.MatchMedia;

    const setupAnimation = () => {
      if (ctx) ctx.revert();
      if (mm) mm.kill();

      ctx = gsap.context(() => {
        mm = gsap.matchMedia();

        const createTimeline = () => {
          // Reset photo positions
          photoRefs.current.forEach((photo, i) => {
            if (!photo) return;
            gsap.set(photo, {
              opacity: 0,
              y: "100vh",
              scale: 0.9,
              rotation: (i % 2 === 0 ? -1 : 1) * (4 + i * 2),
            });
          });

          if (cameraRef.current) {
            gsap.set(cameraRef.current, { opacity: 0, y: 50 });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${photos.length * window.innerHeight * 0.8}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          });

          // Animate camera in
          if (cameraRef.current) {
            tl.to(
              cameraRef.current,
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              0.2
            );
          }

          // Animate photos
          const photoDuration = 0.5;
          const stagger = 0.4;
          photoRefs.current.forEach((photo, i) => {
            if (!photo) return;
            tl.to(
              photo,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: photoDuration,
                ease: "power3.out",
              },
              i * stagger + 0.4
            );
          });
        };

        mm.add("(max-width: 767px)", createTimeline);
        mm.add("(min-width: 768px)", createTimeline);
      }, sectionRef);
    };

    setupAnimation();

    const handleResize = () => {
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        setupAnimation();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if ((window as any).resizeTimeout)
        clearTimeout((window as any).resizeTimeout);
      if (ctx) ctx.revert();
      if (mm) mm.kill();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 90%",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden my-8 rounded-xl flex flex-col justify-end items-center bg-[#EFEFEF]"
      >
        {/* Title */}
        <div
          ref={textRef}
          className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 px-4"
        >
          <Text />
        </div>

        {/* Floating Photos */}
        <div className="absolute md:top-12 top-20 2xl:top-56 left-1/2 -translate-x-1/2 z-10">
          {photos.map((src, index) => (
            <div
              key={index}
              ref={setPhotoRef(index)}
              className="absolute shadow-xl rounded-md border-[3px] sm:border-[4px] md:border-[5px] border-white overflow-hidden"
              style={{
                width: "70vw",
                maxWidth: index % 2 === 0 ? "200px" : "200px",
                aspectRatio: "2 / 3",
                top: `${index * 14}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: index,
              }}
            >
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>

        {/* Camera Image */}
        <div
          ref={cameraRef}
          className="relative z-20 w-full px-4 
            max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] 
            lg:max-w-[32rem] xl:max-w-[40rem] 2xl:max-w-[52rem]
            mb-4"
        >
          <Image
            src="/camera/PNG.png"
            alt="Camera"
            width={1200}
            height={1200}
            className="w-full h-auto absolute
              bottom-[-7rem] sm:bottom-[-9rem]
              md:bottom-[-11rem] lg:bottom-[-13rem]
              xl:bottom-[-15rem] 2xl:bottom-[-18rem]"
            priority
          />
        </div>
      </div>
    </div>
  );
}

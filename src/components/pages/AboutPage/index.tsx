"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CameraSection from "./sections/CameraSection";
import TeamMemberCard from "./sections/TeamMembers";
import Animation from "./sections/Animation";
import SecondAnimation from "./sections/SecondAnimation";
import CartoonAnimation from "./sections/CartoonAnimation";
import FadeAnimated from "./sections/FadeAnimated";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          scrub: false,
        },
      });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 0.3,
          scale: 3.1,
          duration: 3,
          ease: "power2.out",
        },
        0
      ).fromTo(
        imageRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 3,
          ease: "power2.out",
        },
        0
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div
        ref={wrapperRef}
        className="relative w-full h-screen overflow-hidden rounded-xl"
      >
        <div
          ref={overlayRef}
          className="absolute z-10 w-[120vw] h-[120vw] scale-0 opacity-0 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-none"
        ></div>

        <div ref={imageRef} className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/weddingIdeas.jpg"
            alt="wedding team"
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <Animation />
      <SecondAnimation />
      <CartoonAnimation />
      <FadeAnimated />
      <TeamMemberCard />
      <CameraSection />
    </div>
  );
};

export default AboutPage;

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TermsConditions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: underlineRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      ScrollTrigger.batch(cardRefs.current, {
        start: "top 90%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 40,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.inOut",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white py-6 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 mt-10"
    >
      <div className="max-w-5xl mx-auto lg:max-w-none">
        <div className="text-center mb-6 sm:mb-8">
          <h1
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
          >
            Terms & Conditions
          </h1>
          <div
            ref={underlineRef}
            className="mt-2 h-0.5 w-20 bg-red-400 mx-auto scale-x-0"
          />
        </div>

        <div className="space-y-4 sm:space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
          {[
            {
              title: "1. Booking Confirmation",
              content:
                "A non-refundable booking amount of ₹10,000 is mandatory to confirm the date and assign our team.",
            },
            {
              title: "2. Payment Policy",
              content:
                "The remaining balance (excluding ₹5,000 trust amount) must be paid 24 hours before the reception event. Failure to do so will result in cancellation of reception coverage.",
            },
            {
              title: "3. Documentation Requirement",
              content:
                "Upon invoice and quotation receipt, the client must sign this Terms & Conditions document with valid ID proof. No project will commence without proper documentation.",
            },
            {
              title: "4. Cancellation Policy",
              content:
                "If the client cancels the project 30+ days before the event, 50% of the booking amount will be refunded. Within 30 days, no refund is applicable.",
            },
            {
              title: "5. Outstation Travel & Stay",
              content:
                "For events outside Agartala, the client must ensure proper resting space or accommodation for our team near the event venue. Stage/backstage arrangements are not acceptable. If possible, providing a comfortable hotel room is highly appreciated but not mandatory",
            },
            {
              title: "6. Post-Production & Data Delivery",
              content:
                "Final edits (photos, reels, videos, etc.) will be delivered within 2–3 months. Clients requesting RAW files earlier must provide a hard drive (post full payment). Data will be unedited.",
            },
            {
              title: "7. Data Responsibility Window",
              content:
                "We hold project data for only 2 months after final delivery. Please ensure backups within this period.",
            },
            {
              title: "8. Album Design Policy",
              content:
                "If an album is included, clients must send selected photos within 60 days of final delivery. Delays beyond this will cancel the album entitlement.",
            },
            {
              title: "9. Music & Video Inputs",
              content:
                "Clients must share preferred songs and essential details (names, spelling, etc.) at least 1 month before editing starts. Only 2 rounds of changes per video type are permitted.",
            },
            {
              title: "10. Technical Limitations Clause",
              content:
                "We are not liable for unrecoverable data loss due to technical issues like memory card or hard drive failure, despite our professional backups. No refund shall be claimed.",
            },
            {
              title: "11. Group Photos Disclaimer",
              content:
                "We focus mainly on the bride & groom. Clients must guide us in real time for important family/friend group shots. We cannot ensure group photos unless directed.",
            },
            {
              title: "12. T&C Validity Timeline",
              content:
                "These terms are applicable only during the event and delivery period. Once all deliverables and payments are completed, this agreement stands terminated.",
            },
            {
              title: "13. Force Majeure Clause",
              content:
                "We are not responsible for delays or failures due to events beyond our control (natural disasters, strikes, or health emergencies). Dates will be rescheduled, not refunded.",
            },
            {
              title: "14. Content Usage Rights",
              content:
                "We reserve the right to use selected photos/videos for promotional use unless the client specifically requests otherwise in written form at the time of booking.",
            },
            {
              title: "15. Extra Work Charges",
              content:
                "Any work beyond the agreed package (e.g., extra shoot days, out-of-scope edits) will be chargeable and added to the final invoice.",
            },
            {
              title: "16. Note:",
              content:
                "Signing this document confirms that the client agrees to all the points listed above.",
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => setCardRef(el, i)}
              className="opacity-0 translate-y-10 bg-gray-50 p-4 sm:p-5 rounded-md shadow-sm"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-justify">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;

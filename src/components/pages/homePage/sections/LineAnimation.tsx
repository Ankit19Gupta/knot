// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const LineAnimation = () => {
//   const path1 = useRef<SVGPathElement>(null);
//   const cameraPath = useRef<SVGPathElement>(null);
//   const cameraGroup = useRef<SVGGElement>(null);
//   const path2 = useRef<SVGPathElement>(null);
//   const vert1 = useRef<SVGPathElement>(null);
//   const vert2 = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     const elements = [
//       path1.current,
//       cameraPath.current,
//       path2.current,
//       vert1.current,
//       vert2.current,
//       cameraGroup.current,
//     ];

//     elements.forEach((el) => {
//       if (el) {
//         gsap.set(el, { opacity: 0 });
//         if (el instanceof SVGPathElement) {
//           const length = el.getTotalLength();
//           el.style.strokeDasharray = `${length}`;
//           el.style.strokeDashoffset = `${length}`;
//         }
//       }
//     });

//     const timeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".line-animation-wrapper",
//         start: "top center",
//         end: "bottom center",
//         scrub: 1,
//         markers: false,
//       },
//     });

//     // Path1
//     timeline.to(path1.current, { opacity: 1, duration: 1 }).to(path1.current, {
//       strokeDashoffset: 0,
//       ease: "none",
//       duration: 6, // slower
//     });

//     // Vertical 1
//     timeline.to(vert1.current, { opacity: 1, duration: 1 }, "<2.5").to(
//       vert1.current,
//       {
//         strokeDashoffset: 0,
//         ease: "none",
//         duration: 4, // slower
//       },
//       "<"
//     );

//     // Camera + Camera Path
//     timeline
//       .to(cameraPath.current, { opacity: 1, duration: 1 }, "<1.5")
//       .to(
//         cameraPath.current,
//         {
//           strokeDashoffset: 0,
//           ease: "none",
//           duration: 5, // slower
//         },
//         "<"
//       )
//       .to(
//         cameraGroup.current,
//         {
//           opacity: 1,
//           duration: 2, // slower
//         },
//         "<0.5"
//       );

//     // Vertical 2
//     timeline.to(vert2.current, { opacity: 1, duration: 0.8 }, "<0.5").to(
//       vert2.current,
//       {
//         strokeDashoffset: 0,
//         ease: "none",
//         duration: 3, // slower
//       },
//       "<"
//     );

//     // Path2
//     timeline.to(path2.current, { opacity: 1, duration: 1 }, "<0.5").to(
//       path2.current,
//       {
//         strokeDashoffset: 0,
//         ease: "none",
//         duration: 5, // slower
//       },
//       "<"
//     );
//   }, []);

//   return (
//     <div className="line-animation-wrapper w-full h-[200px] flex items-center justify-center bg-white">
//       <svg
//         viewBox="0 0 1200 115"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-full md:max-w-[1000px] h-[200px] 2xl:max-w-none 2xl:w-full"
//         preserveAspectRatio="xMidYMid meet"
//       >
//         {/* Path1 */}
//         <path
//           ref={path1}
//           d="M0 100
//              C 150 50, 150 150, 200 100
//              C 300 50, 400 150, 500 100
//              L 530 70"
//           stroke="red"
//           strokeWidth="2"
//           fill="none"
//         />

//         {/* Path2 */}
// <path
//   ref={path2}
//   d="M570 70
//      L 600 100
//      C 700 150, 800 50, 900 100
//      C 950 150, 1050 50, 1200 100"
//   stroke="red"
//   strokeWidth="2"
//   fill="none"
// />

//         {/* Vertical Connectors */}

//         {/* Camera */}
//         <g ref={cameraGroup} transform="translate(522, 45)">
//           <path
//             d="M0 -15
//                L 5 -25 H25 L30 -15 H40
//                A5 5 0 0 1 45 -10 V10
//                A5 5 0 0 1 40 15 H-10
//                A5 5 0 0 1 -15 10 V-10
//                A5 5 0 0 1 -10 -15 H0"
//             stroke="red"
//             strokeWidth="1.5"
//             transform="scale(1.7)"
//             fill="none"
//           />
//           <circle
//             cx="25"
//             cy="-3"
//             r="20"
//             stroke="red"
//             strokeWidth="1.5"
//             fill="none"
//           />
//           <circle
//             cx="60"
//             cy="-10"
//             r="5"
//             stroke="red"
//             strokeWidth="1.5"
//             fill="none"
//           />
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default LineAnimation;

"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LineAnimation = () => {
  const path1 = useRef<SVGPathElement>(null);
  const cameraPath = useRef<SVGPathElement>(null);
  const cameraGroup = useRef<SVGGElement>(null);
  const path2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    const elements = [
      path1.current,
      cameraPath.current,
      path2.current,
      cameraGroup.current,
    ];

    elements.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0 });
        if (el instanceof SVGPathElement) {
          const length = el.getTotalLength();
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;
        }
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".line-animation-wrapper",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    timeline
      // Left Path
      .to(path1.current, { opacity: 1, duration: 1 })
      .to(path1.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 5,
      })

      // Camera
      .to(cameraPath.current, { opacity: 1, duration: 1 })
      .to(cameraPath.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 4,
      })
      .to(cameraGroup.current, {
        opacity: 1,
        duration: 1.5,
      })

      // Right Path
      .to(path2.current, { opacity: 1, duration: 1 })
      .to(path2.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 5,
      });
  }, []);

  return (
    <div className="line-animation-wrapper w-full h-[200px] flex items-center justify-center bg-white">
      <svg
        viewBox="0 0 1200 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full md:max-w-[1000px] h-[300px] 2xl:max-w-none 2xl:w-full 2xl:mt-20"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left Path */}
        <path
          ref={path1}
          d="M0 100 
             C 150 50, 150 150, 350 100 
             C 450 50, 430 80, 600 55"
          stroke="red"
          strokeWidth="2"
          fill="none"
        />

        {/* Right Path */}
        <path
          ref={path2}
          d="M600 55 
             C 670 80, 750 50, 900 100 
             C 950 150, 1050 50, 1200 100"
          stroke="red"
          strokeWidth="2"
          fill="none"
        />

        {/* Camera Group */}
        <g ref={cameraGroup} transform="translate(570, 28)">
          <path
            d="M0 -15 
               L 5 -25 H25 L30 -15 H40 
               A5 5 0 0 1 45 -10 V10 
               A5 5 0 0 1 40 15 H-10 
               A5 5 0 0 1 -15 10 V-10 
               A5 5 0 0 1 -10 -15 H0"
            stroke="red"
            strokeWidth="1.5"
            transform="scale(1.7)"
            fill="none"
          />
          <circle
            cx="25"
            cy="-3"
            r="20"
            stroke="red"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="60"
            cy="-10"
            r="5"
            stroke="red"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export default LineAnimation;

"use client";
import React, { useState, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const shimmer = (w: number, h: number) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${w}" height="${h}" fill="#f3f3f3" />
       <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
     </svg>`
  ).toString("base64")}`;

// Cloudinary helper
const cldUrl = (url: string, type: "video" | "poster" = "video") => {
  if (!url.includes("/upload/")) return url;

  if (type === "video") {
    return url.replace("/upload/", "/upload/f_auto,q_auto/");
  }

  return url
    .replace("/upload/", "/upload/f_auto,q_auto/")
    .replace(/\.(mp4|mov)$/, ".jpg");
};

const packageDataSingle = [
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026300/35000_oq7vmp.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026300/35000_oq7vmp.mp4",
      "poster"
    ),
    imageDetails: "/packages/singleSide/11.jpg",
    name: "Classic",
    type: "single-side",
    price: "₹35,000",
    description: ["4 Hours Coverage", "100 Edited Photos", "1 Photographer"],
  },
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026305/45000_tdsl0x.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026305/45000_tdsl0x.mp4",
      "poster"
    ),
    imageDetails: "/packages/singleSide/13.jpg",
    name: "Premium",
    type: "single-side",
    price: "₹45,000",
    description: ["6 Hours Coverage", "200 Edited Photos", "2 Photographers"],
  },
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026301/55000_tdep1j.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026301/55000_tdep1j.mp4",
      "poster"
    ),
    imageDetails: "/packages/singleSide/15.jpg",
    name: "Divyajyoti",
    type: "single-side",
    price: "₹55,000",
    description: ["Full Day Coverage", "300+ Edited Photos", "3 Photographers"],
  },
];

const packageDataDouble = [
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026300/65000_lix5ng.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026300/65000_lix5ng.mp4",
      "poster"
    ),
    imageDetails: "/packages/bothSide/3 (1).jpg",
    name: "Classic",
    type: "both-side",
    price: "₹65,000",
    description: ["8 Hours Coverage", "200 Edited Photos", "2 Photographers"],
  },
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026301/75000_fbdtnh.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026301/75000_fbdtnh.mp4",
      "poster"
    ),
    imageDetails: "/packages/bothSide/5.jpg",
    name: "Gold",
    type: "both-side",
    price: "₹75,000",
    description: ["10 Hours Coverage", "300 Edited Photos", "3 Photographers"],
  },
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026304/85000_skmtn4.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026304/85000_skmtn4.mp4",
      "poster"
    ),
    imageDetails: "/packages/bothSide/7.jpg",
    name: "Premium",
    type: "both-side",
    price: "₹85,000",
    description: ["12 Hours Coverage", "400+ Edited Photos", "4 Photographers"],
  },
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026305/110000_htf3uq.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1754026305/110000_htf3uq.mp4",
      "poster"
    ),
    imageDetails: "/packages/bothSide/9.jpg",
    name: "MangGalam",
    type: "both-side",
    price: "₹1,10,000",
    description: [
      "Full Wedding Coverage",
      "500+ Edited Photos",
      "5 Photographers",
    ],
  },
];

const riceCeremony = [
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1758112328/1._RICE_CEREMONY_PACKAGE-_12000_ub0vin.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1758112328/1._RICE_CEREMONY_PACKAGE-_12000_ub0vin.mp4",
      "poster"
    ),
    imageDetails:
      "https://res.cloudinary.com/ankitgupta/image/upload/v1758112329/1._RICE_CEREMONY_12000_PACKAGE_jx47ve.jpg",
    name: "Classic",
    type: "rice",
    price: "₹12,000",
    description: ["4 Hours Coverage", "100 Edited Photos", "1 Photographer"],
  },
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1758112329/2._RICE_CEREMONY_PACKAGE-_15000_xytr8x.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1758112329/2._RICE_CEREMONY_PACKAGE-_15000_xytr8x.mp4",
      "poster"
    ),
    imageDetails:
      "https://res.cloudinary.com/ankitgupta/image/upload/v1758112330/2._RICE_CEREMONY_15000_PACKAGE_ipsqca.jpg",
    name: "Gold",
    type: "rice",
    price: "₹15,000",
    description: ["6 Hours Coverage", "200 Edited Photos", "2 Photographers"],
  },
  {
    image:
      "https://res.cloudinary.com/ankitgupta/video/upload/v1758112346/3._RICE_CEREMONY_PACKAGE-_21000_grnl16.mp4",
    poster: cldUrl(
      "https://res.cloudinary.com/ankitgupta/video/upload/v1758112346/3._RICE_CEREMONY_PACKAGE-_21000_grnl16.mp4",
      "poster"
    ),
    imageDetails:
      "https://res.cloudinary.com/ankitgupta/image/upload/v1758112335/3._RICE_CEREMONY_21000_PACKAGE_hyocm3.jpg",
    name: "Premium",
    type: "rice",
    price: "₹21,000",
    description: ["8 Hours Coverage", "300 Edited Photos", "3 Photographers"],
  },
];

type SelectedPackageType = {
  image: string;
  poster: string;
  imageDetails: string;
  name: string;
  type: string;
  price: string;
  description: string[];
};

type PackageCardProps = {
  image: string;
  poster: string;
  name: string;
  price: string;
  onDetails: () => void;
};

// ================= Package Card =================
const PackageCard = memo(({ image, poster, onDetails }: PackageCardProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "150px" });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <Card
      ref={ref}
      data-aos="zoom-in"
      className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col text-black w-full overflow-hidden group"
    >
      <CardContent className="w-full p-0 relative">
        <div className="relative h-80 w-full overflow-hidden">
          {!inView && (
            <Image
              src={poster}
              alt="Package Poster"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              placeholder="blur"
              blurDataURL={shimmer(400, 320)}
              className="object-cover"
            />
          )}

          {inView && !hasError ? (
            <video
              key={image}
              src={`${image.replace("/upload/", "/upload/f_auto,q_auto/")}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              controls={false}
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                console.warn("Video load failed →", image);
                setIsLoading(false);
                setHasError(true);
              }}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          ) : hasError ? (
            <video
              key={image + "-retry"}
              src={image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              controls={false}
              onLoadedData={() => setHasError(false)}
              onError={() => {
                console.error("Retry failed → fallback poster");
                setHasError(true);
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={poster}
              alt="Package Poster"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
              Video not available
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-center px-4 pb-4 pt-2">
        <Button
          className="rounded-full px-6 py-2 w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-white font-medium"
          onClick={onDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
});
PackageCard.displayName = "PackageCard";

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] =
    useState<SelectedPackageType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleDetailsClick = useCallback((pkg: SelectedPackageType) => {
    setSelectedPackage(pkg);
    setDialogOpen(true);
  }, []);

  const handleBookNowClick = useCallback(() => {
    if (selectedPackage) {
      localStorage.setItem(
        "selected_package",
        JSON.stringify({
          type: selectedPackage.type,
          name: selectedPackage.name,
        })
      );
      setDialogOpen(false);

      if (selectedPackage.type === "rice") {
        router.push("/rice");
      } else {
        router.push("/book");
      }
    }
  }, [selectedPackage, router]);

  return (
    <div className="w-full py-8 bg-white" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12">
          One Sided Wedding Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {packageDataSingle.map((pkg, index) => (
            <PackageCard
              key={`single-${index}`}
              image={pkg.image}
              poster={pkg.poster}
              name={pkg.name}
              price={pkg.price}
              onDetails={() => handleDetailsClick(pkg)}
            />
          ))}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 text-center mb-12">
          Both Sided Wedding Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packageDataDouble.map((pkg, index) => (
            <PackageCard
              key={`double-${index}`}
              image={pkg.image}
              poster={pkg.poster}
              name={pkg.name}
              price={pkg.price}
              onDetails={() => handleDetailsClick(pkg)}
            />
          ))}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 text-center my-10">
          Rice Ceremony Package
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {riceCeremony.map((pkg, index) => (
            <PackageCard
              key={`rice-${index}`}
              image={pkg.image}
              poster={pkg.poster}
              name={pkg.name}
              price={pkg.price}
              onDetails={() => handleDetailsClick(pkg)}
            />
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full max-w-3xl md:max-w-2xl 2xl:max-w-6xl bg-white text-black p-4 md:p-6 2xl:p-10 gap-4 shadow-2xl animate-in fade-in-90 slide-in-from-bottom-10 duration-700 ease-out rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-black font-semibold text-xl md:text-2xl text-start">
              Package Details
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <div className="relative w-full aspect-[16/10] mb-4 rounded-lg overflow-hidden">
              <Image
                src={selectedPackage.imageDetails}
                alt={selectedPackage.name}
                fill
                sizes="(max-width: 768px) 95vw, 1200px"
                placeholder="blur"
                blurDataURL={shimmer(600, 400)}
                className="object-contain md:object-cover"
              />
            </div>
          )}

          <Button
            className="rounded-full px-6 py-3 w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-white font-medium text-lg"
            onClick={handleBookNowClick}
          >
            Book Now
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackagesSection;

"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { poppins } from "@/app/font";
import SignatureUploader from "../../BookingPage/SignatureUploader";

gsap.registerPlugin(ScrollTrigger);

export const formSchema = z.object({
  packageName: z.string().min(1, "Package name is required"),
  babyName: z.string().min(1, "Baby's name is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Enter valid phone number",
    }),
  location: z.string().optional(),
  parentsNames: z.object({
    father: z.string().optional(),
    mother: z.string().optional(),
  }),
  ritualType: z.string().optional(),
  rituals: z.object({
    day1: z.string().optional(),
    day2: z.string().optional(),
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  userSignature: z
    .instanceof(File, { message: "Please provide your signature" })
    .or(z.literal(null))
    .superRefine((val, ctx) => {
      if (val === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Signature is required",
        });
      }
    }),
});

export const riceCeremonyPackages = [
  {
    name: "Baby Rice Ceremony",
    image:
      "https://res.cloudinary.com/ankitgupta/image/upload/v1758112329/1._RICE_CEREMONY_12000_PACKAGE_jx47ve.jpg",
    price: "₹ 12,000.00",
    description: [
      "1 day hole event photo and video cover.",
      "1 photographer and 1 videographer will be provide.",
      "1 Full HD video with one pendrive.",
      "1 highglossy paper album",
      "All photo of the event will be provide colourgraded.",
    ],
  },
  {
    name: "Premium Baby Rice Ceremony",
    image:
      "https://res.cloudinary.com/ankitgupta/image/upload/v1758112330/2._RICE_CEREMONY_15000_PACKAGE_ipsqca.jpg",
    price: "₹ 25,000.00",
    description: [
      "1 day hole event photo and video cover.",
      "1 photographer and 1 videographer will be provide.",
      "All photos of the event will be provide colourgraded.",
      "1 Full HD cinematic video.",
      "1 High-glossy 20 page album.",
      "1 Day baby Out-door PhotoShoot.",
    ],
  },
  {
    name: "Deluxe Baby Rice Ceremony",
    image:
      "https://res.cloudinary.com/ankitgupta/image/upload/v1758112335/3._RICE_CEREMONY_21000_PACKAGE_hyocm3.jpg",
    price: "₹ 21,000.00",
    description: [
      "2 Days Baby Outdoor Photo Shoot.",
      "1/2 Day Whole Event photo and video Covered.",
      "1 Photographer and 1 Videographer will be Provided.",
      "Full HD Cinematic Video With Pendrive.",
      "1 Highglossy Or NTR Paper Album 20 Pages.",
      "1 e-invitation card (Photo & Video).",
      "All Photos Of The Event will Be Provided Colourgraded.",
    ],
  },
];

const ritualOptions = [
  { value: "single-day", label: "Single Day Ceremony" },
  { value: "two-day", label: "Two Day Ceremony" },
];

const RiceCeremony = () => {
  const [loading] = useState(false);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);

  const storedPackage =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedPackage")
      : null;

  const initialPackage = storedPackage
    ? riceCeremonyPackages.find(
        (pkg) => pkg.name === JSON.parse(storedPackage).name
      )
    : riceCeremonyPackages[0];

  const [selectedPackage, setSelectedPackage] = useState(initialPackage);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageName: selectedPackage?.name || "",
      babyName: "",
      phoneNumber: "",
      location: "",
      parentsNames: {
        father: "",
        mother: "",
      },
      ritualType: "",
      rituals: {
        day1: "",
        day2: "",
      },
      acceptTerms: false,
      userSignature: null,
    },
  });

  const ritualType = form.watch("ritualType");

  // GSAP animation
  useEffect(() => {
    inputRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      }
    });
  }, []);

  const handlePackageChange = (val: string) => {
    const pkg = riceCeremonyPackages.find((p) => p.name === val);
    if (pkg) {
      setSelectedPackage(pkg);
      form.setValue("packageName", pkg.name);
      localStorage.setItem(
        "selectedPackage",
        JSON.stringify({ name: pkg.name })
      );
    }
  };

  const handleFormSubmit = form.handleSubmit(
    (data) => {
      console.log("Form Submitted ✅:", data);
    },
    (errors) => {
      console.log("Validation Errors ❌:", errors);
    }
  );

  return (
    <div
      className={`${poppins.className} min-h-screen text-white bg-contain bg-center overflow-hidden bg-fixed md:rounded-xl 2xl:rounded-2xl rounded-xl`}
      style={{
        backgroundImage: `url('/booking/bgContact.jpg')`,
      }}
    >
      <div className="min-h-screen rounded-2xl flex items-center justify-center">
        <div className="backdrop-blur-sm bg-black/60 p-4 md:p-8 shadow-lg w-full overflow-y-auto">
          {selectedPackage && (
            <div className="p-6 mb-6 rounded-xl bg-black/40 shadow-lg">
              <h2 className="text-2xl font-bold text-yellow-400 text-center">
                Selected Package: {selectedPackage.name}
              </h2>
              <p className="text-center text-green-400 font-semibold mb-4">
                Price: {selectedPackage.price}
              </p>
              <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full">
                <ul className="list-disc pl-6 space-y-2">
                  {selectedPackage.description.map((desc, idx) => (
                    <li key={idx} className="text-white">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="packageName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">
                      Select Package *
                    </FormLabel>
                    <Select
                      onValueChange={handlePackageChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-white shadow-md w-full">
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="backdrop-blur-md bg-white/10 border-white/40 text-white shadow-md">
                        {riceCeremonyPackages.map((pkg, index) => (
                          <SelectItem key={index} value={pkg.name}>
                            {pkg.name} - {pkg.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="babyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Baby&apos;s Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter baby's name"
                        {...field}
                        className="placeholder:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ceremony location" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white drop-shadow-md">
                  Parents&apos; Names
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="parentsNames.father"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Father&apos;s Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Father's name"
                            {...field}
                            className="placeholder:text-sm placeholder:text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentsNames.mother"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Mother&apos;s Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Mother's name"
                            {...field}
                            className="placeholder:text-sm placeholder:text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="ritualType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold drop-shadow-md">
                      Select Your Rituals
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger className="text-white shadow-md transition-colors">
                          <SelectValue placeholder="Select ritual type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="backdrop-blur-md bg-white/10 border-white/40 text-white shadow-md">
                        {ritualOptions.map((option, index) => (
                          <SelectItem key={index} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {ritualType && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white drop-shadow-md">
                    Ritual Dates
                  </h3>

                  {ritualType === "single-day" && (
                    <FormField
                      control={form.control}
                      name="rituals.day1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold drop-shadow-md">
                            Ceremony Date
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  )}

                  {ritualType === "two-day" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="rituals.day1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold drop-shadow-md">
                              Day 1
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rituals.day2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold drop-shadow-md">
                              Day 2
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white drop-shadow-md">
                  Signature
                </h3>
                <FormField
                  control={form.control}
                  name="userSignature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Your Signature *
                      </FormLabel>
                      <FormControl>
                        <div>
                          <SignatureUploader
                            onSignatureChange={(file) => {
                              field.onChange(file);
                            }}
                            value={field.value}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel>
                        <Label className="text-white">
                          Accept terms and conditions *
                        </Label>
                      </FormLabel>
                      <FormDescription className="text-white text-sm mt-2">
                        <Label>
                          By checking this box, you agree to our Terms of
                          Service and Privacy Policy.
                        </Label>
                      </FormDescription>
                    </div>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full max-w-sm flex items-center justify-center mx-auto mt-4 rounded-full"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Booking"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RiceCeremony;

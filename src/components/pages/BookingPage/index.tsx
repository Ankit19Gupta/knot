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
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";
import SignatureUploader from "./SignatureUploader";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { poppins } from "@/app/font";

gsap.registerPlugin(ScrollTrigger);

export const formSchema = z.object({
  packageType: z.string().min(1, "Package type is required"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  brideName: z.string().min(1, "Bride name is required"),
  groomName: z.string().min(1, "Groom name is required"),
  brideAddress: z.string().min(1, "Bride Address is required"),
  groomAddress: z.string().min(1, "Groome Address is required"),

  asirbadBrideDate: z.string().optional(),
  asirbadGroomDate: z.string().optional(),
  engagementDate: z.string().optional(),
  bidayDate: z.string().optional(),
  baronDate: z.string().optional(),
  receptionDate: z.string().optional(),

  panakhiliType: z.string().optional(),
  panakhiliDates: z
    .object({
      bride: z.string().optional(),
      groom: z.string().optional(),
    })
    .optional(),

  HaldiType: z.string().optional(),
  HaldiDates: z
    .object({
      bride: z.string().optional(),
      groom: z.string().optional(),
    })
    .optional(),

  brideEmail: z
    .string()
    .min(1, "Bride email is required")
    .email("Enter a valid email"),

  bridePhone: z
    .string()
    .min(1, "Bride phone is required")
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Enter valid phone",
    }),

  groomEmail: z
    .string()
    .min(1, "Groome email is required")
    .email("Enter a valid email"),

  groomPhone: z
    .string()
    .min(1, "Groome phone is required")
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Enter valid phone",
    }),

  guests: z.string().optional(),
  location: z.string().optional(),
  rituals: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),

  nameOfThePackege: z.object({
    title: z.string().min(1, "Title required"),
    Description: z.array(z.string()),
    price: z.string().min(1, "Price required"),
  }),

  userSignature: z
    .instanceof(File, {
      message: "Please provide your signature",
    })
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

type FormValues = z.infer<typeof formSchema>;

export const packagesData: Record<
  string,
  { name: string; price: string; description: string[] }[]
> = {
  "single-side": [
    {
      name: "Classic",
      price: "₹ 35,000.00",
      description: [
        "𝐅𝐮𝐥𝐥 𝐄𝐯𝐞𝐧𝐭 𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 𝐀𝐧𝐝 𝐓𝐫𝐚𝐝𝐢𝐭𝐢𝐨𝐧𝐚𝐥 𝐇𝐃 𝐕𝐢𝐝𝐞𝐨𝐠𝐫𝐚𝐩𝐡𝐲 𝐖𝐢𝐭𝐡 𝐎𝐧𝐞 𝐏𝐞𝐧𝐝𝐫𝐢𝐯𝐞.",
        "𝐀𝐥𝐥 𝐏𝐡𝐨𝐭𝐨𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐖𝐡𝐨𝐥𝐞 𝐄𝐯𝐞𝐧𝐭 𝐰𝐢𝐥𝐥 𝐁𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐝 𝐂𝐨𝐥𝐨𝐮𝐫𝐠𝐫𝐚𝐝𝐞𝐝.",
      ],
    },
    {
      name: "Premium",
      price: "₹ 45,000.00",
      description: [
        "𝐅𝐮𝐥𝐥 𝐄𝐯𝐞𝐧𝐭 𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 𝐀𝐧𝐝 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨𝐠𝐫𝐚𝐩𝐡𝐲 𝐖𝐢𝐭𝐡 𝐎𝐧𝐞 𝐏𝐞𝐧𝐝𝐫𝐢𝐯𝐞.",
        "𝟏 𝐃𝐚𝐲 𝐏𝐫𝐞𝐰𝐞𝐝𝐝𝐢𝐧𝐠/𝐏𝐨𝐬𝐭𝐰𝐞𝐝𝐝𝐢𝐧𝐠 𝐏𝐡𝐨𝐭𝐨𝐬𝐡𝐨𝐨𝐭.",
        "𝟏 𝐀𝐥𝐛𝐮𝐦 𝐍𝐓𝐑 𝐇𝐢𝐠𝐡 𝐆𝐥𝐨𝐬𝐬𝐲 𝟐𝟎 𝐏𝐚𝐠𝐞.",
        "𝐀𝐥𝐥 𝐏𝐡𝐨𝐭𝐨𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐖𝐡𝐨𝐥𝐞 𝐄𝐯𝐞𝐧𝐭 𝐰𝐢𝐥𝐥 𝐁𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐝 𝐂𝐨𝐥𝐨𝐮𝐫𝐠𝐫𝐚𝐝𝐞𝐝..",
        "𝟏 𝐑𝐞𝐞𝐥𝐬 𝐕𝐢𝐝𝐞𝐨 & 𝟏 𝐄-𝐈𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧 𝐂𝐚𝐫𝐝",
      ],
    },
    {
      name: "Divyajyoti",
      price: "₹ 55,000.00",
      description: [
        "𝟐 𝐃𝐚𝐲 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐏𝐡𝐨𝐭𝐨𝐬𝐡𝐨𝐨𝐭.",
        "𝐀𝐥𝐥 𝐄𝐯𝐞𝐧𝐭𝐬 𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 & 𝐅𝐇𝐃 𝐜𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐯𝐢𝐝𝐞𝐨 𝐝𝐞𝐥𝐢𝐯𝐞𝐫𝐞𝐝 𝐰𝐢𝐭𝐡 𝐨𝐧𝐞 𝐩𝐞𝐧𝐝𝐫𝐢𝐯𝐞 (𝐂𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧 𝐀𝐩𝐩𝐥𝐲 𝐨𝐧 𝐄𝐯𝐞𝐧𝐭𝐬 )",
        "𝟏 𝐀𝐥𝐛𝐮𝐦 𝐖𝐢𝐭𝐡 𝐍𝐓𝐑/𝐇𝐢𝐠𝐡𝐆𝐥𝐨𝐬𝐬𝐲 𝟐𝟎 𝐏𝐚𝐠𝐞𝐬 𝐄𝐚𝐜𝐡 …",
        "𝐀𝐥𝐥 𝐏𝐡𝐨𝐭𝐨𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐰𝐡𝐨𝐥𝐞 𝐄𝐯𝐞𝐧𝐭 𝐰𝐢𝐥𝐥 𝐁𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐂𝐨𝐥𝐨𝐮𝐫𝐠𝐫𝐚𝐝𝐞𝐝…",
        "All Events Photography and Videography (Condition's Apply)",
        "𝐍𝐨𝐭𝐞: 𝐅𝐮𝐥𝐥 𝐄𝐯𝐞𝐧𝐭 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨  𝐰𝐢𝐥𝐥 𝐬𝐭𝐚𝐫𝐭𝐬 𝐟𝐫𝐨𝐦 𝐨𝐮𝐫 𝟕𝟓𝐤 𝐏𝐚𝐜𝐤𝐚𝐠𝐞..",
        "Notes: 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐥𝐥 𝐂𝐨𝐬𝐭 𝟏𝟎𝐊 𝐈𝐧𝐜𝐥𝐮𝐝𝐞𝐬 𝐞𝐱𝐭𝐫𝐚….",
      ],
    },
  ],
  "both-side": [
    {
      name: "Classic",
      price: "₹ 65,000.00",
      description: [
        "𝟏 𝐃𝐚𝐲 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐏𝐡𝐨𝐭𝐨𝐬𝐡𝐨𝐨𝐭.",
        "𝐀𝐥𝐥 𝐄𝐯𝐞𝐧𝐭𝐬 𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 & 𝐓𝐫𝐚𝐝𝐢𝐭𝐢𝐨𝐧𝐚𝐥 𝐅𝐮𝐥𝐥-𝐇𝐃 𝐕𝐢𝐝𝐞𝐨 (𝐂𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧   𝐀𝐩𝐩𝐥𝐲 𝐨𝐧 𝐄𝐯𝐞𝐧𝐭𝐬 & 𝐑𝐢𝐭𝐮𝐚𝐥𝐬) 𝐃𝐞𝐥𝐢𝐯𝐞𝐫𝐞𝐝 𝐖𝐢𝐭𝐡 𝐎𝐧𝐞 𝐏𝐞𝐧𝐝𝐫𝐢𝐯𝐞.",
        "𝟐 𝐀𝐥𝐛𝐮𝐦 𝐇𝐢𝐠𝐡 𝐆𝐥𝐨𝐬𝐬𝐲 𝐖𝐢𝐭𝐡 𝟐𝟎 𝐏𝐚𝐠𝐞𝐬 𝐄𝐚𝐜𝐡..",
        "𝐀𝐥𝐥 𝐏𝐡𝐨𝐭𝐨𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐰𝐡𝐨𝐥𝐞 𝐄𝐯𝐞𝐧𝐭 𝐰𝐢𝐥𝐥 𝐁𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐝 𝐂𝐨𝐥𝐨𝐮𝐫𝐠𝐫𝐚𝐝𝐞𝐝…",
        "Notes: 𝐅𝐮𝐥𝐥 𝐄𝐯𝐞𝐧𝐭 𝐓𝐫𝐞𝐝𝐢𝐭𝐢𝐨𝐧𝐚𝐥 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨  𝐰𝐢𝐥𝐥 𝐬𝐭𝐚𝐫𝐭𝐬 𝐟𝐫𝐨𝐦 𝐨𝐮𝐫 𝟕𝟓𝐤 𝐏𝐚𝐜𝐤𝐚𝐠𝐞..",
        "Notes: 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐥𝐥 𝐂𝐨𝐬𝐭 𝟏𝟎𝐊 𝐄𝐱𝐭𝐫𝐚.",
      ],
    },
    {
      name: "Gold",
      price: "₹ 75,000.00",
      description: [
        "𝟐 𝐃𝐚𝐲 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐏𝐡𝐨𝐭𝐨𝐬𝐡𝐨𝐨𝐭.",
        "𝐀𝐥𝐥 𝐄𝐯𝐞𝐧𝐭𝐬 𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 & 𝐓𝐫𝐚𝐝𝐢𝐭𝐢𝐨𝐧𝐚𝐥 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨(𝐂𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧 𝐀𝐩𝐩𝐥𝐲 𝐨𝐧 𝐄𝐯𝐞𝐧𝐭𝐬 ) 𝐃𝐞𝐥𝐢𝐯𝐞𝐫𝐞𝐝 𝐖𝐢𝐭𝐡 𝐎𝐧𝐞 𝐏𝐞𝐧𝐝𝐫𝐢𝐯𝐞",
        "𝟐 𝐀𝐥𝐛𝐮𝐦 𝐇𝐢𝐠𝐡 𝐆𝐥𝐨𝐬𝐬𝐲 𝐖𝐢𝐭𝐡 𝟐𝟎 𝐏𝐚𝐠𝐞𝐬..",
        "𝐀𝐥𝐥 𝐏𝐡𝐨𝐭𝐨𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐖𝐡𝐨𝐥𝐞 𝐄𝐯𝐞𝐧𝐭 𝐰𝐢𝐥𝐥 𝐁𝐞 𝐏𝐫𝐨𝐯𝐢𝐝 𝐂𝐨𝐥𝐨𝐮𝐫𝐠𝐫𝐚𝐝𝐞𝐝..",
        "Notes: 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐥𝐥 𝐂𝐨𝐬𝐭 𝟏𝟎𝐊.",
      ],
    },
    {
      name: "Premium",
      price: "₹ 85,000.00",
      description: [
        "𝟑 𝐃𝐚𝐲 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐏𝐡𝐨𝐭𝐨𝐬𝐡𝐨𝐨𝐭.",
        "𝐀𝐥𝐥 𝐄𝐯𝐞𝐧𝐭𝐬 𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 & 𝐓𝐫𝐚𝐝𝐢𝐭𝐢𝐨𝐧𝐚𝐥 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 (𝐂𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧𝐬 𝐀𝐩𝐩𝐥𝐲 𝐨𝐧 𝐄𝐯𝐞𝐧𝐭𝐬 ) 𝐃𝐞𝐥𝐢𝐯𝐞𝐫𝐞𝐝 𝐖𝐢𝐭𝐡 𝐎𝐧𝐞 𝐏𝐞𝐧𝐝𝐫𝐢𝐯𝐞.",
        "𝟏 𝐀𝐥𝐛𝐮𝐦  𝐍𝐓𝐑/𝐆𝐨𝐥𝐝 𝐌𝐚𝐭𝐞𝐥𝐢𝐜 𝟐𝟓 𝐏𝐚𝐠𝐞𝐬 𝐖𝐢𝐭𝐡 𝐆𝐥𝐚𝐬𝐬 𝐂𝐨𝐯𝐞𝐫 & 𝐆𝐥𝐚𝐬𝐬 𝐁𝐨𝐱..",
        "𝐀𝐥𝐥 𝐏𝐡𝐨𝐭𝐨𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐖𝐡𝐨𝐥𝐞 𝐄𝐯𝐞𝐧𝐭 𝐰𝐢𝐥𝐥 𝐁𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐂𝐨𝐥𝐨𝐮𝐫𝐠𝐫𝐚𝐝𝐞𝐝…",
        "𝐃𝐫𝐨𝐧𝐞 𝐒𝐡𝐨𝐨𝐭 𝐖𝐢𝐥𝐥 𝐛𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐝 𝐨𝐧 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐃𝐚𝐲(𝐒𝐢𝐭𝐮𝐚𝐭𝐢𝐨𝐧 𝐛𝐚𝐬𝐞𝐝)….",
        "𝟏 𝐑𝐞𝐞𝐥𝐬 𝐕𝐢𝐝𝐞𝐨 & 𝟏 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐇𝐢𝐠𝐡𝐥𝐢𝐠𝐡𝐭 𝐕𝐢𝐝𝐞𝐨 (𝟐-𝟓 𝐌𝐢𝐧𝐢𝐭𝐬)…",
        "𝟏 𝐄- 𝐈𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧 𝐂𝐚𝐫𝐝.",
      ],
    },
    {
      name: "MangGalam",
      price: "₹ 1,10000",
      description: [
        "𝟑 𝐃𝐚𝐲 𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐏𝐡𝐨𝐭𝐨𝐬𝐡𝐨𝐨𝐭.",
        "𝐀𝐥𝐥 𝐄𝐯𝐞𝐧𝐭𝐬 𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 & 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝟒𝐊 𝐕𝐢𝐝𝐞𝐨 (𝐂𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧𝐬 𝐀𝐩𝐩𝐥𝐲 𝐨𝐧 𝐄𝐯𝐞𝐧𝐭𝐬 ) 𝐃𝐞𝐥𝐢𝐯𝐞𝐫𝐞𝐝 𝐖𝐢𝐭𝐡 𝐏𝐞𝐧𝐝𝐫𝐢𝐯𝐞.",
        "𝟐 𝐀𝐥𝐛𝐮𝐦  𝐍𝐓𝐑/𝐆𝐨𝐥𝐝 𝐌𝐚𝐭𝐞𝐥𝐢𝐜 𝟐𝟎 𝐏𝐚𝐠𝐞𝐬 𝐖𝐢𝐭𝐡 𝐆𝐥𝐚𝐬𝐬 𝐂𝐨𝐯𝐞𝐫 & 𝐆𝐥𝐚𝐬𝐬 𝐁𝐨𝐱..",
        "𝐃𝐫𝐨𝐧𝐞 𝐒𝐡𝐨𝐨𝐭 𝐖𝐢𝐥𝐥 𝐛𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐝 𝐨𝐧 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐃𝐚𝐲..",
        "𝟐 𝐑𝐞𝐞𝐥𝐬 𝐕𝐢𝐝𝐞𝐨 𝐀𝐧𝐝 𝟏 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐇𝐢𝐠𝐡𝐥𝐢𝐠𝐡𝐭 𝐕𝐢𝐝𝐞𝐨.",
        "𝟏 𝐄-𝐈𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧 𝐂𝐚𝐫𝐝.",
        "𝐏𝐫𝐞/𝐏𝐨𝐬𝐭 𝐖𝐞𝐝𝐝𝐢𝐧𝐠 𝐂𝐢𝐧𝐞𝐦𝐚𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐥𝐥 𝐁𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐝…",
        "𝐀𝐥𝐥 𝐏𝐡𝐨𝐭𝐨𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐇𝐨𝐥𝐞 𝐄𝐯𝐞𝐧𝐭𝐬 𝐰𝐢𝐥𝐥  𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐂𝐨𝐥𝐨𝐮𝐫𝐝𝐞𝐝...",
      ],
    },
  ],
};

type MatchedPackage = { name: string; price: string; description: string[] };

const BookingPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showPanakhiliDates, setShowPanakhiliDates] = useState<boolean>(false);
  const [showChoiceDates, setShowChoiceDates] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedPackageName, setSelectedPackageName] = useState<string>("");
  const [savedPackage, setSavedPackage] = useState<MatchedPackage | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageType: "",
      asirbadBrideDate: "",
      asirbadGroomDate: "",
      engagementDate: "",
      weddingDate: "",
      bidayDate: "",
      baronDate: "",
      receptionDate: "",
      panakhiliType: "",
      panakhiliDates: { bride: "", groom: "" },
      HaldiType: "",
      HaldiDates: { bride: "", groom: "" },
      brideName: "",
      brideAddress: "",
      brideEmail: "",
      bridePhone: "",
      groomName: "",
      groomAddress: "",
      groomEmail: "",
      groomPhone: "",
      guests: "",
      location: "",
      rituals: "",
      acceptTerms: false,
      userSignature: null,
      nameOfThePackege: {
        title: "",
        Description: [],
        price: "",
      },
    },
  });

  const packageType = form.watch("packageType");
  const panakhiliType = form.watch("panakhiliType");
  const haldiType = form.watch("HaldiType");

  useEffect(() => {
    const stringifiedPackage = localStorage.getItem("selected_package");
    if (stringifiedPackage && !packageType) {
      const saved = JSON.parse(stringifiedPackage);
      const matchedPackage = packagesData[saved.type]?.find(
        (pkg) => pkg.name === saved.name
      );
      if (matchedPackage) {
        const fullPackageType = `${saved.type}:${saved.name.toLowerCase()}`;
        setSelectedPackage(saved.type);
        setSelectedPackageName(saved.name.toLowerCase());
        setSavedPackage(matchedPackage);
        form.setValue("packageType", fullPackageType);
        form.setValue("nameOfThePackege", {
          title: matchedPackage.name,
          Description: matchedPackage.description,
          price: matchedPackage.price,
        });
      }
    }
  }, [form, packageType]);

  useEffect(() => {
    const shouldShow =
      packageType.startsWith("single-side:") ||
      packageType.startsWith("both-side:");
    if (shouldShow) {
      const [type, name] = packageType.split(":");
      setSelectedPackage(type);
      setSelectedPackageName(name);
    } else if (packageType === "single-side" || packageType === "both-side") {
      setSelectedPackage(packageType);
      setSelectedPackageName("");
    } else {
      setSelectedPackage("");
      setSelectedPackageName("");
    }
  }, [packageType]);

  useEffect(() => {
    const shouldShow =
      panakhiliType === "both" ||
      panakhiliType === "bride" ||
      panakhiliType === "groom";
    setShowPanakhiliDates(shouldShow);
    if (!shouldShow) {
      form.setValue("panakhiliDates.bride", "");
      form.setValue("panakhiliDates.groom", "");
    }
  }, [panakhiliType, form]);

  useEffect(() => {
    const shouldShow =
      haldiType === "both" || haldiType === "bride" || haldiType === "groom";
    setShowChoiceDates(shouldShow);
    if (!shouldShow) {
      form.setValue("HaldiDates.bride", "");
      form.setValue("HaldiDates.groom", "");
    }
  }, [haldiType, form]);

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

  const handlePackageSelection = (packageType: string, packageName: string) => {
    const fullPackageType = `${packageType}:${packageName}`;
    setSelectedPackage(packageType);
    setSelectedPackageName(packageName);
    const selectedPkg = packagesData[packageType].find(
      (pkg) => pkg.name.toLowerCase() === packageName
    );
    if (selectedPkg) {
      form.setValue("packageType", fullPackageType);
      form.setValue("nameOfThePackege", {
        title: selectedPkg.name,
        Description: selectedPkg.description,
        price: selectedPkg.price,
      });
      setSavedPackage(selectedPkg);
      localStorage.setItem(
        "selected_package",
        JSON.stringify({ type: packageType, name: selectedPkg.name })
      );
    }
    if (inputRefs.current[0]) {
      const el = inputRefs.current[0].querySelector('button, [tabindex="0"]');
      if (el) (el as HTMLElement).focus();
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      (Object.keys(data) as (keyof FormValues)[]).forEach((key) => {
        const value = data[key];
        if (key === "userSignature" && value instanceof File) {
          formData.append("userSignature", value);
        } else if (value !== null && value !== undefined) {
          formData.append(
            key as string,
            typeof value === "object" ? JSON.stringify(value) : String(value)
          );
        }
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/marriageData`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      toast.success("Form Submitted!");
      form.reset();
      form.setValue("panakhiliType", "select-your-side");
      form.setValue("HaldiType", "select-your-choice");
      setSelectedPackage("");
      setSelectedPackageName("");
      setSavedPackage(null);
      localStorage.removeItem("selected_package");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = form.handleSubmit(
    (data) => {
      console.log("Form validation passed, calling onSubmit");
      onSubmit(data);
    },
    (errors) => {
      console.log("Form validation failed:", errors);
    }
  );

  return (
    <div
      className={`${poppins.className} min-h-screen text-white bg-contain bg-center overflow-hidden bg-fixed md:rounded-xl 2xl:rounded-2xl`}
      style={{
        backgroundImage: `url('/booking/bgContact.jpg')`,
      }}
    >
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          backgroundImage: `url('/logo/logo2.png')`,
          backgroundPosition: "center",
          objectFit: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />
      <div className="min-h-screen rounded-2xl flex items-center justify-center">
        <div className="backdrop-blur-sm bg-black/50 p-4 md:p-8 shadow-lg w-full overflow-y-auto 2xl:h-screen">
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-6 text-white drop-shadow-md text-center">
            The Knot&Narratives.in
          </h1>

          {savedPackage && (
            <div className="my-6 p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-xl text-white w-full border border-white/20">
              <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">
                Selected Package:{" "}
                <span className="text-yellow-300">{savedPackage.name}</span>
              </h2>
              <p className="text-lg text-center mb-4">
                <span className="font-medium text-white/90">Price:</span>{" "}
                <span className="text-green-400 font-bold">
                  {savedPackage.price}
                </span>
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-white/80">
                {savedPackage.description.map((point, index) => (
                  <li key={index + "" + index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="packageType"
                render={({ field }) => (
                  <FormItem
                    ref={(el) => {
                      inputRefs.current[0] = el;
                    }}
                  >
                    <FormLabel className="text-white font-semibold drop-shadow-sm">
                      Select Package
                    </FormLabel>
                    <Select
                      onValueChange={(value: string) => {
                        if (value === "select-your-package") {
                          field.onChange(value);
                          setSelectedPackage("");
                          setSelectedPackageName("");
                          setSavedPackage(null);
                          form.setValue("nameOfThePackege", {
                            title: "",
                            Description: [],
                            price: "",
                          });
                          localStorage.removeItem("selected_package");
                        } else if (
                          value.startsWith("single-side:") ||
                          value.startsWith("both-side:")
                        ) {
                          const [type, name] = value.split(":");
                          field.onChange(value);
                          handlePackageSelection(type, name);
                        } else {
                          field.onChange(value);
                          setSelectedPackage(value);
                          setSelectedPackageName("");
                          setSavedPackage(null);
                          form.setValue("nameOfThePackege", {
                            title: "",
                            Description: [],
                            price: "",
                          });
                        }
                      }}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="text-white shadow-md transition-colors">
                          <SelectValue placeholder="Select your package" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="backdrop-blur-md bg-white/10 border-white/40 text-white shadow-md">
                        <SelectItem value="select-your-package">
                          Select Your Package
                        </SelectItem>
                        <SelectItem value="single-side">Single Side</SelectItem>
                        <SelectItem value="both-side">Both Side</SelectItem>
                        {selectedPackage === "single-side" && (
                          <>
                            <SelectItem value="single-side:classic">
                              Single-side: Classic
                            </SelectItem>
                            <SelectItem value="single-side:premium">
                              Single-side: Premium
                            </SelectItem>
                            <SelectItem value="single-side:divyajyoti">
                              Single-side: Divyajyoti
                            </SelectItem>
                          </>
                        )}
                        {selectedPackage === "both-side" && (
                          <>
                            <SelectItem value="both-side:classic">
                              Both-side: Classic
                            </SelectItem>

                            <SelectItem value="both-side:gold">
                              Both-side: Gold
                            </SelectItem>
                            <SelectItem value="both-side:premium">
                              Both-side: Premium
                            </SelectItem>
                            <SelectItem value="both-side:manggalam">
                              Both-side: MangGalam
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {selectedPackage && !selectedPackageName && (
                <div
                  className={`grid gap-6 mt-6 ${
                    selectedPackage === "single-side"
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {packagesData[selectedPackage].map((pkg, index) => (
                    <div
                      key={index}
                      className="backdrop-blur-md bg-white/10 border border-white/30 text-white shadow-md p-6 rounded-2xl flex flex-col justify-between transition-transform hover:scale-[1.02]"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      }}
                    >
                      <h3 className="text-xl font-bold text-white">
                        {pkg.name}
                      </h3>
                      <p className="text-2xl font-semibold text-white mt-2">
                        {pkg.price}
                      </p>
                      <p className="text-gray-200 mt-2 font-semibold">
                        Description:
                      </p>
                      <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
                        {pkg.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                      <Button
                        onClick={() =>
                          handlePackageSelection(
                            selectedPackage,
                            pkg.name.toLowerCase()
                          )
                        }
                        className="mt-4 w-full bg-green-600 text-white py-2 rounded-sm hover:bg-green-700 transition-colors"
                      >
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="asirbadBrideDate"
                  render={({ field }) => (
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[3] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Asirbad Dates : Bride
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
                  name="asirbadGroomDate"
                  render={({ field }) => (
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[4] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Asirbad Dates : Groom
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="engagementDate"
                  render={({ field }) => (
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[5] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Engagement Date
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
                  name="weddingDate"
                  render={({ field }) => (
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[6] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Wedding Date
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
                  name="bidayDate"
                  render={({ field }) => (
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[7] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Biday Date
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
                  name="baronDate"
                  render={({ field }) => (
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[8] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Baron Date
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="receptionDate"
                render={({ field }) => (
                  <FormItem
                    ref={(el) => {
                      inputRefs.current[9] = el;
                    }}
                  >
                    <FormLabel className="text-white font-semibold drop-shadow-md">
                      Reception Date
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {/* Panakhili */}
              <FormField
                control={form.control}
                name="panakhiliType"
                render={({ field }) => (
                  <FormItem
                    ref={(el) => {
                      inputRefs.current[10] = el;
                    }}
                  >
                    <FormLabel className="text-white font-semibold drop-shadow-md">
                      Panakhili
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="text-white shadow-md hover:bg-white/40 transition-colors">
                          <SelectValue placeholder="Select your side" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="backdrop-blur-md bg-white/10 border-white/40 text-white shadow-md">
                        <SelectItem value="select-your-side">
                          Select Your Side
                        </SelectItem>
                        <SelectItem value="both">Both Side</SelectItem>
                        <SelectItem value="bride">Bride Side</SelectItem>
                        <SelectItem value="groom">Groom Side</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              {showPanakhiliDates && (
                <div
                  ref={(el) => {
                    inputRefs.current[11] = el;
                  }}
                >
                  {panakhiliType === "both" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="panakhiliDates.bride"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold drop-shadow-md">
                              Bride
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
                        name="panakhiliDates.groom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold drop-shadow-md">
                              Groom
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
                  {panakhiliType === "bride" && (
                    <FormField
                      control={form.control}
                      name="panakhiliDates.bride"
                      render={({ field }) => (
                        <FormItem
                          ref={(el) => {
                            inputRefs.current[12] = el;
                          }}
                        >
                          <FormLabel className="text-white font-semibold drop-shadow-md">
                            Bride
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  )}
                  {panakhiliType === "groom" && (
                    <FormField
                      control={form.control}
                      name="panakhiliDates.groom"
                      render={({ field }) => (
                        <FormItem
                          ref={(el) => {
                            inputRefs.current[13] = el;
                          }}
                        >
                          <FormLabel className="text-white font-semibold drop-shadow-md">
                            Groom
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Select Your Haldi */}
              <FormField
                control={form.control}
                name="HaldiType"
                render={({ field }) => (
                  <FormItem
                    ref={(el) => {
                      inputRefs.current[14] = el;
                    }}
                  >
                    <FormLabel className="text-white font-semibold drop-shadow-md">
                      Haldi
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="text-white shadow-md hover:bg-white/40 transition-colors">
                          <SelectValue placeholder="Select your choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="backdrop-blur-md bg-white/10 border-white/40 text-white shadow-md">
                        <SelectItem value="select-your-choice">
                          Select Your Choice
                        </SelectItem>
                        <SelectItem value="both">Both Side</SelectItem>
                        <SelectItem value="bride">Bride Side</SelectItem>
                        <SelectItem value="groom">Groom Side</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              {showChoiceDates && (
                <div
                  ref={(el) => {
                    inputRefs.current[15] = el;
                  }}
                >
                  {haldiType === "both" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="HaldiDates.bride"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold drop-shadow-md">
                              Bride
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
                        name="HaldiDates.groom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold drop-shadow-md">
                              Groom
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
                  {haldiType === "bride" && (
                    <FormField
                      control={form.control}
                      name="HaldiDates.bride"
                      render={({ field }) => (
                        <FormItem
                          ref={(el) => {
                            inputRefs.current[16] = el;
                          }}
                        >
                          <FormLabel className="text-white font-semibold drop-shadow-md">
                            Bride
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  )}
                  {haldiType === "groom" && (
                    <FormField
                      control={form.control}
                      name="HaldiDates.groom"
                      render={({ field }) => (
                        <FormItem
                          ref={(el) => {
                            inputRefs.current[17] = el;
                          }}
                        >
                          <FormLabel className="text-white font-semibold drop-shadow-md">
                            Groom
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Bride Contact Details */}
              <div className="space-y-4 border-b border-white/20 pb-6">
                <h3 className="text-xl font-semibold text-white drop-shadow-md">
                  Bride Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="brideName"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[18] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bride Name"
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
                    name="brideAddress"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[19] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bride Address"
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
                    name="brideEmail"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[20] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bride Email"
                            type="email"
                            className="placeholder:text-sm placeholder:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bridePhone"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[21] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Phone No
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bride Phone"
                            type="tel"
                            className="placeholder:text-sm placeholder:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Groom Contact Details */}
              <div className="space-y-4 border-b border-white/20 pb-6">
                <h3 className="text-xl font-semibold text-white drop-shadow-md">
                  Groom Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="groomName"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[22] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Groom Name"
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
                    name="groomAddress"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[23] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Groom Address"
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
                    name="groomEmail"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[24] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Groom Email"
                            type="email"
                            className="placeholder:text-sm placeholder:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="groomPhone"
                    render={({ field }) => (
                      <FormItem
                        ref={(el) => {
                          inputRefs.current[25] = el;
                        }}
                      >
                        <FormLabel className="text-white font-semibold drop-shadow-md">
                          Phone No
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Groom Phone"
                            className="placeholder:text-sm placeholder:text-white"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[26] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        No. of Guests
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter guest count"
                          className="placeholder:text-sm placeholder:text-white"
                          type="number"
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
                    <FormItem
                      ref={(el) => {
                        inputRefs.current[27] = el;
                      }}
                    >
                      <FormLabel className="text-white font-semibold drop-shadow-md">
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter location"
                          {...field}
                          className="placeholder:text-sm placeholder:text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rituals */}
              <FormField
                control={form.control}
                name="rituals"
                render={({ field }) => (
                  <FormItem
                    ref={(el) => {
                      inputRefs.current[28] = el;
                    }}
                  >
                    <FormLabel className="text-white font-semibold drop-shadow-md">
                      Describe the Rituals
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief about the wedding rituals"
                        className="placeholder:text-white placeholder:text-sm min-h-32 placeholder-opacity-80 drop-shadow-md resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white drop-shadow-md">
                  Signature
                </h3>
                <div className="flex justify-between items-start md:items-start flex-col md:flex-row gap-4">
                  <div>
                    <FormLabel className="text-white font-semibold drop-shadow-md mb-2">
                      Admin Signature
                    </FormLabel>
                    <div className="flex gap-2 ">
                      <Image
                        src="/signature/signatures1.png"
                        alt="signature1"
                        height={120}
                        width={120}
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="userSignature"
                      render={({ field }) => (
                        <FormItem
                          ref={(el) => {
                            inputRefs.current[29] = el; // Adjust index as needed
                          }}
                        >
                          <FormLabel className="text-white font-semibold drop-shadow-md">
                            Your Signature
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
                </div>
              </div>

              <FormField
                control={form.control}
                name="acceptTerms" // Make sure this matches your form schema
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel>
                        <Label className="text-white">
                          Accept terms and conditions
                        </Label>
                      </FormLabel>
                      <FormDescription className="text-white text-sm mt-2">
                        <Label>
                          By checking this box, you agree to our Terms of
                          Service and Privacy Policy.
                        </Label>
                      </FormDescription>
                    </div>
                    <div>{/* <FormMessage /> */}</div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full max-w-sm mx-auto mt-4 flex justify-center items-center gap-2 rounded-full cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

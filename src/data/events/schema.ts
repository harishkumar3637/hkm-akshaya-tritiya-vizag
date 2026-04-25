import { z } from "zod";

import { themes, type CoreThemeColors } from "@/lib/themes";

const imageText = z.string().min(1);
const nonEmptyText = z.string().min(1);
const textList = z.array(z.string());
const colorValue = z.string().regex(/^#([0-9a-fA-F]{6})$/);
const themeColorSchema = z.object({
  primary: colorValue,
  secondary: colorValue,
  background: colorValue,
  surface: colorValue,
  text: colorValue,
  accent: colorValue,
}) satisfies z.ZodType<CoreThemeColors>;

function normalizeDonationForm(value: unknown) {
  if (!value || typeof value !== "object") {
    return value;
  }

  const donationForm = value as Record<string, unknown>;

  if ("notice" in donationForm && "bank" in donationForm && "upi" in donationForm) {
    return donationForm;
  }

  const labels =
    donationForm.labels && typeof donationForm.labels === "object"
      ? (donationForm.labels as Record<string, unknown>)
      : {};
  const support =
    donationForm.support && typeof donationForm.support === "object"
      ? (donationForm.support as Record<string, unknown>)
      : {};
  const bankDetails =
    donationForm.bankDetails && typeof donationForm.bankDetails === "object"
      ? (donationForm.bankDetails as Record<string, unknown>)
      : {};

  return {
    heading: donationForm.heading,
    notice: {
      title: labels.requestTitle ?? "Gentle Request:",
      text:
        labels.requestDescription ??
        "While doing Paytm/UPI/Bank (NEFT/RTGS), please send screenshot along with complete address and PAN details on WhatsApp",
    },
    support: {
      phone: support.phone,
      email: support.email,
    },
    bank: {
      tag: labels.bankTitle ?? "For Bank Transfer",
      title: labels.bankSectionTitle ?? "Donation Through NEFT/RTGS",
      fields: {
        beneficiaryName: bankDetails.accountName,
        bankName: bankDetails.bankName,
        accountNumber: bankDetails.accountNumber,
        ifscCode: bankDetails.ifsc,
      },
    },
    upi: {
      tag: labels.upiTitle ?? "For UPI & QR",
      upiId: bankDetails.email,
      buttonLabel: labels.upiSectionTitle ?? "Pay by UPI ID",
      qrTitle: labels.qrSectionTitle ?? "Scan QR Code",
      qrImage: bankDetails.qrImage,
      description:
        labels.qrDescription ??
        "Scan using any supported UPI app and share the payment screenshot for seva confirmation.",
    },
    screenshotNote: labels.screenshotNote ?? "(Kindly send us a screenshot for your seva entry)",
  };
}

export const eventCmsContentSchema = z.object({
  slug: nonEmptyText,
  themeName: z.enum(Object.keys(themes) as [keyof typeof themes, ...(keyof typeof themes)[]]).optional(),
  themeColors: themeColorSchema.optional(),
  hero: z.object({
    posters: z.array(
      z.object({
        desktopSrc: imageText,
        mobileSrc: imageText,
        alt: nonEmptyText,
      }),
    ),
  }),
  overview: z.object({
    eyebrow: nonEmptyText,
    title: nonEmptyText,
    quote: nonEmptyText,
    emphasis: nonEmptyText,
    supportingText: nonEmptyText,
    sacredDayLabel: nonEmptyText,
    video: z.object({
      src: nonEmptyText,
      title: nonEmptyText,
    }),
    impactEyebrow: nonEmptyText,
    heading: nonEmptyText,
    highlightedHeading: nonEmptyText,
    points: textList,
    donateLabel: nonEmptyText,
  }),
  importance: z.object({
    eyebrow: nonEmptyText,
    title: nonEmptyText,
    description: nonEmptyText,
    items: z.array(
      z.object({
        image: imageText,
        title: nonEmptyText,
        description: nonEmptyText,
      }),
    ),
  }),
  impact: z.object({
    eyebrow: nonEmptyText,
    title: nonEmptyText,
    description: nonEmptyText,
    cards: z.array(
      z.object({
        title: nonEmptyText,
        text: nonEmptyText,
      }),
    ),
  }),
  privileges: z.object({
    carouselItems: z.array(
      z.object({
        src: imageText,
        label: z.string(),
      }),
    ),
    privileges: textList,
    title: nonEmptyText,
    donateLabel: nonEmptyText,
  }),
  donationHighlights: z.object({
    sectionId: nonEmptyText,
    title: nonEmptyText,
    items: z.array(
      z.object({
        title: nonEmptyText,
        image: imageText,
      }),
    ),
  }),
  gallery: z.object({
    title: nonEmptyText,
    items: z.array(
      z.object({
        src: imageText,
        label: nonEmptyText,
      }),
    ),
  }),
  seva: z.object({
    eyebrow: nonEmptyText,
    title: nonEmptyText,
    items: z.array(
      z.object({
        title: nonEmptyText,
        description: nonEmptyText,
        image: imageText,
      }),
    ),
  }),
  contributors: z.object({
    heading: nonEmptyText,
    tabs: z.object({
      recent: nonEmptyText,
      generous: nonEmptyText,
    }),
    modal: z.object({
      title: nonEmptyText,
      recentSubtitle: nonEmptyText,
      generousSubtitle: nonEmptyText,
      searchPlaceholder: nonEmptyText,
      emptyStatePrefix: nonEmptyText,
    }),
    recent: z.array(
      z.object({
        name: nonEmptyText,
        amount: z.number(),
        time: nonEmptyText,
        avatar: nonEmptyText,
      }),
    ),
    generous: z.array(
      z.object({
        name: nonEmptyText,
        amount: z.number(),
        time: nonEmptyText,
        avatar: nonEmptyText,
      }),
    ),
  }),
  donationForm: z.preprocess(
    normalizeDonationForm,
    z.object({
      heading: nonEmptyText,
      notice: z.object({
        title: nonEmptyText,
        text: nonEmptyText,
      }),
      support: z.object({
        phone: nonEmptyText,
        email: nonEmptyText,
      }),
      bank: z.object({
        tag: nonEmptyText,
        title: nonEmptyText,
        fields: z.object({
          beneficiaryName: nonEmptyText,
          bankName: nonEmptyText,
          accountNumber: nonEmptyText,
          ifscCode: nonEmptyText,
        }),
      }),
      upi: z.object({
        tag: nonEmptyText,
        upiId: nonEmptyText,
        buttonLabel: nonEmptyText,
        qrTitle: nonEmptyText,
        qrImage: imageText,
        description: nonEmptyText,
      }),
      screenshotNote: nonEmptyText,
    }),
  ),
});

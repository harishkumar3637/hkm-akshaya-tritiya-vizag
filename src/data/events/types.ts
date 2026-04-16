import type { LucideIcon } from "lucide-react";

export type HeroPoster = {
  src: string;
  alt: string;
};

export type HeroContent = {
  posters: HeroPoster[];
};

export type EventOverviewContent = {
  eyebrow: string;
  title: string;
  quote: string;
  emphasis: string;
  supportingText: string;
  sacredDayLabel: string;
  video: {
    src: string;
    title: string;
  };
  impactEyebrow: string;
  heading: string;
  highlightedHeading: string;
  points: string[];
  readMoreLabel: string;
  donateLabel: string;
};

export type ImportanceItem = {
  image: string;
  title: string;
  description: string;
};

export type ImportanceContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: ImportanceItem[];
};

export type ImpactCard = {
  title: string;
  text: string;
};

export type ImpactContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: ImpactCard[];
};

export type DonorPrivilegesContent = {
  carouselItems: {
    src: string;
    label: string;
  }[];
  privileges: string[];
  title: string;
  donateLabel: string;
};

export type DonationHighlightItem = {
  title: string;
  image: string;
};

export type DonationHighlightsContent = {
  sectionId: string;
  title: string;
  items: DonationHighlightItem[];
};

export type SevaItemContent = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export type SevaContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: SevaItemContent[];
};

export type Contributor = {
  name: string;
  amount: number;
  time: string;
  avatar: string;
};

export type ContributorsContent = {
  heading: string;
  tabs: {
    recent: string;
    generous: string;
  };
  modal: {
    title: string;
    recentSubtitle: string;
    generousSubtitle: string;
    searchPlaceholder: string;
    emptyStatePrefix: string;
  };
  recent: Contributor[];
  generous: Contributor[];
};

export type DonationFormContent = {
  heading: string;
  tabs: {
    indian: string;
    nonIndian: string;
  };
  selects: {
    sevaLabel: string;
    amountLabel: string;
    donorIdentityLabel: string;
  };
  placeholders: {
    amount: string;
    fullName: string;
    whatsappInternational: string;
    whatsappIndian: string;
    email: string;
    dateOfBirth: string;
    pincode: string;
  };
  sevaOptions: {
    value: string;
    label: string;
  }[];
  amountSuggestions: string[];
  donorIdentityOptions: {
    value: string;
    label: string;
  }[];
  labels: {
    fullName: string;
    whatsapp: string;
    email: string;
    dateOfBirth: string;
    pincode: string;
    sankalp: string;
    termsLead: string;
    termsLabel: string;
    privacyLabel: string;
    supportTitle: string;
    supportDescription: string;
    upiTitle: string;
    bankTitle: string;
    screenshotNote: string;
    paymentMethods: string;
    currencyBadge: string;
  };
  nonIndian: {
    complianceNote: string;
    birthdayNote: string;
    legalCopy: string[];
    registrationNumberLabel: string;
    registrationNumber: string;
  };
  support: {
    phone: string;
    email: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
    email: string;
    qrImage: string;
  };
  submitLabels: {
    donate: string;
    donating: string;
  };
  messages: {
    requiredFields: string;
    success: string;
    failure: string;
  };
};

export type EventPageData = {
  slug: string;
  hero: HeroContent;
  overview: EventOverviewContent;
  importance: ImportanceContent;
  impact: ImpactContent;
  privileges: DonorPrivilegesContent;
  donationHighlights: DonationHighlightsContent;
  seva: SevaContent;
  contributors: ContributorsContent;
  donationForm: DonationFormContent;
};

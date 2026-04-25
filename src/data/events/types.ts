import type { AppTheme } from "@/lib/themes";

export type HeroPoster = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
};

export type EventTheme = AppTheme;

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

export type GalleryItem = {
  src: string;
  label: string;
};

export type GalleryContent = {
  title: string;
  items: GalleryItem[];
};

export type SevaItemContent = {
  title: string;
  description: string;
  image: string;
};

export type SevaContent = {
  eyebrow: string;
  title: string;
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
  notice: {
    title: string;
    text: string;
  };
  support: {
    phone: string;
    email: string;
  };
  bank: {
    tag: string;
    title: string;
    fields: {
      beneficiaryName: string;
      bankName: string;
      accountNumber: string;
      ifscCode: string;
    };
  };
  upi: {
    tag: string;
    upiId: string;
    buttonLabel: string;
    qrTitle: string;
    qrImage: string;
    description: string;
  };
  screenshotNote: string;
};

export type EventPageData = {
  slug: string;
  theme: EventTheme;
  hero: HeroContent;
  overview: EventOverviewContent;
  importance: ImportanceContent;
  impact: ImpactContent;
  privileges: DonorPrivilegesContent;
  donationHighlights: DonationHighlightsContent;
  gallery: GalleryContent;
  seva: SevaContent;
  contributors: ContributorsContent;
  donationForm: DonationFormContent;
};

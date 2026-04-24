import { Flower2, Landmark, Soup, Sparkles } from "lucide-react";

import type { EventPageData } from "@/data/events/types";
import { themes } from "@/lib/themes";

export const akshayaTritiyaEvent: EventPageData = {
  slug: "akshaya-tritiya",
  theme: themes["akshaya-tritiya"],

          // hero-section

  hero: {
    posters: [
      {
        desktopSrc: "/hero-secton/desktop-version-poster1.png",
        mobileSrc: "/hero-secton/mobile-version-poster1.png",
        alt: "Akshaya Tritiya donation poster",
      },
      {
        desktopSrc: "/hero-secton/desktop-version-poster2.png",
        mobileSrc: "/hero-secton/mobile-version-poster2.png",
        alt: "Akshaya Tritiya festival donation poster",
      },
    ],
  },

      // eventi-overview-section

  overview: {
    eyebrow: "Sacred Divine Opportunity",
    title: "Akshaya Tritiya Donation 2026",
    quote:
      "Yat kinchid diyate danam svasthasya yad iva bahu, sarvam akshayam apnoti tenaiva sukrutam bhavet.",
    emphasis:
      "Whatever charity is given on this day, whether it is very little or abundant, all of it certainly becomes inexhaustible (Akshaya).",
    supportingText:
      "Even a small contribution brings Akshaya Punya and attracts unlimited blessings of the Lord for you and your family.",
    sacredDayLabel: "SACRED DAY",
    video: {
      src: "https://www.youtube.com/embed/TyrQMqDkNW8?autoplay=1&showinfo=0&playlist=TyrQMqDkNW8&loop=1&mute=1&rel=0",
      title: "Akshaya Tritiya YouTube video player",
    },
    impactEyebrow: "Divine Impact",
    heading: "Donate on Akshaya Tritiya 2026:",
    highlightedHeading: "Donate for Everlasting Blessings",
    points: [
      "Akshaya Tritiya is one of the most sacred days of the year, a time associated with abundance, charity, and lasting spiritual merit.",
      "Even the smallest act of charity done on this day is believed to bring imperishable (Akshaya) punya.",
      "Do not miss this sacred opportunity to invite lasting blessings and prosperity.",
      "Receive divine blessings for yourself and your family while helping build an iconic temple at Gupt Vrindavan Dham, feed the needy, and protect the lives of 16,000+ abandoned and homeless Gau Mata.",
    ],
    readMoreLabel: "Read More",
    donateLabel: "Donate Now",
  },

       //event-importance-section

  importance: {
    eyebrow: "Temple Significance",
    title: "Akshaya Tritiya Importance",
    description:
      "A sacred day of divine abundance, temple seva, annadan, and auspicious beginnings celebrated with devotion, gratitude, and grace.",
    items: [
      {
        image: "/Akshaya_Tritiya_seva.png",
        title: "Manifestation of Goddess Annapurna:",
        description:
          "On Akshaya Tritiya, prayers are offered to Mother Annapurna for abundance of food, prosperity, and nourishment.",
      },
      {
        image: "/Gau_Seva.jpg",
        title: "Cow Service Brings Great Merit:",
        description:
          "On this sacred day, cow service, charity, and compassion are believed to bring lasting merit and auspiciousness into life.",
      },
      {
        image: "/Annadaan_Seva.jpg",
        title: "Food Donation is the Supreme Donation:",
        description:
          "Food donation is given special importance on this day, as it symbolizes service, satisfaction, and gratitude towards God.",
      },
      {
        image: "/Mandir_Nirman_Seva.jpg",
        title: "Divine Day for Auspicious Beginnings:",
        description:
          "Akshaya Tritiya is considered extremely auspicious for new resolutions, spiritual beginnings, and benevolent deeds.",
      },
      {
        image: "/Chandan_Alankar_Seva.png",
        title: "Eternal Merit and Grace:",
        description:
          "The chanting, charity, and service performed on this day are considered eternally fruitful, becoming the path to both material and spiritual progress.",
      },
    ],
  },

        //impact-section

  impact: {
    eyebrow: "Why This Day Matters",
    title: "Akshaya Tritiya is revered as a day when spiritual merit multiplies and never fades.",
    description:
      "Offering seva on this day carries a deep devotional urgency. Donations help sustain worship, prasadam distribution, and care within the dham while giving devotees a meaningful way to participate from anywhere.",
    cards: [
      {
        title: "Festival Seva",
        text: "Support floral decoration, bhoga offerings, and sacred arrangements.",
      },
      {
        title: "Annadan Impact",
        text: "Extend prasadam service to more visiting devotees and families.",
      },
      {
        title: "Temple Care",
        text: "Help maintain the dham with beauty, cleanliness, and festive dignity.",
      },
      {
        title: "Blessings",
        text: "Join collective prayers offered for donors and their loved ones.",
      },
    ],
  },

         //event-privileges-section

  privileges: {
    carouselItems: [
      { src: "/Privileges/Festival_Donar_Privileges_1.png", label: "" },
      { src: "/Privileges/Festival_Donar_Privileges_2.png", label: "" },
      { src: "/Privileges/Festival_Donar_Privileges_3.png", label: "" },
      { src: "/Privileges/Festival_Donar_Privileges_4.png", label: "" },
      { src: "/Privileges/Festival_Donar_Privileges_5.png", label: "" },
      { src: "/Privileges/Festival_Donar_Privileges_6.png", label: "" },
    ],
    privileges: [
      "On Donation of ₹1100 or above, you will receive Maha Prasadam blessed by the temple.",
      "Receive Narasimha Kavach Sutra at your home for protection and spiritual growth.",
      "Your name is offered in special prayers before Sri Sri Krishna-Balaram.",
      "Certificate of appreciation for your generous contribution.",
      "Access to exclusive updates and blessings from the donor community.",
      "Lifetime remembrance in our temple's donor wall of honor.",
    ],
    title: "Festival Donor Privileges",
    donateLabel: "Donate Now",
  },

       //DonationHighlights section

  donationHighlights: {
    sectionId: "akshaya-tritiya-daan",
    title: "AKSHAYA TRITIYA DAAN",
    items: [
      { title: "Akshaya Tritiya Seva", image: "/Akshaya_Tritiya_seva.png" },
      { title: "Gau Seva", image: "/Gau_Seva.jpg" },
      { title: "Mandir Nirman Seva", image: "/Mandir_Nirman_Seva.jpg" },
      { title: "Chandan Alankar Seva", image: "/Chandan_Alankar_Seva.png" },
      { title: "Khichdi Vitaran Seva", image: "/Khichdi_Vitaran_Seva.png" },
      { title: "Annadana Seva", image: "/Annadaan_Seva.jpg" },
    ],
  },

  gallery: {
    title: "Gallery",
    items: [
      { src: "/Mandir_Nirman_Seva.jpg", label: "Mandir Nirman" },
      { src: "/Chandan_Alankar_Seva.png", label: "Narasimha Yagna" },
      { src: "/Gau_Seva.jpg", label: "Gau Seva" },
      { src: "/Annadaan_Seva.jpg", label: "Annadaan Seva" },
    ],
  },
   
      //seva-grid-dection

  seva: {
    eyebrow: "Seva Offerings",
    title: "Choose a sacred way to participate",
    description:
      "The original page highlights multiple seva paths. This grid recreates that offering-led layout with warm image cards and devotional descriptions.",
    items: [
      {
        title: "Gau Seva",
        description:
          "Support nourishing fodder, shelter care, and loving protection for the temple cows.",
        image: "/Gau_Seva.jpg",
        icon: Flower2,
        iconName: "flower",
      },
      {
        title: "Annadan",
        description:
          "Help serve nourishing prasadam to devotees and visiting families on this sacred day.",
        image: "/Annadaan_Seva.jpg",
        icon: Soup,
        iconName: "soup",
      },
      {
        title: "Temple Seva",
        description:
          "Contribute toward temple upkeep, floral decoration, lamps, and festive arrangements.",
        image: "/Mandir_Nirman_Seva.jpg",
        icon: Landmark,
        iconName: "landmark",
      },
      {
        title: "Ritual Offerings",
        description:
          "Offer vastra, bhoga, flowers, and worship ingredients for the Akshaya Tritiya celebrations.",
        image: "/Chandan_Alankar_Seva.png",
        icon: Sparkles,
        iconName: "sparkles",
      },
    ],
  },

        //Contributors-section

  contributors: {
    heading: "Respected Contributors",
    tabs: {
      recent: "Recent",
      generous: "Most Generous",
    },
    modal: {
      title: "List of Donors",
      recentSubtitle: "Recent donor activity",
      generousSubtitle: "Most generous donor list",
      searchPlaceholder: "Search donor",
      emptyStatePrefix: "No donor found for",
    },
    recent: [
      { name: "Parthiv", amount: 113, time: "about 5 hours ago", avatar: "P" },
      { name: "Kumar Abhishek", amount: 103, time: "about 6 hours ago", avatar: "K" },
      { name: "Soumya Ranjan Senapati", amount: 501, time: "about 6 hours ago", avatar: "S" },
      { name: "I P Smit", amount: 201, time: "about 4 hours ago", avatar: "I" },
      { name: "Rahul kumar Ranakoti", amount: 103, time: "about 9 hours ago", avatar: "R" },
      { name: "Radheshyam Kushwaha", amount: 251, time: "about 9 hours ago", avatar: "R" },
      { name: "NP", amount: 205, time: "about 10 hours ago", avatar: "N" },
      { name: "Kamlesh Roy", amount: 301, time: "about 6 hours ago", avatar: "K" },
      { name: "Nalinikant Mohanty", amount: 511, time: "about 11 hours ago", avatar: "N" },
      { name: "Subhash Wadhwa", amount: 1122, time: "about 11 hours ago", avatar: "S" },
      { name: "Megha Bansal", amount: 103, time: "about 11 hours ago", avatar: "M" },
      { name: "Rishab Agarwal", amount: 151, time: "about 10 hours ago", avatar: "R" },
    ],
    generous: [
      { name: "Anand Sagar", amount: 33391, time: "top supporter", avatar: "A" },
      { name: "Ribhav Soni", amount: 33280, time: "featured donor", avatar: "R" },
      { name: "Atul Kumar Tawakley", amount: 33673, time: "major patron", avatar: "A" },
      { name: "Mrs Vasantben Tailo", amount: 35000, time: "featured donor", avatar: "M" },
      { name: "Dayanidhi Mishra", amount: 51100, time: "honored patron", avatar: "D" },
      { name: "Kapil Vidhani", amount: 52040, time: "major patron", avatar: "K" },
      { name: "Shivam Gupta", amount: 52040, time: "featured donor", avatar: "S" },
      { name: "Ravi Krishnamoorthy", amount: 50000, time: "grace donor", avatar: "R" },
      { name: "Abhishek Ranjan", amount: 50000, time: "honored patron", avatar: "A" },
      { name: "Akshat Punjlaut", amount: 85000, time: "lead contributor", avatar: "A" },
      { name: "Akshay Ghugal", amount: 75000, time: "lead contributor", avatar: "A" },
      { name: "Yogya Modi", amount: 140000, time: "top contributor", avatar: "Y" },
    ],
  },

         //donation-form-section

  donationForm: {
    heading: "Offer your Seva and receive the blessings of Sri Radha Krishna",
    notice: {
      title: "Gentle Request:",
      text: "While doing Paytm/UPI/Bank (NEFT/RTGS), please send screenshot along with complete address and PAN details on WhatsApp",
    },
    support: {
      phone: "9196600716666",
      email: "dmt@hkmjaipur.org",
    },
    bank: {
      tag: "For Bank Transfer",
      title: "Donation Through NEFT/RTGS",
      fields: {
        beneficiaryName: "Hare Krishna Movement Vizag",
        bankName: "ICICI Bank",
        accountNumber: "677501700696",
        ifscCode: "ICIC0007299",
      },
    },
    upi: {
      tag: "For UPI & QR",
      upiId: "daan.augp@eubank",
      buttonLabel: "Pay by UPI ID",
      qrTitle: "Scan QR Code",
      qrImage: "/QR_Code.png",
      description: "Scan using any supported UPI app and share the payment screenshot for seva confirmation.",
    },
    screenshotNote: "(Kindly send us a screenshot for your seva entry)",
  },
};

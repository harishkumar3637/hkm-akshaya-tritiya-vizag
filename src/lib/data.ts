import type { LucideIcon } from "lucide-react";
import {
  Flower2,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  Soup,
  Sparkles,
} from "lucide-react";

export const donationAmounts = [1100, 2100, 5100];

export const donorBenefits: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Soup,
    title: "Maha Prasadam Delivery",
    description: "Receive sanctified prasadam as a remembrance of your Akshaya Tritiya seva.",
  },
  {
    icon: ShieldCheck,
    title: "Narasimha Kavach Sutra",
    description: "A sacred kavach sutra blessed for protection, auspiciousness, and inner strength.",
  },
  {
    icon: HeartHandshake,
    title: "Temple Blessings",
    description: "Your name is offered in prayers before Sri Sri Krishna-Balaram for divine grace.",
  },
];

export const sevaItems = [
  {
    title: "Gau Seva",
    description:
      "Support nourishing fodder, shelter care, and loving protection for the temple cows.",
    image: "/Gau_Seva.jpg",
    icon: Flower2,
  },
  {
    title: "Annadan",
    description:
      "Help serve nourishing prasadam to devotees and visiting families on this sacred day.",
    image: "/Annadaan_Seva.jpg",
    icon: Soup,
  },
  {
    title: "Temple Seva",
    description:
      "Contribute toward temple upkeep, floral decoration, lamps, and festive arrangements.",
    image: "/Mandir_Nirman_Seva.jpg",
    icon: Landmark,
  },
  {
    title: "Ritual Offerings",
    description:
      "Offer vastra, bhoga, flowers, and worship ingredients for the Akshaya Tritiya celebrations.",
    image: "/Chandan_Alankar_Seva.png",
    icon: Sparkles,
  },
];

export const recentDonors = [
  { name: "Rajesh Sharma", amount: 5100, time: "2 min ago" },
  { name: "Meera Agrawal", amount: 2100, time: "7 min ago" },
  { name: "Aman Gupta", amount: 1100, time: "14 min ago" },
  { name: "Suman Devi", amount: 10000, time: "19 min ago" },
  { name: "Nitin Jain", amount: 2100, time: "24 min ago" },
  { name: "Kavita Joshi", amount: 3100, time: "28 min ago" },
  { name: "Vandana Mittal", amount: 5100, time: "35 min ago" },
  { name: "Rahul Bansal", amount: 501, time: "42 min ago" },
  { name: "Ritu Maheshwari", amount: 1100, time: "49 min ago" },
  { name: "Ankit Goyal", amount: 2100, time: "58 min ago" },
];

export const akshayaTritiyaDaan = [
  {
    title: "Akshaya Tritiya Seva",
    image: "/Akshaya_Tritiya_seva.png",
  },
  {
    title: "Gau Seva",
    image: "/Gau_Seva.jpg",
  },
  {
    title: "Mandir Nirman Seva",
    image: "/Mandir_Nirman_Seva.jpg",
  },
  {
    title: "Chandan Alankar Seva",
    image: "/Chandan_Alankar_Seva.png",
  },
  {
    title: "Khichdi Vitaran Seva",
    image: "/Khichdi_Vitaran_Seva.png",
  },
  {
    title: "Annadana Seva",
    image: "/Annadaan_Seva.jpg",
  },
];

export const importanceCarouselItems = [
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
];

export const respectedContributors = [
  {
    name: "Yogya Modi",
    amount: 140000,
    time: "about 2 years ago",
    avatar: "Y",
  },
  {
    name: "Akshat Punjlaut",
    amount: 85000,
    time: "over 1 year ago",
    avatar: "A",
  },
  {
    name: "akshay ghugal",
    amount: 75000,
    time: "4 months ago",
    avatar: "a",
  },
  {
    name: "Shivam Gupta",
    amount: 52040,
    time: "12 months ago",
    avatar: "S",
  },
  {
    name: "ABHISHEK RANJAN",
    amount: 50000,
    time: "3 months ago",
    avatar: "A",
  },
  {
    name: "Ravi Krishnamoorthy",
    amount: 50000,
    time: "about 1 year ago",
    avatar: "R",
  },
  {
    name: "Kapil Vidhani",
    amount: 52040,
    time: "12 months ago",
    avatar: "K",
  },
  {
    name: "Dayanidhi Mishra",
    amount: 51100,
    time: "about 1 year ago",
    avatar: "D",
  },
  {
    name: "Mrs Vasantben Natwarlal Tailo",
    amount: 35000,
    time: "4 months ago",
    avatar: "M",
  },
  {
    name: "Atul Kumar Tawakley",
    amount: 33673,
    time: "about 1 year ago",
    avatar: "A",
  },
  {
    name: "Anand Sagar",
    amount: 33391,
    time: "almost 2 years ago",
    avatar: "A",
  },
  {
    name: "Ribhav Soni",
    amount: 33280,
    time: "over 1 year ago",
    avatar: "R",
  },
];

export const templeInfo = {
  title: "Gupt Vrindavan Dham",
  phone: "+91-97999 99881",
  email: "info@guptvrindavandham.org",
  address: "Hare Krishna Marg, Jagatpura, Jaipur-302017",
  heroImage: "https://guptvrindavandham.org/media/landingpage/Akshaya_Tritiya3.webp",
};

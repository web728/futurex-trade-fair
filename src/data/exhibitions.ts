// Cleaned exhibition catalogue — 21 October 2026.
// Dates and original records preserved where not confidently correctable.
// Historical date corrections use the source display dates and require final archive review.
// Missing/unverified social links are intentionally omitted (never point to another expo).
export type ExhibitionEvent = {
  id: string;
  name: string;
  edition?: string;
  dates: { display: string; start: string; end: string };
  image?: string;
  venue: { city: string; country: string; venueName?: string };
  industry: string;
  eventType: "Exhibition";
  heroImage?: string;
  gallery?: string[];
  description: string;
  socials?: {
    website?: string; instagram?: string; linkedin?: string;
    facebook?: string; email?: string; twitter?: string; youtube?: string;
  };
};

export function groupExhibitionsByYear(events: ExhibitionEvent[]): { year: string; events: ExhibitionEvent[] }[] {
  const years = new Map<string, ExhibitionEvent[]>();
  for (const event of events) {
    const year = event.dates.start.slice(0, 4);
    if (!years.has(year)) years.set(year, []);
    years.get(year)!.push(event);
  }
  return [...years.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, events]) => ({ year, events: [...events].sort((a, b) => a.dates.start.localeCompare(b.dates.start)) }));
}

// To add a new edition, copy a record, set new name, edition, dates, venue, and unique id.
// Keep past editions in this array: status is computed from end date automatically.
export const EXHIBITIONS: ExhibitionEvent[] = [
  {
    id: "nepal-electric-power-and-lights-int-l-expo-2026-12-18",
    name: "5th Nepal Electric, Power and Lights Int'l Expo",
    edition: "5th Edition",
   dates: { display: "18th to 20th December 2026", start: "2026-12-18", end: "2026-12-20" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Power & Electrical",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/nepal-electric-power-and-light.png",
    description:
      "A business-to-business exhibition focused on power & electrical, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://www.nepalpowerelec.com/",
      facebook: "https://www.facebook.com/nepalpowerelec/",
      instagram: "https://www.instagram.com/nepalelectricpower/",
      linkedin: "https://www.linkedin.com/company/nepalpowerelec/",
      twitter: "https://x.com/nepalpowerelec/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "odisha-mining-infrastructure-int-l-expo-2027-01-07",
    name: "5th Odisha Mining & Infrastructure Int'l Expo",
    edition: "5th Edition",
   dates: { display: "7th to 10th January 2027", start: "2027-01-07", end: "2027-01-10" },
    venue: { city: " Baramunda Ground, Bhubaneswar, Odisha", country: "India" },
    industry: "Mining & Infrastructure",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/odisha-logo.png",
    description:
      "A business-to-business exhibition focused on mining & infrastructure, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://www.odishaminingexpo.com/",
      facebook: "https://www.facebook.com/odishaminingexpo/",
      linkedin: "https://www.linkedin.com/company/odishaminingexpo/",
      twitter: "https://x.com/odisaminingexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-wood-international-expo-2027-01-28",
    name: "12th Nepal Wood International Expo",
    edition: "12th Edition",
   dates: { display: "28th to 31st January 2027", start: "2027-01-28", end: "2027-01-31" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Wood & Woodworking",

    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/nepal-wood-expo-logo.png",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://www.nepalwood.com.np/",
      facebook: "https://www.facebook.com/nepalwoodexpo/",
      instagram: "https://www.instagram.com/nepalwoodexpo/",
      linkedin: "https://www.linkedin.com/company/nepalwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-agritech-international-expo-2027-02-18",
    name: "9th Nepal Agritech International Expo",
    edition: "9th Edition",
   dates: { display: "18th to 20th February 2027", start: "2027-02-18", end: "2027-02-20" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Agriculture & Agritech",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/nepal-agritech.png",
    description:
      "A business-to-business exhibition focused on agriculture & agritech, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalagritech.com.np/",
      facebook: "https://www.facebook.com/NepalAgritech/",
      instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/company/nepalagritech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-buildcon-international-expo-2027-02-25",
    name: "12th Nepal Buildcon International Expo",
    edition: "12th Edition",
   dates: { display: "25th to 28th February 2027", start: "2027-02-25", end: "2027-02-28" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/12th-Nepal-Buildcon-Logo-Coloured.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://www.nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      linkedin: "https://www.linkedin.com/company/nepal-buildcon-international-expo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "kenya-buildcon-international-expo-2027-06-09",
    name: "4th Kenya Buildcon International Expo",
    edition: "4th Edition",
   dates: { display: "9th to 11th June 2027", start: "2027-06-09", end: "2027-06-11" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/kenya-buildcon-expo-logo.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Kenya.",
    socials: {
      website: "https://www.kenyabuildcon.com/",
      facebook: "https://www.facebook.com/kenyabuildconexpo/",
      instagram: "https://www.instagram.com/kenyabuildconexpo/",
      linkedin: "https://www.linkedin.com/company/kenyabuildconexpo/",
      twitter: "https://twitter.com/kenyabuildcon/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "kenya-wood-international-expo-2027-06-09",
    name: "4th Kenya Wood International Expo",
    edition: "4th Edition",
    dates: { display: "9th to 11th June 2027", start: "2027-06-09", end: "2027-06-11" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/kenya-wood-expo-logo.png",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Kenya.",
    socials: {
      website: "https://kenyawoodexpo.com/",
      facebook: "https://www.facebook.com/kenyawoodexpo/",
      linkedin: "https://www.linkedin.com/company/kenyawoodexpo/",
      twitter: "https://twitter.com/kenyawoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "kenya-solar-electric-power-lights-expo-2027-06-09",
    name: "3rd Kenya Solar, Electric, Power & Lights Expo",
    edition: "3rd Edition",
    dates: { display: "9th to 11th June 2027", start: "2027-06-09", end: "2027-06-11" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Solar & Renewable Energy",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/kenya-sepl.png",
    description:
      "A business-to-business exhibition focused on solar & renewable energy, connecting exhibitors, industry professionals and trade visitors in Kenya.",
    socials: {
      website: "https://www.kenyasepl.com/",
      facebook: "https://www.facebook.com/kenyasolarelec/",
      instagram: "https://www.instagram.com/kenyaseplexpo/",
      linkedin: "https://www.linkedin.com/company/kenyaseplexpo/",
      twitter: "https://twitter.com/kenyasepl/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "uganda-buildcon-international-expo-2027-08-04",
    name: "6th Uganda Buildcon International Expo",
    edition: "6th Edition",
    dates: { display: "4th to 6th August 2027", start: "2027-08-04", end: "2027-08-06" },
    venue: { city: "Uma Show Grounds, Kampala", country: "Uganda" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/uganda-buildcon.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Uganda.",
    socials: {
      website: "https://www.ugandabuildcon.com/",
      facebook: "https://www.facebook.com/ugandabuildcon/",
      instagram: "https://www.instagram.com/ugandabuildcon/",
      twitter: "https://x.com/ugandabuildcon/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "tanzania-buildcon-international-expo-2027-08-25",
    name: "Tanzania Buildcon International Expo",
    edition: "1st Edition",
    dates: { display: "25th to 27th August 2027", start: "2027-08-25", end: "2027-08-27" },
    venue: { city: "Diamond Jubilee Expo Center, Dar-es-Salaam", country: "Tanzania" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/tanzania-buildcon.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Tanzania.",
    socials: {
      website: "https://tanzaniabuildcon.com/",
      instagram: "https://www.instagram.com/tanzaniabuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
   {
    id: "india-ev-international-show-2026-10-02",
    name: "9th India EV International Show",
    edition: "9th Edition",
    dates: { display: "14th to 16th October 2027", start: "2027-10-14", end: "2027-10-16" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Electric Vehicles",
    eventType: "Exhibition",
       heroImage: "/gallery/images-event/2026/india-ev-logo.png",
    description:
      "A business-to-business exhibition focused on electric vehicles, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
   {
    id: "india-solar-international-show-2026-10-02",
    name: "2nd India International Solar Show",
    edition: "2nd Edition",
   dates: { display: "14th to 16th October 2027", start: "2027-10-14", end: "2027-10-16" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Solar & Renewable Energy",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/india-solar-logo.png",
    description:
      "A business-to-business exhibition focused on solar & renewable energy, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://indiasolarshow.com/",
      facebook: "https://www.facebook.com/indiasolarshow/",
      instagram: "https://www.instagram.com/indiasolarshow/",
      linkedin: "https://www.linkedin.com/company/indiasolarshow/",
      email: "admin@futurextrade.com"
    },
  },
    {
    id: "india-battery-international-show-2026-10-02",
    name: "2nd India International Battery Show",
    edition: "2nd Edition",
   dates: { display: "14th to 16th October 2027", start: "2027-10-14", end: "2027-10-16" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Battery & Energy Storage",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/india-battery-expo-logo.png",
    description:
      "A business-to-business exhibition focused on battery & energy storage, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://www.batteryindiaexpo.com/",
      facebook: "https://www.facebook.com/batteryindiaexpo/",
      linkedin: "https://www.linkedin.com/company/indiabatteryshow/",
      email: "admin@futurextrade.com"
    },
  },
    {
    id: "bangladesh-buildcon-international-expo-2026-09-17",
    name: "11th Bangladesh Buildcon International Expo",
    edition: "11th Edition",
    dates: { display: "11th to 13th November 2027", start: "2027-11-11", end: "2027-11-13" },
    venue: { city: " ICCB Exhibition Hall, Dhaka", country: "Bangladesh" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/10th-Bangladesh-Buildcon-Logo.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Bangladesh.",
    socials: {
      website: "https://bangladeshbuildcon.com/",
      facebook: "https://www.facebook.com/bangladeshbuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-wood-metal-industries-expo-2026-09-17",
    name: "11th Bangladesh Wood & Metal Industries Expo",
    edition: "11th Edition",
   dates: { display: "11th to 13th November 2027", start: "2027-11-11", end: "2027-11-13" },
    venue: { city: " ICCB Exhibition Hall, Dhaka", country: "Bangladesh" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
   heroImage: "/gallery/images-event/2026/bangladesh-wood-expo-logo.png",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Bangladesh.",
    socials: {
      website: "https://bangladeshwoodexpo.com/",
      facebook: "https://www.facebook.com/Bangladeshwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "icpma-corru-pack-print-india-2028-02-09",
    name: "3rd ICPMA Corru Pack Print India",
    edition: "3rd Edition",
    dates: { display: "9th to 12th February 2028", start: "2028-02-09", end: "2028-02-12" },
    venue: { city: "Yashobhoomi, IICC, Dwarka, New Delhi", country: "India" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/3rd-Corrupack-Logo-2027.png",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://corrupackprintindia.org/",
      facebook: "https://www.facebook.com/corrupackprint/",
      instagram: "https://www.instagram.com/corrupackprint/",
      linkedin: "https://www.linkedin.com/company/corrupackprint/",
      youtube: "https://youtube.com/@corrupackprint/",
      twitter: "https://twitter.com/corrupackprint/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-ev-international-show-2026-10-02",
    name: "8th India EV International Show",
    edition: "8th Edition",
    dates: { display: "2nd to 4th October 2026", start: "2026-10-02", end: "2026-10-04" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Electric Vehicles",
    eventType: "Exhibition",
       heroImage: "/gallery/images-event/2026/india-ev-logo.png",
    description:
      "A business-to-business exhibition focused on electric vehicles, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-battery-international-show-2026-10-02",
    name: "India International Battery Show",
    edition: "1st Edition",
   dates: { display: "2nd to 4th October 2026", start: "2026-10-02", end: "2026-10-04" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Battery & Energy Storage",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/india-battery-expo-logo.png",
    description:
      "A business-to-business exhibition focused on battery & energy storage, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://www.batteryindiaexpo.com/",
      facebook: "https://www.facebook.com/batteryindiaexpo/",
      linkedin: "https://www.linkedin.com/company/indiabatteryshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-solar-international-show-2026-10-02",
    name: "India International Solar Show",
    edition: "1st Edition",
   dates: { display: "2nd to 4th October 2026", start: "2026-10-02", end: "2026-10-04" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Solar & Renewable Energy",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/india-solar-logo.png",
    description:
      "A business-to-business exhibition focused on solar & renewable energy, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://indiasolarshow.com/",
      facebook: "https://www.facebook.com/indiasolarshow/",
      instagram: "https://www.instagram.com/indiasolarshow/",
      linkedin: "https://www.linkedin.com/company/indiasolarshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-buildcon-international-expo-2026-09-17",
    name: "10th Bangladesh Buildcon International Expo",
    edition: "10th Edition",
    dates: { display: "17th to 19th September 2026", start: "2026-09-17", end: "2026-09-19" },
    venue: { city: " ICCB Exhibition Hall, Dhaka", country: "Bangladesh" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2026/10th-Bangladesh-Buildcon-Logo.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Bangladesh.",
    socials: {
      website: "https://bangladeshbuildcon.com/",
      facebook: "https://www.facebook.com/bangladeshbuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-wood-metal-industries-expo-2026-09-17",
    name: "10th Bangladesh Wood & Metal Industries Expo",
    edition: "10th Edition",
   dates: { display: "17th to 19th September 2026", start: "2026-09-17", end: "2026-09-19" },
    venue: { city: " ICCB Exhibition Hall, Dhaka", country: "Bangladesh" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
   heroImage: "/gallery/images-event/2026/bangladesh-wood-expo-logo.png",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Bangladesh.",
    socials: {
      website: "https://bangladeshwoodexpo.com/",
      facebook: "https://www.facebook.com/Bangladeshwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "corru-pack-print-india-2026-03-19",
    name: "Corru Pack Print India",
    edition: "2nd Edition",
    dates: { display: "19–22 March 2026", start: "2026-03-19", end: "2026-03-22" },
    venue: { city: "Mumbai", country: "India" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/corrupack.png",
    description:
      "A specialized platform for the corrugation, packaging and printing industry, showcasing machinery, materials and packaging innovation.",
    socials: {
      website: "https://corrupackprintindia.org/",
      facebook: "https://www.facebook.com/corrupackprint/",
      instagram: "https://www.instagram.com/corrupackprint/",
      linkedin: "https://www.linkedin.com/company/corrupackprint/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-buildcon-international-expo-2026-02-05",
    name: "Nepal Buildcon International Expo",
    edition: "11th Edition",
    dates: { display: "5–8 February 2026", start: "2026-02-05", end: "2026-02-08" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/Nepalbuildconexpo.png",
    description:
      "Nepal's leading construction and building materials exhibition, bringing manufacturers, suppliers and contractors together under one roof.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo/",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-agritech-international-expo-2026-01-16",
    name: "Nepal Agritech International Expo",
    edition: "8th Edition",
    dates: { display: "16–18 January 2026", start: "2026-01-16", end: "2026-01-18" },
    venue: { city: "Bharatpur", country: "Nepal" },
    industry: "Agriculture & Agritech",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/agri.png",
    description:
      "Nepal's dedicated agri-technology exhibition connecting farm equipment, agri-input and agri-tech brands with the region's growing agricultural sector.",
    socials: {
      website: "https://nepalagritech.com.np/",
      facebook: "https://www.facebook.com/NepalAgritech/",
      instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/company/nepalagritech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "uganda-buildcon-international-expo-2025-08-07",
    name: "4th Uganda Buildcon International Expo",
    edition: "4th Edition",
    dates: { display: "7–9 August 2025", start: "2025-08-07", end: "2025-08-09" },
    venue: { city: "UMA Show Grounds, Kampala", country: "Uganda" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    description: "A building and construction industry trade exhibition held in Kampala, Uganda.",
    socials: {
      website: "https://www.ugandabuildcon.com/",
      facebook: "https://www.facebook.com/ugandabuildcon/",
      instagram: "https://www.instagram.com/ugandabuildcon/",
      email: "admin@futurextrade.com",
    },
  },
  {
    id: "odisha-mining-and-infrastructure-international-expo-2025-03-06",
    name: "Odisha Mining and Infrastructure International Expo",
    edition: "3rd Edition",
    dates: { display: "6–9 March 2025", start: "2025-03-06", end: "2025-03-09" },
    venue: { city: "Baramunda Ground, Bhubaneswar", country: "India" },
    industry: "Mining & Infrastructure",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/mining.png",
    description:
      "A business-to-business exhibition focused on mining & infrastructure, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://odishaminingexpo.com/",
      facebook: "https://www.facebook.com/odishaminingexpo/",
      instagram: "https://www.instagram.com/odishaminingexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-buildcon-international-expo-2025-02-20",
    name: "Nepal Buildcon International Expo",
    edition: "10th Edition",
    dates: { display: "20–23 February 2025", start: "2025-02-20", end: "2025-02-23" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalbuildcon.png",
    description:
      "Nepal's leading construction and building materials exhibition, bringing manufacturers, suppliers and contractors together under one roof.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo/",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-agritech-international-expo-2025-02-14",
    name: "Nepal Agritech International Expo",
    edition: "7th Edition",
    dates: { display: "14–16 February 2025", start: "2025-02-14", end: "2025-02-16" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Agriculture & Agritech",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalagritech.png",
    description:
      "Connecting agricultural machinery, seeds, irrigation and agri-tech brands with buyers across Nepal.",
    socials: {
      website: "https://nepalagritech.com.np/",
      facebook: "https://www.facebook.com/NepalAgritech/",
      instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/company/nepalagritech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-food-beverages-expo-2025-02-14",
    name: "Nepal Food & Beverages Expo",
    dates: { display: "14–16 February 2025", start: "2025-02-14", end: "2025-02-16" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Food & Beverages",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalfood.png",
    description:
      "A dedicated food, beverage and hospitality trade platform showcasing products and technology for Nepal's F&B industry.",
    socials: {
      website: "https://nepalfoodexpo.com/",
      facebook: "https://www.facebook.com/nepalfoodexpo/",

      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-wood-international-expo-2025-01-23",
    name: "Bangladesh Wood International Expo",
    edition: "8th Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/bwood.png",
    description:
      "A trade platform for woodworking machinery, furniture hardware and timber processing solutions in the Bangladesh market.",
    socials: {
      website: "https://www.bangladeshwood.com/",
      facebook: "https://www.facebook.com/Bangladeshwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-buildcon-international-expo-2025-01-23",
    name: "Bangladesh Buildcon International Expo",
    edition: "8th Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/bangladeshb.png",
    description:
      "Bangladesh's construction and building materials exhibition connecting manufacturers, developers and contractors.",
    socials: {
      website: "https://bangladeshbuildcon.com/",
      facebook: "https://www.facebook.com/bangladeshbuildconexpo/",
      email: "admin@futurextrade.com"
    },

  },
  {
    id: "bangladesh-elprotech-international-expo-2025-01-23",
    name: "Bangladesh Elprotech International Expo",
    edition: "3rd Edition",
    dates: { display: "23–25 January 2025", start: "2025-01-23", end: "2025-01-25" },
    venue: { city: "Dhaka", country: "Bangladesh" },
    industry: "Power & Electrical",
    eventType: "Exhibition",
    heroImage: "/gallery/exhibitions/nepal-power-electric-light-expo-1.webp",
    description:
      "An electrical, power and lighting technology exhibition serving Bangladesh's growing energy and infrastructure sector.",
    socials: {
      website: "https://bangladeshelectricalexpo.com/",
      facebook: "https://www.facebook.com/ElprotechExpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-wood-international-expo-2025-01-17",
    name: "Nepal Wood International Expo",
    edition: "10th Edition",
    dates: { display: "17–19 January 2025", start: "2025-01-17", end: "2025-01-19" },
    venue: { city: "Kathmandu", country: "Nepal" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalwood.png",
    description:
      "Nepal's premier woodworking machinery and furniture manufacturing exhibition connecting regional buyers with global suppliers.",
    socials: {
      website: "https://nepalwood.com.np/",
      facebook: "https://www.facebook.com/nepalwoodexpo/",
      instagram: "https://www.instagram.com/nepalwoodexpo/",
      linkedin: "https://www.linkedin.com/company/nepalwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-pack-print-international-expo-2024-12-20",
    name: "Nepal Pack Print International Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2024-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalpack.png",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "http://www.nepalpackprint.com/",
      facebook: "https://www.facebook.com/nepalpackprint/",
      instagram: "https://www.instagram.com/nepalpackprint/",
      linkedin: "https://www.linkedin.com/company/nepalpackprint/",
       twitter: "https://x.com/nepalpackprint/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-pharma-international-expo-2024-12-20",
    name: "4th Nepal Pharma International Expo",
    edition: "4th Edition",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2024-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Pharmaceuticals",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalpharma.webp",
    description:
      "A business-to-business exhibition focused on pharmaceuticals, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalpharmatech.com/",
      facebook: "https://www.facebook.com/nepalpharmatech/",
      linkedin: "https://www.linkedin.com/company/nepal-pharma-health-international-expo/",
      twitter: "https://x.com/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-hospital-surgical-medical-equipment-expo-2024-12-20",
    name: "Nepal Hospital Surgical & Medical Equipment Expo",
    edition: "",
    dates: { display: "20-22 December 2024", start: "2024-12-20", end: "2024-12-22" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Healthcare & Medical Equipment",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nhsm.webp",
    description:
      "A business-to-business exhibition focused on healthcare & medical equipment, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "http://nhsmexpo.com/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-international-ev-show-2024-12-06",
    name: "6th Edition India International Ev Show",
    edition: "6th Edition",
    dates: { display: "6-8 December 2024", start: "2024-12-06", end: "2024-12-08" },
    venue: { city: "Auto Cluster Exhibition Centre, Pune", country: "India" },
    industry: "Electric Vehicles",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/6thev.webp",
    description:
      "A business-to-business exhibition focused on electric vehicles, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "odisha-plast-international-expo-2024-11-21",
    name: "2nd Odisha Plast International Expo 2024",
    edition: "2nd Edition",
    dates: { display: "21-24 November 2024", start: "2024-11-21", end: "2024-11-24" },
    venue: { city: "Janata Maidan, Bhubaneswar, Odisha", country: "India" },
    industry: "Plastics & Polymers",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/opalst.webp",
    description:
      "A business-to-business exhibition focused on plastics & polymers, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://odishaplast.com/",
      facebook: "https://www.facebook.com/odishaplast/",
      instagram: "https://www.instagram.com/odishaplast/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "propack-international-expo-2024-11-21",
    name: "Propack International Expo 2024",
    edition: "",
    dates: { display: "21-24 November 2024", start: "2024-11-21", end: "2024-11-24" },
    venue: { city: "Janata Maidan, Bhubaneswar, Odisha", country: "India" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/propack.webp",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "http://odishapropack.com/",
      facebook: "https://www.facebook.com/propackodisha/",
      instagram: "https://www.instagram.com/propackodisha/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bhutan-construction-and-wood-expo-2024-10-18",
    name: "13th Bhutan Construction and Wood Expo",
    edition: "13th Edition",
    dates: { display: "18–21 October 2024", start: "2024-10-18", end: "2024-10-21" },
    venue: { city: "Changlimithang Stadium Parking, Thimphu", country: "Bhutan" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/BCCII.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Bhutan.",
    socials: {
      website: "https://www.bcci.org.bt/",
      facebook: "https://www.facebook.com/bhutanchamber/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-electric-power-and-light-international-expo-2024-09-06",
    name: "3rd Nepal Electric, Power and Light International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2024-09-08" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Power & Electrical",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalpower--.png",
    description:
      "A business-to-business exhibition focused on power & electrical, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalpowerelec.com/",
      facebook: "https://www.facebook.com/nepalpowerelec/",
      linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      twitter: "https://twitter.com/Nepalpowerelec/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-consumer-electronics-home-appliances-international-expo-2024-09-06",
    name: "2nd Nepal Consumer Electronics Home Appliances International Expo",
    edition: "2nd Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2024-09-08" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Consumer Electronics",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalconsumer.webp",
    description:
      "A business-to-business exhibition focused on consumer electronics, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalconsumerexpo.com/",
      facebook: "https://www.facebook.com/nepalconsumerexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-international-ev-show-2024-09-06",
    name: "5th Edition India International Ev Show",
    edition: "5th Edition",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2024-09-08" },
    venue: { city: "Chennai Trade Centre, Nandambakkam, Chennai", country: "India" },
    industry: "Electric Vehicles",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/5ev.webp",
    description:
      "A business-to-business exhibition focused on electric vehicles, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "auto-component-international-expo-2024-09-06",
    name: "Auto Component International Expo",
    edition: "",
    dates: { display: "6–8 September 2024", start: "2024-09-06", end: "2024-09-08" },
    venue: { city: "Chennai Trade Centre, Nandambakkam, Chennai, Tamil Nadu", country: "India" },
    industry: "Automotive Components",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/autocompoent.webp",
    description:
      "A business-to-business exhibition focused on automotive components, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      facebook: "https://www.facebook.com/iievshow/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "uganda-buildcon-international-expo-2024-08-06",
    name: "Uganda Buildcon International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 August 2024", start: "2024-08-06", end: "2024-08-08" },
    venue: { city: "Kampala", country: "Uganda" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/ugandabuild.webp",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Uganda.",
    socials: {
      website: "https://ugandabuildcon.com/",
      facebook: "https://www.facebook.com/ugandabuildcon/",
      instagram: "https://www.instagram.com/ugandabuildcon/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "kenya-buildcon-international-expo-2024-06-06",
    name: "Kenya Buildcon International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 June 2024", start: "2024-06-06", end: "2024-06-08" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/kenyab.png",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Kenya.",
    socials: {
      website: "https://kenyabuildcon.com/",
      instagram: "https://www.instagram.com/kenyabuildconexpo/",
      linkedin: "https://www.linkedin.com/company/kenyabuildconexpo/",
      twitter: "https://x.com/kenyabuildcon/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "kenya-wood-international-expo-2024-06-06",
    name: "Kenya Wood International Expo",
    edition: "3rd Edition",
    dates: { display: "6–8 June 2024", start: "2024-06-06", end: "2024-06-08" },
    venue: { city: "The Sarit Expo Centre, Nairobi", country: "Kenya" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/kenyawood.webp",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Kenya.",
    socials: {
      website: "https://kenyawoodexpo.com/",
      facebook: "https://www.facebook.com/kenyawoodexpo/",
      linkedin: "https://www.linkedin.com/company/kenyawoodexpo/",
      twitter: "https://x.com/kenyawoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-5p-international-expo-2023-12-21",
    name: "4th Nepal 5P International Expo",
    edition: "4th Edition",
    dates: { display: "21-23 December 2023", start: "2023-12-21", end: "2023-12-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepal5p-1.webp",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepal5pexpo.com/",
      facebook: "https://www.facebook.com/Nepal5P/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-pharmatech-international-expo-2023-12-21",
    name: "3rd Nepal Pharmatech International Expo",
    edition: "3rd Edition",
    dates: { display: "21-23 December 2023", start: "2023-12-21", end: "2023-12-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Pharmaceuticals",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalpharma-1.webp",
    description:
      "A business-to-business exhibition focused on pharmaceuticals, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalpharmatech.com/",
      linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-international-ev-show-2023-12-01",
    name: "3rd India International EV Show",
    edition: "3rd Edition",
    dates: { display: "01-03 December 2023", start: "2023-12-01", end: "2023-12-03" },
    venue: { city: "Auto Cluster Exhibition Centre, Chinchwad, Pune", country: "India" },
    industry: "Electric Vehicles",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/3ev.png",
    description:
      "A business-to-business exhibition focused on electric vehicles, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://iievshow.com/",
      facebook: "https://www.facebook.com/iievshow/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "auto-component-international-expo-2023-12-01",
    name: "Auto Component International Expo",
    edition: "",
    dates: { display: "01-03 December 2023", start: "2023-12-01", end: "2023-12-03" },
    venue: { city: "Auto Cluster Exhibition Centre, Chinchwad, Pune", country: "India" },
    industry: "Automotive Components",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/autocompoent.webp",
    description:
      "A business-to-business exhibition focused on automotive components, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      facebook: "https://www.facebook.com/iievshow/",
      instagram: "https://www.instagram.com/iievshow/",
      linkedin: "https://www.linkedin.com/company/iievshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-wood-international-expo-2023-11-23",
    name: "7th Bangladesh Wood International Expo",
    edition: "7th Edition",
    dates: { display: "23-25 November 2023", start: "2023-11-23", end: "2023-11-25" },
    venue: { city: " ICCB, Dhaka", country: "Bangladesh" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/bangladeshwood.webp",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Bangladesh.",
    socials: {
      website: "https://www.bangladeshwood.com/",
      facebook: "https://www.facebook.com/Bangladeshwoodexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-buildcon-international-expo-2023-11-23",
    name: "7th Bangladesh Buildcon International Expo",
    edition: "7th Edition",
    dates: { display: "23-25 November 2023", start: "2023-11-23", end: "2023-11-25" },
    venue: { city: " ICCB, Dhaka", country: "Bangladesh" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/bangladeshbuildcon.webp",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Bangladesh.",
    socials: {
      website: "https://www.bangladeshbuildcon.com/",
      facebook: "https://www.facebook.com/bangladeshbuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bhutan-construction-wood-expo-2023-10-06",
    name: "12th Bhutan Construction & Wood Expo",
    edition: "12th Edition",
    dates: { display: "06-09 October 2023", start: "2023-10-06", end: "2023-10-09" },
    venue: { city: "Changlimithang Stadium Parking, Thimphu", country: "Bhutan" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/bhutan.webp",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Bhutan.",
    socials: {
      website: "https://www.bcci.org.bt/",
      facebook: "https://www.facebook.com/nepalpowerelec/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "ride-nepal-international-expo-2023-09-01",
    name: "Ride Nepal International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Automotive & Mobility",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/ridenepal.png",
    description:
      "A business-to-business exhibition focused on automotive & mobility, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "http://ridenepalexpo.com/",
      facebook: "https://www.facebook.com/RideNepalExpo/",
      instagram: "https://www.instagram.com/ridenepalexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-ev-international-expo-2023-09-01",
    name: "Nepal EV International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Electric Vehicles",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalev.webp",
    description:
      "A business-to-business exhibition focused on electric vehicles, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "http://nepalevexpo.com/",
      facebook: "https://www.facebook.com/Nepalevinternationalshow/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-electric-power-and-light-international-expo-2023-09-01",
    name: "Nepal Electric, Power and Light International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Power & Electrical",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepalpower.webp",
    description:
      "A business-to-business exhibition focused on power & electrical, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalpowerelec.com/",
      facebook: "https://www.facebook.com/nepalpowerelec/",
      linkedin: "https://www.linkedin.com/company/nepal-electric-power-and-lights-international-expo/",
      twitter: "https://twitter.com/Nepalpowerelec/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-consumer-electronics-home-appliances-international-expo-2023-09-01",
    name: "Nepal Consumer Electronics Home Appliances International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Consumer Electronics",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/consume.webp",
    description:
      "A business-to-business exhibition focused on consumer electronics, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "http://nepalconsumerexpo.com/",
      facebook: "https://www.facebook.com/nepalconsumerexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-mobile-international-expo-2023-09-01",
    name: "Nepal Mobile International Expo",
    edition: "",
    dates: { display: "01-03 September 2023", start: "2023-09-01", end: "2023-09-03" },
    venue: { city: "Bhrikuti mandap, Kathmandu", country: "Nepal" },
    industry: "Mobile & Electronics",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/mobile.jpg",
    description:
      "A business-to-business exhibition focused on mobile & electronics, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalmobilexpo.com/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "uganda-buildcon-international-expo-2023-08-10",
    name: "2nd Uganda Buildcon International Expo",
    edition: "2nd Edition",
    dates: { display: "10-12 August 2023", start: "2023-08-10", end: "2023-08-12" },
    venue: { city: "UMA Show Grounds Lugogo, Kampala", country: "Uganda" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/uganda-buildcon.webp",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Uganda.",
    socials: {
      website: "https://ugandabuildcon.com/",
      facebook: "https://www.facebook.com/ugandabuildconexpo/",
      instagram: "https://www.instagram.com/ugandabuildconexpo/",
      linkedin: "https://www.linkedin.com/company/nepal-pharma-health-international-expo/",
      twitter: "https://twitter.com/UgandaBuildcon/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-pharmatech-international-expo-2022-03-11",
    name: "Nepal Pharmatech International Expo",
    edition: "",
    dates: { display: "11-13 March 2022", start: "2022-03-11", end: "2022-03-13" },
    venue: { city: "Futurex Virtual Platform.", country: "" },
    industry: "Pharmaceuticals",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/nepal-pharmatech.jpg",
    description:
      "A business-to-business exhibition focused on pharmaceuticals, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://nepalpharmatech.com/",
      linkedin: "https://www.linkedin.com/company/nepalpharmatech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-5p-international-expo-2022-03-11",
    name: "2nd Nepal 5P International Expo 2022",
    edition: "2nd Edition",
    dates: { display: "11-13 March 2022", start: "2022-03-11", end: "2022-03-13" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/2ND-NEPAL-5P.webp",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepal5pexpo.com/",
      facebook: "https://www.facebook.com/Nepal5P/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-agritech-international-expo-2022-02-25",
    name: "Nepal Agritech International EXPO 2022",
    edition: "",
    dates: { display: "25-27 February 2022", start: "2022-02-25", end: "2022-02-27" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Agriculture & Agritech",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/NEPAL-AGRICULTURE.webp",
    description:
      "A business-to-business exhibition focused on agriculture & agritech, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalagritech.com.np/",
      facebook: "https://www.facebook.com/NepalAgritech/",
      instagram: "https://www.instagram.com/nepalagritech/",
      linkedin: "https://www.linkedin.com/company/nepalagritech/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-food-beverages-expo-2022-02-25",
    name: "Nepal Food & Beverages Expo 2022",
    edition: "",
    dates: { display: "25-27 February 2022", start: "2022-02-25", end: "2022-02-27" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Food & Beverages",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/NEPAL-FOOD.webp",
    description:
      "A business-to-business exhibition focused on food & beverages, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://www.nepalfoodexpo.com/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-buildcon-international-expo-2022-02-11",
    name: "Nepal Buildcon International Expo 2022",
    edition: "",
    dates: { display: "11-13 February 2022", start: "2022-02-11", end: "2022-02-13" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/Nepal-Buildcon.webp",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo/",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-wood-international-expo-2022-01-07",
    name: "7th Nepal Wood International Expo 2022",
    edition: "7th Edition",
    dates: { display: "07-09 January 2022", start: "2022-01-07", end: "2022-01-09" },
    venue: { city: " Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/Nepal-Wood.webp",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "http://nepalwood.com.np/",
      facebook: "https://www.facebook.com/NepalWood/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "chitwan-international-industrial-expo-2021-12-17",
    name: "CHITWAN INTERNATIONAL INDUSTRIAL EXPO 2021",
    edition: "",
    dates: { display: "17-19 December 2021", start: "2021-12-17", end: "2021-12-19" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/chitwan.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalciie.com/",
      facebook: "https://www.facebook.com/ChitwanInternationalIndustrialExpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "indo-nepal-business-expo-summit-2021-12-17",
    name: "Indo Nepal Business Expo & Summit 2021",
    edition: "",
    dates: { display: "17-19 December 2021", start: "2021-12-17", end: "2021-12-19" },
    venue: { city: "Chitwan EXPO Center, Bharatpur", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/indonepal.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://www.indonepalexpo.com/",
      facebook: "https://www.facebook.com/indonepalexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "indo-bhutan-expo-2021-11-16",
    name: "INDO BHUTAN EXPO 2021",
    edition: "",
    dates: { display: "16-18 November 2021", start: "2021-11-16", end: "2021-11-18" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/indiabhutan.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://www.bhutanbsm.com/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "phic-expo-2021-11-12",
    name: "PHIC EXPO 2021",
    edition: "",
    dates: { display: "12-14 November 2021", start: "2021-11-12", end: "2021-11-14" },
    venue: { city: "HITEX Exhibition Center, Hyderabad", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/PHIC-LOGO.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://forms.gle/KsauwBCZCimYVm69A/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "3p-africa-international-expo-2021-07-15",
    name: "3P Africa International Expo 2021",
    edition: "",
    dates: { display: "15-16 July 2021", start: "2021-07-15", end: "2021-07-16" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/3P-AFRICA-LOGO.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://3pafrica.com/",
      facebook: "https://www.facebook.com/Virtual-3P-Africa-International-Expo-102999098652348/",
      linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "3p-egypt-international-expo-2021-06-15",
    name: "3P Egypt International Expo 2021",
    edition: "",
    dates: { display: "15-16 June 2021", start: "2021-06-15", end: "2021-06-16" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/3P-EGYPT-LOGO.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://3pvirtual.com/",
      facebook: "https://www.facebook.com/Virtual-3P-Egypt-International-Expo-105226435085198/",
      linkedin: "https://www.linkedin.com/events/6801477172742627328/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-asean-food-beverage-packaging-virtual-expo-2021-04-17",
    name: "India Asean Food Beverage & Packaging Virtual Expo 2021",
    edition: "",
    dates: { display: "17-19 April 2021", start: "2021-04-17", end: "2021-04-19" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Food & Beverages",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/India-Asean-Food-Beverages.webp",
    description:
      "A business-to-business exhibition focused on food & beverages, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://aseanfoodexpo.com/",
      facebook: "https://www.facebook.com/India-Asean-Food-Beverages-Packaging-Virtual-Expo-2021-104103975052779/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "virtual-buildcon-expo-2021-03-24",
    name: "VIRTUAL BUILDCON EXPO 2021",
    edition: "",
    dates: { display: "24-26 March 2021", start: "2021-03-24", end: "2021-03-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/VIRTUAL-BUILDCON.webp",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://www.virtualbuildcon.com/",
      facebook: "https://www.facebook.com/Virtual-Buildcon-International-Expo-Bangladesh-102259761943461/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "india-sourcing-e-exhibition-2021-03-24",
    name: "India Sourcing E Exhibition 2021",
    edition: "",
    dates: { display: "24-26 March 2021", start: "2021-03-24", end: "2021-03-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/India-Sourcing-E-Exhibition.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://indiasourcingexpo.com/",
      facebook: "https://www.facebook.com/India-Sourcing-E-Exhibition-South-Asia-355747132063366/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "manufacturing-asia-expo-2021-03-19",
    name: "MANUFACTURING ASIA EXPO 2021",
    edition: "",
    dates: { display: "19-21 March 2021", start: "2021-03-19", end: "2021-03-21" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/Mnaufacturing-Asia-Logo.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://asiavirtualexpo.com/",
      facebook: "https://www.facebook.com/Manufacturing-Asia-Virtual-Expo-2021-100136138824801/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "international-europe-manufacturing-expo-2021-03-18",
    name: "INTERNATIONAL EUROPE MANUFACTURING EXPO 2021",
    edition: "",
    dates: { display: "18-20 March 2021", start: "2021-03-18", end: "2021-03-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/MANUFACTURING-EUROPE.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "http://europevirtualexpo.com/",
      facebook: "https://www.facebook.com/International-Europe-Manufacturing-Expo-105293874966222/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "bangladesh-printpack-international-expo-2021-03-10",
    name: "Bangladesh Printpack International Expo 2021",
    edition: "",
    dates: { display: "10-13 March 2021", start: "2021-03-10", end: "2021-03-13" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/bangladesh-printpack.webp",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://5pvirtualexpo.com/",
      facebook: "https://www.facebook.com/Bangladesh-Printpack-International-Expo-2021-104038598413739/",
      linkedin: "https://www.linkedin.com/events/bangladeshprintpackinternationa6772758099854942208/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "business-women-expo-2021-03-06",
    name: "Business Women Expo 2021",
    edition: "",
    dates: { display: "06-08 March 2021", start: "2021-03-06", end: "2021-03-08" },
    venue: { city: "Hitech City Hyderabad", country: "India" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/Business-Women-Expo.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in India.",
    socials: {
      website: "https://businesswomenexpo.in/",
      facebook: "https://www.facebook.com/Business-Women-Expo-100457308743526/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "virtual-sri-lanka-5p-international-expo-2021-02-23",
    name: "Virtual Sri Lanka 5P International EXPO 2021",
    edition: "",
    dates: { display: "23-26 February 2021", start: "2021-02-23", end: "2021-02-26" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/SRI-LANKA-5P.webp",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://5pvirtualexpo.com/",
      facebook: "https://www.facebook.com/Virtual-Sri-Lanka-5P-International-EXPO-2021-172502047671914/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "virtual-nepal-5p-international-expo-2021-01-20",
    name: "Virtual Nepal 5P International Expo 2021",
    edition: "",
    dates: { display: "20-23 January 2021", start: "2021-01-20", end: "2021-01-23" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Printing & Packaging",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/Nepal5P-Virtual.webp",
    description:
      "A business-to-business exhibition focused on printing & packaging, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://5pvirtualexpo.com/",
      facebook: "https://www.facebook.com/virtual5p/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "virtual-buildcon-international-expo-2020-12-17",
    name: "Virtual Buildcon International Expo 2020",
    edition: "",
    dates: { display: "17-20 December 2020", start: "2020-12-17", end: "2020-12-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/VIRTUAL-BUILDCON.webp",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://www.virtualbuildcon.com/",
      facebook: "https://www.facebook.com/Virtual-Buildcon-International-Expo-Bangladesh-102259761943461/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "virtual-wood-international-expo-2020-12-17",
    name: "Virtual Wood International Expo 2020",
    edition: "",
    dates: { display: "17-20 December 2020", start: "2020-12-17", end: "2020-12-20" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/VIRTUAL-WOOD-EXPO.webp",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://www.virtualwoodexpo.com/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "infratech-international-expo-2020-10-15",
    name: "Infratech International Expo",
    edition: "",
    dates: { display: "15-19 October 2020", start: "2020-10-15", end: "2020-10-19" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/INFRATECH-VIRTUAL.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://infratechexpo.com/",
      facebook: "https://www.facebook.com/infratechexpo/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "4px-africa-2020-09-22",
    name: "4px Africa 2020",
    edition: "",
    dates: { display: "22-25 Septmber 2020", start: "2020-09-22", end: "2020-09-25" },
    venue: { city: "Bhrikuti Mandap Kathmandu", country: "Nepal" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/4PX-AFRICA.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://www.enterprising-africa.com/4PX/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "medx-africa-2020-09-22",
    name: "Medx Africa 2020",
    edition: "",
    dates: { display: "22-25 September 2020", start: "2020-09-22", end: "2020-09-25" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/MEDX-AFRICA.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://www.enterprising-africa.com/Medx/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "agrifoodx-africa-2020-09-22",
    name: "Agrifoodx Africa 2020",
    edition: "",
    dates: { display: "22-25 September 2020", start: "2020-09-22", end: "2020-09-25" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Food & Beverages",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/AGRI-FOOD-AFRICA.webp",
    description:
      "A business-to-business exhibition focused on food & beverages, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "https://www.enterprising-africa.com/Agrifood/",
      facebook: "https://www.facebook.com/FuturexGroup/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "health-wellness-expo-conferences-2020-08-21",
    name: "Health & Wellness Expo & Conferences-2020",
    edition: "",
    dates: { display: "21-25 August 2020", start: "2020-08-21", end: "2020-08-25" },
    venue: { city: "Futurex Virtual Platform", country: "" },
    industry: "Mining",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/HEALTH-AND-WELLNESS.webp",
    description:
      "A business-to-business exhibition focused on mining, connecting exhibitors, industry professionals and trade visitors in its host market.",
    socials: {
      website: "http://www.virtualhealthandwellnessexpo.com/",
      facebook: "https://www.facebook.com/events/2632272477089765/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-wood-international-expo-2020-05-28",
    name: "Nepal Wood International EXPO 2020",
    edition: "",
    dates: { display: "28-30 May 2020", start: "2020-05-28", end: "2020-05-30" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Wood & Woodworking",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/Nepal-Wood-2020.jpg",
    description:
      "A business-to-business exhibition focused on wood & woodworking, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "http://nepalwood.com.np/",
      facebook: "https://www.facebook.com/NepalWood/",
      email: "admin@futurextrade.com"
    },
  },
  {
    id: "nepal-buildcon-international-expo-2020-05-21",
    name: "Nepal Buildcon International EXPO 2020",
    edition: "",
    dates: { display: "21-23 May 2020", start: "2020-05-21", end: "2020-05-23" },
    venue: { city: "Bhrikuti Mandap, Kathmandu", country: "Nepal" },
    industry: "Building & Construction",
    eventType: "Exhibition",
    heroImage: "/gallery/images-event/6th-Nepal-Buildcon-2020.jpg",
    description:
      "A business-to-business exhibition focused on building & construction, connecting exhibitors, industry professionals and trade visitors in Nepal.",
    socials: {
      website: "https://nepalbuildcon.com.np/",
      facebook: "https://www.facebook.com/nepalbuildconexpo/",
      instagram: "https://www.instagram.com/nepalbuildconexpo/",
      linkedin: "https://www.linkedin.com/company/nepalbuildconexpo/",
      email: "admin@futurextrade.com"
    },
  },
];

export function isEventUpcoming(event: ExhibitionEvent, referenceDate = new Date()): boolean {
  const end = event.dates.end || event.dates.start;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(end)) return false;
  const [year, month, day] = end.split('-').map(Number);
  return new Date(year, month - 1, day, 23, 59, 59, 999) >= referenceDate;
}
export function getAllUpcomingEvents(): ExhibitionEvent[] {
  return EXHIBITIONS.filter(e => isEventUpcoming(e)).sort((a, b) => a.dates.start.localeCompare(b.dates.start));
}
// Upcoming only: do not silently pad with past exhibitions.
export function getUpcomingEvents(limit = 3): ExhibitionEvent[] {
  return getAllUpcomingEvents().slice(0, Math.max(0, limit));
}
export function getPastEvents(): ExhibitionEvent[] {
  return EXHIBITIONS.filter(e => !isEventUpcoming(e)).sort((a, b) => b.dates.start.localeCompare(a.dates.start));
}
export const EVENT_COUNTRIES = [...new Set(EXHIBITIONS.map(e => e.venue.country).filter(Boolean))].sort();
export const EVENT_CITIES = [...new Set(EXHIBITIONS.map(e => e.venue.city).filter(Boolean))].sort();
export const EVENT_INDUSTRIES = [...new Set(EXHIBITIONS.map(e => e.industry))].sort();
export const EVENT_YEARS = [...new Set(EXHIBITIONS.map(e => e.dates.start.slice(0, 4)))].sort((a,b) => Number(b)-Number(a));
// Upcoming first, earliest upcoming date first; past events afterwards, newest first.
// This recalculates automatically when the date changes, without manual reordering.
export function getSortedExhibitions(referenceDate = new Date()): ExhibitionEvent[] {
  return [...EXHIBITIONS].sort((a, b) => {
    const aUpcoming = isEventUpcoming(a, referenceDate);
    const bUpcoming = isEventUpcoming(b, referenceDate);
    if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
    return aUpcoming
      ? a.dates.start.localeCompare(b.dates.start) || a.name.localeCompare(b.name)
      : b.dates.start.localeCompare(a.dates.start) || a.name.localeCompare(b.name);
  });
}
export const exhibitions = getSortedExhibitions();

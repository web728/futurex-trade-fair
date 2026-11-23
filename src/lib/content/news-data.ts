
export type MediaItem = {
  title: string;
  source: string;
  href: string;
  date?: string;
};

export type PressAsset = {
  id: string;
  title: string;
  size: string;
  href: string;
  type: "pdf" | "image";
  description: string;
  previewUrl?: string;
};

// -----------------------------------------------------
// NEPAL ELECTRIC, POWER & LIGHTS EXPO 2026
// ORIGINAL PRESS ASSETS
//
// Important:
// Original filenames preserved.
// news.ts automatically converts /media/ paths
// into /news/nepal/ paths.
// -----------------------------------------------------

export const pressAssets: PressAsset[] = [
  {
    id: "pdf-1",
    title: "Newspaper Coverage",
    size: "2.4 MB PDF",
    href: "/media/press-release-official-2026.pdf",
    type: "pdf",
    description:
      "Newspaper coverage regarding the 5th Nepal Electric, Power & Lights International Expo 2026.",
  },
  {
    id: "pdf-2",
    title: "Newspaper Coverage",
    size: "4.8 MB PDF",
    href: "/media/expo-guidebook-2026.pdf",
    type: "pdf",
    description:
      "Press and newspaper coverage of Nepal Electric, Power & Lights International Expo 2026.",
  },
  {
    id: "pdf-3",
    title: "Newspaper Coverage",
    size: "3.2 MB PDF",
    href: "/media/nepal-electric-expo-2026-news.pdf",
    type: "pdf",
    description:
      "Media coverage and exhibition news related to the 2026 edition.",
  },

  // NEPAL ORIGINAL IMAGES

  {
    id: "img-1",
    title: "Nepal Electric & Power Expo Media Coverage",
    size: "Original Image",
    href: "/media/nepal-electric-power-and-lights.jpeg",
    previewUrl:
      "/media/nepal-electric-power-and-lights.jpeg",
    type: "image",
    description:
      "Original Nepal Electric & Power Expo media image.",
  },
  {
    id: "img-2",
    title: "Nepal Electric Power & Lights Expo",
    size: "Original Image",
    href: "/media/nepal-electric-power-lights-expo.jpeg",
    previewUrl:
      "/media/nepal-electric-power-lights-expo.jpeg",
    type: "image",
    description:
      "Exhibition news and media visual.",
  },
  {
    id: "img-3",
    title: "Nepal Electric Expo 2026 News",
    size: "Original Image",
    href:
      "/media/nepal-electric-power-lights-expo-2026.jpeg",
    previewUrl:
      "/media/nepal-electric-power-lights-expo-2026.jpeg",
    type: "image",
    description:
      "Original media image relating to Nepal Expo 2026.",
  },
  {
    id: "img-6",
    title: "Nepal Power Expo News",
    size: "Original Image",
    href: "/media/nepal-power-expo-news.jpeg",
    previewUrl: "/media/nepal-power-expo-news.jpeg",
    type: "image",
    description:
      "Original Nepal Power Expo news image.",
  },
  {
    id: "img-7",
    title: "Inauguration Ceremony",
    size: "Original Image",
    href: "/media/inauguration-ceremony.jpeg",
    previewUrl: "/media/inauguration-ceremony.jpeg",
    type: "image",
    description:
      "Exhibition inauguration ceremony media image.",
  },
  {
    id: "img-8",
    title: "Exhibition Floor View",
    size: "Original Image",
    href: "/media/exhibition-floor-view.jpeg",
    previewUrl: "/media/exhibition-floor-view.jpeg",
    type: "image",
    description:
      "Exhibition floor view media image.",
  },
  {
    id: "img-9",
    title: "Consumer Electronics Zone",
    size: "Original Image",
    href: "/media/consumer-electronics-zone.jpeg",
    previewUrl: "/media/consumer-electronics-zone.jpeg",
    type: "image",
    description:
      "Consumer electronics exhibition zone.",
  },
  {
    id: "img-10",
    title: "Power & Energy Stalls",
    size: "Original Image",
    href: "/media/power-energy-stalls.jpeg",
    previewUrl: "/media/power-energy-stalls.jpeg",
    type: "image",
    description:
      "Power, lighting and energy exhibition displays.",
  },
  {
    id: "img-11",
    title: "Nepal Power News Clipping",
    size: "Original Image",
    href: "/media/nepal-power-news.jpeg",
    previewUrl: "/media/nepal-power-news.jpeg",
    type: "image",
    description:
      "Original Nepal power industry press clipping.",
  },
  {
    id: "img-12",
    title: "Nepal Expo Media Highlights 2026",
    size: "Original Image",
    href: "/media/news-2026.jpeg",
    previewUrl: "/media/news-2026.jpeg",
    type: "image",
    description:
      "Media coverage highlights from Nepal Expo 2026.",
  },
];

// -----------------------------------------------------
// NEPAL MEDIA COVERAGE
// Source data from the supplied Nepal Expo website.
// Keep original Nepali-language article titles.
// -----------------------------------------------------

export const mediaCoverage: MediaItem[] = [
  {
    source: "Kantipur Press",
    title:
      "भृकुटीमण्डपमा विद्युत् र इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुने",
    href: "https://kantipurpress.com/2026/3912/",
  },
  {
    source: "Banijya Post",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    href: "https://banijyapost.com/news/electronic-expo",
  },
  {
    source: "Britant News",
    title:
      "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्स प्रदर्शनी",
    href: "https://britantnews.com/2026/08/20/48945/electrical-and-electronics-exhibition-in-kathmandu-from-bhadra-19/",
  },
  {
    source: "Bizpati",
    title:
      "भदौ १९ देखि विद्युत् तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी, १०० बढी कम्पनी सहभागी हुने",
    href: "https://bizpati.com/2026/08/214988/",
  },
  {
    source: "Bizshala",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    href: "https://bizshala.com/article/31906",
  },
  {
    source: "Equity Nepal",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    href: "https://equitynepal.com/2026/08/20/97987/",
  },
  {
    source: "Mountain Khabar",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    href: "https://www.mountainkhabar.com/2026/08/20/235570/",
  },
  {
    source: "Hamro Artha",
    title:
      "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुने",
    href: "https://hamroartha.com/news/134973",
  },
  {
    source: "CNN Khabar",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    href: "https://cnnkhabar.com/content/15606",
  },
  {
    source: "Corporate Khabar",
    title:
      "भदौ १९ गतेदेखि २१ गतेसम्म इलेक्ट्रिक तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://corporatekhabar.com/electric-and-electronics/",
  },
  {
    source: "Aarthik News",
    title:
      "१०० भन्दा बढी इलेक्ट्रिकल तथा इलेक्ट्रोनिक्स कम्पनीहरूको प्रदर्शनी",
    href: "https://aarthiknews.com/news/125753/exhibition-of-more-than-100-electrical-and/",
  },
  {
    source: "Arthakoartha",
    title:
      "भदौ १९ देखि विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै",
    href: "https://arthakoartha.com/archives/115373",
  },
  {
    source: "Merolagani",
    title:
      "काठमाडौंमा भदौ १९ देखि 'नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स' प्रदर्शनी हुने",
    href: "https://merolagani.com/NewsDetail.aspx?newsID=129907",
  },
  {
    source: "Arthabazar",
    title:
      "भदौ १९ देखि भृकुटीमण्डपमा विद्युत् तथा इलेक्ट्रोनिक्ससम्बन्धी अन्तर्राष्ट्रिय प्रदर्शनी हुँदै",
    href: "https://arthabazar.com/131948",
  },
  {
    source: "Arthapranali",
    title: "भदौ १९ देखि प्रदर्शनी हुँदै",
    href: "https://arthapranali.com/2026/08/33701/",
  },
  {
    source: "Nepal Profit",
    title:
      "भृकुटीमण्डपमा विद्युत, ऊर्जा र विद्युतीय उपकरणको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै, ३० हजारभन्दा बढी आगन्तुकको अपेक्षा",
    href: "https://nepalprofit.com/2026/08/58753/",
  },
  {
    source: "Notebazar",
    title:
      "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    href: "https://notebazar.com/news/2026/08/20/165322/",
  },
  {
    source: "Sourya Online",
    title:
      "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://www.souryaonline.com/2026/08/727407.html",
  },
  {
    source: "Corporate Nepal",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी हुँदै",
    href: "https://www.corporatenepal.com/story/285416",
  },
  {
    source: "Bittiya Post",
    title:
      "भदौ १९ देखि भृकुटीमण्डपमा 'नेपाल इलेक्ट्रिक, पावर तथा कन्ज्युमर इलेक्ट्रोनिक्स' अन्तर्राष्ट्रिय प्रदर्शनी हुने",
    href: "https://www.bittiyapost.com/news/2026/08/20/25903",
  },
  {
    source: "Artha Nepal",
    title:
      "भदौ १९ देखि विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै",
    href: "https://arthanepal.com/2026/08/115866/",
  },
  {
    source: "Sagarmatha Pana",
    title:
      "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://sagarmathapana.com/news/36952",
  },
  {
    source: "Hulak Sanchar",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    href: "https://www.hulaksanchar.com/2026/08/20/14/118244/",
  },
  {
    source: "Arthikpati",
    title:
      "भदौ १९ देखि काठमाडौंमा नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://www.arthikpati.com/content/2026/08/20/143984",
  },
  {
    source: "Karobar Daily",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी हुँदै",
    href: "https://www.karobardaily.com/news/407691",
  },
  {
    source: "Pahilo Awaj",
    title:
      "भदौ १९ गतेदेखि २१ गतेसम्म इलेक्ट्रिक तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://pahiloawaj.com/2026/08/20/12/593/",
  },
  {
    source: "Nagarik News",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट एण्ड नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै",
    href: "https://nagariknews.nagariknetwork.com/Bazar/nepal-electric-power-light-and-nepal-consumer-electronics-and-home-appliances-international-exhibition-being-organized-16-71.html",
  },
  {
    source: "Desh Sanchar",
    title:
      "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://deshsanchar.com/2026/08/20/1217993/",
  },
  {
    source: "Arthik Pati",
    title:
      "काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै",
    href: "https://www.arthikpati.com/content/2026/08/20/143984",
  },
  {
    source: "Ukeraa",
    title:
      "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://www.ukeraa.com/news/detail/178951/",
  },
  {
    source: "News of Nepal",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी आयोजना हुँदै",
    href: "https://newsofnepal.com/2026/08/20/783098/",
  },
  {
    source: "Nepal Purbadhar",
    title:
      "भदौ १९ देखि भृकुटीमण्डपमा विद्युत् प्रदर्शनी",
    href: "https://nepalpurbadhar.com/53641/",
  },
  {
    source: "Corporate Bazar",
    title:
      "विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै",
    href: "https://corporatebazar.com/corporate-bazar/45013.html",
  },
  {
    source: "Kendrabindu",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै",
    href: "https://kendrabindu.com/economy/547552/",
  },
  {
    source: "Arthatantra",
    title:
      "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://www.arthatantra.com/2026/08/20/230699/",
  },
  {
    source: "Kalika Khabar",
    title:
      "भृकुटीमण्डपमा विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै",
    href: "https://kalikakhabar.com/bhrikutiimn-dpma-wid-yut-ilek-t-ronik-s-ttha-hom-ap-layn-sesko-an-tr-rash-t-riy-p-rdr-shnii-hundai/",
  },
  {
    source: "Bizness Views",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै",
    href: "https://biznessviews.com/market/62893/",
  },
  {
    source: "Facebook",
    title:
      "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट (Official Notice)",
    href: "https://www.facebook.com/share/1E4A3Nvhe4/",
  },
  {
    source: "Jana Akash",
    title:
      "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट (Official Notice)",
    href: "https://www.janaakash.com/2026/08/21/52544/",
  },

  // Additional exhibition coverage and updates

  {
    source: "Bizpati",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी सम्बन्धी समाचार",
    href: "https://bizpati.com/2026/08/216518/",
  },
  {
    source: "KTM Voice",
    title:
      "इलेक्ट्रिक तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी updates",
    href: "https://www.ktmvoice.com/news/116847.html/",
  },
  {
    source: "Equity Nepal",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी स्थगन/अपडेट",
    href: "https://equitynepal.com/2026/08/30/99500/",
  },
  {
    source: "Ajako Artha",
    title:
      "प्रदर्शनी सम्बन्धी पछिल्लो समाचार",
    href: "https://www.ajakoartha.com/story/144712",
  },
  {
    source: "Artha Path",
    title:
      "Nepal Electric, Power, Light & Consumer Electronics International Exhibition Notice",
    href: "https://www.arthapath.com/2026/08/30/215930/nepal-electric-power-light-and-consumer-electronics-international-exhibition-postponed-until-further-notice/",
  },
  {
    source: "Lalitpur Press",
    title:
      "भृकुटीमण्डप प्रदर्शनी सम्बन्धी विशेष समाचार",
    href: "https://lalitpurpress.com/2026/08/156311/",
  },
  {
    source: "Bittiya Post",
    title:
      "विद्युत् तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी सम्बन्धी अपडेट",
    href: "https://www.bittiyapost.com/news/2026/08/30/26159",
  },
  {
    source: "Hulak Sanchar",
    title:
      "नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी",
    href: "https://www.hulaksanchar.com/2026/08/30/17/119448/",
  },
  {
    source: "News of Nepal",
    title:
      "इलेक्ट्रिक तथा इलेक्ट्रोनिक्स प्रदर्शनी सूचना",
    href: "https://newsofnepal.com/2026/08/30/784823/",
  },
  {
    source: "Kendrabindu",
    title:
      "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट",
    href: "https://kendrabindu.com/economy/550568/",
  },
  {
    source: "Artha Nepal",
    title:
      "विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    href: "https://arthanepal.com/2026/08/117464/",
  },
  {
    source: "Pahilo Awaj",
    title:
      "नेपाल इलेक्ट्रिक प्रदर्शनी सम्बन्धी समाचार",
    href: "https://pahiloawaj.com/806/",
  },
  {
    source: "Himal Daily",
    title:
      "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी",
    href: "https://himaldaily.com/news/35753",
  },
  {
    source: "Bizshala",
    title:
      "प्रदर्शनी सम्बन्धी विशेष समाचार अपडेट",
    href: "https://bizshala.com/article/32517",
  },
  {
    source: "Artha Dabali",
    title:
      "इलेक्ट्रिक, पावर, लाइट प्रदर्शनी updates",
    href: "https://arthadabali.com/2026/08/30/92934",
  },
  {
    source: "Madhyantar",
    title:
      "काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्स प्रदर्शनी सम्बन्धी समाचार",
    href: "https://www.madhyantar.com/samachar/163889",
  },
  {
    source: "Khabarbindu",
    title:
      "प्रदर्शनी अपडेट तथा सूचना",
    href: "https://khabarbindu.com/news/74370",
  },
];

// Unique media publication names for future use
export const uniqueSources: string[] = Array.from(
  new Set(mediaCoverage.map((item) => item.source))
);

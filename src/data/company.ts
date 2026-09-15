export const company = {
  legalName: 'Futurex Trade Fair & Events Pvt. Ltd.',
  brandName: 'Futurex',
  established: 2011,
  description:
    'Futurex Trade Fair & Events Pvt. Ltd. is an international exhibition and corporate events organizer based in New Delhi, with branch offices in Mumbai, Colombo, Kathmandu and Dhaka. Futurex creates business platforms that connect manufacturers, buyers and industry professionals across focused industrial markets.',
  address: 'E-52, 1st Floor, Kalkaji, New Delhi, India 110019',
  phone: '+91-9810855697',
  email: 'info@futurextrade.com',
  offices: ['New Delhi', 'Mumbai', 'Colombo', 'Kathmandu', 'Dhaka'],
  markets: ['India', 'Nepal', 'Bangladesh', 'Sri Lanka', 'Kenya', 'Uganda', 'Tanzania'],
  mission: [
    'Raise the standard of existing exhibitions and develop new shows in response to market demand.',
    'Create business cooperation and networking opportunities.',
    'Expand established exhibition platforms across the region.'
  ],
  vision: 'Advance specialized trade fairs to international standards while creating effective environments for business development, buyer interaction and industry knowledge.',
  values: ['Business ethics', 'Respect', 'Integrity', 'Reliability'],
  stats: [
    { value: 220, suffix: '+', label: 'Trade Exhibitions' },
    { value: 16516, suffix: '+', label: 'Global Exhibitors' },
    { value: 25844, suffix: '+', label: 'Brands on display' },
    { value: 956484, suffix: '+', label: 'Trade Visitors' }
  ],
  assets: {
    logo: 'https://futurextrade.com/images-event/icon/Futurex-Trade.webp',
    hero: '/images/gallery/hero.png',
    exhibition: 'https://futurextrade.com/images-event/futurextrade.webp'
  }
} as const;

export const groupCompanies = [
  {
    name: 'Futurex Digital Marketing Agency',
    description: 'A Futurex group company focused on digital marketing and brand communication.'
  },
  {
    name: 'Futurex Healthcare',
    description: 'The Futurex group healthcare business referenced on the current Futurex website.'
  },
  {
    name: 'Futurex Studio',
    description: 'An exhibition stand design and production company within the Futurex group.'
  }
] as const;

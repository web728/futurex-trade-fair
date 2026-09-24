import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { company } from '@/data/company';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600']
});

const manrope = Manrope({ 
  subsets: ['latin'], 
  variable: '--font-manrope',
  display: 'swap',
  weight: ['500', '600', '700', '800']
});

export const viewport: Viewport = {
  themeColor: '#07080A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.futurextrade.com'),
  alternates: {
    canonical: 'https://www.futurextrade.com/',
  },
  title: {
    default: 'B2B Exhibition & Trade Fair Organizer in India | Futurex Group',
    template: '%s | Futurex Trade Fair'
  },
  description: 'Futurex Group organises sector-focused B2B trade exhibitions across India, South Asia and East Africa, connecting manufacturers, suppliers and trade buyers.',
  verification: {
    google: 'Sbcwikppx9v24BQUPleD5NRINXmzONz2bW3Yau6gYXE',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',   
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Futurex Group',
    url: 'https://www.futurextrade.com/',
    title: 'B2B Exhibition & Trade Fair Organizer in India | Futurex Group',
    description: 'Futurex Group organises sector-focused B2B trade exhibitions across India, South Asia and East Africa, connecting manufacturers, suppliers and trade buyers.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Exhibition & Trade Fair Organizer in India | Futurex Group',
    description: 'Futurex Group organises sector-focused B2B trade exhibitions across India, South Asia and East Africa, connecting manufacturers, suppliers and trade buyers.',
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Point 7: Detailed Organization Schema with all requested parameters
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Futurex Group',
    legalName: 'Futurex Trade Fair & Events Private Limited',
    url: 'https://www.futurextrade.com/',
    logo: 'https://www.futurextrade.com/logo.png',
    email: company?.email || 'info@futurextrade.com',
    telephone: company?.phone || '+91-9810855697',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'E52, 1st Floor, Kalkaji',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110019',
      addressCountry: 'IN'
    },
    foundingDate: '2011',
    sameAs: [
      // Add official social profile links here if available
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'CIEO (Confederation of Indian Exhibition Organisers)',
      url: 'https://www.cieo.in/'
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-[#07080A] text-[#F3F4F6] min-h-screen flex flex-col relative`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} 
        />
      </body>
    </html>
  );
}
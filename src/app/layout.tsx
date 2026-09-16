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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://futurextrade.com'),
  title: {
    default: 'Futurex Trade Fair & Events | International B2B Exhibitions',
    template: '%s | Futurex Trade Fair'
  },
  description: company?.description || 'Futurex Trade Fair and Events Private Limited is a leading international exhibition and corporate events organizer based in Kalkaji, New Delhi, operating across 5 international hubs.',
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
    siteName: 'Futurex Trade Fair & Events Pvt. Ltd.',
    title: 'Futurex Trade Fair & Events | International B2B Exhibitions',
    description: company?.description || 'Leading organizer of 220+ international industrial trade exhibitions across India and South Asia.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Futurex Trade Fair & Events',
    description: company?.description,
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company?.legalName || 'Futurex Trade Fair & Events Pvt. Ltd.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://futurextrade.com',
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
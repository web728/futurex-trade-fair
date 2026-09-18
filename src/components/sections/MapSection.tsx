"use client";

import { MapPin, Navigation } from 'lucide-react';
import { company } from '@/data/company';
import Image from 'next/image';

export function MapSection() {
  // Updated with exact coordinates: 28.5442742, 77.2541014 (Kalkaji, New Delhi)
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.495048252277!2d77.2541014!3d28.5442742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3df117f72e1%3A0x3404460d04e3a188!2sFuturex%20Trade%20Fair%20and%20Events!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  const directionsUrl =
    "https://www.google.com/maps/place/Futurex+Trade+Fair+and+Events/@28.5442742,77.2541014,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce3df117f72e1:0x3404460d04e3a188!8m2!3d28.5442742!4d77.2541014!16s%2Fg%2F11c2kbmb6n";

  return (
    <section className="relative py-20 sm:py-24 bg-[#FBFBFD] border-t border-neutral-200/80 select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-neutral-200/80 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-4 shadow-2xs">
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                                      <Image
                                        src="/logos/svg/logo-arrow.png"
                                        alt="Icon"
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
              <span>LOCATION DIRECTORY</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#0A0D12]">
              Visit Our Head Office<span className="text-red-600">.</span>
            </h3>

            <p className="mt-2 text-sm text-neutral-500 font-normal">
              {company.address}
            </p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#0A0D12] border border-neutral-200 hover:border-[#0A0D12] text-xs font-mono tracking-[0.14em] uppercase text-neutral-800 hover:text-white transition-all duration-300 shadow-2xs active:scale-95 cursor-pointer self-start md:self-auto"
          >
            <Navigation
              size={14}
              className="text-neutral-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Embedded Map Container */}
        <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl bg-white">
          <iframe
            title="Futurex Office Location Map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
          />
        </div>

      </div>
    </section>
  );
}

export default MapSection;
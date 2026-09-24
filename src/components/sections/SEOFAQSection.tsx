'use client';

import React from 'react';

export function SEOFAQSection() {
  const faqs = [
    {
      question: "What is Futurex Group?",
      answer: "Futurex Group is an India-based organiser of sector-focused B2B trade exhibitions operating across India, South Asia and East Africa."
    },
    {
      question: "What industries does Futurex Group serve?",
      answer: "Building & construction, woodworking, electric mobility, power & energy, agriculture, mining & infrastructure and other industrial sectors."
    },
    {
      question: "Where does Futurex Group organise exhibitions?",
      answer: "Across India and markets in South Asia and East Africa."
    },
    {
      question: "How long has Futurex Group been organising exhibitions?",
      answer: "Futurex Trade Fair & Events Private Limited was established in 2011."
    },
    {
      question: "How can a company exhibit at a Futurex Group exhibition?",
      answer: "Companies can select an upcoming exhibition based on industry and market and contact the organising team for participation options."
    }
  ];

  return (
    <section className="py-16 bg-[#0A0B0E] border-t border-white/[0.08] text-neutral-300">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight">
          Frequently Asked Questions About Futurex Group
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SEOFAQSection;
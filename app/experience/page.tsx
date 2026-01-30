"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";

function ExperienceContent() {
  const params = useSearchParams();
  const locale = params.get("locale") || "en";

  const [translations, setTranslations] = useState<any>(null);

  // Dynamically load translations based on the `locale`
  useEffect(() => {
    import(`../../locales/${locale}.json`)
      .then((localeData) => {
        setTranslations(localeData);
      })
      .catch((error) => {
        console.error(`Failed to load translations for locale: ${locale}`, error);
        setTranslations(null); // Ensure graceful fallback on load failure
      });
  }, [locale]);

  // Show loading state while translations are being fetched
  if (!translations) {
    return <p className="text-center mt-10">Loading translations...</p>;
  }

  const { experience } = translations;

  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      {/* ===== PAGE TITLE ===== */}
      <h1 className="text-3xl font-bold text-navy text-center mb-12">
        {experience.heading}
      </h1>

      {/* ===== EXPERIENCE CARD ===== */}
      <div className="p-8 bg-ash-light rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-navy">{experience.role}</h2>

        <p className="text-gray-700 font-medium mt-1">
          {experience.organization}
        </p>

        <p className="text-gray-500 text-sm mb-4">
          {experience.duration} · {experience.location}
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2 text-justify">
          {experience.responsibilities.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Wrap ExperienceContent with a Suspense boundary for async loading
export default function Experience() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading page...</p>}>
      <ExperienceContent />
    </Suspense>
  );
}

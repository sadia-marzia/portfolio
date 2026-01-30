"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResearchContent() {
  const params = useSearchParams();
  const locale = params.get("locale") || "en"; // Default to English if no locale is set

  const [translations, setTranslations] = useState<any>(null);

  // Dynamically load translations based on current locale
  useEffect(() => {
    import(`../../locales/${locale}.json`)
      .then((localeData) => {
        setTranslations(localeData);
      })
      .catch((error) => {
        console.error(`Error loading translations for locale: ${locale}`, error);
        setTranslations(null); // Set null if there’s an error to avoid further issues
      });
  }, [locale]);

  // Show a loading state while translations are being fetched
  if (!translations) {
    return <p className="text-center mt-10">Loading research details...</p>;
  }

  const { research } = translations;

  return (
    <div className="container mx-auto py-20 px-6 max-w-5xl">
      {/* ===== PAGE HEADING ===== */}
      <h1 className="text-4xl font-bold text-navy text-center mb-10">
        {research.heading}
      </h1>

      {/* ===== UNDERGRADUATE THESIS ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy mb-4">
          {research.thesis.title}
        </h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {research.thesis.subtitle}
        </h3>
        <h4 className="text-lg font-bold text-gray-600 mb-4">
          {research.thesis.university}
        </h4>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          {research.thesis.points.map((point: string, index: number) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* ===== CONFERENCE PUBLICATION ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy mb-4">
          {research.conference.title}
        </h2>
        <p className="text-gray-700 mb-4">
          {research.conference.authors}.{" "}
          <i>{research.conference.paper}</i>.{" "}
          <strong>{research.conference.journal}</strong>.<br />
          <span className="text-navy font-semibold">DOI:</span>{" "}
          <a
            href={research.conference.doiLink}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {research.conference.doi}
          </a>
        </p>
      </section>

      {/* ===== ONGOING RESEARCH ===== */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-4">
          {research.ongoing.title}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {research.ongoing.description}
        </p>
      </section>
    </div>
  );
}

// Wrap `ResearchContent` in a Suspense boundary
export default function Research() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading page...</p>}>
      <ResearchContent />
    </Suspense>
  );
}

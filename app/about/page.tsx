"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function AboutContent() {
  const params = useSearchParams();
  const locale = params.get("locale") || "en";

  const translations = require(`../../locales/${locale}.json`);
  const { about, skills, education } = translations;

  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      {/* ===== ABOUT INTRO ===== */}
      <h1 className="text-3xl font-bold text-navy text-center mb-10">
        {about.heading}
      </h1>

      <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify max-w-4xl mx-auto">
        <p>{about.paragraph1}</p>
        <p>{about.paragraph2}</p>
        <p>{about.paragraph3}</p>
      </div>

      {/* ===== SKILLS SNAPSHOT ===== */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-navy mb-6">{skills.heading}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.groups.map((group: any, index: number) => (
            <div key={index} className="p-6 bg-ash-light rounded-xl shadow-sm">
              <h3 className="font-semibold text-navy mb-3">{group.title}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {group.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-navy mb-8 text-center">
          {education.heading}
        </h2>

        <ul className="space-y-6">
          {education.list.map((edu: any, index: number) => (
            <li key={index} className="p-6 bg-ash-light rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-navy">{edu.institution}</h3>

              <p className="text-gray-700 font-medium">{edu.degree}</p>

              {/* GPA / Grade (optional) */}
              {edu.result && (
                <p className="text-gray-600 text-sm mt-1">{edu.result}</p>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-between text-gray-500 text-sm mt-2">
                <span>{edu.year}</span>
                {edu.location && <span>{edu.location}</span>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// Wrapping AboutContent with Suspense Boundary
export default function About() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}

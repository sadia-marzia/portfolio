"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";

  const [translations, setTranslations] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Added loading state for better clarity
  const [selectedTopic, setSelectedTopic] = useState<string>("all"); // Hook is now always called

  // Dynamically load translations for the selected locale
  useEffect(() => {
    setLoading(true); // Enable loading indicator while fetching translations
    import(`../../locales/${locale}.json`)
      .then((localeData) => {
        setTranslations(localeData); // Set translations in state
      })
      .catch((err) => {
        console.error(`Error loading locale file for ${locale}:`, err);
      })
      .finally(() => setLoading(false)); // Disable loading indicator
  }, [locale]);

  // If translations aren't loaded, return null but keep hooks consistent
  if (loading || !translations) {
    return <p className="text-center mt-10">Loading projects...</p>;
  }

  const allProjects = [
    {
      id: "sap1",
      topic: "VLSI",
      title: translations.projects.projectTitles.sap1,
      description: translations.projects.projectSummaries.sap1,
    },
    {
      id: "hospital",
      topic: "Web Development",
      title: translations.projects.projectTitles.hospital,
      description: translations.projects.projectSummaries.hospital,
    },
    {
      id: "lighting",
      topic: "Automation / IOT",
      title: translations.projects.projectTitles.lighting,
      description: translations.projects.projectSummaries.lighting,
    },
    {
      id: "handwash",
      topic: "Automation / IOT",
      title: translations.projects.projectTitles.handwash,
      description: translations.projects.projectSummaries.handwash,
    },
    {
      id: "retinopathy",
      topic: "AI/ ML",
      title: translations.projects.projectTitles.retinopathy,
      description: translations.projects.projectSummaries.retinopathy,
    },
    {
      id: "sleep",
      topic: "AI/ ML",
      title: translations.projects.projectTitles.sleep,
      description: translations.projects.projectSummaries.sleep,
    },
    {
      id: "speech",
      topic: "AI/ ML",
      title: translations.projects.projectTitles.speech,
      description: translations.projects.projectSummaries.speech,
    },
  ];

  const filteredProjects =
    selectedTopic === "all"
      ? allProjects
      : allProjects.filter((project) => project.topic === selectedTopic);

  const router = useRouter();

  return (
    <div className="container mx-auto py-20 px-6">
      {/* ===== PAGE TITLE ===== */}
      <h1 className="text-3xl md:text-4xl text-navy font-bold mb-8 text-center">
        {translations.projects.title}
      </h1>

      {/* ===== TOPIC FILTER ===== */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {[
          { key: "all", label: translations.projects.showAll },
          { key: "VLSI", label: "VLSI" },
          { key: "Web Development", label: "Web Development" },
          { key: "Automation / IOT", label: "Automation / IOT" },
          { key: "AI/ ML", label: "AI / ML" },
        ].map((item) => {
          const isActive = selectedTopic === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setSelectedTopic(item.key)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-navy text-white shadow-md scale-[1.02]"
                    : "bg-ash-light text-navy hover:bg-navy hover:text-white"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* ===== PROJECT LIST ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-ash-light rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl text-navy font-bold mb-2">
              {project.title}
            </h2>

            <p className="text-ash-dark text-sm leading-relaxed">
              {project.description}
            </p>

            <button
              onClick={() =>
                router.push(`/projects/${project.id}?locale=${locale}`)
              }
              className="mt-5 inline-block px-5 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition duration-200"
            >
              {translations.projects.detailsButton}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Wrap the component in Suspense
export default function Projects() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading page...</p>}>
      <ProjectsContent />
    </Suspense>
  );
}

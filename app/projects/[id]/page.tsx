import fs from "fs";
import path from "path";
import { Suspense } from "react";
import ProjectDetailsClient from "./ProjectDetailsClient";

export default async function ProjectDetailsPage({
  params: promisedParams,
  searchParams: promisedSearchParams,
}: {
  params: Promise<{ id?: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Resolve the Promises for `params` and `searchParams`
  const resolvedParams = await promisedParams;
  const resolvedSearchParams = await promisedSearchParams;

  const projectId = resolvedParams?.id;
  const locale = resolvedSearchParams?.locale || "en";

  if (!projectId) {
    // Optionally render a more user-friendly message if `projectId` is missing
    return <div className="text-center p-6">Project ID is missing.</div>;
  }

  let translations;

  try {
    // Load translations dynamically for the specified locale
    const translationPath = path.join(
      process.cwd(),
      "public",
      "locales",
      `${locale}.json`
    );
    const fileContents = fs.readFileSync(translationPath, "utf-8");
    translations = JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to load translations for locale: "${locale}"`, error);
    return (
      <div className="text-center p-6">
        Failed to load translations. Please check the locale or try again later.
      </div>
    );
  }

  const project = translations?.projects?.projectDetails?.[projectId];

  if (!project) {
    return (
      <div className="text-center p-6">
        Sorry, we could not find the requested project.
      </div>
    );
  }

  // Render detailed project information
  return (
    <Suspense fallback={<div>Loading project details...</div>}>
      <ProjectDetailsClient
        project={{
          tools: project.tools,
          significance: project.significance,
          description: project.description || "No description available.",
          github: project.github,
          images: project.images || [],
        }}
        title={translations.projects.projectTitles?.[projectId] || "Project"}
      />
    </Suspense>
  );
}

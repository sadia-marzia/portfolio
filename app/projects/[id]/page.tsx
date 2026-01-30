import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ProjectDetailsClient from "./ProjectDetailsClient";

export default async function ProjectDetailsPage({
  params: promisedParams, // Treat `params` as a Promise
  searchParams: promisedSearchParams, // Treat `searchParams` as a Promise
}: {
  params: Promise<{ id?: string }>; // Notice `params` as a Promise
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Resolve `params` and `searchParams` Promises
  const resolvedParams = await promisedParams;
  const resolvedSearchParams = await promisedSearchParams;

  // Extract `id` and `locale` after unwrapping the Promises
  const projectId = resolvedParams?.id;
  const locale = resolvedSearchParams?.locale || "en";

  // Ensure projectId is available, otherwise return 404
  if (!projectId) {
    return notFound();
  }

  let translations;

  try {
    // Safely resolve the translation file path
    const translationPath = path.join(process.cwd(), "public", "locales", `${locale}.json`);
    const fileContents = fs.readFileSync(translationPath, "utf-8");
    translations = JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to load translations for locale: "${locale}"`, error);
    return notFound();
  }

  // Validate the existence of the project in the translations
  const project = translations?.projects?.projectDetails?.[projectId];

  if (!project) {
    return notFound();
  }

  // Pass the resolved data to the Client Component
  return (
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
  );
}

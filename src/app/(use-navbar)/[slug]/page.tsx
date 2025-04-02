import type { FC } from "react";
import { notFound } from "next/navigation";
import type { BaseTemplateProps } from "@/components/templates/types";
import { UpscNotesTemplate } from "@/components/templates/UpscNotesTemplate";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";
import { GeneralStudiesTemplate } from "@/components/templates/GeneralStudiesTemplate";
import { CurrentAffairTemplate } from "@/components/templates/CurrentAffairTemplate";
import { env } from "@/config/env";

// Map template IDs to components
const TEMPLATE_MAP: Record<string, any> = {
  "upsc-notes": UpscNotesTemplate,
  "article": ArticleTemplate,
  "general-studies": GeneralStudiesTemplate,
  "study-material": ArticleTemplate, // Using ArticleTemplate as base for study material
  "current-affair": CurrentAffairTemplate,
};

async function getPage(
  slug: string
): Promise<BaseTemplateProps["page"] | null> {
  try {
    console.log("Fetching page for slug:", slug);

    const response = await fetch(`${env.API}/page/slug/${slug}`);
    const res = await response.json();
    const page = res.data;

    if (!page) {
      console.log("Page not found for slug:", slug);
      return null;
    }

    console.log("Found page:", page);

    return page as BaseTemplateProps["page"];
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Ensure params is properly awaited by using it in an async context
  const slug = params.slug;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  // Get the correct template component using template ID
  const Template = TEMPLATE_MAP[page.template.id];

  if (!Template) {
    console.error(`Template ${page.template.id} not found in TEMPLATE_MAP`);
    throw new Error(`Template ${page.template.id} not found`);
  }

  console.log("Rendering page with template:", page.template.id);
  return <Template page={page} />;
}

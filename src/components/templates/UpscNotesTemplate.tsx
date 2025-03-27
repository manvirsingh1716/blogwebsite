import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import ContactForm from "@/components/ui/ContactForm";
import SidebarNavigation from "@/components/navigation/SidebarNavigation";
import { metadata } from "@/app/(use-navbar)/layout";
// import { UpscNotesTemplateProps } from "./types";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  level: number;
  children?: PageItem[];
}

interface UpscNotesTemplateProps {
  page: {
    id: string;
    title: string;
    content: string;
    slug: string;
    metadata: Record<string, any>;
    template: {
      id: string;
      name: string;
    };
    children: PageItem[];
  };
}

export const UpscNotesTemplate: React.FC<UpscNotesTemplateProps> = ({
  page,
}) => {
  // Debug log for incoming data
  console.log("UpscNotesTemplate received page:", {
    id: page.template.id,
    title: page.title,
    content: page.content,
    metadata: page.metadata,
  });

  const { title, content } = page;
  const jsonContent = JSON.parse(content);

  if (!jsonContent || typeof jsonContent !== "object") {
    console.error("Invalid content structure:", content);
    return <div>Error: Invalid content structure</div>;
  }

  const {
    content: mainContent = "",
  } = jsonContent;

  console.log("Data: ", metadata);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          {/* Left Sidebar */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Navigation Section */}
              <Card className="border border-blue-100 shadow-md bg-white rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Navigation
                  </h2>
                  {/* Debug information is logged in useEffect */}
                  <SidebarNavigation 
                    currentPageId={page.id.toString()} 
                    basePath={page.slug.split('/')[0]} // Use the first segment of the page slug
                    hideParent={true}
                  />
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="border border-blue-100 shadow-md bg-white rounded-xl">
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-8 lg:col-span-9">
            <article className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                {title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-8">
                {Array.isArray(metadata?.keywords) ? metadata.keywords.map((keyword: string, index: number) => (
                  <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg"
                  >
                  {keyword}
                  </Badge>
                )) : null}
              </div>

              {mainContent ? (
                <div
                  className="prose prose-lg max-w-none prose-headings:text-blue-600 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-p:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: mainContent }}
                />
              ) : (
                <div className="text-red-500">No content available</div>
              )}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UpscNotesTemplate;

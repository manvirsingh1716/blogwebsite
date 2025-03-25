import React from 'react';
import { BaseTemplateProps, JsonContent, JsonMetadata } from './types';
import { Hero } from '../ui/Hero';
import { StudyMaterialCard } from '../ui/StudyMaterialCard';

interface StudyMaterialContent extends JsonContent {
  title: string;
  description: string;
  materials: Array<{
    title: string;
    description: string;
    fileUrl: string;
    fileType: string;
    fileSize: string;
  }>;
}

interface StudyMaterialMetadata extends JsonMetadata {
  subject: string;
  level: string;
  lastUpdated: string;
}

export const StudyMaterialTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { content, metadata } = page;
  const { title, description, materials } = content as unknown as StudyMaterialContent;
  const { subject, level, lastUpdated } = (metadata || {}) as StudyMaterialMetadata;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero
        title={title}
        description={description}
        subtitle={`${subject} • ${level}`}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Materials List */}
          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {materials.map((material, index) => (
                <StudyMaterialCard
                  key={index}
                  {...material}
                  category={subject}
                />
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            {/* Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Material Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{subject}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Level</p>
                  <p className="font-medium">{level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{lastUpdated}</p>
                </div>
              </div>
            </div>

            {/* Download Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">How to Download</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Click the Download button on any material</li>
                <li>Wait for the file to download</li>
                <li>Open the file with appropriate software</li>
                <li>For any issues, contact support</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

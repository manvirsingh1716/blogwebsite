import React from 'react';
import { BaseTemplateProps, JsonContent, JsonMetadata } from './types';
import { Hero } from '../ui/Hero';
import { TeamSlider } from '../ui/TeamSlider';

interface AboutContent extends JsonContent {
  hero: {
    title: string;
    description: string;
  };
  mission: string;
  veterans: Array<{
    name: string;
    image: string;
    info: string;
  }>;
  coreMembers: Array<{
    name: string;
    image: string;
    info: string;
  }>;
}

interface AboutMetadata extends JsonMetadata {
  lastUpdated?: string;
  teamSize?: number;
}

export const AboutTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { content, metadata } = page;
  const { hero, mission, veterans, coreMembers } = content as unknown as AboutContent;
  const { lastUpdated, teamSize } = (metadata || {}) as AboutMetadata;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero
        title={hero?.title || 'About Us'}
        description={hero?.description || 'Learn more about our team and mission'}
      />

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="prose prose-lg mx-auto">
              <p>{mission}</p>
            </div>
            {lastUpdated && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Veterans Section */}
      {veterans && veterans.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <TeamSlider
              title="Our Veterans"
              members={veterans}
            />
          </div>
        </section>
      )}

      {/* Core Members Section */}
      {coreMembers && coreMembers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <TeamSlider
              title="Core Members"
              members={coreMembers}
            />
          </div>
        </section>
      )}

      {/* Team Stats */}
      {teamSize && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">Our Team</h2>
              <p className="text-lg text-gray-600">
                We are a team of {teamSize} dedicated professionals working together to achieve excellence.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

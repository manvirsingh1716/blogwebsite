import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

export const AboutTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, content, metadata } = page;
  const { mainContent } = content as { mainContent: string };
  const { 
    name, 
    subtitle,
    profileImage, 
    contactInfo, 
    socialLinks,
    experience,
    skills
  } = metadata as {
    name: string;
    subtitle?: string;
    profileImage: string;
    contactInfo?: {
      email?: string;
      phone?: string;
      location?: string;
    };
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
    experience?: Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>;
    skills?: Array<{
      category: string;
      items: string[];
    }>;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb />

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Card */}
        {profileImage && (
          <aside className="md:col-span-4">
            <Card>
              <CardContent className="p-6">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Contact Information */}
                {contactInfo && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Contact Info</h3>
                    {contactInfo.email && (
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <a href={`mailto:${contactInfo.email}`} className="text-blue-500 hover:underline">
                          {contactInfo.email}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Social Links */}
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-4">Connect</h3>
                    <div className="flex gap-4">
                      {socialLinks.linkedin && (
                        <a
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-500"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        )}

        {/* Main Content */}
        <main className={profileImage ? 'md:col-span-8' : 'md:col-span-12'}>
          <Card>
            <CardContent className="prose dark:prose-invert max-w-none pt-6">
              {mainContent}
            </CardContent>
          </Card>

          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Experience</h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4">
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Skills</h2>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg mb-2">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

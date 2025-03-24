"use client";

import React, { useState, useEffect } from 'react';
import { Page, Template } from '@prisma/client';

interface PageWithRelations extends Page {
  parent: PageWithRelations | null;
  children: PageWithRelations[];
}

interface PageFormProps {
  editPage?: PageWithRelations | null;
}

interface PageData {
  title: string;
  slug: string;
  parentId: string | null;
  content: Record<string, any>;
  metadata: Record<string, any>;
  templateId: string;
}

export function PageForm({ editPage = null }: PageFormProps) {
  const [pages, setPages] = useState<PageWithRelations[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(Array(7).fill(''));
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Record<string, any>>({});
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  // Fetch existing pages and templates on component mount
  useEffect(() => {
    fetchPages();
    fetchTemplates();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/pages');
      if (!response.ok) throw new Error('Failed to fetch pages');
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      setError('Failed to load pages');
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      const data = await response.json();
      setTemplates(data);
      if (data.length > 0 && !selectedTemplate) {
        setSelectedTemplate(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError('Failed to load templates');
    }
  };

  // Get pages for a specific level based on parent selection
  const getPagesForLevel = (level: number): PageWithRelations[] => {
    // For level 1, return only root pages (no parent)
    if (level === 0) {
      return pages.filter(page => !page.parent);
    }

    // For other levels, get pages whose parent matches the selected page from previous level
    const parentId = selectedLevels[level - 1];
    if (!parentId) return [];

    // Only return pages that are direct children of the selected parent
    return pages.filter(page => {
      // Must have a parent and it must match the selected parent
      if (!page.parent || page.parent.id !== parentId) return false;

      // Check if this page is at the correct level in the hierarchy
      let currentPage = page;
      let currentLevel = 0;
      
      while (currentPage.parent) {
        currentLevel++;
        currentPage = currentPage.parent;
      }

      return currentLevel === level;
    });
  };

  // Get current level based on parent selections
  const getCurrentLevel = (): number => {
    let level = 0;
    for (let i = 0; i < selectedLevels.length; i++) {
      if (selectedLevels[i]) level = i + 1;
    }
    return level;
  };

  // Handle level selection change
  const handleLevelChange = (level: number, value: string) => {
    const newSelectedLevels = [...selectedLevels];
    newSelectedLevels[level] = value;
    
    // Clear all subsequent levels when a level changes
    for (let i = level + 1; i < newSelectedLevels.length; i++) {
      newSelectedLevels[i] = '';
    }
    
    setSelectedLevels(newSelectedLevels);
  };

  // Get the final parentId based on selected level
  const getSelectedParentId = (): string | null => {
    const currentLevel = getCurrentLevel();
    if (currentLevel === 0) return null;
    return selectedLevels[currentLevel - 1] || null;
  };

  // Build the complete slug based on parent hierarchy
  const buildSlug = async (): Promise<string> => {
    // Convert title to slug format
    const titleSlug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // For root pages, just return the title slug
    return titleSlug;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const parentId = getSelectedParentId();
      const pageData: PageData = {
        title,
        slug: await buildSlug(),
        parentId,
        content,
        metadata,
        templateId: selectedTemplate
      };

      const response = await fetch('/api/pages', {
        method: editPage ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save page');
      }
      
      // Refresh pages list and reset form
      await fetchPages();
      if (!editPage) {
        setSelectedLevels(Array(7).fill(''));
        setSelectedTemplate('');
        setTitle('');
        setContent({});
        setMetadata({});
      }
    } catch (error) {
      console.error('Error saving page:', error);
      setError(error instanceof Error ? error.message : 'Failed to save page');
    }
  };

  // Get the selected template's requirements
  const getTemplateRequirements = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return null;
    return (template.layout as any)?.requirements;
  };

  // Handle content field change
  const handleContentChange = (field: string, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  // Handle metadata field change
  const handleMetadataChange = (field: string, value: any) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Page Hierarchy Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Select Parent Page (Optional)
        </label>
        
        {/* Level dropdowns */}
        {Array.from({ length: 7 }).map((_, index) => {
          // Only show dropdown if previous level is selected (except for level 1)
          const shouldShow = index === 0 || selectedLevels[index - 1];
          if (!shouldShow) return null;

          return (
            <div key={index}>
              <label className="block text-xs text-gray-500 dark:text-gray-400">
                Level {index + 1} {index >= 4 && "(Not shown in navbar)"}
              </label>
              <select
                value={selectedLevels[index]}
                onChange={(e) => handleLevelChange(index, e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">
                  {index === 0 
                    ? "No parent (Create as Level 1 page)" 
                    : `Create as Level ${index + 1} page`}
                </option>
                {getPagesForLevel(index).map((page) => (
                  <option key={page.id} value={page.id}>
                    Create under: {page.title}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        {/* Current Level Indicator */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Creating page at Level: {getCurrentLevel() + 1}
          {getCurrentLevel() >= 4 && " (Will not appear in navbar)"}
        </div>
      </div>

      {/* Template Selection */}
      <div>
        <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Template
        </label>
        <select
          id="template"
          value={selectedTemplate}
          onChange={(e) => {
            setSelectedTemplate(e.target.value);
            setContent({});
            setMetadata({});
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option value="">Select a template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Page Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {/* Template-specific Content Fields */}
      {selectedTemplate && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Content</h3>
          {getTemplateRequirements()?.content?.required?.map((field: string) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <textarea
                value={content[field] || ''}
                onChange={(e) => handleContentChange(field, e.target.value)}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>
      )}

      {/* Template-specific Metadata Fields */}
      {selectedTemplate && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Metadata</h3>
          {getTemplateRequirements()?.metadata?.required?.map((field: string) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {Array.isArray(getTemplateRequirements()?.metadata?.properties?.[field]?.items) ? (
                <input
                  type="text"
                  value={Array.isArray(metadata[field]) ? metadata[field].join(', ') : ''}
                  onChange={(e) => handleMetadataChange(field, e.target.value.split(',').map(s => s.trim()))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter comma-separated values"
                  required
                />
              ) : (
                <input
                  type="text"
                  value={metadata[field] || ''}
                  onChange={(e) => handleMetadataChange(field, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {editPage ? 'Update Page' : 'Create Page'}
        </button>
      </div>
    </form>
  );
}

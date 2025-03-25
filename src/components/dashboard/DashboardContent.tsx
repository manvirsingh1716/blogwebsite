"use client";

import React from 'react';
import { PageForm } from './PageForm';
import { PageList } from './PageList';

export function DashboardContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Create New Page Section */}
        <section className="bg-white border border-blue-100 rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <h2 className="text-2xl font-bold text-white">Create New Page</h2>
            <p className="mt-1 text-blue-100">Create and publish new content using our templates</p>
          </div>
          <div className="p-6">
            <PageForm />
          </div>
        </section>

        {/* Existing Pages Section */}
        <section className="bg-white border border-blue-100 rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <h2 className="text-2xl font-bold text-white">Existing Pages</h2>
            <p className="mt-1 text-blue-100">Manage and edit your published content</p>
          </div>
          <div className="p-6">
            <PageList />
          </div>
        </section>
      </div>
    </div>
  );
}

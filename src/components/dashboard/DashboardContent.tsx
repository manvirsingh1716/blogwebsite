"use client";

import React from 'react';
import { PageForm } from './PageForm';
import { PageList } from './PageList';

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Create New Page Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Create New Page</h2>
        <PageForm />
      </section>

      {/* Existing Pages Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Existing Pages</h2>
        <PageList />
      </section>
    </div>
  );
}

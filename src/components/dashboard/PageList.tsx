"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Cookie from 'js-cookie';
import { env } from '@/config/env';

interface Page {
  id: number;
  slug: string;
  title: string;
  templateId: string;
  updatedAt: string;
}

export function PageList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookie.get('token');
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${env.API}/page`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch pages');
            const { data } = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageId: number) => {
    if (!confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      return;
    }

    try {
      await fetch(`${env.API}/page/${pageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-300"></div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No pages found. Create your first page to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-blue-100">
        <thead>
          <tr className="bg-blue-50/50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-500 uppercase tracking-wider">
              Path
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-500 uppercase tracking-wider">
              Template
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-100">
          {pages.map((page) => (
            <tr key={page.id} className="hover:bg-blue-50/50 transition-colors duration-150">
              <td className="px-6 py-4 text-sm font-medium text-gray-600">
                {page.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {page.slug}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {page.templateId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(page.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm font-medium space-x-3">
                <Link
                  href={`/preview/${page.slug}`}
                  className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-150"
                  title="Preview"
                >
                  <EyeIcon className="h-5 w-5" />
                </Link>
                <Link
                  href={`/dashboard/edit/${page.id}`}
                  className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-150"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="inline-flex items-center text-gray-400 hover:text-red-400 transition-colors duration-150"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

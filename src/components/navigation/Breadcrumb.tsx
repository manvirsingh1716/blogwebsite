"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-500 mb-6">
      <Link 
        href="/"
        className="flex items-center hover:text-blue-500 p-1 rounded-md"
      >
        <HomeIcon className="w-4 h-4" />
      </Link>

      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const label = segment.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        return (
          <React.Fragment key={path}>
            <ChevronRightIcon className="w-4 h-4" />
            {isLast ? (
              <span className="font-medium text-gray-900 dark:text-gray-500 p-1">
                {label}
              </span>
            ) : (
              <Link
                href={path}
                className="p-1 rounded-md hover:text-blue-500"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

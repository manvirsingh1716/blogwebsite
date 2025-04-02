"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link 
        href="/"
        className="flex items-center hover:text-blue-500"
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
              <span className="font-medium text-gray-900 dark:text-gray-400">
                {label}
              </span>
            ) : (
              <Link
                href={path}
                className="hover:text-blue-500"
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

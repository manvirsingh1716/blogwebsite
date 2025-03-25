import React from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Hero({ title, subtitle, description, className, children }: HeroProps) {
  return (
    <section className={cn('relative py-16 md:py-24 bg-gradient-to-b from-white to-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {subtitle && (
            <p className="text-2xl md:text-3xl font-light tracking-wider text-gray-600">
              {subtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

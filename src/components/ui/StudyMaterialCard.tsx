import React from 'react';
import Link from 'next/link';
import { FaDownload, FaFileAlt } from 'react-icons/fa';

interface StudyMaterialCardProps {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  category?: string;
}

export function StudyMaterialCard({
  title,
  description,
  fileUrl,
  fileType,
  fileSize,
  category
}: StudyMaterialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        {category && (
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            {category}
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FaFileAlt className="mr-2" />
              {fileType}
            </span>
            <span>{fileSize}</span>
          </div>
          <Link
            href={fileUrl}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FaDownload className="mr-2" />
            Download
          </Link>
        </div>
      </div>
    </div>
  );
}

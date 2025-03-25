import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaUser, FaClock, FaComments } from 'react-icons/fa';
import Link from 'next/link';

interface Reply {
  content: string;
  author: string;
  date: string;
}

interface ForumPostProps {
  title: string;
  content: string;
  author: string;
  date: string;
  replies: Reply[];
  slug: string;
}

export function ForumPost({
  title,
  content,
  author,
  date,
  replies,
  slug
}: ForumPostProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <Link href={`/exam-forum/${slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FaUser className="mr-2" />
              {author}
            </span>
            <span className="flex items-center">
              <FaClock className="mr-2" />
              {formatDistanceToNow(new Date(date), { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center">
            <FaComments className="mr-2" />
            {replies.length} replies
          </div>
        </div>
      </div>
    </div>
  );
}

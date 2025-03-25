import React from 'react';

interface TableOfContentsProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
    level: number;
  }>;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ title, items }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li 
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
            >
              <a 
                href={`#${item.id}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

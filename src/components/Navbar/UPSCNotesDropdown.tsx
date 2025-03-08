import React from 'react';
import Link from 'next/link';

interface DropdownContentProps {
  items: {
    [key: string]: {
      [key: string]: string[];
    };
  };
  hoveredItem: string | null;
  setHoveredItem: React.Dispatch<React.SetStateAction<string | null>>;
  title: string;
  description?: (item: string) => string;
}

const DropdownContent: React.FC<DropdownContentProps> = ({ items, hoveredItem, setHoveredItem, title, description }) => (
  <div className="flex">
    {/* Left Column */}
    <div className="w-1/2 border-r border-gray-200">
      <div className="p-4">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-3">{title}</h3>
        <div className="space-y-1">
          {Object.keys(items).map((item) => (
            item && (
              <div 
                key={item} 
                className="relative"
                onMouseEnter={() => setHoveredItem(item)}
              >
                <Link 
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  legacyBehavior
                >
                  <a className={`flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer rounded ${hoveredItem === item ? 'bg-gray-50' : ''}`}>
                    <span className={`text-[13px] font-medium ${hoveredItem === item ? 'text-blue-700' : ''}`}>{item}</span>
                  </a>
                </Link>
              </div>
            )
          ))}
        </div>
      </div>
    </div>

    {/* Right Column - Content */}
    <div className="w-1/2 p-4">
      {hoveredItem ? (
        <div className="space-y-4">
          {Object.entries(items[hoveredItem]).map(([subject, topics]) => (
            <div key={subject} className="space-y-2">
              <h3 className="text-[14px] font-semibold text-gray-900">{subject}</h3>
              <ul className="space-y-1">
                {topics.map((topic) => (
                  topic && (
                    <li key={topic}>
                      <Link 
                        href={`/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                        legacyBehavior
                      >
                        <a className="text-[13px] text-gray-600 hover:text-blue-700 flex items-center">
                          <span className="mr-1.5 text-gray-400">›</span>
                          {topic}
                        </a>
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2">What is {title}?</h3>
          <div className="space-y-3">
            {Object.entries(items).map(([item]) => (
              item && (
                <div key={item} className="group/desc">
                  <h4 className="text-[14px] font-medium text-gray-800 mb-1">{item}</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    {description ? description(item) : ''}
                  </p>
                </div>
              )
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);

interface DropdownProps {
  items: {
    [key: string]: {
      [key: string]: string[];
    };
  };
  title: string;
  description?: (item: string) => string;
}

const Dropdown: React.FC<DropdownProps> = ({ items, title, description }) => {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  return (
    <div className="absolute left-0 top-full min-w-[800px] bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-in-out z-50">
      <DropdownContent items={items} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} title={title} description={description} />
    </div>
  );
};

export default Dropdown;
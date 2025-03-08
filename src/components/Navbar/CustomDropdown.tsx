import React from 'react';
import Link from 'next/link';

interface CustomDropdownProps {
  title: string;
  items: { name: string; link: string | { [key: string]: string[] } }[];
  defaultDescription?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ title, items, defaultDescription }) => {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  return (
    <div className="absolute left-0 top-full min-w-[800px] bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-in-out z-50">
      <div className="flex">
        {/* Left Column */}
        <div className="w-1/2 border-r border-gray-200">
          <div className="p-4">
            <h3 className="text-[15px] font-semibold text-gray-900 mb-3">{title}</h3>
            <div className="space-y-1">
              {items.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                >
                  <Link 
                    href={typeof item.link === 'string' ? item.link : '#'}
                    legacyBehavior
                  >
                    <a className={`flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer rounded ${hoveredItem === item.name ? 'bg-gray-50' : ''}`}>
                      <span className={`text-[13px] font-medium ${hoveredItem === item.name ? 'text-blue-700' : ''}`}>{item.name}</span>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="w-1/2 p-4">
          {hoveredItem && typeof items.find(item => item.name === hoveredItem)?.link !== 'string' ? (
            <div className="space-y-4">
              {Object.entries(items.find(item => item.name === hoveredItem)?.link as { [key: string]: string[] }).map(([subject, topics]) => (
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
                {items.map((item) => (
                  <div key={item.name} className="group/desc">
                    <h4 className="text-[14px] font-medium text-gray-800 mb-1">{item.name}</h4>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      {defaultDescription}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;

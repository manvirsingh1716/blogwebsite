import Link from 'next/link';

interface NestedDropdownProps {
  items: { [key: string]: string | { [key: string]: string | string[] } | string[] };
  depth?: number;
}

const NestedDropdown: React.FC<NestedDropdownProps> = ({ items, depth = 0 }) => {
  if (!items || Object.keys(items).length === 0) return null;

  return (
    <div className={`
      ${depth === 0 ? 'absolute left-0 top-full' : 'absolute left-full top-0'} 
      min-w-[280px] bg-white border border-gray-200 rounded-md shadow-lg
      opacity-0 invisible group-hover:opacity-100 group-hover:visible 
      transition-all duration-150 ease-in-out z-50
      ${depth === 0 ? 'mt-1' : ''}
    `}>
      <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
        {Object.entries(items).map(([key, value]) => (
          <div key={key} className="group/nested relative">
            <div className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
              <span className="text-[15px] font-medium">{key}</span>
              {(typeof value === 'object' && Object.keys(value).length > 0) && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
            {typeof value === 'object' && !Array.isArray(value) && (
              <NestedDropdown items={value} depth={depth + 1} />
            )}
            {Array.isArray(value) && value.length > 0 && (
              <div className="absolute left-full top-0 min-w-[280px] bg-white border border-gray-200 rounded-md shadow-lg
                           opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible 
                           transition-all duration-150 ease-in-out">
                <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
                  {value.map((item: string) => (
                    item && (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        legacyBehavior
                      >
                        <a className="block px-4 py-2.5 text-[15px] text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                          {item}
                        </a>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedDropdown;
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-[140px] h-[26px] px-2 text-[12px] border border-r-0 border-gray-200 focus:outline-none focus:border-gray-300 rounded-l-sm placeholder-gray-500"
        />
        <button
          type="submit"
          className="h-[26px] px-2 bg-gray-50 text-[12px] font-medium text-gray-600 border border-l-0 border-gray-200 hover:bg-gray-100 rounded-r-sm flex items-center"
        >
          <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
"use client";

import { useState } from 'react';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative flex items-center transition-all duration-300 ${
      isFocused ? 'w-[320px]' : 'w-[280px]'
    }`}>
      <div className={`relative w-full group ${
        isFocused 
          ? 'ring-2 ring-blue-400 shadow-lg bg-white' 
          : 'hover:ring-1 hover:ring-orange-200 bg-orange-50/50 hover:bg-white'
      } rounded-full transition-all duration-300`}>
        <input
          type="text"
          placeholder="Search notes, subjects..."
          className="w-full py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 
                    bg-transparent border-none rounded-full outline-none transition-all"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
          <svg 
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-blue-500' : 'text-orange-400'
            }`}
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
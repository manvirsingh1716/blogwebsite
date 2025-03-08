import React, { useState } from 'react';

interface CurrentAffairsCardProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const CurrentAffairsCard: React.FC<CurrentAffairsCardProps> = ({ icon, title, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 ${
        isHovered ? 'scale-105 shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4">
        <div className="text-orange-500 text-3xl">{icon}</div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            Check out
          </a>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairsCard;
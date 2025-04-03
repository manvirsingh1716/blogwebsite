import React from 'react';
import CurrentAffairsCard from './CurrentAffairsCard';
import { StaticImageData } from 'next/image';

// Define the type for each item in current affairs data
interface CurrentAffairsItem {
  title: string;
  icon: string | { image: StaticImageData };
  link: string;
}

const currentAffairsData: CurrentAffairsItem[] = [
  { title: 'Daily Current Affairs', icon: '📰', link: '/current-affairs/news-daily' },
  { title: 'The Hindu Editorial', icon: '📑', link: '/current-affairs/hindu-editorial' },
  { title: 'Indian Express Editorial', icon: '📋', link: '/current-affairs/express-editorial' },
  { title: 'PIB', icon: '🏛️', link: '/current-affairs/pib' },
  { title: 'Daily Quiz', icon: '❓', link: '/current-affairs/quiz' },
  { title: 'Daily Answer Writing', icon: '✍️', link: '/current-affairs/answer-writing' },
];

const CurrentAffairs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">UPSC Current Affairs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here you can also attempt questions carefully developed by our team on those topics, 
            which have high likelihood of being asked in the future exams, alongside the notes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentAffairsData.map((item) => (
            <CurrentAffairsCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentAffairs;

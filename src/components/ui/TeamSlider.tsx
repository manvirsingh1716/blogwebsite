import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  image: string;
  info: string;
}

interface TeamSliderProps {
  title: string;
  members: TeamMember[];
}

export function TeamSlider({ title, members }: TeamSliderProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="aspect-w-3 aspect-h-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white transform translate-y-1/2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.info}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FaUserGraduate, FaBriefcase, FaUsers } from "react-icons/fa";

const recruitmentGroups = [
  {
    title: "Group A",
    icon: <FaUserGraduate className="w-8 h-8" />,
    description: "Top-level administrative and civil services positions",
    path: "/exam-forum/recruitment-exams/group-a",
    exams: [
      "Civil Services (IAS, IPS, IFS)",
      "UPSC Engineering Services",
      "UPPCS",
      "MPPSC",
      "MPSC",
      "Other State PSCs"
    ]
  },
  {
    title: "Group B",
    icon: <FaBriefcase className="w-8 h-8" />,
    description: "Gazetted officer positions in various departments",
    path: "/exam-forum/recruitment-exams/group-b",
    exams: [
      "NDA/CDS",
      "SSC (CGL)",
      "State SSC",
      "RBI Grade B",
      "Insurance Officers",
      "NABARD Grade B",
      "UGC NET",
      "Judicial Services"
    ]
  },
  {
    title: "Group C & D",
    icon: <FaUsers className="w-8 h-8" />,
    description: "Non-gazetted positions across departments",
    path: "/exam-forum/recruitment-exams/group-c-and-d",
    exams: [
      "Railways (RRB)",
      "SSC (CHSL)",
      "Bank PO/Clerk",
      "Agniveer",
      "Police Constable",
      "RRB Group D"
    ]
  }
];

const RecruitmentExams: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white ">
      <Head>
        <title>Government Recruitment Exams - 99Notes</title>
        <meta 
          name="description" 
          content="Comprehensive information about various government recruitment examinations in India. Prepare for Group A, B, C & D positions." 
        />
      </Head>

      {/* Hero Section */}
      <div className="py-16 text-center">
        <h1 className="relative inline-block">
          <span className="text-3xl md:text-3xl font-extrabold text-gray-900 tracking-tight block underline decoration-4 underline-offset-4 decoration-[#fc6203] ">
            Crack Recruitment Exams With Confidence
            
          </span>
          
          <span className="text-1xl md:text-2xl text-gray-600 font-medium mt-2 block">
            Your Ultimate Preparation Guide
          </span>
          <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-300 opacity-40 -z-10 transform -skew-x-12"></span>
        </h1>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recruitmentGroups.map((group) => (
            <Link 
              key={group.title} 
              href={group.path}
              className="group"
            >
              <div className="bg-gray-50 rounded-lg shadow-md p-8 hover:shadow-xl transition-all duration-300 h-[450px] flex flex-col justify-between transform hover:-translate-y-1 border border-gray-100">
                <div>
                  <div className="flex flex-col items-center mb-8">
                    <span className="mb-6 text-yellow-500 group-hover:text-yellow-600 transition-colors">
                      {group.icon}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors text-center">
                      {group.title}
                    </h2>
                  </div>
                  <p className="text-gray-600  text-center leading-relaxed">
                    {group.description}
                  </p>
                </div>
                <div className="text-yellow-500 group-hover:text-yellow-600 font-medium flex items-center text-lg transition-colors">
                  Explore {group.title}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecruitmentExams;
// import React from 'react';
// import { Hero } from '../ui/Hero';
// import ContactForm from '../ui/ContactForm';
// import { StudyMaterialCard } from '../ui/StudyMaterialCard';

// interface HomeTemplateProps {
//   content: {
//     hero: {
//       title: string;
//       subtitle: string;
//       description: string;
//     };
//     studyMaterials: Array<{
//       title: string;
//       description: string;
//       fileUrl: string;
//       fileType: string;
//       fileSize: string;
//       category: string;
//     }>;
//     currentAffairs: Array<any>;
//     coachingInfo: any;
//     faq: Array<{
//       question: string;
//       answer: string;
//     }>;
//   };
// }

// export function HomeTemplate({ content }: HomeTemplateProps) {
//   const { hero, studyMaterials, currentAffairs, coachingInfo, faq } = content;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section with Contact Form */}
//       <section className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8">
//             <Hero
//               title={hero.title}
//               subtitle={hero.subtitle}
//               description={hero.description}
//             />
//           </div>
//           <div className="mt-20">
//             <ContactForm />
//           </div>
//         </div>
//       </section>

//       {/* Study Materials Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Free Study Materials</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {studyMaterials.map((material, index) => (
//               <StudyMaterialCard key={index} {...material} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Current Affairs Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Current Affairs</h2>
//           {/* Add Current Affairs component here */}
//         </div>
//       </section>

//       {/* Coaching Info Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Coaching Information</h2>
//           {/* Add Coaching Info component here */}
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
//           <div className="max-w-3xl mx-auto space-y-6">
//             {faq.map((item, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
//                 <p className="text-gray-600">{item.answer}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

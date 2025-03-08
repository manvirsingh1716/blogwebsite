import ContactForm from "@/components/common/ContactForm/ContactForm";
import StudyMaterials from "@/components/StudyMaterials/Studymaterials";
import CurrentAffairs from "@/components/CurrentAffairs/CurrentAffairs";
import CoachingInfo from "@/components/CoachingInfo/CoachingInfo";
import FAQ from "@/components/common/FAQ/FAQ";
import ContactMap from "@/components/common/Contact/ContactMap";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Contact Form */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              The
              <br />
              Pioneers of Self-Study
              <br />
              Ecosystem
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to 99Notes, we are an organization dedicated to students who
              wish that educational material must not be restricted behind a pay-wall.
              We aim to build a sustainable self-study ecosystem by providing
              high-quality study material for Government examinations at almost
              free of cost.
            </p>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <StudyMaterials />
      <CurrentAffairs />
      <CoachingInfo />
      <FAQ />
      <ContactMap />
    </div>
  );
}

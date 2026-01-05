import {
  HeroSection,
  MissionSection,
  ValuesSection,
  PartnersSection,
  TimelineSection,
  QualityCommitmentSection,
  CTASection,
} from "./components";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <PartnersSection />
      <TimelineSection />
      <QualityCommitmentSection />
      <CTASection />
    </div>
  );
}


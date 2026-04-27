import { HeroSection } from "@/components/features/landing/hero-section";
import { FeaturesBar } from "@/components/features/landing/features-bar";
import { TrustBar } from "@/components/features/landing/trust-bar";
import { HowItWorksSection } from "@/components/features/landing/how-it-works-section";
import { ParentsSection } from "@/components/features/landing/parents-section";
import { TestimonialsSection } from "@/components/features/landing/testimonials-section";
import { CtaSection } from "@/components/features/landing/cta-section";
import { WaveDivider } from "@/components/features/landing/wave-divider";

export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        <HeroSection />
        <FeaturesBar />
        <TrustBar />

        <HowItWorksSection />

        <div className="bg-background text-accent">
          <WaveDivider />
        </div>

        <ParentsSection />

        <div className="text-navy bg-accent">
          <WaveDivider />
        </div>

        <TestimonialsSection />
        <CtaSection />
      </main>
    </>
  );
}

import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div className="bg-accent">
      <main>
        <Hero />
        <HowItWorks />
        <Stats />
        <Testimonials />
      </main>
    </div>
  );
}


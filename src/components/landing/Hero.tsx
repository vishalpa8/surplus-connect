import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-accent py-16 sm:py-20 md:py-24 lg:py-32 xl:py-36 flex items-center min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh]">
      <Container size="xl" className="w-full">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
            Turn Surplus into Sustenance.
            <br className="hidden sm:block" />
            <span className="block sm:inline text-primary-600 mt-2 sm:mt-0">Rescue Food, Fight Waste.</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
            Surplus Connect is a community-driven platform connecting businesses with surplus food to individuals and NGOs. Together, we can reduce food waste and build a more sustainable future.
          </p>
          <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0">
            <Link href="/listings" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                Find Food Now
                <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
              </Button>
            </Link>
            <Link href="/vendors" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px]">
                For Vendors
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
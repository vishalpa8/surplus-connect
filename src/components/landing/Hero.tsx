import { Button } from "@/components/ui/Button";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-accent py-20 sm:py-28 lg:py-36 flex items-center">
      <div className="container-custom">
        <div className="grid grid-cols-1">
          {/* Text Content */}
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turn Surplus into Sustenance.
              <br />
              <span className="text-primary-600">Rescue Food, Fight Waste.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Surplus Connect is a community-driven platform connecting businesses with surplus food to individuals and NGOs. Together, we can reduce food waste and build a more sustainable future.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/listings">
                <Button size="lg">
                  Find Food Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/vendors">
                <Button size="lg" variant="outline">
                  For Vendors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

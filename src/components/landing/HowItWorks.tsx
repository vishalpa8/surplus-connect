import { Building, Users, ShoppingCart, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';

const steps = [
  {
    name: 'Vendors List Surplus',
    description: 'Restaurants, grocers, and caterers post their delicious, unsold food at a discount.',
    icon: Building,
  },
  {
    name: 'Discover & Reserve',
    description: 'You browse the app, find great deals near you, and reserve your items with a single tap.',
    icon: Users,
  },
  {
    name: 'Collect & Enjoy',
    description: 'Head to the store at the specified time, show your digital receipt, and pick up your food.',
    icon: ShoppingCart,
  },
  {
    name: 'Reduce Waste Together',
    description: 'Every meal saved is a win for your wallet and the planet. You\'re now part of the solution!',
    icon: HeartHandshake,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container size="xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">How It Works</h2>
          <p className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            A Simple Path to Saving Food
          </p>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-600">
            Getting started with SurplusConnect is easy. Follow these simple steps to join our community and start making a difference today.
          </p>
        </div>
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20">
          <Grid cols={4} gap="lg" className="items-start">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary-600 text-white flex-shrink-0">
                  <step.icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-semibold leading-7 text-gray-900">{step.name}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}
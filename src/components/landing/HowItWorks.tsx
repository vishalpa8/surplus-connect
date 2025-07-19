import { Building, Users, ShoppingCart, HeartHandshake } from 'lucide-react';

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
    <section className="bg-white py-20 sm:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">How It Works</h2>
          <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            A Simple Path to Saving Food
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Getting started with SurplusConnect is easy. Follow these simple steps to join our community and start making a difference today.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-none sm:mt-20">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white flex-shrink-0">
                  <step.icon className="h-8 w-8 align-middle" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold leading-7 text-gray-900">{step.name}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
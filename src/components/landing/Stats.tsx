"use client";

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { HandHeart, Building, Users } from 'lucide-react';

const stats = [
  { id: 1, name: 'Meals Saved', value: 12000, icon: HandHeart },
  { id: 2, name: 'Active Vendors', value: 350, icon: Building },
  { id: 3, name: 'NGO Partners', value: 75, icon: Users },
];

export function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.3,    // Trigger when 30% of the element is in view
  });

  return (
    <section ref={ref} className="bg-accent py-20 sm:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Our Impact</h2>
          <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Join a Growing Movement
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are proud of the community we're building and the positive impact we're making together. The numbers speak for themselves.
          </p>
        </div>
        <div className="mt-16 sm:mt-20">
          <dl className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center gap-y-4">
                <dt className="text-base leading-7 text-gray-600 flex items-center gap-2">
                  <stat.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  {stat.name}
                </dt>
                <dd className="order-first font-display text-5xl font-bold tracking-tight text-primary-600">
                  {inView ? <CountUp end={stat.value} duration={3} separator="," /> : '0'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

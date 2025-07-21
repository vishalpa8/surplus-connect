"use client";

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { HandHeart, Building, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';

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
    <section ref={ref} className="bg-accent py-16 sm:py-20 lg:py-28">
      <Container size="xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Our Impact</h2>
          <p className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Join a Growing Movement
          </p>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-600">
            We are proud of the community we&apos;re building and the positive impact we&apos;re making together. The numbers speak for themselves.
          </p>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <Grid cols={3} gap="lg" as="dl" className="text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center gap-y-3 sm:gap-y-4">
                <dd className="order-first font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-600">
                  {inView ? <CountUp end={stat.value} duration={3} separator="," /> : '0'}
                </dd>
                <dt className="text-sm sm:text-base leading-7 text-gray-600 flex items-center gap-2">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 flex-shrink-0" aria-hidden="true" />
                  <span>{stat.name}</span>
                </dt>
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}
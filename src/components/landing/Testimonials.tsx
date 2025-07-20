'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    body: 'SurplusConnect has been a game-changer for our bakery. We\'ve significantly reduced our waste and connected with so many new customers. The platform is incredibly easy to use and the impact on our bottom line has been remarkable.',
    author: {
      name: 'Sarah Johnson',
      role: 'Owner, The Rolling Pin Bakery',
      imageUrl: '/images/testimonials/sarah-j.jpg',
    },
    rating: 5,
    highlight: 'Reduced waste by 70%',
  },
  {
    body: 'As an NGO, finding consistent food sources is a constant challenge. SurplusConnect has streamlined the process, allowing us to secure more meals for the families we support. It\'s been a lifeline for our community programs.',
    author: {
      name: 'David Chen',
      role: 'Director, Community Kitchen Hub',
      imageUrl: '/images/testimonials/david-c.jpg',
    },
    rating: 5,
    highlight: '500+ families fed monthly',
  },
  {
    body: 'I love finding amazing food at a great price while also doing something good for the planet. It\'s a win-win! I\'ve discovered so many local gems through this app and saved hundreds on groceries.',
    author: {
      name: 'Maria Garcia',
      role: 'Happy Customer',
      imageUrl: '/images/testimonials/maria-g.jpg',
    },
    rating: 5,
    highlight: 'Saved $300+ monthly',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 sm:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.primary.400)_1px,_transparent_0)] [background-size:24px_24px]"></div>
      </div>
      
      <div className="container-custom relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700 mb-6">
            <StarIcon className="h-4 w-4" />
            Testimonials
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Loved by Our{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            Join thousands of vendors, customers, and NGOs who are making a difference together
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          {/* Desktop: Show 3 cards */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (currentIndex + 1) % testimonials.length;
              
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'scale-105 z-10' 
                      : isPrev || isNext 
                        ? 'scale-95 opacity-70' 
                        : 'scale-90 opacity-40'
                  }`}
                >
                  <TestimonialCard testimonial={testimonial} isActive={isActive} />
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet: Show 1 card */}
          <div className="lg:hidden">
            <div className="relative flex items-center justify-center">
              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:scale-110 md:block"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
              </button>

              <div className="w-full max-w-lg">
                <TestimonialCard testimonial={testimonials[currentIndex]} isActive={true} />
              </div>

              <button
                onClick={handleNext}
                className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:scale-110 md:block"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="mt-6 flex justify-center space-x-12 md:hidden">
              <button
                onClick={handlePrev}
                className="rounded-full bg-white p-3 shadow-md transition-all hover:bg-gray-50 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="rounded-full bg-white p-3 shadow-md transition-all hover:bg-gray-50 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="mt-12 flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-primary-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 sm:text-4xl">10,000+</div>
            <div className="mt-2 text-sm font-medium text-gray-600">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-500 sm:text-4xl">50,000+</div>
            <div className="mt-2 text-sm font-medium text-gray-600">Meals Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 sm:text-4xl">4.9★</div>
            <div className="mt-2 text-sm font-medium text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0], isActive: boolean }) {
  return (
    <div className={`group relative h-full transition-all duration-500 ${isActive ? 'animate-slide-up' : ''}`}>
      {/* Card */}
      <div className="relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-soft-lg transition-all duration-300 group-hover:shadow-soft-xl">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-200 via-transparent to-secondary-200 p-[1px]">
          <div className="h-full w-full rounded-2xl bg-white"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="flex-1">
            <p className="text-lg leading-relaxed text-gray-700">
              &quot;{testimonial.body}&quot;
            </p>
          </blockquote>

          {/* Highlight */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 text-sm font-semibold text-primary-700">
            <div className="h-2 w-2 rounded-full bg-primary-500"></div>
            {testimonial.highlight}
          </div>

          {/* Author */}
          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary-100">
              <Image
                className="object-cover"
                src={testimonial.author.imageUrl}
                alt={`Photo of ${testimonial.author.name}`}
                fill
                sizes="48px"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
              <div className="text-sm text-gray-600">{testimonial.author.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center">About Surplus Connect</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Surplus Connect is a non-profit initiative dedicated to fighting food waste and hunger by connecting food vendors with consumers and NGOs. Our mission is to save surplus food, feed people in need, and build a more sustainable community.
      </p>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Our Story</h2>
        <p>
          Founded by a passionate team of technologists and community leaders, Surplus Connect was born out of the desire to make a real impact on food insecurity and environmental sustainability. We believe technology can bridge the gap between abundance and need, making it easy for businesses to share surplus food and for people to access it.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Our Impact</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Thousands of meals saved from waste</li>
          <li>Hundreds of families and NGOs supported</li>
          <li>Growing network of food vendors and volunteers</li>
        </ul>
      </div>
      <div className="text-center mt-12">
        <span className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow-lg">
          Join us in the fight against food waste!
        </span>
      </div>
    </div>
  );
} 
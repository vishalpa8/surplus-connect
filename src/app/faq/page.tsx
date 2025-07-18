import React from 'react';

const faqs = [
  {
    q: 'What is Surplus Connect?',
    a: 'A platform that connects food vendors with consumers and NGOs to reduce food waste and feed people in need.'
  },
  {
    q: 'Who can use Surplus Connect?',
    a: 'Restaurants, grocers, caterers, individuals, and NGOs can all use the platform to share or claim surplus food.'
  },
  {
    q: 'Is it free to use?',
    a: 'Yes! Surplus Connect is free for individuals and NGOs. Vendors may have premium options.'
  },
  {
    q: 'How do I become a vendor?',
    a: 'Sign up and select the vendor role. You can then post surplus food listings.'
  },
  {
    q: 'How is my data protected?',
    a: 'We use secure authentication and do not sell your data. See our Privacy Policy for details.'
  },
  {
    q: 'How do I contact support?',
    a: 'Email us at hello@surplusconnect.org or use the Contact page.'
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-2xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-8">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{faq.q}</h2>
            <p className="text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 
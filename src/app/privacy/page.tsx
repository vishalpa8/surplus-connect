import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4">We value your privacy. This policy explains how Surplus Connect collects, uses, and protects your information.</p>
      <h2 className="text-2xl font-bold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Email address and profile info for authentication</li>
        <li>Location data for map and pickup coordination</li>
        <li>Listing and reservation activity</li>
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To connect vendors and users for food sharing</li>
        <li>To improve our platform and services</li>
        <li>To send notifications (with your consent)</li>
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-2">Your Rights</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You can update or delete your profile at any time</li>
        <li>We do not sell your data to third parties</li>
        <li>Contact us for any privacy concerns</li>
      </ul>
      <p className="mt-8 text-muted-foreground">For questions, email <a href="mailto:privacy@surplusconnect.org" className="text-primary underline">privacy@surplusconnect.org</a>.</p>
    </div>
  );
} 
import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Have questions, feedback, or want to partner with us? Fill out the form below or email us at <a href="mailto:hello@surplusconnect.org" className="text-primary underline">hello@surplusconnect.org</a>.
      </p>
      <form className="space-y-6 bg-card p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input id="name" type="text" className="w-full border border-border rounded px-3 py-2 bg-background" placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input id="email" type="email" className="w-full border border-border rounded px-3 py-2 bg-background" placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium mb-1">Message</label>
          <textarea id="message" className="w-full border border-border rounded px-3 py-2 bg-background" rows={4} placeholder="How can we help?" />
        </div>
        <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold shadow hover:bg-primary/90 transition-colors" disabled>
          Send Message (Coming Soon)
        </button>
      </form>
    </div>
  );
} 
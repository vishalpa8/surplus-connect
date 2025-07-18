"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Have questions, feedback, or want to partner with us? Fill out the form below or email us at <a href="mailto:hello@surplusconnect.org" className="text-primary underline">hello@surplusconnect.org</a>.
      </p>
      {status === "success" && (
        <p className="text-center text-primary mb-4">Thanks for reaching out! We&apos;ll get back to you soon.</p>
      )}
      {status === "error" && error && (
        <p className="text-center text-destructive mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input
            id="name"
            type="text"
            className="w-full border border-border rounded px-3 py-2 bg-background"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border border-border rounded px-3 py-2 bg-background"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium mb-1">Message</label>
          <textarea
            id="message"
            className="w-full border border-border rounded px-3 py-2 bg-background"
            rows={4}
            placeholder="How can we help?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold shadow hover:bg-primary/90 transition-colors"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

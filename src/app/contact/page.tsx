import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <StaticPageLayout title="Contact Us">
      <p>
        Have a question, feedback, or just want to say hello? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
      </p>
      <form className="mt-8 space-y-4">
        <Input id="name" label="Your Name" placeholder="John Doe" />
        <Input id="email" label="Your Email" placeholder="you@example.com" type="email" />
        <div>
            <label htmlFor="message" className="form-label">Message</label>
            <textarea id="message" rows={5} className="form-input" placeholder="Your message..."></textarea>
        </div>
        <Button>Send Message</Button>
      </form>
    </StaticPageLayout>
  );
}

import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import Link from "next/link";

export default function CareersPage() {
  return (
    <StaticPageLayout title="Careers at SurplusConnect">
      <div className="prose lg:prose-xl max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          Join our mission to reduce food waste and build stronger communities. We&apos;re always looking for passionate individuals who want to make a positive impact.
        </p>

        <h2>Why Work With Us?</h2>
        <p>
          At SurplusConnect, we believe that meaningful work comes from solving real-world problems. Our team is dedicated to creating technology that makes a difference in people&apos;s lives and helps build a more sustainable future.
        </p>

        <h3>Our Values</h3>
        <ul>
          <li><strong>Impact First:</strong> Everything we do is focused on creating positive change</li>
          <li><strong>Community:</strong> We build strong relationships with our users and each other</li>
          <li><strong>Innovation:</strong> We&apos;re always looking for better ways to solve problems</li>
          <li><strong>Sustainability:</strong> We&apos;re committed to environmental responsibility</li>
          <li><strong>Transparency:</strong> We believe in open communication and honest feedback</li>
        </ul>

        <h2>Current Openings</h2>
        <p>
          We&apos;re currently building our team and will be posting job opportunities soon. Check back regularly or follow us on social media for updates.
        </p>

        <h3>Areas We&apos;re Hiring</h3>
        <ul>
          <li>Software Engineering (Full-stack, Frontend, Backend)</li>
          <li>Product Management</li>
          <li>UX/UI Design</li>
          <li>Business Development</li>
          <li>Customer Success</li>
          <li>Marketing and Communications</li>
          <li>Operations and Logistics</li>
        </ul>

        <h2>Benefits & Perks</h2>
        <ul>
          <li>Competitive salary and equity packages</li>
          <li>Comprehensive health, dental, and vision insurance</li>
          <li>Flexible work arrangements and remote-friendly culture</li>
          <li>Professional development budget</li>
          <li>Unlimited PTO policy</li>
          <li>Team retreats and company events</li>
          <li>Free surplus food from our partner vendors</li>
        </ul>

        <h2>Interested in Joining Us?</h2>
        <p>
          Even if you don&apos;t see a specific role that matches your skills, we&apos;d love to hear from you. Send us your resume and a note about why you&apos;re passionate about our mission.
        </p>

        <div className="bg-primary-50 rounded-xl p-6 my-8">
          <h3 className="text-primary-800 mb-4">Get in Touch</h3>
          <p className="text-primary-700 mb-4">
            Ready to make a difference? We&apos;d love to hear from you.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Our Team
          </Link>
        </div>

        <h2>Internship Program</h2>
        <p>
          We offer internship opportunities for students and recent graduates who are passionate about sustainability and technology. Our interns work on real projects that directly impact our platform and users.
        </p>

        <h2>Equal Opportunity</h2>
        <p>
          SurplusConnect is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We do not discriminate based on race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
        </p>
      </div>
    </StaticPageLayout>
  );
}
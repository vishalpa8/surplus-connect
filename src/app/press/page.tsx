import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import Link from "next/link";

export default function PressPage() {
  return (
    <StaticPageLayout title="Press & Media">
      <div className="prose lg:prose-xl max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          Media resources, press releases, and company information for journalists and media professionals.
        </p>

        <h2>About SurplusConnect</h2>
        <p>
          SurplusConnect is a technology platform that connects food vendors with surplus food to consumers and non-profit organizations, reducing food waste while fighting hunger in local communities. Founded in 2022, we&apos;ve helped rescue over 50,000 meals and prevent thousands of pounds of food from going to waste.
        </p>

        <h2>Recent Press Releases</h2>
        
        <div className="bg-gray-50 rounded-xl p-6 my-6">
          <h3 className="text-gray-900 mb-2">SurplusConnect Reaches 50,000 Meals Rescued Milestone</h3>
          <p className="text-gray-600 text-sm mb-3">December 15, 2024</p>
          <p className="text-gray-700">
            Platform celebrates major milestone in food waste reduction, having facilitated the rescue of 50,000 meals across 25 cities nationwide...
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 my-6">
          <h3 className="text-gray-900 mb-2">SurplusConnect Expands to 25 Cities Nationwide</h3>
          <p className="text-gray-600 text-sm mb-3">October 8, 2024</p>
          <p className="text-gray-700">
            Food waste reduction platform announces major expansion, bringing surplus food rescue capabilities to communities across the United States...
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 my-6">
          <h3 className="text-gray-900 mb-2">SurplusConnect Wins 2024 Green Tech Innovation Award</h3>
          <p className="text-gray-600 text-sm mb-3">August 22, 2024</p>
          <p className="text-gray-700">
            Platform recognized for innovative approach to environmental sustainability and community impact through technology...
          </p>
        </div>

        <h2>Company Facts & Figures</h2>
        <ul>
          <li><strong>Founded:</strong> 2022</li>
          <li><strong>Headquarters:</strong> United States</li>
          <li><strong>Meals Rescued:</strong> 50,000+</li>
          <li><strong>Active Users:</strong> 1,200+</li>
          <li><strong>Partner Vendors:</strong> 350+</li>
          <li><strong>NGO Partners:</strong> 75+</li>
          <li><strong>Cities Served:</strong> 25</li>
          <li><strong>Food Waste Prevented:</strong> 2,500+ lbs</li>
        </ul>

        <h2>Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sarah Chen</h3>
            <p className="text-primary-600 font-medium mb-3">CEO & Co-Founder</p>
            <p className="text-gray-600 text-sm">
              Former sustainability consultant with 10+ years experience in food systems and environmental policy.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Marcus Rodriguez</h3>
            <p className="text-primary-600 font-medium mb-3">CTO & Co-Founder</p>
            <p className="text-gray-600 text-sm">
              Tech entrepreneur and full-stack developer passionate about using technology for social good.
            </p>
          </div>
        </div>

        <h2>Media Kit</h2>
        <p>
          Download our media kit for high-resolution logos, product screenshots, and company information.
        </p>
        
        <div className="bg-primary-50 rounded-xl p-6 my-8">
          <h3 className="text-primary-800 mb-4">Download Media Assets</h3>
          <ul className="text-primary-700 space-y-2">
            <li>• Company logos (PNG, SVG, EPS formats)</li>
            <li>• Product screenshots and interface images</li>
            <li>• Leadership team headshots</li>
            <li>• Company fact sheet</li>
            <li>• Brand guidelines</li>
          </ul>
          <button className="btn btn-primary mt-4">
            Download Media Kit
          </button>
        </div>

        <h2>Awards & Recognition</h2>
        <ul>
          <li><strong>2024 Green Tech Innovation Award</strong> - Environmental Technology Excellence</li>
          <li><strong>2024 Community Impact Partner</strong> - National Food Recovery Network</li>
          <li><strong>2024 B Corp Certification</strong> - Social and Environmental Performance</li>
          <li><strong>2023 Startup of the Year Finalist</strong> - Sustainability Category</li>
        </ul>

        <h2>Media Contact</h2>
        <div className="bg-gray-50 rounded-xl p-6 my-8">
          <h3 className="text-gray-900 mb-4">Press Inquiries</h3>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> press@surplusconnect.com
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> 1-800-SURPLUS (Press Line)
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Response Time:</strong> Within 24 hours for media inquiries
          </p>
          <Link href="/contact" className="btn btn-outline">
            Contact Press Team
          </Link>
        </div>

        <h2>Speaking Opportunities</h2>
        <p>
          Our leadership team is available for speaking engagements, panel discussions, and interviews on topics including:
        </p>
        <ul>
          <li>Food waste reduction and sustainability</li>
          <li>Technology for social good</li>
          <li>Community-driven solutions</li>
          <li>Startup growth and scaling</li>
          <li>Environmental impact through innovation</li>
        </ul>

        <h2>Partnership Inquiries</h2>
        <p>
          For partnership opportunities, business development inquiries, or collaboration proposals, please contact our business development team.
        </p>

        <div className="bg-secondary-50 rounded-xl p-6 my-8">
          <h3 className="text-secondary-800 mb-4">Business Partnerships</h3>
          <p className="text-secondary-700 mb-4">
            Interested in partnering with SurplusConnect? We&apos;re always looking for organizations that share our mission.
          </p>
          <Link href="/contact" className="btn btn-secondary">
            Partnership Inquiries
          </Link>
        </div>
      </div>
    </StaticPageLayout>
  );
}
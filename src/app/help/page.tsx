import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import Link from "next/link";
import { Search, MessageCircle, Book, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HelpPage() {
  return (
    <div className="bg-white">
      <main className="py-20 sm:py-28">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to your questions and get the support you need to
              make the most of SurplusConnect.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for help articles..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/faq" className="card p-6 text-center card-hover">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4">
              <Book className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">FAQ</h3>
            <p className="text-gray-600">
              Find quick answers to frequently asked questions
            </p>
          </Link>

          <Link href="/contact" className="card p-6 text-center card-hover">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-600 mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Contact Support
            </h3>
            <p className="text-gray-600">Get in touch with our support team</p>
          </Link>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">1-800-SURPLUS</p>
          </div>
        </div>

        {/* Help Categories */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Getting Started */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Getting Started
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    How to create an account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Choosing your user type
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Setting up your profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Platform overview
                  </a>
                </li>
              </ul>
            </div>

            {/* For Vendors */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                For Vendors
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Creating food listings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Managing inventory
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Pricing strategies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Payment processing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Analytics dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* For Consumers */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                For Consumers
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Finding surplus food
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Making reservations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Pickup procedures
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Payment methods
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Tracking savings
                  </a>
                </li>
              </ul>
            </div>

            {/* For NGOs */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">For NGOs</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    NGO verification process
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Accessing donations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Volunteer management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Impact reporting
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Distribution coordination
                  </a>
                </li>
              </ul>
            </div>

            {/* Account & Billing */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Account & Billing
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Managing your account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Subscription plans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Payment issues
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Canceling subscription
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Refund policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Technical Support */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Technical Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Troubleshooting login issues
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Mobile app problems
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Browser compatibility
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Notification settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-700 block"
                  >
                    Data export
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Still Need Help?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-2">support@surplusconnect.com</p>
                <p className="text-sm text-gray-500">
                  Response within 24 hours
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-600 mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-2">1-800-SURPLUS</p>
                <p className="text-sm text-gray-500">
                  Mon-Fri, 9 AM - 6 PM EST
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-2">Available on website</p>
                <p className="text-sm text-gray-500">
                  Mon-Fri, 9 AM - 6 PM EST
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact Support Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

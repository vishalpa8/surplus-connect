import { Button } from "@/components/ui/Button";
import { CheckCircle, HeartHandshake, Truck, Users, Heart, Calendar, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        name: "Access a Steady Stream of Donations",
        description: "Connect with a network of local food businesses and access a consistent supply of surplus food to support your community programs.",
        icon: HeartHandshake,
        color: "bg-red-100 text-red-600"
    },
    {
        name: "Streamline Your Operations",
        description: "Our platform makes it easy to discover available food, schedule pickups, and manage your donations, saving you time and resources.",
        icon: Truck,
        color: "bg-blue-100 text-blue-600"
    },
    {
        name: "Increase Your Impact",
        description: "By rescuing more food, you can serve more people and further your mission of fighting hunger and supporting those in need.",
        icon: Heart,
        color: "bg-purple-100 text-purple-600"
    }
];

const features = [
    "Real-time food availability alerts",
    "Efficient pickup scheduling",
    "Donation tracking and reporting",
    "Community impact metrics",
    "Vendor relationship management",
    "Volunteer coordination tools"
];

const stats = [
    { number: "75+", label: "NGO Partners" },
    { number: "12,000+", label: "Meals Rescued" },
    { number: "350+", label: "Active Vendors" }
];

export default function ForNgosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-primary-50 to-secondary-50 pt-24 sm:pt-32 lg:pt-40 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-800 rounded-full text-sm font-bold mb-6">
              <HeartHandshake className="h-4 w-4" />
              For NGOs & Charities
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Amplify Your Impact,
              <br />
              <span className="text-primary-600">One Meal at a Time</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Your organization is on the front lines of fighting hunger. SurplusConnect is here to support you. We provide a simple, reliable way to source nutritious surplus food from local businesses, so you can focus on what you do best: serving your community.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register?role=ngo">
                <Button size="lg" className="w-full sm:w-auto">
                  Join Our Network
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-accent py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Why Partner With Us</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Maximize Your Community Impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.name} className="card p-8 text-center card-hover bg-white">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${benefit.color} mb-6`}>
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.name}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-soft-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-500 text-white mb-6">
                    <HeartHandshake className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Trusted by 75+ NGOs</h3>
                  <p className="text-gray-600 mb-6">
                    Organizations across the country rely on SurplusConnect to feed their communities.
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">&quot;This platform has revolutionized our food rescue operations!&quot;</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tools Built for Your Mission
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our platform is designed specifically for NGOs and charities, with features that help you maximize your food rescue efforts and serve more people in need.
              </p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-accent py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Simple Process</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              How It Works for NGOs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Register & Verify</h3>
              <p className="text-gray-600">Sign up your organization and complete our simple verification process to join our trusted network.</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browse & Reserve</h3>
              <p className="text-gray-600">Browse available food donations in your area and reserve items that match your community&apos;s needs.</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pickup & Serve</h3>
              <p className="text-gray-600">Coordinate pickup with vendors and distribute the rescued food to those who need it most in your community.</p>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}


import { Button } from "@/components/ui/Button";
import { CheckCircle, TrendingUp, Users, Building, DollarSign, Leaf, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        name: "Reduce Food Waste",
        description: "Turn your surplus food into an opportunity instead of a cost. Contribute to a more sustainable food system and reduce your environmental footprint.",
        icon: Leaf
    },
    {
        name: "Recover Costs & Find New Customers",
        description: "Sell your surplus food at a reduced price, recovering costs and attracting new, value-conscious customers to your business.",
        icon: DollarSign,
        color: "bg-blue-100 text-blue-600"
    },
    {
        name: "Enhance Your Brand Image",
        description: "Show your community that you are a socially responsible business committed to fighting food waste. Build goodwill and customer loyalty.",
        icon: Star,
        color: "bg-yellow-100 text-yellow-600"
    }
];

const features = [
    "Easy listing management",
    "Real-time inventory updates",
    "Customer communication tools",
    "Analytics and insights",
    "Flexible pickup scheduling",
    "Community impact tracking"
];

export default function ForVendorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-primary-50 to-secondary-50 pt-24 sm:pt-32 lg:pt-40 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-bold mb-6">
              <Building className="h-4 w-4" />
              For Food Vendors
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Empower Your Business,
              <br />
              <span className="text-primary-600">Reduce Your Waste</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Join a growing community of restaurants, bakeries, and grocers who are turning their surplus food into a force for good. SurplusConnect makes it easy to manage your unsold items, recover costs, and build a reputation as a sustainable business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register?role=vendor">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Selling Today
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

      {/* Benefits Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose SurplusConnect</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Transform Your Surplus into Success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.name} className="card p-8 text-center card-hover">
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
      <section className="bg-accent py-20 sm:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything You Need to Succeed
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our platform provides all the tools you need to efficiently manage your surplus food and connect with customers who value sustainability.
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
            
            <div className="relative">
              <div className="card p-8 bg-white shadow-soft-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-6">
                    <Building className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Join 350+ Vendors</h3>
                  <p className="text-gray-600 mb-6">
                    Already helping reduce food waste and serve their communities better.
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">&quot;SurplusConnect has transformed how we handle surplus food!&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}

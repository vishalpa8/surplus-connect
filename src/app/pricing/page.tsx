import { Button } from "@/components/ui/Button";
import { CheckCircle, X, Star, Users, Building, HeartHandshake, ArrowRight, Zap, Shield, Headphones } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Consumer",
    description: "Perfect for individuals looking to rescue food and save money",
    price: "Free",
    period: "forever",
    color: "bg-gray-50 border-gray-200",
    buttonColor: "btn-outline",
    popular: false,
    features: [
      "Browse available surplus food",
      "Reserve items for pickup",
      "Basic search and filters",
      "Mobile app access",
      "Email notifications",
      "Community impact tracking"
    ],
    limitations: [
      "Limited to 5 reservations per week",
      "Basic customer support"
    ]
  },
  {
    name: "Vendor Starter",
    description: "Great for small businesses just getting started",
    price: "$29",
    period: "per month",
    color: "bg-primary-50 border-primary-200",
    buttonColor: "btn-primary",
    popular: true,
    features: [
      "List up to 50 items per month",
      "Basic analytics dashboard",
      "Customer communication tools",
      "Mobile app access",
      "Email & SMS notifications",
      "Payment processing",
      "Basic inventory management",
      "Community impact reporting"
    ],
    limitations: [
      "Email support only",
      "Standard listing visibility"
    ]
  },
  {
    name: "Vendor Pro",
    description: "For established businesses with higher volume",
    price: "$79",
    period: "per month",
    color: "bg-secondary-50 border-secondary-200",
    buttonColor: "btn-secondary",
    popular: false,
    features: [
      "Unlimited listings",
      "Advanced analytics & insights",
      "Priority listing visibility",
      "Bulk upload tools",
      "Advanced inventory management",
      "Custom pickup scheduling",
      "Dedicated account manager",
      "Priority customer support",
      "API access",
      "White-label options"
    ],
    limitations: []
  },
  {
    name: "NGO",
    description: "Special pricing for non-profit organizations",
    price: "Free",
    period: "for verified NGOs",
    color: "bg-purple-50 border-purple-200",
    buttonColor: "btn-soft",
    popular: false,
    features: [
      "Unlimited food requests",
      "Priority access to donations",
      "Volunteer management tools",
      "Impact reporting dashboard",
      "Donation tracking",
      "Community outreach tools",
      "Grant reporting assistance",
      "Dedicated NGO support",
      "Training resources",
      "Partnership opportunities"
    ],
    limitations: [
      "Requires NGO verification"
    ]
  }
];

const faqs = [
  {
    question: "How does pricing work for vendors?",
    answer: "Vendors pay a monthly subscription based on their plan. There are no transaction fees or hidden costs. You can upgrade or downgrade your plan at any time."
  },
  {
    question: "Is there really no cost for consumers and NGOs?",
    answer: "Yes! Consumers can use SurplusConnect completely free. Verified NGOs also get free access to all features as part of our mission to fight food waste and hunger."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for vendor subscriptions. Consumer transactions are processed securely through our platform."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely! You can cancel your vendor subscription at any time. There are no long-term contracts or cancellation fees."
  },
  {
    question: "Do you offer discounts for annual payments?",
    answer: "Yes! Vendors who pay annually receive a 20% discount on their subscription. Contact our sales team for more details."
  },
  {
    question: "How do I verify my NGO status?",
    answer: "NGOs need to provide their tax-exempt documentation and organizational details during registration. Our team reviews applications within 2-3 business days."
  }
];

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-level security for all transactions"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all users"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Instant notifications for new listings and updates"
  }
];

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-primary-50 to-secondary-50 pt-24 sm:pt-32 lg:pt-40 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-bold mb-6">
              <Star className="h-4 w-4" />
              Simple, Transparent Pricing
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Choose the Perfect Plan
              <br />
              <span className="text-primary-600">for Your Needs</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Whether you&apos;re a consumer looking to save money, a business wanting to reduce waste, or an NGO fighting hunger, we have a plan that fits your mission.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 ${plan.color} ${
                  plan.popular ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-full">
                      <Star className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                    {plan.price === "Free" && (
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    )}
                  </div>
                  
                  <Link href={`/auth/register?role=${
                    plan.name === 'Consumer' ? 'consumer' : 
                    plan.name === 'NGO' ? 'ngo' : 'vendor'
                  }`}>
                    <Button className={`w-full ${plan.buttonColor}`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">What&apos;s included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start gap-3">
                            <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-accent py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Platform Features</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Everything You Need to Succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              All plans include access to our core platform features designed to make food rescue simple and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center card-hover bg-white">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-800 rounded-full text-sm font-bold mb-6">
              <Building className="h-4 w-4" />
              Enterprise Solutions
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Need Something Custom?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Large organizations, restaurant chains, and enterprise clients can benefit from our custom solutions with dedicated support, advanced integrations, and tailored features.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-600">Locations Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-500 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-gray-600">Dedicated Support</div>
              </div>
            </div>
            
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Contact Sales Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-accent py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">FAQ</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="card p-6 bg-white">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Saving Food?
            </h2>
            <p className="mt-6 text-xl text-primary-100">
              Join thousands of users who are already making a difference. Choose your plan and start your journey today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="soft" className="w-full sm:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
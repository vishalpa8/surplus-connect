import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = {
  user: [
    {
      name: "Community User",
      price: "Free",
      description: "For individuals who want to find and reserve surplus food.",
      features: [
        "Browse live map of food listings",
        "Reserve items for pickup",
        "Track your environmental impact",
        "Earn badges for saving meals",
      ],
      cta: "Sign Up for Free",
      href: "/signup"
    },
  ],
  vendor: [
    {
      name: "Small Business",
      price: "$19",
      price_desc: "/month",
      description: "For small cafes, restaurants, and bakeries.",
      features: [
        "Up to 50 listings per month",
        "Basic analytics dashboard",
        "Email support",
        "Reach new customers",
      ],
      cta: "Get Started",
      href: "/signup?role=vendor&tier=small"
    },
    {
      name: "Pro",
      price: "$49",
      price_desc: "/month",
      description: "For larger businesses and grocery stores.",
      features: [
        "Unlimited listings",
        "Advanced analytics and reporting",
        "Priority support",
        "API access for integration",
        "Featured listings on the map",
      ],
      cta: "Choose Pro",
      href: "/signup?role=vendor&tier=pro"
    },
  ],
};

export default function PricingPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Pricing Plans
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Choose the perfect plan for your needs. All plans start with a 14-day free trial.
          </p>
        </div>

        {/* Vendor Pricing */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center">For Vendors</h2>
          <div className="mt-8 grid max-w-lg gap-8 mx-auto lg:max-w-none lg:grid-cols-2">
            {tiers.vendor.map((tier) => (
              <Card key={tier.name}>
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                    <span className="ml-1 text-xl font-semibold text-muted-foreground">{tier.price_desc}</span>
                  </div>
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-6 w-6 text-primary mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* User Pricing */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center">For Users</h2>
          <div className="mt-8 max-w-lg mx-auto">
            {tiers.user.map((tier) => (
              <Card key={tier.name} className="text-center">
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-4xl font-extrabold tracking-tight">{tier.price}</p>
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center justify-center">
                        <Check className="h-6 w-6 text-primary mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

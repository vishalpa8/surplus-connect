'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, ShoppingCart, Users, Award, Leaf } from "lucide-react";
import Link from "next/link";

const pricingData = [
  {
    type: "Vendor",
    color: "bg-primary/10 border-primary",
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    perUse: "₹10/listing",
    oneDay: "₹149 (all day)",
    thirtyDay: "₹999 (month)",
    desc: "For restaurants, grocers, and caterers to list surplus food.",
  },
  {
    type: "NGO",
    color: "bg-green-100 border-green-500",
    icon: <Award className="h-8 w-8 text-green-600" />,
    perUse: "₹5/claim*",
    oneDay: "₹99 (all day)",
    thirtyDay: "₹499 (month)",
    desc: "For NGOs to claim and distribute food to those in need.",
  },
  {
    type: "User",
    color: "bg-blue-100 border-blue-500",
    icon: <Users className="h-8 w-8 text-blue-600" />,
    perUse: "₹5/claim",
    oneDay: "₹49 (all day)",
    thirtyDay: "₹149 (month)",
    desc: "For individuals to claim surplus food and reduce waste.",
  },
];

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('demoUser');
      if (user) {
        const parsed = JSON.parse(user);
        setRole(parsed.role);
        if (parsed.role === 'admin') router.replace('/admin');
        else router.replace('/dashboard');
      }
    }
  }, [router]);

  // Pricing logic removed from homepage

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 md:py-28 text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
              Save Food. Feed People. <span className="text-primary">Reduce Waste.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Surplus Connect is a non-profit platform dedicated to fighting food waste by connecting food vendors with people and NGOs in need. Join us and make a real impact in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/map">Find Food Near You <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup?role=vendor">Become a Vendor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="w-full py-16 bg-secondary/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">10,000+ Meals Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Every meal rescued is a step toward a more sustainable world.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                  <Leaf className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">25,000+ kg CO₂ Diverted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reducing food waste means less greenhouse gas emissions.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                  <Award className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">Community Champions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Join our growing network of vendors, NGOs, and volunteers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A simple three-step process to rescue food and build a stronger community.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">1. Vendors List Surplus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Restaurants, grocers, and caterers post their unsold, surplus food items on our platform quickly and easily.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                  <MapPin className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">2. Users Find & Reserve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Individuals and NGOs browse the map, find available food nearby, and reserve it for pickup with a single click.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">3. Community Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Food is saved from the landfill, people get fed, and we build a more sustainable community together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 bg-secondary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you're a business with surplus food or an individual looking to help, you can be a part of the solution. Sign up today and join the movement to end food waste.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Join as a User</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup?role=vendor">Register Your Business</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

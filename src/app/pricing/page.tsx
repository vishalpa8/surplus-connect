'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

const pricingData = [
  {
    type: "Vendor",
    accent: "from-primary/30 to-primary/10 border-primary",
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    perUse: "₹10/listing",
    oneDay: "₹149 (all day)",
    thirtyDay: "₹999 (month)",
    desc: "For restaurants, grocers, and caterers to list surplus food.",
    cta: "Subscribe as Vendor",
    role: "vendor",
  },
  {
    type: "NGO",
    accent: "from-green-400/30 to-green-100 border-green-500",
    icon: <Award className="h-8 w-8 text-green-600" />,
    perUse: "₹5/claim*",
    oneDay: "₹99 (all day)",
    thirtyDay: "₹499 (month)",
    desc: "For NGOs to claim and distribute food to those in need.",
    cta: "Subscribe as NGO",
    role: "ngo",
  },
  {
    type: "User",
    accent: "from-blue-400/30 to-blue-100 border-blue-500",
    icon: <Users className="h-8 w-8 text-blue-600" />,
    perUse: "₹5/claim",
    oneDay: "₹49 (all day)",
    thirtyDay: "₹149 (month)",
    desc: "For individuals to claim surplus food and reduce waste.",
    cta: "Subscribe as User",
    role: "user",
  },
];

export default function PricingPage() {
  const [modal, setModal] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        const parsed = JSON.parse(demoUser);
        setRole(parsed.role);
      } else {
        setRole(null);
      }
    }
  }, []);

  let visiblePricing = pricingData;
  if (role === 'vendor') visiblePricing = [pricingData[0]];
  else if (role === 'ngo') visiblePricing = [pricingData[1]];
  else if (role === 'user') visiblePricing = [pricingData[2]];

  const selectedPlan = pricingData.find((row) => row.type === modal);
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-5xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Our Pricing</h1>
      <p className="text-center text-muted-foreground mb-8">
        Simple, affordable pricing for all users. Currency is shown as per your region. Payment integration coming soon.
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {visiblePricing.map((row) => (
          <Card
            key={row.type}
            className={`relative border-2 border-solid ${row.accent} shadow-xl flex flex-col justify-between bg-gradient-to-br hover:scale-[1.03] transition-transform duration-200`}
          >
            <CardHeader className="flex flex-col items-center gap-2 pb-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-2 bg-white border border-border shadow">
                {row.icon}
              </div>
              <CardTitle className="text-xl font-bold mb-1 text-center">{row.type}</CardTitle>
              <p className="text-muted-foreground text-sm text-center">{row.desc}</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2 pt-0">
              <div className="w-full flex flex-col gap-2 mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold">Per-Use</span>
                  <span className="text-2xl font-bold">{row.perUse}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold">1-Day Unlimited</span>
                  <span className="text-2xl font-bold">{row.oneDay}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold">30-Day Unlimited</span>
                  <span className="text-2xl font-bold">{row.thirtyDay}</span>
                </div>
              </div>
              <Button
                className="mt-6 w-full font-bold text-base py-2"
                onClick={() => setModal(row.type)}
              >
                {row.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {modal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-background rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Payment Coming Soon</h2>
            <p className="mb-6">Online payment and subscription will be available soon for {selectedPlan.type} plans. For now, contact us to get started!</p>
            <Button onClick={() => setModal(null)} className="w-full">Close</Button>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-8 text-center">*NGOs may be eligible for additional discounts or free claims based on verification. Contact us for more info.</p>
    </div>
  );
}

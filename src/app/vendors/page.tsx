import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Button } from "@/components/ui/Button";
import { CheckCircle, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        name: "Reduce Food Waste",
        description: "Turn your surplus food into an opportunity instead of a cost. Contribute to a more sustainable food system and reduce your environmental footprint.",
        icon: <CheckCircle />
    },
    {
        name: "Recover Costs & Find New Customers",
        description: "Sell your surplus food at a reduced price, recovering costs and attracting new, value-conscious customers to your business.",
        icon: <TrendingUp />
    },
    {
        name: "Enhance Your Brand Image",
        description: "Show your community that you are a socially responsible business committed to fighting food waste. Build goodwill and customer loyalty.",
        icon: <Users />
    }
]

export default function ForVendorsPage() {
  return (
    <StaticPageLayout title="Empower Your Business, Reduce Your Waste">
        <div className="space-y-12">
            <p className="text-xl">
                Join a growing community of restaurants, bakeries, and grocers who are turning their surplus food into a force for good. SurplusConnect makes it easy to manage your unsold items, recover costs, and build a reputation as a sustainable business.
            </p>

            <div className="space-y-8">
                {benefits.map((benefit) => (
                    <div key={benefit.name} className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 text-primary-600">{benefit.icon}</div>
                        <div>
                            <h3 className="text-lg font-bold">{benefit.name}</h3>
                            <p className="mt-1">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center p-8 bg-gray-100 rounded-2xl">
                <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
                <p className="mt-2">It takes just a few minutes to create your first listing.</p>
                <Link href="/auth/register">
                    <Button size="lg" className="mt-4">Register as a Vendor</Button>
                </Link>
            </div>
        </div>
    </StaticPageLayout>
  );
}

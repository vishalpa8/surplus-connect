import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Button } from "@/components/ui/Button";
import { CheckCircle, HeartHandshake, Truck } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        name: "Access a Steady Stream of Donations",
        description: "Connect with a network of local food businesses and access a consistent supply of surplus food to support your community programs.",
        icon: <HeartHandshake />
    },
    {
        name: "Streamline Your Operations",
        description: "Our platform makes it easy to discover available food, schedule pickups, and manage your donations, saving you time and resources.",
        icon: <Truck />
    },
    {
        name: "Increase Your Impact",
        description: "By rescuing more food, you can serve more people and further your mission of fighting hunger and supporting those in need.",
        icon: <CheckCircle />
    }
]

export default function ForNgosPage() {
  return (
    <StaticPageLayout title="Amplify Your Impact, One Meal at a Time">
        <div className="space-y-12">
            <p className="text-xl">
                Your organization is on the front lines of fighting hunger. SurplusConnect is here to support you. We provide a simple, reliable way to source nutritious surplus food from local businesses, so you can focus on what you do best: serving your community.
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
                <h2 className="text-2xl font-bold">Ready to Join Our Network?</h2>
                <p className="mt-2">Register your organization to start receiving food donations.</p>
                <Link href="/auth/register">
                    <Button size="lg" className="mt-4">Register as an NGO</Button>
                </Link>
            </div>
        </div>
    </StaticPageLayout>
  );
}

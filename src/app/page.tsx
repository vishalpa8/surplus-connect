import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, ShoppingCart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 md:py-24">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
                Connecting Surplus, Nourishing Communities
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                A non-profit initiative dedicated to fighting food waste by linking those with surplus food to those in need. Join us in making a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/map">Find Food Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/signup?role=vendor">Become a Vendor</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Image
                src="/globe.svg"
                alt="Community Globe"
                width={450}
                height={450}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-secondary/50">
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
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you're a business with surplus food or an individual looking to help, you can be a part of the solution. Sign up today and join the movement to end food waste.
          </p>
          <div className="flex justify-center gap-4">
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

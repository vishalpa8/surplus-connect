'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtensilsCrossed, Award, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const userTypes = [
  {
    value: "vendor",
    label: "Vendor",
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    desc: "For restaurants, grocers, and caterers to list surplus food."
  },
  {
    value: "ngo",
    label: "NGO",
    icon: <Award className="h-6 w-6 text-green-600" />,
    desc: "For NGOs to claim and distribute food to those in need."
  },
  {
    value: "user",
    label: "User",
    icon: <Users className="h-6 w-6 text-blue-600" />,
    desc: "For individuals to claim surplus food and reduce waste."
  },
];

export default function SignupForm() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [gstin, setGstin] = useState("");
  const [ngoReg, setNgoReg] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Store all fields in demoUser for now
    const newUser = {
      userType,
      email,
      password,
      name,
      phone,
      organization,
      businessType,
      gstin,
      ngoReg,
      address,
    };
    localStorage.setItem("demoUser", JSON.stringify(newUser));
    if (userType === "admin") router.push("/admin");
    else router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <UtensilsCrossed className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            {userType
              ? `Register as a ${userTypes.find((u) => u.value === userType)?.label}`
              : "Select your user type to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!userType ? (
            <div className="grid gap-4">
              {userTypes.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  className="flex items-center gap-3 justify-start w-full py-4 text-lg border-2 border-border hover:border-primary"
                  onClick={() => setUserType(type.value)}
                >
                  {type.icon}
                  <span className="font-bold">{type.label}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{type.desc}</span>
                </Button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 mt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-muted-foreground"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m1.875-2.25A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.403 3.22-1.125 4.575m-1.875 2.25A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" /></svg>}
                </button>
              </div>
              {userType === 'vendor' && (
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Business/Shop Name"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Input
                      id="businessType"
                      type="text"
                      placeholder="e.g. Restaurant, Grocery, Caterer"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN (optional)</Label>
                    <Input
                      id="gstin"
                      type="text"
                      placeholder="GSTIN Number"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Business Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              {userType === 'ngo' && (
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input
                      id="organization"
                      type="text"
                      placeholder="NGO Name"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ngoReg">NGO Registration Number</Label>
                    <Input
                      id="ngoReg"
                      type="text"
                      placeholder="Registration Number"
                      value={ngoReg}
                      onChange={(e) => setNgoReg(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="NGO Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              {userType === 'user' && (
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address (optional)</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold shadow hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Demo accounts:<br />
                user@example.com / userpass<br />
                vendor@example.com / vendorpass<br />
                admin@example.com / adminpass
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
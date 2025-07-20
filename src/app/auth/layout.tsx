import { Navbar } from "@/components/layout/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-accent">
      <Navbar />
      <main className="pt-20">
      {children}
    </main>
    </div>
  );
}

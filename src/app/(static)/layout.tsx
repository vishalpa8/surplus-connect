import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-accent">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

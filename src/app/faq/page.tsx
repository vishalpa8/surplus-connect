import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

const faqs = [
    {
        question: "What is SurplusConnect?",
        answer: "SurplusConnect is a mobile-first platform that connects food vendors with surplus food to consumers and NGOs, with the goal of reducing food waste."
    },
    {
        question: "How do I reserve food?",
        answer: "Simply browse the listings on our map, select an item you like, and click the 'Reserve' button. You'll receive a confirmation with pickup details."
    },
    {
        question: "Is the food safe to eat?",
        answer: "Yes. All our vendor partners are required to adhere to strict food safety standards. The food is perfectly good to eat but is surplus to their needs."
    },
    {
        question: "What types of businesses can join as vendors?",
        answer: "We welcome restaurants, grocery stores, bakeries, cafes, caterers, and any other food business that has surplus food."
    }
]

export default function FaqPage() {
  return (
    <StaticPageLayout title="Frequently Asked Questions">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
            <details key={index} className="p-4 border rounded-lg" open={index === 0}>
                <summary className="font-bold cursor-pointer">{faq.question}</summary>
                <p className="mt-2">{faq.answer}</p>
            </details>
        ))}
      </div>
    </StaticPageLayout>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How can I get property information?",
    answer: "Simply fill out our property information request form with your email and preferences. We'll send you detailed listings, floor plans, and market data within 24 hours.",
  },
  {
    question: "Is the market report really free?",
    answer: "Yes! Our comprehensive market analysis report is completely free. Just provide your email address and you'll receive instant access to our latest market insights, trends, and forecasts.",
  },
  {
    question: "How quickly will I receive the information?",
    answer: "Most information requests are processed within a few hours, and you'll receive an email with your requested property details, reports, or guides. Complex requests may take up to 24 hours.",
  },
  {
    question: "Can I request information for multiple properties?",
    answer: "Absolutely! You can submit multiple information requests. Each request will be processed individually, and you'll receive comprehensive details for each property you're interested in.",
  },
  {
    question: "What information do I need to provide?",
    answer: "For most requests, we just need your name and email address. For property-specific information, additional details like location preferences or budget range help us provide more targeted information.",
  },
  {
    question: "Will my information be shared with third parties?",
    answer: "No, we respect your privacy. Your information is used solely to send you the requested property information and market updates. We never share your data with third parties without your explicit consent.",
  },
  {
    question: "How often will I receive updates?",
    answer: "You can choose your communication preferences. By default, you'll receive weekly market updates and new property listings. You can adjust these settings in any email we send you.",
  },
  {
    question: "Can I download guides multiple times?",
    answer: "Yes, once you've requested a guide, it's yours to keep. You can download it multiple times, and we'll notify you when updated versions are available.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Got questions? We've got answers. Find everything you need to know about getting property information.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden bg-card"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


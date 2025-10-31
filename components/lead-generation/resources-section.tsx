"use client";

import { FileText, Download, TrendingUp, Home, BarChart3, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InformationRequest } from "./information-request";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const resources = [
  {
    icon: BarChart3,
    title: "Market Analysis Report",
    description: "Comprehensive quarterly market trends, forecasts, and investment opportunities.",
    type: "market-report" as const,
    featured: true,
    emoji: "📊",
  },
  {
    icon: Home,
    title: "Home Buying Guide",
    description: "Complete guide for first-time buyers with checklists, tips, and expert advice.",
    type: "buying-guide" as const,
    featured: false,
    emoji: "🏡",
  },
  {
    icon: TrendingUp,
    title: "Investment Guide",
    description: "Real estate investment strategies, market insights, and portfolio building tips.",
    type: "investment-guide" as const,
    featured: false,
    emoji: "💰",
  },
  {
    icon: FileText,
    title: "Property Comparison Guide",
    description: "Learn how to compare properties, evaluate neighborhoods, and make informed decisions.",
    type: "buying-guide" as const,
    featured: false,
    emoji: "🎯",
  },
];

export function ResourcesSection() {
  return (
    <section className="bg-muted/30 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Free Resources</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Free Resources & Guides
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Download our free guides and reports to help you make informed real estate decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  resource.featured ? "md:col-span-2" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{resource.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <InformationRequest
                    resourceType={resource.type}
                    trigger={
                      <Button className="w-full" variant={resource.featured ? "default" : "outline"} size="lg">
                        <Download className="mr-2 h-4 w-4" />
                        Download Now
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/resources">
              View All Resources
              <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

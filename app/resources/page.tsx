"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, TrendingUp, Home, BarChart3, 
  Sparkles, Star, Zap, Gift, Rocket, Target, BookOpen, 
  Calculator, TrendingDown, Users, Award 
} from "lucide-react";
import { InformationRequest } from "@/components/lead-generation/information-request";
import { FAQSection } from "@/components/lead-generation/faq-section";
import { NewsletterSignup } from "@/components/lead-generation/newsletter-signup";
import Link from "next/link";

const resources = [
  {
    id: "market-report",
    icon: BarChart3,
    title: "Market Analysis Report 2024",
    description: "Get the inside scoop on market trends, forecasts, and hot investment opportunities. Updated quarterly!",
    type: "market-report" as const,
    category: "Market Insights",
    color: "bg-blue-500",
    featured: true,
    badge: "🔥 Hot",
    stats: "50+ pages",
    emoji: "📊",
  },
  {
    id: "buying-guide",
    icon: Home,
    title: "Ultimate Home Buying Guide",
    description: "Everything first-time buyers need to know! Checklists, tips, traps to avoid, and expert secrets.",
    type: "buying-guide" as const,
    category: "Buying",
    color: "bg-green-500",
    featured: true,
    badge: "⭐ Popular",
    stats: "100+ tips",
    emoji: "🏡",
  },
  {
    id: "investment-guide",
    icon: TrendingUp,
    title: "Real Estate Investment Playbook",
    description: "Master the art of property investing. Strategies, analysis methods, and portfolio building secrets.",
    type: "investment-guide" as const,
    category: "Investing",
    color: "bg-purple-500",
    featured: true,
    badge: "💎 Premium",
    stats: "Investment strategies",
    emoji: "💰",
  },
  {
    id: "property-comparison",
    icon: Target,
    title: "Property Comparison Toolkit",
    description: "Learn how to compare properties like a pro. Neighborhood analysis, value evaluation, and decision frameworks.",
    type: "buying-guide" as const,
    category: "Buying",
    color: "bg-orange-500",
    featured: false,
    badge: "New",
    stats: "Comparison templates",
    emoji: "🎯",
  },
  {
    id: "negotiation-guide",
    icon: Users,
    title: "Negotiation Secrets Guide",
    description: "Get the best deal every time! Proven negotiation tactics, scripts, and strategies from top agents.",
    type: "buying-guide" as const,
    category: "Tips & Tricks",
    color: "bg-red-500",
    featured: false,
    badge: "Pro Tip",
    stats: "25+ strategies",
    emoji: "🤝",
  },
  {
    id: "market-trends",
    icon: TrendingDown,
    title: "2024 Market Trends Report",
    description: "What's hot, what's not, and where the market is heading. Essential reading for smart investors.",
    type: "market-report" as const,
    category: "Market Insights",
    color: "bg-cyan-500",
    featured: false,
    badge: "Trending",
    stats: "Latest data",
    emoji: "📈",
  },
];

const categories = [
  { name: "All", count: resources.length, icon: Sparkles },
  { name: "Market Insights", count: resources.filter(r => r.category === "Market Insights").length, icon: BarChart3 },
  { name: "Buying", count: resources.filter(r => r.category === "Buying").length, icon: Home },
  { name: "Investing", count: resources.filter(r => r.category === "Investing").length, icon: TrendingUp },
  { name: "Tips & Tricks", count: resources.filter(r => r.category === "Tips & Tricks").length, icon: Star },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredResources = selectedCategory === "All" 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Gift className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">100% Free Resources</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Free Real Estate
              <span className="block text-primary">Resources & Guides</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Level up your real estate game with our comprehensive collection of guides, reports, and tools. 
              <span className="font-semibold text-foreground"> All completely free!</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Expert-Curated</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Regularly Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b bg-background/50 sticky top-16 z-40 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform ${selectedCategory === category.name ? "scale-110" : ""}`} />
                  <span className="font-medium">{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.name 
                      ? "bg-primary-foreground/20" 
                      : "bg-background"
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {selectedCategory === "All" && (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Rocket className="h-6 w-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Resources</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {resources.filter(r => r.featured).map((resource) => {
                const Icon = resource.icon;
                return (
                  <Card
                    key={resource.id}
                    className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${
                      hoveredCard === resource.id ? "border-primary" : ""
                    }`}
                    onMouseEnter={() => setHoveredCard(resource.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${resource.color} opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500`} />
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl ${resource.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          <span className="text-2xl">{resource.emoji}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {resource.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {resource.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        <span>{resource.stats}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <InformationRequest
                        resourceType={resource.type}
                        trigger={
                          <Button className="w-full group/btn" size="lg">
                            <Download className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                            Download Now
                          </Button>
                        }
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Resources Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory !== "All" && (
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                {selectedCategory} Resources
              </h2>
            </div>
          )}
          {selectedCategory === "All" && (
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">All Resources</h2>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = resource.icon;
              const isHovered = hoveredCard === resource.id;
              
              return (
                <Card
                  key={resource.id}
                  className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border ${
                    isHovered ? "border-primary shadow-lg" : ""
                  } ${resource.featured ? "md:col-span-1" : ""}`}
                  onMouseEnter={() => setHoveredCard(resource.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 ${resource.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center text-white shadow-md group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl">{resource.emoji}</span>
                      </div>
                      <Badge 
                        variant={resource.featured ? "default" : "outline"} 
                        className="text-xs"
                      >
                        {resource.badge}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs mb-2">
                        {resource.category}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {resource.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{resource.stats}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>Free</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <InformationRequest
                      resourceType={resource.type}
                      trigger={
                        <Button 
                          className="w-full group/btn" 
                          variant={resource.featured ? "default" : "outline"}
                          size="lg"
                        >
                          <Download className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                          Get This Resource
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 sm:py-16 md:py-20 border-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  <Calculator className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Need More Tools?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Check out our collection of free calculators including mortgage, ROI, affordability, and more!
                </p>
                <Button asChild size="lg" className="text-base">
                  <Link href="/tools">
                    Explore All Tools
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Never Miss New Resources</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Get New Resources
              <span className="block text-primary">Delivered Weekly</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Subscribe to be the first to know when we release new guides, reports, and exclusive content.
            </p>
            <div className="bg-card border rounded-xl p-8 sm:p-10 shadow-lg">
              <NewsletterSignup variant="card" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

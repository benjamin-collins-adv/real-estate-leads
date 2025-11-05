"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, TrendingUp, Home, DollarSign, Percent, Calendar, 
  BarChart3, Sparkles, Zap, Rocket, Target, ArrowRight, 
  TrendingDown, Play, Star, Award, Users
} from "lucide-react";
import Link from "next/link";

const tools = [
  {
    id: "mortgage",
    icon: Calculator,
    title: "Mortgage Calculator",
    description: "Calculate monthly payments, total interest, and amortization schedule. Perfect for planning your home purchase!",
    link: "/tools/mortgage-calculator",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500",
    emoji: "🏠",
    category: "Mortgage",
    featured: true,
    badge: "Most Popular",
    stats: "Free tool",
  },
  {
    id: "affordability",
    icon: DollarSign,
    title: "Affordability Calculator",
    description: "Determine how much house you can afford based on your income, debts, and financial situation.",
    link: "/tools/affordability-calculator",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500",
    emoji: "💰",
    category: "Planning",
    featured: false,
    badge: "Essential",
    stats: "Smart analysis",
  },
  {
    id: "roi",
    icon: TrendingUp,
    title: "ROI Calculator",
    description: "Calculate return on investment for rental properties. Analyze cash flow and investment returns.",
    link: "/tools/roi-calculator",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500",
    emoji: "📈",
    category: "Investment",
    featured: true,
    badge: "Investor's Choice",
    stats: "Advanced metrics",
  },
  {
    id: "refinance",
    icon: Percent,
    title: "Refinance Calculator",
    description: "Determine if refinancing makes sense. Calculate potential savings and break-even period.",
    link: "/tools/refinance-calculator",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500",
    emoji: "🔄",
    category: "Mortgage",
    featured: false,
    badge: "Money Saver",
    stats: "Savings analysis",
  },
  {
    id: "rent-vs-buy",
    icon: Home,
    title: "Rent vs Buy Calculator",
    description: "Compare the costs of renting versus buying. Make the best financial decision for your situation.",
    link: "/tools/rent-vs-buy",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500",
    emoji: "⚖️",
    category: "Planning",
    featured: false,
    badge: "Decision Tool",
    stats: "Cost comparison",
  },
  {
    id: "closing-costs",
    icon: BarChart3,
    title: "Closing Cost Calculator",
    description: "Estimate all closing costs including fees, taxes, and insurance. No surprises at closing!",
    link: "/tools/closing-cost-calculator",
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-500",
    emoji: "📊",
    category: "Planning",
    featured: false,
    badge: "Budget Helper",
    stats: "Cost breakdown",
  },
];

const categories = [
  { name: "All", count: tools.length, icon: Sparkles },
  { name: "Mortgage", count: tools.filter(t => t.category === "Mortgage").length, icon: Calculator },
  { name: "Planning", count: tools.filter(t => t.category === "Planning").length, icon: Target },
  { name: "Investment", count: tools.filter(t => t.category === "Investment").length, icon: TrendingUp },
];

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredTools = selectedCategory === "All" 
    ? tools 
    : tools.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Free Real Estate Calculators</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Real Estate
              <span className="block text-primary">Tools & Calculators</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful, free calculators to help you make smart real estate decisions. 
              <span className="font-semibold text-foreground"> No sign-up required!</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border">
                <Calculator className="h-4 w-4 text-primary" />
                <span className="font-medium">6 Calculators</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="font-medium">Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-4 sm:py-6 border-b bg-background/50 sticky top-14 sm:top-16 z-40 backdrop-blur overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-start sm:justify-center min-w-max sm:min-w-0">
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
                  <Icon className={`h-4 w-4 transition-transform ${selectedCategory === category.name ? "scale-110 rotate-12" : ""}`} />
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

      {/* Featured Tools */}
      {selectedCategory === "All" && (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-primary fill-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Tools</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {tools.filter(t => t.featured).map((tool) => {
                const Icon = tool.icon;
                const isHovered = hoveredCard === tool.id;
                return (
                  <Card
                    key={tool.id}
                    className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-2 ${
                      isHovered ? "border-primary shadow-xl" : ""
                    }`}
                    onMouseEnter={() => setHoveredCard(tool.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-16 h-16 rounded-2xl ${tool.bgColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <span className="text-3xl">{tool.emoji}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {tool.badge}
                        </Badge>
                      </div>
                      
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      
                      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                        <Icon className="h-3 w-3" />
                        <span>{tool.stats}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <Button asChild className="w-full group/btn" size="lg">
                        <Link href={tool.link}>
                          <Play className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          Use Calculator
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Tools Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory !== "All" && (
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="h-6 w-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                {selectedCategory} Tools
              </h2>
            </div>
          )}
          {selectedCategory === "All" && (
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">All Calculators</h2>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const isHovered = hoveredCard === tool.id;
              
              return (
                <Card
                  key={tool.id}
                  className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border ${
                    isHovered ? "border-primary shadow-lg" : ""
                  } ${tool.featured && selectedCategory === "All" ? "md:col-span-1" : ""}`}
                  onMouseEnter={() => setHoveredCard(tool.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Decorative corner element */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${tool.bgColor} opacity-5 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`} />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <span className="text-2xl">{tool.emoji}</span>
                      </div>
                      <Badge 
                        variant={tool.featured ? "default" : "outline"} 
                        className="text-xs"
                      >
                        {tool.badge}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {tool.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon className="h-3 w-3" />
                        <span>{tool.stats}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>Free</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <Button 
                      asChild
                      className="w-full group/btn" 
                      variant={tool.featured ? "default" : "outline"}
                      size="lg"
                    >
                      <Link href={tool.link}>
                        <Play className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        Try Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform opacity-0 group-hover/btn:opacity-100" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 sm:py-16 md:py-20 border-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Use Our Calculators?
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to make informed real estate decisions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant calculations with no waiting, no loading, and no delays.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-muted-foreground">
                    All calculators are completely free. No hidden fees, no credit card required.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Accurate & Reliable</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional-grade calculations you can trust for your real estate decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  <Rocket className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Make Smarter Decisions?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Use our free calculators to plan your real estate journey. Get started in seconds!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-base">
                    <Link href="/tools/mortgage-calculator">
                      <Calculator className="mr-2 h-5 w-5" />
                      Start Calculating
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-base">
                    <Link href="/resources">
                      <Sparkles className="mr-2 h-5 w-5" />
                      View Resources
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

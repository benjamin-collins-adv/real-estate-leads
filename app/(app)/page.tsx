import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedProperties } from "@/lib/payload";
import { getFeaturedBlogs } from "@/lib/payload";
import { Search, TrendingUp, Shield, Users } from "lucide-react";
import { NewsletterSignup } from "@/components/lead-generation/newsletter-signup";
import { SocialProof } from "@/components/lead-generation/social-proof";
import { InformationRequest } from "@/components/lead-generation/information-request";
import { QuoteRequest } from "@/components/lead-generation/quote-request";

export default async function Home() {
  const featuredProperties = await getFeaturedProperties(3);
  const featuredPosts = await getFeaturedBlogs(3);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Dream Home
              <span className="text-primary block sm:inline"> Today</span>
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
              Discover premium properties that match your lifestyle. From luxury villas to cozy apartments, we have the perfect place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button asChild size="lg" className="text-base w-full sm:w-auto">
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base w-full sm:w-auto">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="relative -mt-8 sm:-mt-12 md:-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  placeholder="City, State, or ZIP"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Property Type</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>All Types</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Any Price</option>
                  <option>Under $500k</option>
                  <option>$500k - $1M</option>
                  <option>$1M - $2M</option>
                  <option>Over $2M</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3 sm:mb-4">
            Featured Properties
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
            Explore our handpicked selection of premium properties that offer the best in luxury and comfort.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-8 sm:mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-muted/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3 sm:mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              Stay informed with expert insights, tips, and market trends.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SocialProof />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3 sm:mb-4">
              Why Choose Us
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              We make real estate simple, transparent, and stress-free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Market Expertise</h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
                Our team has deep market knowledge and years of experience to guide you through every step.
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Trusted & Secure</h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
                Your transactions are secure with us. We prioritize your privacy and protect your investments.
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Personalized Service</h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
                We understand your unique needs and provide personalized solutions tailored to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-primary/5 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Stay Updated with Market Insights
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Get weekly property updates, market trends, and exclusive listings delivered to your inbox.
            </p>
            <NewsletterSignup variant="card" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">Market Report</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Download our comprehensive market analysis with trends, forecasts, and investment opportunities.
                </p>
                <InformationRequest
                  resourceType="market-report"
                  trigger={
                    <Button size="lg" className="w-full sm:w-auto">
                      Download Report
                    </Button>
                  }
                />
              </div>
              <div className="bg-card border rounded-lg p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">Property Information</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Get detailed property information, pricing data, and neighborhood insights based on your criteria.
                </p>
                <QuoteRequest
                  trigger={
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Get Information
                    </Button>
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-card border rounded-lg p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">Home Buying Guide</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Free comprehensive guide on buying your first home with tips, checklists, and expert advice.
                </p>
                <InformationRequest
                  resourceType="buying-guide"
                  trigger={
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Download Guide
                    </Button>
                  }
                />
              </div>
              <div className="bg-card border rounded-lg p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">Investment Guide</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Learn about real estate investing with our detailed guide covering strategies and market insights.
                </p>
                <InformationRequest
                  resourceType="investment-guide"
                  trigger={
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Download Guide
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

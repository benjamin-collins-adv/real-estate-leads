import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedProperties } from "@/lib/payload";
import { getFeaturedBlogs } from "@/lib/payload";
import {
  Search,
  TrendingUp,
  Shield,
  Users,
  Home as HomeIcon,
  DollarSign,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
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
      <section className="relative bg-background py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
              <span>Trusted by 10,000+ Happy Homeowners</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Find Your Dream Home
              <span className="text-primary block sm:inline sm:ml-2">Today</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover premium properties that match your lifestyle. From luxury villas to cozy apartments, we have the perfect place for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <Button asChild size="lg" className="w-full sm:w-auto group">
                <Link href="/properties" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse Properties
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto group"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-2xl mx-auto">
              <div className="text-center p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground mt-1">Properties</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="text-xl sm:text-2xl font-bold text-primary">10K+</div>
                <div className="text-xs text-muted-foreground mt-1">Happy Clients</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="text-xl sm:text-2xl font-bold text-primary">98%</div>
                <div className="text-xs text-muted-foreground mt-1">Satisfaction</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="text-xl sm:text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground mt-1">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="relative -mt-12 sm:-mt-16 md:-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border rounded-xl shadow-lg p-6 sm:p-8 max-w-6xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Start Your Property Search
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Find your perfect match in seconds
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, State, or ZIP"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <HomeIcon className="h-4 w-4 text-primary" />
                  Property Type
                </label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>All Types</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Price Range
                </label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>Any Price</option>
                  <option>Under $500k</option>
                  <option>$500k - $1M</option>
                  <option>$1M - $2M</option>
                  <option>$2M - $5M</option>
                  <option>Over $5M</option>
                </select>
              </div>
              <div className="flex items-end sm:col-span-2 lg:col-span-1">
                <Button asChild className="w-full" size="lg">
                  <Link
                    href="/properties"
                    className="flex items-center justify-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Star className="h-4 w-4 fill-current" />
            <span>Handpicked Just For You</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Properties
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
            Explore our handpicked selection of premium properties that offer
            the best in luxury and comfort.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <HomeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No featured properties available at the moment.</p>
            </div>
          )}
        </div>
        <div className="mt-12 sm:mt-16 text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/properties" className="flex items-center gap-2">
              View All Properties
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-muted/30 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Expert Insights</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Latest from Our Blog
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
              Stay informed with expert insights, tips, and market trends to
              make smarter real estate decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {featuredPosts.length > 0 ? (
              featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No blog posts available at the moment.</p>
              </div>
            )}
          </div>
          <div className="mt-12 sm:mt-16 text-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/blog" className="flex items-center gap-2">
                Read All Articles
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
      <section className="bg-background py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Why Choose Us
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
              We make real estate simple, transparent, and stress-free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="group text-center space-y-4 p-6 sm:p-8 rounded-lg border bg-card hover:shadow-md transition-all">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Market Expertise</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team has deep market knowledge and years of experience to
                guide you through every step of your real estate journey.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  10+ Years
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  500+ Sales
                </span>
              </div>
            </div>
            <div className="group text-center space-y-4 p-6 sm:p-8 rounded-lg border bg-card hover:shadow-md transition-all">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Trusted & Secure</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your transactions are secure with us. We prioritize your privacy
                and protect your investments with industry-leading security.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  SSL Encrypted
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  Guaranteed
                </span>
              </div>
            </div>
            <div className="group text-center space-y-4 p-6 sm:p-8 rounded-lg border bg-card hover:shadow-md transition-all">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Personalized Service</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We understand your unique needs and provide personalized
                solutions tailored specifically to you and your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  24/7 Support
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  Dedicated Agent
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-primary/5 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium">
              <Mail className="h-4 w-4" />
              <span>Join Our Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Stay Updated with Market Insights
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Get weekly property updates, market trends, and exclusive listings
              delivered straight to your inbox. Join 5,000+ subscribers today!
            </p>
            <div className="bg-card border rounded-xl p-6 sm:p-8">
              <NewsletterSignup variant="card" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Weekly Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Exclusive Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No Spam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Free Resources to Help You Get Started
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Download our expert guides and reports to make informed real
                estate decisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="group border rounded-lg bg-card p-6 sm:p-8 text-center hover:shadow-md transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Market Report</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Download our comprehensive market analysis with trends,
                  forecasts, and investment opportunities.
                </p>
                <InformationRequest
                  resourceType="market-report"
                  trigger={
                    <Button className="w-full group/btn">
                      Download Report
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  }
                />
              </div>

              <div className="group border rounded-lg bg-card p-6 sm:p-8 text-center hover:shadow-md transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Property Information
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Get detailed property information, pricing data, and
                  neighborhood insights based on your criteria.
                </p>
                <QuoteRequest
                  trigger={
                    <Button variant="outline" className="w-full group/btn">
                      Get Information
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  }
                />
              </div>

              <div className="group border rounded-lg bg-card p-6 sm:p-8 text-center hover:shadow-md transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HomeIcon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Home Buying Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Free comprehensive guide on buying your first home with tips,
                  checklists, and expert advice.
                </p>
                <InformationRequest
                  resourceType="buying-guide"
                  trigger={
                    <Button variant="outline" className="w-full group/btn">
                      Download Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  }
                />
              </div>

              <div className="group border rounded-lg bg-card p-6 sm:p-8 text-center hover:shadow-md transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Investment Guide</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Learn about real estate investing with our detailed guide
                  covering strategies and market insights.
                </p>
                <InformationRequest
                  resourceType="investment-guide"
                  trigger={
                    <Button variant="outline" className="w-full group/btn">
                      Download Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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

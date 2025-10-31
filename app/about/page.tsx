import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, Users, TrendingUp } from "lucide-react";
import { NewsletterSignup } from "@/components/lead-generation/newsletter-signup";
import { SocialProof } from "@/components/lead-generation/social-proof";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            About PrimeRealty
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Your trusted partner in real estate for over a decade. We're committed to making your property dreams a reality.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded with a vision to transform the real estate industry, PrimeRealty has been serving clients
              with integrity, expertise, and unparalleled service for over 10 years. We understand that buying,
              selling, or renting a property is one of life's most significant decisions, and we're here to make
              that process as smooth and stress-free as possible.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of experienced professionals combines deep market knowledge with personalized service to
              ensure that every client finds exactly what they're looking for. Whether you're a first-time buyer,
              seasoned investor, or looking for your next home, we have the expertise to guide you every step of
              the way.
            </p>
          </section>

          {/* Values */}
          <section className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Integrity</h3>
                  <p className="text-muted-foreground">
                    We conduct all our business with honesty, transparency, and ethical practices.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in every interaction, ensuring the best possible outcomes for our clients.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Client-Focused</h3>
                  <p className="text-muted-foreground">
                    Your needs and goals are our top priority. We listen, understand, and deliver personalized solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We leverage the latest technology and market insights to provide cutting-edge real estate solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="text-center space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Properties Sold</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">1,200+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">10+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">25+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Expert Agents</div>
            </div>
          </section>

          {/* Mission */}
          <section className="space-y-3 sm:space-y-4 mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower individuals and families in their real estate journey by providing exceptional service,
              expert guidance, and innovative solutions. We believe everyone deserves to find their perfect place
              to call home, and we're dedicated to making that happen.
            </p>
          </section>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 sm:mt-16">
          <NewsletterSignup variant="card" />
        </div>
      </div>
    </div>
  );
}


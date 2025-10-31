"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "inline" | "compact" | "card";
  placeholder?: string;
  className?: string;
}

export function NewsletterSignup({
  variant = "inline",
  placeholder = "Enter your email",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={submitted}>
          {submitted ? <Check className="h-4 w-4" /> : "Subscribe"}
        </Button>
      </form>
    );
  }

  if (variant === "card") {
    return (
      <div className={`bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-xl p-8 sm:p-10 shadow-lg ${className}`}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">Stay in the Loop</h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            Get weekly property updates, market insights, and exclusive listings delivered to your inbox
          </p>
        </div>
        {submitted ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center gap-3 text-primary mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-6 w-6" />
              </div>
            </div>
            <p className="text-lg font-semibold">Thanks for subscribing!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Check your email to confirm your subscription
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base"
              />
              <Button type="submit" size="lg" className="h-12 px-8 text-base">
                Subscribe Now
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              🔒 No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        )}
      </div>
    );
  }

  // Inline variant (default)
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" size="lg" disabled={submitted}>
          {submitted ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Subscribed!
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
    </form>
  );
}


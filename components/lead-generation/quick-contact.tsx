"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageSquare, Check } from "lucide-react";

interface QuickContactProps {
  variant?: "default" | "inline" | "minimal";
  title?: string;
  showPhone?: boolean;
}

export function QuickContact({
  variant = "default",
  title = "Quick Contact",
  showPhone = true,
}: QuickContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quick contact:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <Input
          name="phone"
          type="tel"
          placeholder="Phone (Optional)"
          value={formData.phone}
          onChange={handleChange}
        />
        <Button type="submit" className="w-full" disabled={submitted}>
          {submitted ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Sent!
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" onClick={handleSubmit} disabled={submitted} size="lg">
          {submitted ? "Sent!" : "Contact Us"}
        </Button>
      </div>
    );
  }

  // Default variant
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Message Sent!</h3>
            <p className="text-sm text-muted-foreground">
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {showPhone && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Send Message
            </Button>
          </form>
        )}
        {showPhone && (
          <div className="mt-6 pt-6 border-t space-y-3">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </a>
            <a
              href="mailto:info@primerealty.com"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>info@primerealty.com</span>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


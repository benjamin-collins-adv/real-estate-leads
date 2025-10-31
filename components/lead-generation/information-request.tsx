"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Check, Mail } from "lucide-react";

interface InformationRequestProps {
  trigger?: React.ReactNode;
  propertyId?: string;
  resourceType?: "property-details" | "market-report" | "buying-guide" | "investment-guide";
}

const resources = {
  "property-details": {
    title: "Download Property Details",
    description: "Get comprehensive property information including floor plans, neighborhood data, and pricing analysis.",
    icon: FileText,
  },
  "market-report": {
    title: "Download Market Report",
    description: "Access our latest market analysis report with trends, forecasts, and investment opportunities.",
    icon: Download,
  },
  "buying-guide": {
    title: "Download Home Buying Guide",
    description: "Get our free comprehensive guide on buying your first home with tips, checklists, and expert advice.",
    icon: FileText,
  },
  "investment-guide": {
    title: "Download Investment Guide",
    description: "Learn about real estate investing with our detailed guide covering strategies and market insights.",
    icon: Download,
  },
};

export function InformationRequest({
  trigger,
  propertyId,
  resourceType = "property-details",
}: InformationRequestProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: resourceType,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const resource = resources[resourceType];
  const Icon = resource.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Information request:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: resourceType,
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon className="h-6 w-6" />
            {resource.title}
          </DialogTitle>
          <DialogDescription>
            {resource.description} Fill out the form below to get instant access.
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Information Sent!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Check your email for the download link and detailed information.
            </p>
            <p className="text-xs text-muted-foreground">
              We've also sent you additional resources that might interest you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
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
                <Label htmlFor="email">Email Address *</Label>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {propertyId && (
              <div className="space-y-2">
                <Label htmlFor="property">Property of Interest</Label>
                <Input
                  id="property"
                  name="property"
                  value={propertyId}
                  readOnly
                  className="bg-muted"
                />
              </div>
            )}
            {!propertyId && (
              <div className="space-y-2">
                <Label htmlFor="interest">Information You're Interested In *</Label>
                <Select
                  value={formData.interest}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    interest: value as "property-details" | "market-report" | "buying-guide" | "investment-guide"
                  })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property-details">Property Details & Listings</SelectItem>
                    <SelectItem value="market-report">Market Report & Analysis</SelectItem>
                    <SelectItem value="buying-guide">Home Buying Guide</SelectItem>
                    <SelectItem value="investment-guide">Investment Guide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="message">Additional Information Needed (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Tell us what specific information you're looking for..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Get Information Now
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to receive property information and market updates via email.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}


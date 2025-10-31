"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";

interface NewsletterPopupProps {
  trigger: "exit-intent" | "time-based" | "scroll";
  delay?: number; // for time-based, in seconds
  scrollPercentage?: number; // for scroll-based, 0-100
}

export function NewsletterPopup({
  trigger,
  delay = 5,
  scrollPercentage = 50,
}: NewsletterPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem("newsletter-popup-shown");
    if (shown) {
      setHasShown(true);
      return;
    }

    if (trigger === "time-based") {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("newsletter-popup-shown", "true");
      }, delay * 1000);
      return () => clearTimeout(timer);
    }

    if (trigger === "scroll") {
      const handleScroll = () => {
        const scrollPercent =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= scrollPercentage && !hasShown) {
          setOpen(true);
          setHasShown(true);
          sessionStorage.setItem("newsletter-popup-shown", "true");
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (trigger === "exit-intent") {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasShown) {
          setOpen(true);
          setHasShown(true);
          sessionStorage.setItem("newsletter-popup-shown", "true");
          document.removeEventListener("mouseleave", handleMouseLeave);
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [trigger, delay, scrollPercentage, hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send to your email service
    console.log("Newsletter signup:", email);
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setEmail("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Stay Updated!</DialogTitle>
          <DialogDescription>
            Subscribe to our newsletter for exclusive property listings, market insights, and real estate tips.
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
            <p className="text-sm text-muted-foreground">
              Check your email to confirm your subscription.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Subscribe Now
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}


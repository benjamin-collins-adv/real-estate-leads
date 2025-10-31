"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Megaphone, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PromotionalBannerProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  variant?: "default" | "warning" | "success";
  dismissible?: boolean;
}

export function PromotionalBanner({
  title,
  description,
  ctaText,
  ctaLink,
  variant = "default",
  dismissible = true,
}: PromotionalBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const variants = {
    default: "bg-primary text-primary-foreground",
    warning: "bg-yellow-500 text-yellow-950",
    success: "bg-green-600 text-white",
  };

  return (
    <div className={`${variants[variant]} py-2 sm:py-3`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base">{title}</p>
              {description && (
                <p className="text-xs sm:text-sm opacity-90 mt-0.5">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="whitespace-nowrap"
            >
              <Link href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {dismissible && (
              <button
                onClick={() => setVisible(false)}
                className="p-1 hover:opacity-70 transition-opacity"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


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
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs sm:text-sm md:text-base truncate">{title}</p>
              {description && (
                <p className="text-xs sm:text-sm opacity-90 mt-0.5 hidden sm:block">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="whitespace-nowrap text-xs sm:text-sm h-7 sm:h-9 px-2 sm:px-4"
            >
              <Link href={ctaLink} className="flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">{ctaText}</span>
                <span className="sm:hidden">Download</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
            {dismissible && (
              <button
                onClick={() => setVisible(false)}
                className="p-1 hover:opacity-70 transition-opacity flex-shrink-0"
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


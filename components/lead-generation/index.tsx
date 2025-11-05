// Lead Generation Components Container
"use client";

import { NewsletterPopup } from "./newsletter-popup";
import { FloatingCTA } from "./floating-cta";
import { CookieConsent } from "./cookie-consent";
import { PromotionalBanner } from "./promotional-banner";

export function LeadGenerationComponents() {
  return (
    <>
      {/* Exit Intent Popup - Commented out for now */}
      {/* <NewsletterPopup trigger="exit-intent" /> */}
      
      {/* Time-based Popup (shows after 10 seconds) - Commented out for now */}
      {/* <NewsletterPopup trigger="time-based" delay={10} /> */}
      
      {/* Floating CTA Button */}
      <FloatingCTA showAfterScroll={300} />
      
      {/* Cookie Consent */}
      <CookieConsent />
      
      {/* Promotional Banner */}
      <PromotionalBanner
        title="📊 Free Market Report Available!"
        description="Download our latest real estate market analysis report with trends and insights."
        ctaText="Download Now"
        ctaLink="/contact"
        variant="default"
      />
    </>
  );
}


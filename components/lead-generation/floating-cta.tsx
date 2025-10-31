"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowUp } from "lucide-react";
import { QuoteRequest } from "./quote-request";

interface FloatingCTAProps {
  showAfterScroll?: number; // pixels
}

export function FloatingCTA({ showAfterScroll = 300 }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > showAfterScroll) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <div className="flex flex-col gap-3 items-end">
        {/* Scroll to Top Button */}
        <Button
          size="icon"
          variant="outline"
          className="rounded-full shadow-lg h-12 w-12"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>

        {/* Get Property Information Button */}
        <QuoteRequest
          trigger={
            <Button
              size="lg"
              className="rounded-full shadow-lg h-14 px-6 gap-2"
            >
              <Download className="h-5 w-5" />
              <span>Get Property Info</span>
            </Button>
          }
        />
      </div>
    </div>
  );
}

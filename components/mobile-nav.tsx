"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Properties
          </Link>
          <Link
            href="/blog"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Blog
          </Link>
          <Link
            href="/resources"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Resources
          </Link>
          <Link
            href="/tools"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Tools
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <Button asChild className="mt-4">
            <Link href="/contact">Get Started</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}


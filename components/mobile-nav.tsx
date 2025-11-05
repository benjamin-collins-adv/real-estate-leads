"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Building2, BookOpen, FolderOpen, Wrench, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/resources", label: "Resources", icon: FolderOpen },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[260px] sm:w-[280px] overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 py-4 border-b">
            <SheetTitle className="text-lg font-bold">PrimeRealty</SheetTitle>
          </SheetHeader>
          
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground group"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
          
          <div className="px-3 py-4 border-t">
            <SheetClose asChild>
              <Button asChild className="w-full" size="sm">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  Get Started
                </Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


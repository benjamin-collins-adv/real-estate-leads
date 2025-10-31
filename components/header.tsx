import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-lg sm:text-xl font-bold">PrimeRealty</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              href="/properties" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Properties
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Blog
            </Link>
            <Link 
              href="/resources" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Resources
            </Link>
            <Link 
              href="/tools" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Tools
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:block">
              <Button asChild size="sm">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}


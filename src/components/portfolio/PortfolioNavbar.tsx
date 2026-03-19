'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ExternalLink, LayoutGrid } from 'lucide-react';

import { cn } from '@/lib/utils';
import DarkToggle from '@/components/navigation/DarkToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export interface PortfolioNavItem {
  slug: string;
  title: string;
  category: string;
}

interface PortfolioNavbarProps {
  items: PortfolioNavItem[];
}

export function PortfolioNavbar({ items }: PortfolioNavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/portfolio';
  const isSlug =
    pathname?.startsWith('/portfolio/') && pathname !== '/portfolio';

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 shrink-0 border-b backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        {/* Logo / Home */}
        <Link
          href="/portfolio"
          className={cn(
            'text-foreground hover:text-primary flex shrink-0 items-center gap-2 font-bold tracking-tight transition-colors',
            isHome && 'text-primary',
          )}
        >
          <span className="hidden sm:inline">Portfolio</span>
          <LayoutGrid size={20} className="sm:hidden" aria-hidden />
        </Link>

        {/* Nav links */}
        <nav className="flex min-w-0 items-center gap-0.5 sm:gap-2">
          <Link
            href="/portfolio"
            className={cn(
              'text-muted-foreground hover:text-foreground rounded-md px-2 py-1.5 text-sm font-medium transition-colors sm:px-3 sm:py-2',
              isHome && 'text-foreground bg-muted/50',
            )}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'text-muted-foreground hover:text-foreground gap-1 px-2 sm:px-3',
                  isSlug && 'text-foreground bg-muted/50',
                )}
              >
                Features
                <ChevronDown size={14} className="opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {items.map((item) => (
                <DropdownMenuItem key={item.slug} asChild>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="flex flex-col items-start gap-0.5"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="text-muted-foreground text-xs">
                      {item.category}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="https://polish-ai-tutor.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground hidden min-[400px]:flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors sm:px-3 sm:py-2"
          >
            View App
            <ExternalLink size={14} className="opacity-70" />
          </a>
        </nav>

        {/* Theme toggle */}
        <div className="flex shrink-0 items-center">
          <DarkToggle />
        </div>
      </div>
    </header>
  );
}

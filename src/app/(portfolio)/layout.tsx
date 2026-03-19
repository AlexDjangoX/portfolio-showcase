import type { ReactNode } from 'react';

import '@/app/landing-theme.css';

import { portfolioItems } from '@/lib/portfolio/portfolio-data';
import { PortfolioNavbar } from '@/components/portfolio/PortfolioNavbar';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';

const navItems = portfolioItems.map((item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category,
}));

/**
 * Standalone portfolio layout — independent navbar, footer, theme toggle.
 * No shared app chrome. Supports light/dark via next-themes.
 */
export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="landing-theme flex h-screen min-h-screen flex-col overflow-hidden bg-background">
      {/* Background grid */}
      <div
        className="hero-grid pointer-events-none fixed inset-0 z-0"
        aria-hidden
      />
      <div className="bg-primary/10 pointer-events-none fixed top-1/4 left-1/4 z-0 h-96 w-96 rounded-full blur-3xl" />

      {/* Navbar — sticky, independent */}
      <div className="relative z-20 shrink-0">
        <PortfolioNavbar items={navItems} />
      </div>

      {/* Main content — scrollable */}
      <main className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <div className="relative z-20 shrink-0">
        <PortfolioFooter />
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

export function PortfolioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-card/50 shrink-0 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/portfolio"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            View App
          </Link>
          <a
            href="https://github.com/AlexDjangoX/lexical-verb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-muted-foreground text-sm">
          © {year} Technical Showcase — PoliLex & related work
        </p>
      </div>
    </footer>
  );
}

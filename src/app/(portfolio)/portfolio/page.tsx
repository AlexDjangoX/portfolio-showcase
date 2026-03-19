import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  portfolioItems,
  projectMetrics,
  portfolioCategories,
} from '@/lib/portfolio/portfolio-data';

export const metadata: Metadata = {
  title: 'Portfolio — Technical Showcase',
  description:
    'PoliLex and related projects: payment infrastructure, grammar labs, AI integration, multi-tenant architecture, Lexical editor.',
};

export default function PortfolioPage() {
  const itemsByCategory = portfolioCategories.reduce(
    (acc, cat) => {
      acc[cat] = portfolioItems.filter((item) => item.category === cat);
      return acc;
    },
    {} as Record<string, typeof portfolioItems>,
  );

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-8 sm:mb-16">
        <span className="bg-primary/20 border-primary/40 text-foreground mb-4 inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold tracking-widest uppercase">
          Technical Showcase
        </span>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base sm:text-lg">
          PoliLex and related work: payment infrastructure, grammar labs, AI
          integration, multi-tenant architecture, Lexical editor. Built with
          Next.js 16, React 19, TypeScript, Prisma, Polar, Clerk, OpenAI.
        </p>
      </header>

      {/* About this project */}
      <section className="mb-8 sm:mb-16">
        <h2 className="text-foreground mb-4 text-xl font-bold">
          About this project
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          PoliLex is an AI-enhanced Polish language learning platform with
          enterprise-grade architecture. This portfolio showcases the technical
          depth: payment infrastructure with idempotent webhooks, grammar labs
          with structured practice, AI integration with custom components, and
          multi-tenant company portals.
        </p>
      </section>

      {/* Project-wide metrics */}
      <section className="mb-8 sm:mb-16">
        <h2 className="text-foreground mb-4 text-xl font-bold">
          Project metrics
        </h2>
        <div className="border-border bg-card flex flex-wrap gap-3 rounded-xl border p-4 sm:gap-4 sm:p-6">
          {projectMetrics.map((m, i) => (
            <div key={i} className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-primary font-bold">{m.value}</span>
              <span className="text-muted-foreground text-sm">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio items by category */}
      {portfolioCategories.map((category) => {
        const items = itemsByCategory[category];
        if (!items.length) return null;

        return (
          <section key={category} className="mb-8 sm:mb-16">
            <h2 className="text-foreground mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className="border-border bg-card hover:border-primary/50 group flex flex-col overflow-hidden rounded-xl border transition-colors"
                >
                  <div className="relative aspect-video w-full min-w-0 overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 320px) 320px, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="bg-primary/90 text-primary-foreground absolute top-3 left-3 rounded-full px-2 py-0.5 text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-foreground text-lg font-bold group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      {item.description}
                    </p>
                    <div className="text-muted-foreground mt-3 flex flex-wrap gap-1">
                      {item.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded bg-muted px-1.5 py-0.5 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

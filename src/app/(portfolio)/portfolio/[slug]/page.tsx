import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';

import { getAllSlugs, getPortfolioItem } from '@/lib/portfolio/portfolio-data';
import { getFlowDiagram } from '@/lib/portfolio/portfolio-flow-diagrams';
import { CodeBlock } from '@/components/portfolio/CodeBlock';
import { FlowDiagram } from '@/components/portfolio/FlowDiagram';

interface PortfolioSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PortfolioSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return { title: 'Portfolio' };
  return {
    title: `${item.title} — Portfolio`,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: item.image ? [{ url: item.image, alt: item.imageAlt }] : [],
    },
  };
}

export default async function PortfolioSlugPage({
  params,
}: PortfolioSlugPageProps) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/portfolio"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors sm:mb-8"
      >
        <ArrowLeft size={16} />
        Back to portfolio
      </Link>

      {/* Hero */}
      <header className="mb-8 sm:mb-12">
        <span className="bg-primary/20 border-primary/40 text-foreground mb-4 inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold tracking-widest uppercase">
          {item.category}
        </span>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            {item.title}
          </span>
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:mt-4 sm:text-lg">
          {item.description}
        </p>
      </header>

      {/* Hero image */}
      <div className="border-border bg-muted relative mb-8 aspect-video w-full min-w-0 overflow-hidden rounded-xl border sm:mb-12">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 320px) 320px, (max-width: 640px) 100vw, (max-width: 1024px) 100vw, 896px"
          priority
        />
      </div>

      {/* Problem → Solution */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
          Problem → Solution
        </h2>
        <div className="border-border bg-card rounded-lg border p-4 sm:p-6">
          <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase sm:text-sm">
            Problem
          </h3>
          <p className="text-foreground mb-4 text-sm sm:text-base">
            {item.problem}
          </p>
          <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase sm:text-sm">
            Solution
          </h3>
          <p className="text-foreground text-sm sm:text-base">
            {item.solution}
          </p>
        </div>
      </section>

      {/* Architecture (with diagram if present) */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
          Architecture
        </h2>
        {(() => {
          const flowData = getFlowDiagram(item.slug);
          if (!flowData) return null;
          const diagrams = Array.isArray(flowData)
            ? flowData
            : [{ title: undefined, ...flowData }];
          return (
            <div className="mb-4 space-y-8 sm:mb-6">
              <div className="text-muted-foreground border-border bg-muted/30 rounded-lg border px-4 py-3 text-sm sm:px-5 sm:py-4">
                <p className="text-foreground mb-1 font-medium">
                  How to read these diagrams
                </p>
                <p className="leading-relaxed">
                  Rectangles = steps. Diamonds = decisions (Yes/No). Red boxes =
                  error or exit paths. Arrows show flow. Pan and zoom with the
                  controls.
                </p>
              </div>
              {diagrams.map((d, i) => (
                <div key={i}>
                  {d.title && (
                    <h3 className="text-foreground mb-2 text-base font-semibold sm:text-lg">
                      {d.title}
                    </h3>
                  )}
                  {d.description && (
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed sm:mb-4">
                      {d.description}
                    </p>
                  )}
                  <FlowDiagram data={{ nodes: d.nodes, edges: d.edges }} />
                </div>
              ))}
            </div>
          );
        })()}
        <ul className="border-border bg-card space-y-2 rounded-lg border p-4 sm:p-6">
          {item.architecture.map((point, i) => (
            <li
              key={i}
              className="text-foreground flex gap-2 text-sm leading-relaxed"
            >
              <span className="text-primary shrink-0">•</span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Code snippets */}
      {item.codeSnippets && item.codeSnippets.length > 0 && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
            Code
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {item.codeSnippets.map((snippet, i) => (
              <CodeBlock
                key={i}
                code={snippet.code}
                language={snippet.language}
                filePath={snippet.filePath}
                caption={snippet.caption}
                highlightRanges={snippet.highlightRanges}
              />
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
          Feature Highlights
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {item.features.map((f, i) => (
            <div
              key={i}
              className="border-border bg-card rounded-lg border p-3 sm:p-4"
            >
              <h3 className="text-foreground text-sm font-semibold sm:text-base">
                {f.title}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">{f.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      {item.screenshots && item.screenshots.length > 0 && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
            Screenshots
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {item.screenshots.map((shot, i) => (
              <figure
                key={i}
                className="border-border relative min-w-0 overflow-hidden rounded-xl border"
              >
                <div className="bg-muted relative aspect-video w-full">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 320px) 320px, (max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {shot.caption && (
                  <figcaption className="text-muted-foreground border-border bg-muted/30 border-t px-3 py-2 text-xs sm:px-4 sm:text-sm">
                    {shot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Tech stack */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {item.tech.map((t) => (
            <span
              key={t}
              className="border-border bg-card rounded-md border px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Metrics */}
      {item.metrics && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
            Metrics
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {item.metrics}
          </p>
        </section>
      )}

      {/* Links */}
      {item.links && item.links.length > 0 && (
        <section className="flex flex-wrap gap-3 sm:gap-4">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
            >
              {link.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </section>
      )}
    </div>
  );
}

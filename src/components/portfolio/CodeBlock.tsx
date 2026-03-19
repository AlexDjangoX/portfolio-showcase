import { codeToHtml } from 'shiki';

export interface HighlightRange {
  startLine: number;
  endLine: number;
  className: string;
}

interface CodeBlockProps {
  code: string;
  language: string;
  filePath?: string;
  caption?: string;
  highlightRanges?: HighlightRange[];
}

export async function CodeBlock({
  code,
  language,
  filePath,
  caption,
  highlightRanges,
}: CodeBlockProps) {
  const decorations = highlightRanges?.flatMap((r) => {
    const items: { start: { line: number; character: number }; end: { line: number; character: number }; properties: { class: string } }[] = [];
    for (let line = r.startLine; line <= r.endLine; line++) {
      items.push({
        start: { line: line - 1, character: 0 },
        end: { line: line - 1, character: -1 },
        properties: { class: r.className },
      });
    }
    return items;
  });

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    ...(decorations?.length ? { decorations } : {}),
  });

  const hasHeader = filePath || caption;

  return (
    <div className="mb-6 w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-border">
      {hasHeader && (
        <div className="border-border bg-muted/50 flex min-w-0 flex-wrap items-center justify-between gap-2 overflow-hidden border-b px-3 py-2 text-sm sm:px-4">
          {filePath && (
            <span className="text-muted-foreground min-w-0 shrink font-mono text-xs truncate">
              {filePath}
            </span>
          )}
          {caption && (
            <span className="text-muted-foreground min-w-0 shrink text-xs italic">
              {caption}
            </span>
          )}
        </div>
      )}
      <div
        className="overflow-x-auto overscroll-x-auto [&_pre]:m-0 [&_pre]:min-w-max [&_pre]:rounded-none [&_pre]:p-4 [&_pre]:text-sm sm:[&_pre]:text-base"
        style={{ WebkitOverflowScrolling: 'touch' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

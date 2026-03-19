import type { FlowDiagramData } from '@/components/portfolio/FlowDiagram';

/** Flow diagram definitions per portfolio slug. Top-down layout for mobile responsiveness. */
export const portfolioFlowDiagrams: Record<
  string,
  | ({ description?: string } & FlowDiagramData)
  | {
      diagrams: Array<
        { title?: string; description?: string } & FlowDiagramData
      >;
    }
> = {
  'payment-system': {
    description:
      'Webhook flow from Polar. HMAC verification first, then claim for idempotency. Apply only if not already claimed. State transitions (FREE→ACTIVE→CANCELED/REVOKED) drive the subscription lifecycle.',
    nodes: [
      { id: 'webhook', label: 'Webhook', position: { x: 0, y: 0 } },
      { id: 'hmac', label: 'HMAC verify', position: { x: 0, y: 220 } },
      {
        id: 'valid',
        label: 'Valid?',
        position: { x: 0, y: 440 },
        variant: 'decision',
      },
      {
        id: '403',
        label: '403',
        position: { x: -180, y: 680 },
        variant: 'error',
      },
      { id: 'claim', label: 'claim', position: { x: 180, y: 680 } },
      {
        id: 'claimed',
        label: 'claimed?',
        position: { x: 180, y: 920 },
        variant: 'decision',
      },
      {
        id: 'skip',
        label: 'skip',
        position: { x: 0, y: 1160 },
        variant: 'error',
      },
      { id: 'apply', label: 'apply', position: { x: 180, y: 1160 } },
      { id: 'mark', label: 'mark', position: { x: 180, y: 1400 } },
      { id: 'free', label: 'FREE', position: { x: 0, y: 1640 } },
      { id: 'active', label: 'ACTIVE', position: { x: 0, y: 1880 } },
      { id: 'canceled', label: 'CANCELED', position: { x: -180, y: 2120 } },
      { id: 'revoked', label: 'REVOKED', position: { x: 180, y: 2120 } },
    ],
    edges: [
      { id: 'e1', source: 'webhook', target: 'hmac' },
      { id: 'e2', source: 'hmac', target: 'valid' },
      {
        id: 'e3',
        source: 'valid',
        target: '403',
        label: 'No',
        sourceHandle: 'no',
      },
      {
        id: 'e4',
        source: 'valid',
        target: 'claim',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      { id: 'e5', source: 'claim', target: 'claimed' },
      {
        id: 'e6',
        source: 'claimed',
        target: 'skip',
        label: 'No',
        sourceHandle: 'no',
      },
      {
        id: 'e7',
        source: 'claimed',
        target: 'apply',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      { id: 'e8', source: 'apply', target: 'mark' },
      { id: 'e9', source: 'free', target: 'active', label: 'active' },
      { id: 'e10', source: 'active', target: 'canceled', label: 'canceled' },
      { id: 'e11', source: 'active', target: 'revoked', label: 'revoked' },
      { id: 'e12', source: 'canceled', target: 'free', label: 'period.ended' },
    ],
  },
  'grammar-labs': {
    nodes: [
      { id: 'load', label: 'Load pairs', position: { x: 0, y: 0 } },
      { id: 'show', label: 'Show event', position: { x: 0, y: 220 } },
      {
        id: 'select',
        label: 'User selects aspect',
        position: { x: 0, y: 440 },
      },
      {
        id: 'correct',
        label: 'Correct?',
        position: { x: 0, y: 660 },
        variant: 'decision',
      },
      { id: 'inc', label: 'Increment correct', position: { x: -180, y: 900 } },
      { id: 'explain', label: 'Show explanation', position: { x: 0, y: 1120 } },
      { id: 'next', label: 'handleNext', position: { x: 0, y: 1340 } },
      {
        id: 'more',
        label: 'More events?',
        position: { x: 0, y: 1560 },
        variant: 'decision',
      },
      { id: 'accuracy', label: 'Show accuracy', position: { x: 0, y: 1780 } },
    ],
    edges: [
      { id: 'e1', source: 'load', target: 'show' },
      { id: 'e2', source: 'show', target: 'select' },
      { id: 'e3', source: 'select', target: 'correct' },
      {
        id: 'e4',
        source: 'correct',
        target: 'inc',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e5',
        source: 'correct',
        target: 'explain',
        label: 'No',
        sourceHandle: 'no',
      },
      { id: 'e6', source: 'inc', target: 'explain' },
      { id: 'e7', source: 'explain', target: 'next' },
      { id: 'e8', source: 'next', target: 'more' },
      {
        id: 'e9',
        source: 'more',
        target: 'show',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e10',
        source: 'more',
        target: 'accuracy',
        label: 'No',
        sourceHandle: 'no',
      },
    ],
  },
  'tambo-ai': {
    nodes: [
      { id: 'user', label: 'User message', position: { x: 0, y: 0 } },
      { id: 'tambo', label: 'Tambo API', position: { x: 0, y: 220 } },
      { id: 'tools', label: 'Tools', position: { x: -180, y: 460 } },
      { id: 'agent', label: 'Agent', position: { x: 0, y: 460 } },
      {
        id: 'pick',
        label: 'Pick component + stream props',
        position: { x: 0, y: 700 },
      },
      {
        id: 'zod',
        label: 'propsSchema (Zod)',
        position: { x: 0, y: 960 },
        variant: 'decision',
      },
      {
        id: 'render',
        label: 'message.renderedComponent',
        position: { x: -180, y: 1220 },
      },
      {
        id: 'fallback',
        label: 'Fallback / error',
        position: { x: 180, y: 1220 },
        variant: 'error',
      },
    ],
    edges: [
      { id: 'e1', source: 'user', target: 'tambo' },
      { id: 'e2', source: 'tambo', target: 'agent' },
      { id: 'e3', source: 'tambo', target: 'tools', label: 'may call' },
      { id: 'e4', source: 'tools', target: 'agent' },
      { id: 'e5', source: 'agent', target: 'pick' },
      { id: 'e6', source: 'pick', target: 'zod', label: 'from registry' },
      {
        id: 'e7',
        source: 'zod',
        target: 'render',
        label: 'Valid',
        sourceHandle: 'yes',
      },
      {
        id: 'e8',
        source: 'zod',
        target: 'fallback',
        label: 'Invalid',
        sourceHandle: 'no',
      },
    ],
  },
  'multi-tenant': {
    description:
      'Middleware flow for /companies/:slug routes. Metadata from Clerk is the source of truth—URL slug must match or the user is redirected to their actual company. x-company-slug header is set for downstream use.',
    nodes: [
      {
        id: 'request',
        label: 'User visits /companies/acme/blog',
        position: { x: 0, y: 0 },
      },
      {
        id: 'urlSlug',
        label: 'Company in URL = acme',
        position: { x: 0, y: 200 },
      },
      {
        id: 'noSlug',
        label: 'URL has no company?',
        position: { x: 0, y: 400 },
        variant: 'decision',
      },
      {
        id: 'redirectList',
        label: 'Redirect → /companies',
        position: { x: -220, y: 600 },
        variant: 'error',
      },
      {
        id: 'userCompany',
        label: "User's company from Clerk = acme",
        position: { x: 0, y: 600 },
      },
      {
        id: 'noUser',
        label: 'User has no company?',
        position: { x: 0, y: 800 },
        variant: 'decision',
      },
      {
        id: 'wrong',
        label: "URL company ≠ user's company?",
        position: { x: 0, y: 1000 },
        variant: 'decision',
      },
      {
        id: 'redirectFix',
        label: "Redirect → /companies/{user's company}/blog",
        position: { x: -220, y: 1200 },
        variant: 'error',
      },
      {
        id: 'header',
        label: 'Same company → add x-company-slug header, continue',
        position: { x: 0, y: 1200 },
      },
    ],
    edges: [
      { id: 'e1', source: 'request', target: 'urlSlug' },
      { id: 'e2', source: 'urlSlug', target: 'noSlug' },
      {
        id: 'e3',
        source: 'noSlug',
        target: 'redirectList',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e4',
        source: 'noSlug',
        target: 'userCompany',
        label: 'No',
        sourceHandle: 'no',
      },
      { id: 'e5', source: 'userCompany', target: 'noUser' },
      {
        id: 'e6',
        source: 'noUser',
        target: 'redirectList',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e7',
        source: 'noUser',
        target: 'wrong',
        label: 'No',
        sourceHandle: 'no',
      },
      {
        id: 'e8',
        source: 'wrong',
        target: 'redirectFix',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e9',
        source: 'wrong',
        target: 'header',
        label: 'No',
        sourceHandle: 'no',
      },
    ],
  },
  'lexical-editor': {
    nodes: [
      { id: 'paste', label: 'Paste URL', position: { x: -140, y: 0 } },
      { id: 'toolbar', label: 'Toolbar', position: { x: 140, y: 0 } },
      { id: 'auto', label: 'AutoEmbedPlugin', position: { x: -140, y: 220 } },
      { id: 'yt', label: 'YouTubePlugin', position: { x: 140, y: 220 } },
      { id: 'create', label: '$createYouTubeNode', position: { x: 0, y: 440 } },
      { id: 'node', label: 'YouTubeNode', position: { x: 0, y: 660 } },
      { id: 'export', label: 'exportJSON', position: { x: 0, y: 880 } },
      { id: 'blog', label: 'Blog / PDF', position: { x: 0, y: 1100 } },
    ],
    edges: [
      { id: 'e1', source: 'paste', target: 'auto' },
      { id: 'e2', source: 'toolbar', target: 'yt' },
      { id: 'e3', source: 'auto', target: 'create' },
      { id: 'e4', source: 'yt', target: 'create' },
      { id: 'e5', source: 'create', target: 'node' },
      { id: 'e6', source: 'node', target: 'export' },
      { id: 'e7', source: 'export', target: 'blog' },
    ],
  },
  'stream-chat': {
    nodes: [
      { id: 'enable', label: 'User enables push', position: { x: 0, y: 0 } },
      { id: 'token', label: 'getFCMToken', position: { x: 0, y: 220 } },
      {
        id: 'check',
        label: 'Token?',
        position: { x: 0, y: 440 },
        variant: 'decision',
      },
      {
        id: 'error',
        label: 'Error: Firebase config',
        position: { x: -180, y: 680 },
        variant: 'error',
      },
      { id: 'add', label: 'addDevice', position: { x: 180, y: 680 } },
      {
        id: 'store',
        label: 'Stream stores device',
        position: { x: 180, y: 900 },
      },
      {
        id: 'push',
        label: 'Push on new message',
        position: { x: 180, y: 1120 },
      },
      { id: 'logout', label: 'User logs out', position: { x: 0, y: 1340 } },
      { id: 'remove', label: 'removeDevice', position: { x: 0, y: 1560 } },
    ],
    edges: [
      { id: 'e1', source: 'enable', target: 'token' },
      { id: 'e2', source: 'token', target: 'check' },
      {
        id: 'e3',
        source: 'check',
        target: 'error',
        label: 'No',
        sourceHandle: 'no',
      },
      {
        id: 'e4',
        source: 'check',
        target: 'add',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      { id: 'e5', source: 'add', target: 'store' },
      { id: 'e6', source: 'store', target: 'push' },
      { id: 'e7', source: 'logout', target: 'remove' },
    ],
  },
  'supabase-rls-storage': {
    description:
      'Every Supabase query or storage access goes through Clerk JWT. Table policies check userId = clerk_id. Storage policies check path = get_current_user_secure_folder(). RLS enforces at the database layer.',
    nodes: [
      {
        id: 'request',
        label: 'App query / storage access',
        position: { x: 0, y: 0 },
      },
      {
        id: 'jwt',
        label: 'Clerk JWT → auth.jwt()',
        position: { x: 0, y: 200 },
      },
      {
        id: 'clerkId',
        label: 'get_current_user_clerk_id()',
        position: { x: 0, y: 400 },
      },
      {
        id: 'table',
        label: 'Table?',
        position: { x: 0, y: 600 },
        variant: 'decision',
      },
      {
        id: 'tablePolicy',
        label: 'userId = clerk_id',
        position: { x: -200, y: 800 },
      },
      {
        id: 'storagePolicy',
        label: 'path = secure_folder()',
        position: { x: 200, y: 800 },
      },
      { id: 'allow', label: 'Allow', position: { x: 0, y: 1000 } },
      {
        id: 'deny',
        label: 'Deny',
        position: { x: 0, y: 1200 },
        variant: 'error',
      },
    ],
    edges: [
      { id: 'e1', source: 'request', target: 'jwt' },
      { id: 'e2', source: 'jwt', target: 'clerkId' },
      { id: 'e3', source: 'clerkId', target: 'table' },
      {
        id: 'e4',
        source: 'table',
        target: 'tablePolicy',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e5',
        source: 'table',
        target: 'storagePolicy',
        label: 'No',
        sourceHandle: 'no',
      },
      { id: 'e6', source: 'tablePolicy', target: 'allow' },
      { id: 'e7', source: 'storagePolicy', target: 'allow' },
    ],
  },
  'zuplo-gateway': {
    description:
      'Zuplo sits in front of the app. Polar webhooks are IP-allowlisted. Transcript proxy requests require a valid API key. Both paths forward to Vercel only when checks pass.',
    nodes: [
      {
        id: 'request',
        label: 'Request (webhook or transcript)',
        position: { x: 0, y: 0 },
      },
      { id: 'zuplo', label: 'Zuplo edge', position: { x: 0, y: 200 } },
      {
        id: 'type',
        label: 'Webhook?',
        position: { x: 0, y: 400 },
        variant: 'decision',
      },
      {
        id: 'ipCheck',
        label: 'Polar IP allowlist?',
        position: { x: -200, y: 600 },
        variant: 'decision',
      },
      {
        id: 'keyCheck',
        label: 'Valid API key?',
        position: { x: 200, y: 600 },
        variant: 'decision',
      },
      {
        id: 'deny',
        label: '403 / 401',
        position: { x: 0, y: 800 },
        variant: 'error',
      },
      {
        id: 'forward',
        label: 'Forward to Vercel',
        position: { x: 0, y: 1000 },
      },
    ],
    edges: [
      { id: 'e1', source: 'request', target: 'zuplo' },
      { id: 'e2', source: 'zuplo', target: 'type' },
      {
        id: 'e3',
        source: 'type',
        target: 'ipCheck',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e4',
        source: 'type',
        target: 'keyCheck',
        label: 'No',
        sourceHandle: 'no',
      },
      {
        id: 'e5',
        source: 'ipCheck',
        target: 'deny',
        label: 'No',
        sourceHandle: 'no',
      },
      {
        id: 'e6',
        source: 'ipCheck',
        target: 'forward',
        label: 'Yes',
        sourceHandle: 'yes',
      },
      {
        id: 'e7',
        source: 'keyCheck',
        target: 'deny',
        label: 'No',
        sourceHandle: 'no',
      },
      {
        id: 'e8',
        source: 'keyCheck',
        target: 'forward',
        label: 'Yes',
        sourceHandle: 'yes',
      },
    ],
  },
  'secure-server-actions': {
    diagrams: [
      {
        title: 'Security Pipeline',
        description:
          'Every server action must pass through these gates before touching data. Auth first, then validation, then ownership. Failures throw immediately—no partial execution.',
        nodes: [
          {
            id: 'request',
            label: 'Server action invoked',
            position: { x: 0, y: 0 },
          },
          {
            id: 'auth',
            label: 'Auth gate (requireAuth / Admin / Metadata / Subscription)',
            position: { x: 0, y: 200 },
          },
          {
            id: 'authOk',
            label: 'Authenticated?',
            position: { x: 0, y: 400 },
            variant: 'decision',
          },
          {
            id: 'throwAuth',
            label: 'Throw',
            position: { x: -200, y: 600 },
            variant: 'error',
          },
          {
            id: 'zod',
            label: 'Zod schema.safeParse(input)',
            position: { x: 0, y: 600 },
          },
          {
            id: 'valid',
            label: 'Valid?',
            position: { x: 0, y: 800 },
            variant: 'decision',
          },
          {
            id: 'throwValid',
            label: 'Throw',
            position: { x: -200, y: 1000 },
            variant: 'error',
          },
          {
            id: 'ownership',
            label: 'Ownership / Tenant check (userId, companySlug)',
            position: { x: 0, y: 1000 },
          },
          {
            id: 'pass',
            label: 'Pass?',
            position: { x: 0, y: 1200 },
            variant: 'decision',
          },
          {
            id: 'throwOwn',
            label: 'Throw',
            position: { x: -200, y: 1400 },
            variant: 'error',
          },
          {
            id: 'db',
            label: 'DB + RLS (defense in depth)',
            position: { x: 0, y: 1400 },
          },
        ],
        edges: [
          { id: 'e1', source: 'request', target: 'auth' },
          { id: 'e2', source: 'auth', target: 'authOk' },
          {
            id: 'e3',
            source: 'authOk',
            target: 'throwAuth',
            label: 'No',
            sourceHandle: 'no',
          },
          {
            id: 'e4',
            source: 'authOk',
            target: 'zod',
            label: 'Yes',
            sourceHandle: 'yes',
          },
          { id: 'e5', source: 'zod', target: 'valid' },
          {
            id: 'e6',
            source: 'valid',
            target: 'throwValid',
            label: 'No',
            sourceHandle: 'no',
          },
          {
            id: 'e7',
            source: 'valid',
            target: 'ownership',
            label: 'Yes',
            sourceHandle: 'yes',
          },
          { id: 'e8', source: 'ownership', target: 'pass' },
          {
            id: 'e9',
            source: 'pass',
            target: 'throwOwn',
            label: 'No',
            sourceHandle: 'no',
          },
          {
            id: 'e10',
            source: 'pass',
            target: 'db',
            label: 'Yes',
            sourceHandle: 'yes',
          },
        ],
      },
      {
        title: 'Auth Helpers — When to Use Which',
        description:
          'Choose the right helper based on the action scope. User-scoped actions use requireAuth. Admin-only uses requireAdmin (Clerk metadata, never DB). Company-scoped uses requireAuthWithMetadata. Paid features use requireSubscription.',
        nodes: [
          { id: 'action', label: 'Action scope?', position: { x: 0, y: 0 } },
          {
            id: 'user',
            label: 'requireAuth → clerkId',
            position: { x: -260, y: 260 },
          },
          {
            id: 'admin',
            label: 'requireAdmin → Clerk metadata isAdmin',
            position: { x: -85, y: 260 },
          },
          {
            id: 'tenant',
            label: 'requireAuthWithMetadata → companySlug, role',
            position: { x: 90, y: 260 },
          },
          {
            id: 'sub',
            label: 'requireSubscription → active plan',
            position: { x: 265, y: 260 },
          },
        ],
        edges: [
          { id: 'e1', source: 'action', target: 'user', label: 'User' },
          { id: 'e2', source: 'action', target: 'admin', label: 'Admin' },
          { id: 'e3', source: 'action', target: 'tenant', label: 'Company' },
          { id: 'e4', source: 'action', target: 'sub', label: 'Paid' },
        ],
      },
    ],
  },
};

export function getFlowDiagram(
  slug: string,
):
  | FlowDiagramData
  | Array<{ title?: string; description?: string } & FlowDiagramData>
  | undefined {
  const entry = portfolioFlowDiagrams[slug];
  if (!entry) return undefined;
  if ('diagrams' in entry) return entry.diagrams;
  return entry;
}

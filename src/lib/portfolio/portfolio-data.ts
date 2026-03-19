/**
 * Portfolio items for technical showcase.
 * Each item maps to portfolio/[slug].
 */

export interface HighlightRange {
  startLine: number;
  endLine: number;
  className: string;
}

export interface CodeSnippet {
  code: string;
  language: string;
  filePath?: string;
  caption?: string;
  highlightRanges?: HighlightRange[];
}

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  tech: string[];
  problem: string;
  solution: string;
  architecture: string[];
  features: { title: string; benefit: string }[];
  metrics?: string;
  links?: { label: string; href: string }[];
  codeSnippets?: CodeSnippet[];
  screenshots?: Screenshot[];
}

/** Project-wide metrics for portfolio index */
export const projectMetrics = [
  { value: '4,400+', label: 'tests' },
  { value: '355+', label: 'payment tests' },
  { value: '1,631', label: 'UI component tests' },
  { value: '33', label: 'cron tests' },
  { value: '87%', label: 'payment logic coverage' },
] as const;

/** Categories for grouping portfolio items */
export const portfolioCategories = [
  'Full-Stack',
  'Payments',
  'Learning Modules',
  'AI Integration',
  'Architecture',
  'Infrastructure',
  'Rich Editor',
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'polilex',
    title: 'PoliLex Bilingual',
    description: 'AI-enhanced Polish language learning platform with enterprise-grade architecture.',
    image: '/home-page.png',
    imageAlt: 'PoliLex Bilingual — AI-Enhanced Polish Language Learning Platform home page with conjugation table',
    category: 'Full-Stack',
    tech: ['Next.js 16', 'React 19', 'TypeScript 5.9', 'Prisma 7', 'PostgreSQL', 'Clerk', 'Polar', 'OpenAI'],
    problem:
      'Polish learners need structured practice beyond phrase apps—conjugation, aspect, case, and grammar require real depth. Most tools treat Polish like a simple vocabulary game.',
    solution:
      'Built a platform focused on verb mastery (conjugation tables, aspect pairs, prefixes), grammatical case, and AI-powered practice. Conjugation table with imperfective/perfective pairs, grammar labs, and Tambo AI tutor.',
    architecture: [
      'Next.js App Router with (landing), (home), (auth) route groups',
      'Clerk auth → DB (Prisma) → Clerk metadata sync for routing',
      'Polar webhooks → claim→apply→mark idempotency → DB + Clerk',
      'Four cron jobs: polar reconciliation, clerk reconciliation, webhook cleanup, webhook recovery',
    ],
    features: [
      { title: 'Conjugation Table', benefit: 'Imperfective/perfective pairs with person forms, highlighted endings' },
      { title: 'Grammar Labs', benefit: 'Aspect Master, Reflexive Lab, Preposition Lab, Motion Lab, Conjugator' },
      { title: 'Tambo AI Tutor', benefit: 'Context-aware chat, persistent threads, custom interactive components' },
      { title: 'Stream Chat', benefit: 'Real-time messaging with FCM push notifications' },
      { title: 'Lexical Editor', benefit: 'Rich text, YouTube/audio embedding, collaborative editing' },
    ],
    metrics: '4,400+ tests (355+ payment, 1,631 UI, 33 cron). 87% payment logic coverage.',
    links: [
      { label: 'View live app', href: 'https://lexical-verb.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/AlexDjangoX/lexical-verb' },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'PoliLex Bilingual landing page with conjugation table', caption: 'Landing page — hero, conjugation table, navigation' },
    ],
  },
  {
    slug: 'payment-system',
    title: 'Production Payment Infrastructure',
    description: 'Polar subscriptions, webhook idempotency, custom UI — 355+ tests, fail-closed for money.',
    image: '/home-page.png',
    imageAlt: 'Credits page with subscription plans and token balance',
    category: 'Payments',
    tech: ['Polar', 'Prisma', 'Clerk', 'Next.js', 'Zod', 'Zuplo'],
    problem:
      'Stripe left tax compliance to merchants; needed global sales without jurisdiction-specific registrations. Webhooks can arrive multiple times—double-crediting would be catastrophic.',
    solution:
      'Polar as Merchant of Record for VAT/GST globally. Claim→apply→mark idempotency with stable keys. Modular webhook handlers in src/hooks/webhooks/polar/. 95% in-app subscription UI; Polar portal for payment-sensitive 5%.',
    architecture: [
      'Webhook: Route → HMAC verify → claimWebhookEvent → apply (transitionSubscription, handleTopup, etc.) → markWebhookEventProcessed',
      'Dual-balance: tokenBalance (subscription, resets) + topupTokenBalance (purchased, persists)',
      'Four crons: polar-reconciliation (4 AM), clerk-reconciliation (3 AM), webhook-cleanup (2 AM), webhook-recovery (5 AM)',
      'Zuplo: IP allowlisting, rate limiting, audit logging',
    ],
    features: [
      { title: 'Claim→Mark Idempotency', benefit: 'P2002 on duplicate; no DB read, no conditional apply' },
      { title: 'Custom Subscription UI', benefit: 'SubscriptionPlans, ManageSubscriptionBadge, ConfirmationDialog, PaymentFailureAlert' },
      { title: 'State Machine', benefit: 'FREE → ACTIVE → CANCELED_PENDING → REVOKED transitions' },
      { title: 'Reconciliation', benefit: 'Self-healing DB↔Clerk desync detection' },
    ],
    metrics: '355+ payment tests. 13 idempotency tests (claim→mark, replay prevention, fail-closed).',
    links: [
      { label: 'Credits page', href: 'https://lexical-verb.vercel.app/credits' },
    ],
    codeSnippets: [
      {
        code: `export async function claimWebhookEvent(params: {
  provider: 'polar' | 'stripe' | 'clerk';
  eventType: string;
  eventId: string;
  payloadSnapshot: WebhookEventPayload;
}): Promise<{ claimed: boolean }> {
  const { provider, eventType, eventId, payloadSnapshot } = params;

  try {
    await webhookPrisma.webhookEvent.create({
      data: {
        provider,
        eventType,
        eventId,
        payloadSnapshot: payloadSnapshot as object,
      },
    });

    return { claimed: true };
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === 'P2002') {
      return { claimed: false };
    }

    throw new Error('Idempotency claim failed — webhook aborted', {
      cause: error,
    });
  }
}`,
        language: 'typescript',
        filePath: 'src/lib/polar/webhook-idempotency.ts',
        caption: 'Claim inserts with unique (provider, eventType, eventId). P2002 = duplicate → skip.',
      },
      {
        code: `const { claimed } = await claimWebhookEvent({
  provider: 'polar',
  eventType,
  eventId,
  payloadSnapshot,
});
if (!claimed) {
  return Response.json({ received: true });
}

const resultSnapshot = await transitionSubscription({
  eventType,
  payload,
});
if (resultSnapshot) {
  await markWebhookEventProcessed({
    provider: 'polar',
    eventType,
    eventId,
    resultSnapshot,
  });
}`,
        language: 'typescript',
        filePath: 'src/app/api/webhook/polar/route.ts',
        caption: 'Claim → apply → mark flow. Duplicate webhooks return early with no side effects.',
      },
      {
        code: `export function reduceSubscriptionState(
  current: SubscriptionState,
  event: SubscriptionEvent,
): SubscriptionState | null {
  switch (current) {
    case 'FREE':
      if (event === 'subscription.created') return 'ACTIVE';
      if (event === 'subscription.active') return 'ACTIVE';
      return null;

    case 'ACTIVE':
      if (event === 'subscription.past_due') return 'PAST_DUE';
      if (event === 'subscription.canceled') return 'CANCELED_PENDING';
      if (event === 'subscription.revoked') return 'REVOKED';
      if (event === 'subscription.updated') return 'ACTIVE';
      return null;

    case 'CANCELED_PENDING':
      if (event === 'period.ended') return 'FREE';
      if (event === 'subscription.uncanceled') return 'ACTIVE';
      // ...
      return null;
  }
}`,
        language: 'typescript',
        filePath: 'src/hooks/webhooks/polar/state-machine.ts',
        caption: 'Pure reducer: current state + event → next state. No side effects.',
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Credits page placeholder', caption: 'Placeholder — add Credits page, subscription plans, Manage badge screenshots' },
    ],
  },
  {
    slug: 'grammar-labs',
    title: 'Grammar Labs',
    description: 'Structured practice for verbs, aspect, case, and vocabulary.',
    image: '/home-page.png',
    imageAlt: 'Aspect Master grammar lab with verb aspect practice',
    category: 'Learning Modules',
    tech: ['React 19', 'TypeScript', 'Tailwind', 'Framer Motion', 'Prisma'],
    problem:
      'Polish grammar is complex—aspect, case, reflexive verbs, motion pairs. Learners need structured drills, not random phrases.',
    solution:
      'Built 10+ grammar labs: Aspect Master (timeline, quiz, challenge), Reflexive Lab, Preposition Lab, Motion Lab, Verb Prefixes, Conjugator (Kanban), Word Wizard, Flashcards, Cases, Occupations (5 games).',
    architecture: [
      'Lab-specific routes: /aspect-master, /reflexive-lab, /preposition-lab, /motion-lab, /conjugator, etc.',
      'Shared components: FlipCard, Quiz, Challenge, Progress tracking',
      'DB: verbs, aspects, cases, flashcards, user progress',
    ],
    features: [
      { title: 'Aspect Master', benefit: 'Timeline visualization, quiz, challenge, imperfective/perfective comparison' },
      { title: 'Conjugator', benefit: 'Kanban board for verb conjugation practice' },
      { title: 'Occupations', benefit: '5 games: Flashcards, Quiz, Memory, Drag & Drop, Sentence Builder' },
      { title: 'Cases', benefit: 'Fill-in-the-blank with case governance' },
    ],
    metrics: '1,631 UI component tests across subscription and learning modules.',
    codeSnippets: [
      {
        code: `export function useQuizState(eventsLength: number) {
  const [state, setState] = useState<QuizState>({
    currentEventIndex: 0,
    selectedAspect: null,
    showExplanation: false,
    correct: 0,
    total: 0,
  });

  const handleSelectAspect = useCallback(
    (aspect: 'perfective' | 'imperfective', correctAspect: 'perfective' | 'imperfective') => {
      const isCorrect = aspect === correctAspect;
      setState((prev) => ({
        ...prev,
        selectedAspect: aspect,
        showExplanation: true,
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));
      return isCorrect;
    },
    [],
  );

  const handleNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentEventIndex: Math.min(prev.currentEventIndex + 1, eventsLength - 1),
      selectedAspect: null,
      showExplanation: false,
    }));
  }, [eventsLength]);

  const accuracy = state.total > 0 ? Math.round((state.correct / state.total) * 100) : 0;
  return { ...state, accuracy, handleSelectAspect, handleNext } as const;
}`,
        language: 'typescript',
        filePath: 'src/components/aspect-master/aspect-timeline/hooks/useQuizState.ts',
        caption: 'Aspect Master quiz state: select aspect → show explanation → next event. Accuracy computed from correct/total.',
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Grammar lab placeholder', caption: 'Placeholder — add Aspect Master, Conjugator, or lab screenshots' },
    ],
  },
  {
    slug: 'tambo-ai',
    title: 'Tambo AI Tutor',
    description: 'Context-aware conversational AI with persistent threads and custom interactive components.',
    image: '/home-page.png',
    imageAlt: 'Tambo AI tutor chat interface with learning components',
    category: 'AI Integration',
    tech: ['Tambo AI', 'React', 'OpenAI GPT-4', 'Prisma', 'Zod'],
    problem:
      'Learners need personalized instruction that adapts to the current lab (Aspect Master, Reflexive Lab, etc.) and can render interactive exercises, not just text.',
    solution:
      'Tambo SDK with lab-specific context. Custom component registry: LearningHintCard, ExerciseGenerator, ProgressVisualization. Thread persistence (localStorage + PostgreSQL). Token-based costing integrated with platform credits.',
    architecture: [
      'User message → Tambo API (LLM). Agent may call tools (getUserProgress, searchVerbs, getGrammarRules, generatePronunciationExercise) to fetch data.',
      'Agent picks component from registry (LearningHintCard, ExerciseGenerator, ProgressVisualization), streams props.',
      'propsSchema (Zod) validates streamed props before render. Valid → message.renderedComponent; invalid → fallback.',
      'TamboProvider, useTamboThread, useTamboThreadInput. Thread persistence (localStorage + PostgreSQL). Token pre-charge + actual usage reconciliation.',
    ],
    features: [
      { title: 'Lab-Specific Context', benefit: 'AI adapts to Aspect Master, Reflexive Lab, etc.' },
      { title: 'Custom Components', benefit: 'AI renders LearningHintCard, ExerciseGenerator, ProgressVisualization' },
      { title: 'Thread Persistence', benefit: 'localStorage + DB sync, archive with title/subtitle' },
      { title: 'Token Costing', benefit: 'Pre-authorization, actual usage reconciliation' },
    ],
    metrics: '122+ Tambo component and integration tests.',
    codeSnippets: [
      {
        code: `export const tamboComponents = [
  {
    name: 'LearningHintCard',
    description: 'Display contextual learning hints and tips.',
    component: LearningHintCard,
    propsSchema: learningHintCardSchema,
  },
  {
    name: 'ExerciseGenerator',
    description: 'Create interactive Polish language exercises...',
    component: ExerciseGenerator,
    propsSchema: exerciseGeneratorSchema,
  },
  {
    name: 'ProgressVisualization',
    description: 'Show user learning progress with charts and statistics.',
    component: ProgressVisualization,
    propsSchema: progressVisualizationSchema,
  },
];`,
        language: 'typescript',
        filePath: 'src/components/tambo/config/tambo-config.ts',
        caption: 'Component registry: Zod schemas validate AI-generated props before rendering.',
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Tambo AI tutor placeholder', caption: 'Placeholder — add Tambo chat, custom components screenshots' },
    ],
  },
  {
    slug: 'multi-tenant',
    title: 'Multi-Tenant Architecture',
    description: 'proxy.ts middleware: Clerk metadata is source of truth, URL slug must match or redirect.',
    image: '/home-page.png',
    imageAlt: 'Company portal with blog and video library',
    category: 'Architecture',
    tech: ['Next.js middleware', 'Clerk', 'Prisma', 'Supabase', 'Lexical'],
    problem:
      'Users must only access their assigned company. A user visiting /companies/other-org/blog must be redirected to their actual company—metadata is source of truth, not the URL.',
    solution:
      'proxy.ts (Clerk middleware) gates /companies/:slug/* routes. Extract slug from URL, compare to metadata.companySlug. Mismatch → redirect to correct company. Match → set x-company-slug header for downstream. No metadata → redirect /companies.',
    architecture: [
      'proxy.ts: isCompanySpecificRoute matches /companies/:slug/blog, /videos, /pdf, etc.',
      'Extract routeCompanySlug from pathname; metadata.companySlug from Clerk session',
      'No slug or no metadata → redirect /companies',
      'URL slug ≠ metadata → redirect to /companies/{metadata.companySlug}/...',
      'Match → requestHeaders.set("x-company-slug", metadataCompanySlug), pass through',
      'Downstream: pages/API read x-company-slug, Prisma/RLS scope by companyId',
    ],
    features: [
      { title: 'proxy.ts gate', benefit: 'Metadata is source of truth; URL cannot override' },
      { title: 'x-company-slug header', benefit: 'Downstream reads header, no re-fetch of company' },
      { title: 'Redirect on mismatch', benefit: 'User cannot access wrong tenant by URL manipulation' },
      { title: 'Blog, videos, PDFs', benefit: 'Scoped by companyId; RLS enforces at DB' },
    ],
    codeSnippets: [
      {
        code: `export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isWebhookRoute(req)) {
    return NextResponse.next();
  }

  const pathname = req.nextUrl.pathname;
  const userAgent = req.headers.get('user-agent');

  if (!pathname.startsWith('/_next/') && !pathname.startsWith('/api/webhook')) {
    if (isBlockedBot(userAgent)) {
      return new NextResponse('Forbidden - AI bot access not allowed', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
  }

  const authResult = await auth();
  const { userId, sessionClaims } = authResult;
  const metadata = (sessionClaims?.metadata || {}) as UserMetadata;
  const isAdmin = metadata?.isAdmin === true;

  if (userId && !metadata?.onboardingComplete) {
    if (isOnboardingRoute(req)) return NextResponse.next();
    return NextResponse.redirect(new URL('/onboarding', req.url), { status: 301 });
  }

  const previewOnboarding = req.nextUrl.searchParams.get('preview') === 'true';
  if (userId && isOnboardingRoute(req) && metadata?.onboardingComplete && !previewOnboarding) {
    const companySlug = metadata?.companySlug || 'polilex-bilingual';
    return NextResponse.redirect(new URL(\`/companies/\${companySlug}\`, req.url), { status: 301 });
  }

  const isProtected = isProtectedRoute(req);
  let response: NextResponse | null = null;
  if (isProtected && !pathname.startsWith('/sign-in') && !pathname.startsWith('/onboarding')) {
    response = NextResponse.next();
    response.headers.set('Link', \`<https://www.polish-ai-tutor.com\${pathname}>; rel="canonical"\`);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  if (isProtected) await auth.protect();

  const isSubscriptionExempt = SUBSCRIPTION_EXEMPT_ROUTES.some((r) => pathname.startsWith(r));
  if (isProtected && userId && !isAdmin && !isSubscriptionExempt && !pathname.startsWith('/sign-in') && !pathname.startsWith('/onboarding') && !pathname.startsWith('/admin')) {
    const hasActiveSubscription = metadata.hasActiveSubscription === true;
    const isFreePlan = metadata.plan === 'free';
    const freeTrialEndDate = metadata.freeTrialEndDate;
    const isWithinFreeTrial = isFreePlan && freeTrialEndDate && new Date(freeTrialEndDate) > new Date();
    const isExplicitlyCanceled = metadata.subscriptionStatus === 'canceled' || metadata.subscriptionStatus === 'revoked';
    const hasAccess = (hasActiveSubscription && !isExplicitlyCanceled) || (isWithinFreeTrial && !isExplicitlyCanceled);

    if (!hasAccess) {
      const creditsUrl = new URL('/credits', req.url);
      const hadPaidSubscription = !!metadata.polarSubscriptionId || isExplicitlyCanceled;
      const hadTrial = !!freeTrialEndDate;
      let reason = 'no-subscription';
      if (hadPaidSubscription) reason = 'subscription-expired';
      else if (hadTrial) reason = 'trial-expired';
      creditsUrl.searchParams.set('reason', reason);
      return NextResponse.redirect(creditsUrl, { status: 302 });
    }
  }

  if (isCompanySpecificRoute(req)) {
    const routeCompanySlug = pathname.split('/')[2];

    if (!routeCompanySlug) {
      return NextResponse.redirect(new URL('/companies', req.url), { status: 301 });
    }

    const metadataCompanySlug = metadata?.companySlug;

    if (!metadataCompanySlug) {
      return NextResponse.redirect(new URL('/companies', req.url), { status: 301 });
    }

    if (metadataCompanySlug !== routeCompanySlug) {
      const subRoute = pathname.split('/').slice(3).join('/');
      const redirectPath = subRoute
        ? \`/companies/\${metadataCompanySlug}/\${subRoute}\`
        : \`/companies/\${metadataCompanySlug}\`;
      return NextResponse.redirect(new URL(redirectPath, req.url), { status: 301 });
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-company-slug', metadataCompanySlug);

    if (response) {
      const newResponse = NextResponse.next({
        request: { headers: requestHeaders },
      });
      const canonicalLink = response.headers.get('Link');
      if (canonicalLink) newResponse.headers.set('Link', canonicalLink);
      return newResponse;
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (isAdminRoute(req)) {
    if (!isAdmin) return new NextResponse('Access Denied', { status: 403 });
    if (!response) response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response || NextResponse.next();
});`,
        language: 'typescript',
        filePath: 'src/proxy.ts',
        caption: 'Full proxy. Blue = company flow: entry → extract slug → get metadata → redirect on mismatch → set header → pass through',
        highlightRanges: [
          { startLine: 56, endLine: 57, className: 'code-path' },
          { startLine: 65, endLine: 65, className: 'code-path' },
          { startLine: 69, endLine: 75, className: 'code-path' },
          { startLine: 77, endLine: 92, className: 'code-path' },
        ],
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Multi-tenant portal placeholder', caption: 'Placeholder — add blog, video library, company dashboard screenshots' },
    ],
  },
  {
    slug: 'lexical-editor',
    title: 'Lexical Editor & Media',
    description: 'Rich text, YouTube/audio embedding, collaborative editing, export.',
    image: '/home-page.png',
    imageAlt: 'Lexical editor with embedded media',
    category: 'Rich Editor',
    tech: ['Lexical', 'React', 'Supabase', 'Framer Motion'],
    problem:
      'Content creation needs tables, lists, embedded media (YouTube, audio, podcasts), and export to blog/learning materials.',
    solution:
      'Custom Lexical setup with YouTube plugin, audio/podcast integration (Supabase storage, signed URLs), auto-embed, speech-to-text plugin. Export to blog posts. Collaborative features with history tracking.',
    architecture: [
      'Lexical nodes: custom blocks for YouTube, audio, video',
      'Supabase storage for audio with signed URL generation',
      'ToolbarPlugin, FontSizePlugin, markdown support',
      'Export pipeline to blog/PDF',
    ],
    features: [
      { title: 'YouTube Integration', benefit: 'Embed with resizable player controls' },
      { title: 'Audio/Podcast', benefit: 'Supabase storage, custom player, transcription workflow' },
      { title: 'Speech-to-Text', benefit: 'Built-in voice input plugin' },
      { title: 'Export', benefit: 'Blog posts, learning materials' },
    ],
    codeSnippets: [
      {
        code: `export class YouTubeNode extends DecoratorBlockNode {
  __id: string;

  static getType(): string {
    return 'youtube';
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    const node = $createYouTubeNode(serializedNode.videoID);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      ...super.exportJSON(),
      type: 'youtube',
      version: 1,
      videoID: this.__id,
    };
  }
}

export function $createYouTubeNode(videoID: string): YouTubeNode {
  return new YouTubeNode(videoID);
}`,
        language: 'typescript',
        filePath: 'src/lexical/nodes/YouTubeNode.tsx',
        caption: 'Custom DecoratorBlockNode: importJSON/exportJSON for persistence, type "youtube" for toolbar detection.',
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Lexical editor placeholder', caption: 'Placeholder — add Lexical editor, media embedding screenshots' },
    ],
  },
  {
    slug: 'stream-chat',
    title: 'Stream Chat & FCM Push',
    description: 'Real-time messaging with Firebase Cloud Messaging push notifications.',
    image: '/home-page.png',
    imageAlt: 'Stream Chat with push notification settings',
    category: 'AI Integration',
    tech: ['Stream Chat', 'Firebase', 'FCM', 'React', 'Clerk'],
    problem:
      'Learners need real-time chat but must receive push notifications when offline—without leaking tokens or registering invalid devices.',
    solution:
      'Stream Chat SDK with custom usePushNotifications hook. FCM token → Stream addDevice. Unregister on logout. Menubar toggle for enable/disable.',
    architecture: [
      'usePushNotifications: getFCMToken → chatClient.addDevice(token, "firebase", userId, "lexical-verb-push")',
      'removeDevice on logout; token persisted in Firebase',
      'Menubar: enable/disable with loading and error states',
    ],
    features: [
      { title: 'FCM Registration', benefit: 'Token obtained via Firebase, passed to Stream' },
      { title: 'Device Management', benefit: 'addDevice/removeDevice scoped to userId' },
      { title: 'Menubar Toggle', benefit: 'User-controlled enable/disable with feedback' },
    ],
    codeSnippets: [
      {
        code: `const registerDeviceWithStream = useCallback(
  async (token: string) => {
    if (!chatClient || !userId) return false;
    try {
      await chatClient.addDevice(
        token,
        'firebase',
        userId,
        'lexical-verb-push',
      );
      return true;
    } catch (error) {
      console.error('Error registering device with Stream Chat:', error);
      return false;
    }
  },
  [chatClient, userId],
);`,
        language: 'typescript',
        filePath: 'src/components/stream-chat/hooks/usePushNotifications.ts',
        caption: 'Register FCM token with Stream: addDevice(token, provider, userId, pushProviderName).',
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Stream Chat placeholder', caption: 'Placeholder — add chat UI, push settings screenshots' },
    ],
  },
  {
    slug: 'supabase-rls-storage',
    title: 'Supabase RLS & Storage',
    description: 'Row-level security and private storage across 71 tables and 6 buckets. Clerk JWT → Supabase policies.',
    image: '/home-page.png',
    imageAlt: 'Supabase RLS and storage architecture',
    category: 'Infrastructure',
    tech: ['Supabase', 'PostgreSQL', 'Clerk', 'Prisma', 'RLS'],
    problem:
      'Multi-tenant data, user uploads (PDFs, audio, verb images), and company-scoped assets must be isolated. Direct DB access would bypass app logic—enforcement must happen at the database layer.',
    solution:
      'Supabase RLS: 191 policies across 10 domain files (blog, company, polish-music, verb, user-progress, learning-content, exam, media, admin, system). All policies target TO authenticated with Clerk JWT. Storage: 6 private buckets (podcast-audio, podcast-images, editor-audio, verb-images, user_pdfs, company-pdfs) with path-based RLS via get_current_user_secure_folder(). Signed URLs for client access.',
    architecture: [
      'Clerk JWT → Supabase auth.jwt(); clerk_id/sub used for ownership',
      'Domain files: blog.sql, company.sql, polish-music.sql, verb.sql, user-progress.sql, learning-content.sql, exam.sql, media.sql, admin.sql, system.sql',
      'Storage: FUNCTIONS.sql (get_current_user_clerk_id, get_current_user_secure_folder) + storage.objects RLS',
      'Apply-all script: npm run sql applies policies from single source of truth',
      'Prisma + Supabase: directUrl for migrations; RLS enforced on all queries',
    ],
    features: [
      { title: '191 RLS policies', benefit: 'User-scoped, company-scoped, admin-only; no app bypass' },
      { title: '6 private buckets', benefit: 'Podcast, editor audio, verb images, user PDFs, company PDFs' },
      { title: 'Signed URLs', benefit: 'Client fetches via getSignedUrl; no public bucket exposure' },
      { title: 'Clerk JWT integration', benefit: 'auth.jwt() extracts clerk_id; policies use COALESCE(clerk_id, sub)' },
    ],
    metrics: '71 tables, 191 policies, 6 storage buckets. Single apply-all script.',
    codeSnippets: [
      {
        code: `-- Example: user-scoped policy (user progress)
CREATE POLICY "Users can read own progress"
  ON "UserAspectProgress"
  FOR SELECT
  TO authenticated
  USING ("userId" = (SELECT public.get_current_user_clerk_id()));

-- Example: storage RLS (path = secure folder)
CREATE POLICY "Users access own folder"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (
    (bucket_id = 'user_pdfs' AND (storage.foldername(name))[1] = public.get_current_user_secure_folder())
  );`,
        language: 'sql',
        filePath: 'src/utils/supabase/rls/*.sql',
        caption: 'RLS patterns: user-scoped table policy; storage path = get_current_user_secure_folder()',
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Supabase RLS placeholder', caption: 'Placeholder — add RLS policy screenshots' },
    ],
  },
  {
    slug: 'zuplo-gateway',
    title: 'Zuplo Edge Gateway',
    description: 'API gateway: Polar webhook IP allowlist, YouTube transcript proxy. Edge nodes avoid Vercel IP blocking.',
    image: '/home-page.png',
    imageAlt: 'Zuplo edge gateway architecture',
    category: 'Infrastructure',
    tech: ['Zuplo', 'Edge', 'Polar', 'YouTube API'],
    problem:
      'Polar webhooks must be IP-allowlisted for security. YouTube transcript API blocks or throttles requests from Vercel datacenter IPs—lyrics work locally but fail in production.',
    solution:
      'Zuplo edge gateway in front of the app. Polar webhook URL points to Zuplo; IP allowlist policy restricts to Polar IPs only. Transcript proxy: GET /v1/transcript-proxy?url= and POST /v1/transcript-proxy-post—Zuplo runs on edge nodes (different IPs than Vercel), avoiding YouTube blocking. API key (x-transcript-proxy-key) restricts proxy to app only.',
    architecture: [
      'Polar webhook: https://[zuplo]/api/webhook/polar → IP allowlist → forwards to Vercel',
      'Transcript proxy: TRANSCRIPT_PROXY_URL + TRANSCRIPT_PROXY_API_KEY in Vercel',
      'GET /v1/transcript-proxy?url= for direct fetches; POST /v1/transcript-proxy-post for player API fallback',
      'Edge nodes: different IPs than Vercel; YouTube does not block',
    ],
    features: [
      { title: 'Polar IP allowlist', benefit: 'Only Polar webhook IPs can hit /api/webhook/polar' },
      { title: 'Transcript proxy', benefit: 'YouTube lyrics/transcripts work in production' },
      { title: 'API key auth', benefit: 'x-transcript-proxy-key header; 401 without it' },
      { title: 'Edge deployment', benefit: 'Zuplo deploy from /js/zuplo/lexicon-live' },
    ],
    codeSnippets: [
      {
        code: `// Transcript API uses Zuplo proxy when configured (src/app/api/polish-music/transcript/route.ts)
function getTranscriptProxyBase(): string | undefined {
  if (!process.env.TRANSCRIPT_PROXY_API_KEY?.trim()) return undefined;
  const explicit = process.env.TRANSCRIPT_PROXY_URL?.trim();
  if (explicit) return explicit;
  const gateway = process.env.ZUPLO_GATEWAY_URL?.trim();
  if (gateway) return \`\${gateway}/v1/transcript-proxy?url=\`;
  return undefined;
}

// Fetch with proxy + API key
const proxyBase = getTranscriptProxyBase();
const apiKey = process.env.TRANSCRIPT_PROXY_API_KEY?.trim();
const fetchHeaders = {
  ...(apiKey && { 'x-transcript-proxy-key': apiKey }),
  'Origin': 'https://www.youtube.com',
  'Referer': 'https://www.youtube.com/',
};
const url = proxyBase ? \`\${proxyBase}\${encodeURIComponent(targetUrl)}\` : targetUrl;
const res = await fetch(url, { headers: fetchHeaders });`,
        language: 'typescript',
        filePath: 'src/app/api/polish-music/transcript/route.ts',
        caption: 'Transcript proxy: Zuplo URL + API key; bypasses Vercel IP blocking for YouTube.',
      },
    ],
    screenshots: [
      { src: '/home-page.png', alt: 'Zuplo gateway placeholder', caption: 'Placeholder — add Zuplo config screenshots' },
    ],
  },
  {
    slug: 'secure-server-actions',
    title: 'Secure Server Actions',
    description: 'Layered security: auth helpers, Zod validation, ownership checks, RLS. Every action gated before touching data.',
    image: '/home-page.png',
    imageAlt: 'Security pipeline architecture',
    category: 'Infrastructure',
    tech: ['Clerk', 'Zod', 'Prisma', 'Supabase RLS', 'Next.js', 'auth-helpers'],
    problem:
      'Server actions are public endpoints—anyone can call them. Without consistent auth, validation, and ownership checks, a single missed gate could expose data or allow unauthorized mutations.',
    solution:
      'Centralized auth-helpers (requireAuth, requireAdmin, requireAuthWithMetadata, requireSubscription) plus Zod schemas for every input, ownership checks before mutations, and RLS at the database as defense-in-depth. Admin checks use Clerk metadata only (never DB role). Tenant context uses x-company-slug from middleware.',
    architecture: [
      'Auth gate: requireAuth/requireAdmin/requireAuthWithMetadata/requireSubscription—first line of every action',
      'Admin: Clerk sessionClaims.metadata.isAdmin only (never DB role—tamper-proof)',
      'Tenant: getTenantContext(x-company-slug, UserCompany) for company-scoped actions',
      'Validation: schema.safeParse(data) → throw on invalid; Zod schemas in src/lib/validation/',
      'Ownership: where: { userId: clerkId } or companySlug check before update/delete',
      'Defense in depth: RLS at Supabase enforces even if app logic is bypassed',
    ],
    features: [
      { title: 'requireAuth', benefit: 'Returns clerkId or throws; user-scoped actions' },
      { title: 'requireAdmin', benefit: 'Clerk metadata isAdmin; no DB lookup for admin gate' },
      { title: 'requireAuthWithMetadata', benefit: 'companySlug, role, fullName for tenant actions' },
      { title: 'requireSubscription', benefit: 'Auth + active subscription or free trial' },
      { title: 'Zod validation', benefit: 'Schema per action; type-safe, safeParse before DB' },
      { title: 'getTenantContext', benefit: 'x-company-slug + UserCompany; cached per request' },
    ],
    metrics: '40+ action files use requireAuth; 10+ use requireAdmin; 8+ use requireAuthWithMetadata.',
    screenshots: [
      { src: '/home-page.png', alt: 'Security pipeline placeholder', caption: 'Placeholder — add security architecture diagram' },
    ],
  },
];

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getAllSlugs(): string[] {
  return portfolioItems.map((item) => item.slug);
}

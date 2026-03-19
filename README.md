## 📌 **Current Project: PoliLex**

<div align="center">

[![PoliLex Platform](https://img.shields.io/badge/PoliLex-AI%20Enhanced%20Polish%20Learning-red?style=for-the-badge&logo=language&logoColor=white)](https://lexical-verb.vercel.app/)

**Polish language learning platform with sophisticated full-stack architecture**

<br />

<img src="https://github.com/AlexDjangoX/portfolio-alexander/raw/main/public/home-page.png" alt="PoliLex Bilingual — AI-Enhanced Polish Language Learning Platform home page" width="900" />

_PoliLex Bilingual — home page with conjugation table and hero messaging_

</div>

---

## Cursor & AI (project rules)

Persistent guidance for this repo lives in **`.cursor/rules/`**:

| File | Purpose |
|------|---------|
| `nextjs-16.mdc` | Next.js 16+ — check `node_modules/next/dist/docs/`, don’t assume older APIs |
| `portfolio-showcase.mdc` | Portfolio paths, theme (`next-themes` + class-based `dark:`), product URL |

**`AGENTS.md`** summarizes the same and points here. Rules use `alwaysApply: true` so Cursor includes them in agent context.

---

## 🛠️ **Tech Stack Overview**

| **Category**                 | **Technology / Tools**                               | **Purpose**                                          |
| :--------------------------- | :--------------------------------------------------- | :--------------------------------------------------- |
| **Frontend**                 | Next.js 16, React 19                                 | Core application shell and interactive UI            |
|                              | TypeScript 5.9                                       | Type-safe client-side development                    |
|                              | Tailwind CSS 4, ShadCN                               | Design system, layout, and reusable UI components    |
|                              | Lexical Editor, Framer Motion                        | Rich authoring experience and high-quality motion    |
| **Backend & Infrastructure** | Prisma 7, PostgreSQL, Supabase                       | Type-safe data access and relational persistence     |
|                              | Clerk Auth, Polar, Stream Chat, Redis                | Authentication, payments, real-time messaging, cache |
| **Testing & Quality**        | Jest, React Testing Library                          | Unit and integration coverage for components & logic |
|                              | Playwright                                           | End-to-end browser regression on critical journeys   |
|                              | k6, Artillery                                        | Load and performance validation for APIs and flows   |
|                              | TypeScript (strict), Prisma, Zod, @t3-oss/env-nextjs | Static typing and schema validation across the stack |
|                              | ESLint, Prettier, import-sorting plugins             | Automated linting, formatting, and code consistency  |
| **AI & Integrations**        | OpenAI GPT-4, DALL-E 3                               | Language processing and image generation             |
|                              | OpenAI Realtime API, Whisper API, OpenAI TTS         | Real-time voice, speech-to-text, and text-to-speech  |
|                              | Tambo AI                                             | Conversational AI with persistent threads            |
|                              | Stream Chat                                          | Real-time chat and collaboration                     |

---

<h3 style="color: #fbbb74; margin: 16px 0 24px 0; font-weight: 300; font-style: italic; font-size: 1.3rem;">
    Click any section below to expand and read the details.
</h3>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>🏆 Key Achievements</strong> — Multi-tenant, security, AI, learning modules, Lexical editor</summary>

<div style="font-size: 16px; line-height: 1.6;">

### Multi-Tenant Architecture

- **Authentication & Database Integration** - Sophisticated user management with role-based access control
- **Company portals** with isolated data and secure tenant boundaries
- **Multi-Organization Support** - Seamless switching between different company portals
- **Permission Management** - Granular access control for teachers, students, and admins
- **Data Isolation** - Company-specific data segregation with secure tenant boundaries

### Enterprise Security & API Management

- **Zuplo API Gateway** - Secure API management, rate limiting, and enterprise-grade security
- **Enterprise Security** - Role-based access control & secure authentication
- **Performance Optimized** - SSR, edge caching, optimized database queries
- **Comprehensive Testing** - Unit, integration, and E2E test coverage

### AI-Powered Features

- **GPT-4 Integration** - Personalized instruction and content generation
- **OpenAI Realtime API** - Voice conversations with real-time streaming responses
- **Whisper API** - Audio transcription for podcasts and video content
- **Text-to-Speech (TTS)** - AI-generated audio pronunciation
- **Stream Chat** - Real-time messaging with Firebase push notifications (see dedicated section below)
- **Tambo AI Chat Integration** - Advanced conversational AI with thread-based persistence, custom interactive components, and integrated token-based costing system (see dedicated section below)
- **Custom AI Prompts** - Specialized language learning prompts and instructions

### Comprehensive Learning Modules

**Grammar Labs:**

- **Aspect Master** - Verb aspect practice with quizzes, challenges, and timeline visualization
- **Reflexive Lab** - Reflexive verb journeys with categories and templates
- **Preposition Lab** - Interactive preposition challenges with case governance
- **Motion Lab** - Verbs of motion (unidirectional/multidirectional pairs)
- **Verb Prefixes** - Perfective prefix forms and transformations
- **Conjugator** - Interactive Kanban board for verb conjugation practice

**Vocabulary & Practice:**

- **Counting** - Grammatical cases through counting 1-21 with contextual examples
- **Adjectives** - Comparative forms and interactive exercises
- **Adverbs** - Comparative and superlative forms practice
- **Nouns** - Auto-generated flashcards with translations
- **Occupations** - 5 interactive games (Flashcards, Quiz, Memory, Drag & Drop, Sentence Builder)
- **Word Wizard** - AI-assisted vocabulary building with audio pronunciation
- **Flashcards** - Customizable flashcards with example sentences
- **Cases** - Grammatical case mastery through fill-in-the-blank exercises
- **Days & Months** - Temporal vocabulary practice
- **Genealogy** - Interactive family tree drag-and-drop game

**Interactive Content:**

- **Lexical Editor** - Rich text editing with collaborative features
- **PDF Processing** - Document processing and annotation
- **Portable Documents** - PDF viewer with highlighting capabilities
- **Podcasts** - Audio content with transcription
- **Videos** - Video learning with interactive features
- **Audio Transcript** - Speech-to-text processing

**Community & Social:**

- **Real-time Chat** - Stream Chat with FCM push notifications (see dedicated section)
- **Memory Games** - Polish language memory recall activities
- **Jira Integration** - Project management and task tracking
- **Company Portals** - Multi-tenant learning environments with blogs, videos, and PDFs

### OpenAI Pricing Strategy

**Source of Truth:**

- **Database-Driven Pricing** - Centralized database table serves as the single source of truth for all OpenAI model costs
- **Manual Admin Management** - Pricing is manually updated by administrators through a secure admin interface (no automated scraping or external API dependencies)
- **Performance Optimization** - Server-side pricing cached with configurable TTL for optimal performance, with immediate cache invalidation after updates
- **Resilience** - Fallback pricing values available if database is temporarily unavailable (with appropriate logging and warnings)

**Security Practices:**

- **Defense in Depth** - Multi-layer security approach combining application-level authorization checks with database-level access controls
- **Row-Level Security** - Database policies enforce role-based access control, ensuring only authorized administrators can modify pricing data
- **Read Access** - Authenticated users can read active pricing information required for cost calculations
- **Write Access** - Strictly limited to authorized administrators through verified authentication mechanisms
- **Secure Initialization** - Seed scripts use secure service-level connections for initial data population
- **Token-Based Authorization** - Admin privileges verified through secure token claims validated at both application and database layers

### Custom Lexical Editor with Media Integration

- **Rich Text Editing** - Full-featured Lexical editor with markdown support, tables, lists, and formatting
- **YouTube Integration** - Embed YouTube videos directly in editor content with resizable player controls
- **Audio/Podcast Integration** - Seamless audio embedding with Supabase storage integration
  - Audio playback controls with custom player interface
  - Podcast image support with signed URL generation
  - Audio transcription workflow integration
- **Video Content Creation** - Link videos to editor content for bilingual text generation
- **Speech-to-Text** - Built-in speech recognition plugin for voice input
- **Auto-Embed Plugin** - Automatic detection and embedding of YouTube URLs
- **Collaborative Features** - Real-time editing capabilities with history tracking
- **Export Capabilities** - Export editor content to blog posts and learning materials

### Teacher/Tutor Portal (Company System)

- **Dedicated Company Portals** - Isolated multi-tenant environments for each teaching organization
- **Blog Management System** - Full-featured blog with Lexical editor integration
  - Rich text blog posts with embedded media
  - Tag-based categorization and filtering
  - Comments and reactions system
  - Nested comment threads with real-time updates
  - Author profiles and post attribution
  - Draft and published post status management
- **Video Library Management** - Comprehensive video content system
  - YouTube video integration with metadata
  - Difficulty level categorization (A1-C2)
  - Category organization (Grammar, Vocabulary, Pronunciation, etc.)
  - Bilingual text support (Polish/English)
  - Video transcription and summaries
  - Thumbnail and duration tracking
  - Publishing workflow
- **Resource Management** - Centralized content hub
  - PDF document management
  - Resource organization by company
  - Access control and permissions
- **Dashboard Analytics** - Company-specific insights and user management
- **Multi-User Support** - Role-based access for teachers, admins, and students
- **Tenant Isolation** - Secure data segregation between different companies

</div>

</details>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>💳 Production Payment Infrastructure</strong> — Polar, subscriptions, webhooks, custom UI</summary>

<div align="center">
<em>Enterprise-grade subscription and payment system built with financial software engineering standards</em>
</div>

<br/>

**System Status:** ✅ **v2.4 — Production Ready & Live Validated** (March 2026)

### Strategic Migration: Stripe → Polar

Migrated from Stripe to **Polar** for **international tax compliance** and simplified global operations. Polar acts as Merchant of Record, handling VAT, GST, and sales tax obligations across 100+ countries—eliminating the operational burden and legal exposure that Stripe leaves to merchants when selling internationally.

**Business Value:**

- ✅ **Automatic Tax Compliance** — Polar calculates, collects, and remits taxes globally
- ✅ **Merchant of Record** — Polar assumes tax liability as the legal seller
- ✅ **Zero Tax Registration** — Sell worldwide without jurisdiction-specific registrations
- ✅ **Simplified Operations** — Single integration, worldwide coverage, reduced overhead

### System Architecture

**Design Principles:**

- **Financial Software Standards** — Zero tolerance for bugs where money is involved; 87% test coverage with 355+ comprehensive tests
- **Database-Backed Idempotency** — Claim→apply→mark flow via `claimWebhookEvent` + `markWebhookEventProcessed`; stable keys prevent double-crediting on retries
- **Fail-Closed for Money** — Balance mutations fail-closed; metadata sync fail-open for optimal reliability
- **Event-Driven Processing** — Asynchronous webhook handlers with state machine validation and transaction atomicity
- **Live Validated** — 100% congruency verified across Polar ↔ Backend ↔ Clerk ↔ Frontend through comprehensive E2E testing
- **Custom UI Control** — In-app subscription management (v2.2) for 95% of operations, Polar portal for payment-sensitive 5%

| **Component**         | **Implementation**                                                             |
| :-------------------- | :----------------------------------------------------------------------------- |
| API Integration       | Singleton client with exponential backoff retry (3 attempts, jitter)           |
| Security Layer        | Multi-layer validation (Zod schemas + business logic allowlists)               |
| Webhook Processing    | Modular handlers in `src/hooks/webhooks/polar/`; HMAC + claim→mark idempotency |
| Error Handling        | Sanitized user messages; internal details never exposed                        |
| State Synchronization | Real-time sync between database, Clerk metadata, and Zustand store             |

### Dual-Balance Token System

**Architecture:**

- **Subscription Tokens** (`tokenBalance`) — Monthly allocation, resets on renewal (e.g., 1,000 for Pro, 2,500 for Premium)
- **Top-up Tokens** (`topupTokenBalance`) — Purchased tokens, persist indefinitely
- **Spending Priority** — Subscription tokens consumed first (monthly reset), then top-up tokens (never expire)
- **Balance Preservation** — Subscription changes preserve purchased tokens via pure calculation: `newBalance = newCredits + max(0, currentTotal - oldCredits)`

**Example:** User with 1,500 tokens (1,000 subscription + 500 purchased) upgrades to 2,500-credit plan → Final balance: 3,000 tokens (2,500 new subscription + 500 preserved top-up)

### Security Implementation (v2.1 Hardened)

**Three-Layer Defense-in-Depth:**

1. **Edge Protection (Zuplo API Gateway)**
   - IP allowlisting for webhooks (Polar's 5 official IPs only)
   - Rate limiting (100 req/min webhooks, 20 req/min checkouts)
   - Comprehensive audit logging with IP, user agent, timestamp

2. **Application Layer**
   - Multi-layer validation (Zod UUID → Business logic allowlist → Runtime auth)
   - HMAC signature verification via Polar SDK on all webhook payloads
   - Database-backed idempotency — `claimWebhookEvent` + `markWebhookEventProcessed` with stable keys (no timestamps, prevents replay attacks)
   - Atomic transactions with Serializable isolation (prevents race conditions)
   - Zero-trust metadata (token amounts derived from productId only, not client data)

3. **Data Layer**
   - Clerk authentication required for all server actions
   - Row-level security policies on Supabase
   - Transaction audit trail with polarId tracking
   - Error sanitization (no internal details exposed to users)

### Webhook Event Handling

**9 Event Types Processed:**

| Event                     | Action                                                      | v2.2 Status |
| :------------------------ | :---------------------------------------------------------- | :---------- |
| `subscription.created`    | First event when subscribing, transitions FREE → ACTIVE     | NEW         |
| `subscription.active`     | Allocate tier credits, update plan ID, sync Clerk metadata  |             |
| `subscription.updated`    | Recalculate balance preserving top-ups, handle plan changes |             |
| `subscription.canceled`   | Downgrade to free tier at period end                        |             |
| `subscription.revoked`    | Immediate downgrade, clear subscription fields              |             |
| `subscription.uncanceled` | Restore subscription, clear payment warnings                | v2.3        |
| `subscription.past_due`   | Payment failed flag, UI alert with "Fix Payment" CTA        | v2.3        |
| `order.paid`              | Process one-time purchases, increment purchased balance     |             |
| `order.refunded`          | Deduct refunded tokens, create audit record                 |             |

**v2.2 Refinements (Jan 28, 2026):**

- **`subscription.created` Support** — Polar sends this event first; state machine now handles it correctly
- **Clear `freeTrialEndDate`** — Explicitly nulled when upgrading from free to paid plans
- **Duplicate Transaction Prevention** — Pre-existence check eliminates constraint errors
- **Custom UI Implementation** — Migrated from Polar portal to in-app subscription management for greater control

**v2.3 Automation & UX (Jan 28, 2026):**

- **Payment Failure Handling** — Complete UX flow for failed payments:
  - `PaymentFailureAlert.tsx` component with prominent "Fix Payment" CTA
  - Alert displays on credits page when `subscription.past_due` webhook received
  - Shows period end date and redirects to Polar portal for secure payment update
  - `ManageSubscriptionBadge.tsx` prioritizes payment failure button above all other actions
  - 2 new test scenarios added to credits page test suite
- **Reconciliation Cron** — Automated DB-Clerk desync detection and healing (daily at 3 AM UTC; Hobby-compatible)
- **Cleanup Cron** — Automated webhook event pruning (daily at 2 AM UTC, 30-day retention)
- **Cron Security** — Bearer token authorization, IP logging, fail-open error handling
- **Operational Observability** — Comprehensive logging of execution metrics, desync rates, cleanup counts

**v2.4 Webhook Refactor & Idempotency (March 2026):**

- **Modular Webhook Handlers** — Logic in `src/hooks/webhooks/polar/` (state-machine, subscription-transition, topup, order-refund, sync-clerk, retry)
- **Idempotency Hardening** — Explicit `claimWebhookEvent` + `markWebhookEventProcessed` flow; deprecated `checkAndMarkWebhookEventProcessed`
- **Direct Integration Tests** — 13 tests for claim→mark flow, replay prevention, fail-closed behavior

### Custom UI Evolution: From Portal to In-App Experience

**Strategic Decision (Jan 28, 2026):** Migrated from Polar's hosted customer portal to **custom React components** for subscription management, achieving **greater control** over user experience and business logic.

**Why Custom UI?**

Initially, the system relied on Polar's customer portal for all subscription operations (cancel, upgrade, downgrade). While functional, this approach had limitations:

- **Context Switching** — Users redirected to external portal, breaking in-app flow
- **Limited Control** — Couldn't customize confirmation dialogs or messaging
- **Branding Disconnect** — External portal didn't match application's design language
- **No Analytics** — Couldn't track user interactions with subscription UI
- **Inflexible UX** — Portal workflow not optimized for our use cases

**Custom Implementation:**

Built **4 custom React components** (1,631 tests) handling common subscription operations in-app:

| **Component**                      | **Responsibility**                       | **Tests** |
| :--------------------------------- | :--------------------------------------- | :-------- |
| `SubscriptionPlans.tsx`            | Plan display, upgrade/downgrade UI       | 520       |
| `ManageSubscriptionBadge.tsx`      | Current plan badge, action buttons       | 292       |
| `ConfirmationDialog.tsx`           | Destructive action confirmations         | 305       |
| `useSubscriptionActions.ts` (hook) | Centralized subscription operation logic | 514       |

**Benefits Achieved:**

- **Seamless Experience** — All subscription actions in-app, no context switching
- **Full Control** — Custom confirmation dialogs with clear, contextual messaging
- **Consistent Branding** — Matches application design system and internationalization (Polish/English)
- **Enhanced UX** — Real-time feedback with granular loading states per action
- **Business Logic** — Payment processing locks prevent concurrent operations
- **Analytics Ready** — Track every user interaction with subscription UI

**Hybrid Approach:**

Smart delegation between custom UI and Polar portal:

| **Operation**           | **Handled By** | **Reason**                            |
| :---------------------- | :------------- | :------------------------------------ |
| Subscribe to plan       | Custom UI      | In-app flow, immediate feedback       |
| Upgrade/Downgrade       | Custom UI      | Show plan comparison, confirm changes |
| Cancel subscription     | Custom UI      | Confirmation dialog, show end date    |
| Reactivate subscription | Custom UI      | One-click reactivation                |
| View current plan       | Custom UI      | Always visible, integrated with app   |
| Fix failed payment      | Custom UI      | Alert banner with portal redirect     |
| Update payment method   | Polar Portal   | PCI compliance, secure card handling  |
| Download invoices       | Polar Portal   | Tax-compliant documents               |
| View payment history    | Polar Portal   | Complete transaction records          |
| Manage billing address  | Polar Portal   | International tax compliance          |

**Technical Architecture:**

```
User clicks "Upgrade to Premium"
         ↓
Custom UI shows confirmation dialog
         ↓
User confirms → Server action (changePlan)
         ↓
Redirect to Polar checkout (payment collection)
         ↓
User completes payment → Polar webhook
         ↓
Database + Clerk metadata sync
         ↓
Frontend polling detects change
         ↓
Custom UI updates (new plan badge, token balance)
```

**Result:** 95% of subscription interactions handled in-app with seamless UX, while Polar portal handles payment-sensitive operations (5% of use cases) requiring regulatory compliance.

### Automated Maintenance System (v2.3 — Jan 28, 2026)

**Proactive Health & Data Management:**

Implemented **automated cron jobs** to maintain system health and prevent data bloat without manual intervention.

**Polar Reconciliation Cron** (`/api/cron/polar-reconciliation`):

- **Schedule**: Daily at 4:00 AM UTC
- **Purpose**: Sync database and Clerk with Polar (source of truth)
- **Process**: For each user with polarCustomerId, query Polar API, compare with DB, fix mismatches
- **Impact**: Catches re-registration, missed webhooks, manual Polar dashboard changes

**Clerk Reconciliation Cron** (`/api/cron/clerk-reconciliation`):

- **Schedule**: Daily at 3:00 AM UTC (Vercel Hobby–compatible; once per day)
- **Purpose**: Self-healing system that detects and fixes DB-Clerk desynchronization
- **Process**: Scans all users, identifies discrepancies (plan ID, token balance, subscription status), automatically corrects mismatches
- **Monitoring**: Alerts if desync rate exceeds 1%, tracks fix success rate
- **Impact**: Zero manual intervention required; system self-corrects before users notice issues

**Webhook Cleanup Cron** (`/api/cron/webhook-cleanup`):

- **Schedule**: Daily at 2:00 AM UTC
- **Purpose**: Delete webhook events older than 30 days to prevent database bloat
- **Process**: Removes processed webhook records while maintaining audit trail for debugging
- **Retention**: Configurable 30-day history balances compliance with performance
- **Impact**: Prevents `WebhookEvent` table growth, maintains query performance

**Webhook Recovery Cron** (`/api/cron/webhook-recovery`):

- **Schedule**: Daily at 5:00 AM UTC
- **Purpose**: Retry unprocessed webhook events (e.g., crashed between claim and mark)
- **Process**: Finds events with `processedAt: null` in retry window (5 min–24 h old), re-applies via `retryWebhookEvent`
- **Impact**: Self-healing for transient failures; events older than 24 h marked as failed

**Security Architecture:**

- **Authorization**: Bearer token authentication (`CRON_SECRET`) prevents unauthorized execution
- **IP Logging**: Tracks unauthorized access attempts for security monitoring
- **Fail-Open Design**: Returns 200 on error to prevent Vercel retry storms (next scheduled run will retry)
- **Observability**: Comprehensive logging of execution duration, items processed, failure rates

**Operational Metrics:**

- **Reconciliation**: Typically 0.00% desync rate, sub-300ms execution time
- **Cleanup**: ~15,000 events deleted daily, sub-100ms execution time
- **Reliability**: Zero manual intervention required since deployment

**Test Coverage:** 33+ comprehensive tests validating authorization, success scenarios, error handling, and performance across all four cron endpoints.

### Quality Assurance & Validation

**Automated Testing:**

- **355+ Comprehensive Tests** — 87% code coverage across all payment logic (idempotency, webhook handlers, cron automation)
- **1,631 UI Component Tests** — Custom subscription UI fully tested (520 + 292 + 305 + 514 tests)
- **33 Cron Job Tests** — Automated maintenance system fully validated (14 reconciliation + 19 cleanup tests)
- **Financial Standards** — Zero tolerance for test failures; all edge cases and error paths verified
- **E2E Scenario Testing** — 8 complete user journeys from signup to downgrade validated
- **Idempotency Testing** — Claim→mark flow, duplicate webhook delivery, replay prevention, race conditions, fail-closed behavior
- **Security Testing** — Product ID manipulation, authentication bypass, signature tampering, metadata tampering
- **Integration Testing** — Full payment flows with real webhook payloads
- **Cron Security Testing** — Authorization validation, unauthorized access logging, error handling, performance

**Live Validation (Jan 28, 2026):**

- **7 Real User Scenarios** — Complete subscription lifecycle tested with actual Polar webhooks
- **100% Congruency** — Verified state synchronization across Polar → Database → Clerk → Frontend
- **Token Calculations** — All upgrade/downgrade/cancel/topup scenarios validated with real data
- **Webhook Processing** — ~40 webhook deliveries processed successfully with proper deduplication
- **State Machine** — All transitions tested (FREE → ACTIVE → CANCELED_PENDING → etc.)
- **Payment Failure UX** — Alert component integrated and tested with 2 new scenarios
- **Automated Health Checks** — Reconciliation and cleanup cron jobs deployed and validated

**Test Execution:** 4,400+ tests pass (355+ payment + 1,631 UI + 33 cron + others)

### Comprehensive Documentation

**Seven Complete Guides (367 KB total):**

- **POLAR_IMPLEMENTATION.md** (105 KB) — Complete implementation guide, security architecture, custom UI documentation, phase-by-phase build
- **PAYMENT_IMPLEMENTATION_WALKTHROUGH.md** — Developer walkthrough: Polar as source of truth, claim→apply→mark flow, event handlers, state machine
- **STRIDE_THREAT_MODEL.md** (54 KB) — Security threat analysis, attack scenarios, defense-in-depth validation
- **INTEGRATION_TESTING_SUMMARY.md** (9 KB) — Live testing results, all 7 scenarios documented, token calculation details
- **DEVELOPER_QUICK_REFERENCE.md** (6 KB) — Quick reference for daily work, schemas, debugging tips
- **VALIDATION_REPORT_2026-01-28.md** (13 KB) — Complete validation report with before/after comparisons
- **CRON_IMPLEMENTATION.md** (68 KB) — Automated maintenance system documentation, cron job architecture, monitoring guide
- **RECOMMENDATIONS.md** (112 KB) — Technical recommendations for hardening, observability, and production readiness

**Custom UI Components:**

- `SubscriptionPlans.tsx` — Full-featured plan display with upgrade/downgrade/cancel functionality
- `ManageSubscriptionBadge.tsx` — Animated current plan badge with action buttons (includes payment failure handling)
- `ConfirmationDialog.tsx` — Contextual confirmation dialogs for destructive actions
- `PaymentFailureAlert.tsx` — Payment failure notification with "Fix Payment" CTA (v2.3)
- `useSubscriptionActions.ts` — React hook centralizing all subscription operations

**Security Rating:** 9.8/10 ⭐⭐⭐ (Enterprise-grade with Zuplo edge protection)

</details>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>📝 React 19 Form Architecture</strong> — Progressive enhancement, server actions, useActionState</summary>

<div align="center">
<em>Progressive enhancement meets type-safe server actions</em>
</div>

<br/>

Modern form architecture leveraging React 19 hooks and Next.js 16 server actions for optimal DX and performance.

### Architecture Overview

| **Component**        | **Responsibility**                 | **Pattern**                                   |
| :------------------- | :--------------------------------- | :-------------------------------------------- |
| Client-Side State    | Form validation & user interaction | React Hook Form with Zod resolver             |
| Server Actions       | Data mutations & persistence       | Next.js 16 `action` prop with `FormData` API  |
| State Management     | Server response handling           | `useActionState` for declarative state        |
| Event Handlers       | Stable callbacks without deps      | `useEffectEvent` for effect event handlers    |
| Field Watching       | Reactive form updates              | `useWatch` for optimized re-renders           |
| Context Architecture | Complex form state sharing         | Provider pattern with memoized context values |

### Core Patterns

- **Progressive Enhancement** — Forms work without JavaScript using native `FormData` submission, enhanced with client-side validation when available
- **Type-Safe Validation** — Dual-layer Zod schema validation (client-side React Hook Form + server-side `safeParse`) ensures data integrity at every boundary
- **Optimized Re-renders** — `useWatch` replaces `form.watch()` for granular field subscriptions, eliminating unnecessary component updates
- **Stable Event Handlers** — React 19's `useEffectEvent` provides dependency-free callbacks for effect handlers, removing dependency array confusion
- **Data-Driven Rendering** — Configuration objects with `map()` eliminate JSX repetition while maintaining type safety and readability

### Server Action Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. User submits form → <form action={formAction}>          │
├─────────────────────────────────────────────────────────────┤
│  2. Client-side validation → React Hook Form + Zod          │
├─────────────────────────────────────────────────────────────┤
│  3. FormData serialization → Native browser behavior        │
├─────────────────────────────────────────────────────────────┤
│  4. Server action invoked → useActionState manages pending  │
├─────────────────────────────────────────────────────────────┤
│  5. Server-side validation → Zod safeParse with structured  │
│     error responses                                          │
├─────────────────────────────────────────────────────────────┤
│  6. Database mutation → Prisma with RLS policies            │
├─────────────────────────────────────────────────────────────┤
│  7. Response handling → useEffectEvent for success/error    │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Highlights

- **Context-Based Complex Forms** — `VerbAttributesForm` uses provider pattern to share state across nested components without prop drilling
- **Field-Level Subscriptions** — Single `useWatch` call for multiple fields, maintaining React Hook Form's optimization benefits
- **Structured Error Handling** — Server actions return typed `ActionState<T>` with success/error/data discriminated unions
- **Test Coverage** — Forms tested with `data-testid` attributes (never text content), ensuring reliable test stability across i18n and content changes

### Example Architecture

```typescript
// Server Action with safeParse validation
export async function submitFormAction(
  prevState: ActionState<DataType>,
  formData: FormData,
): Promise<ActionState<DataType>> {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  // ... database mutation
  return { success: true, data: createdRecord };
}

// Client Component
const [actionState, formAction, isPending] = useActionState(
  submitFormAction,
  initialState,
);
const watched = useWatch({ control: form.control }); // Single subscription

const handleSuccess = useEffectEvent(() => {
  toast({ title: 'Success!' });
  onSuccess?.();
}); // No dependency array needed!

useEffect(() => {
  if (actionState.success) handleSuccess();
}, [actionState.success]);
```

</details>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>🧠 Tambo AI Learning Assistant</strong> — Context-aware conversational AI, persistent threads, interactive components</summary>

<div align="center">
<em>Context-aware conversational AI with persistent threads and interactive components</em>
</div>

<br/>

A sophisticated AI tutoring system powered by Tambo SDK, providing personalized Polish language instruction with full conversation persistence and custom interactive learning components.

### Architecture Overview

| **Component**      | **Responsibility**                  | **Pattern**                                   |
| :----------------- | :---------------------------------- | :-------------------------------------------- |
| TamboProvider      | SDK initialization & thread context | React Context with auth token injection       |
| Thread Persistence | Conversation state management       | localStorage + PostgreSQL hybrid storage      |
| Message Streaming  | Real-time AI response delivery      | Server-Sent Events with generation stages     |
| Component Registry | Dynamic UI rendering from AI        | Zod-validated props with component mapping    |
| Tool Registry      | AI function calling capabilities    | Type-safe tool definitions with input schemas |
| Token Charging     | Usage-based billing integration     | Pre-charge with actual usage reconciliation   |

### Key Features

- **Thread-Based Conversations** — Full conversation history preserved across sessions with automatic restoration on page load
- **Lab-Specific Context** — AI tutor adapts to current learning module (Aspect Master, Reflexive Lab, Preposition Lab, etc.)
- **Custom Interactive Components** — AI can render learning-specific UI:
  - `LearningHintCard` — Contextual tips with difficulty levels and examples
  - `ExerciseGenerator` — Interactive quizzes with real Polish content
  - `ProgressVisualization` — Learning analytics with charts and statistics
- **Thread Management** — Archive conversations with titles/subtitles, restore previous threads, delete old conversations
- **Message Limits** — Configurable per-thread message caps with graceful degradation
- **Token-Based Costing** — Integrated with platform credit system, pre-authorization with actual usage tracking

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  AITutorAssistant                                           │
│  ├── TamboProvider (SDK Context)                            │
│  │   ├── useTamboThread (conversation state)                │
│  │   └── useTamboThreadInput (message handling)             │
│  ├── ChatHeader                                             │
│  │   ├── ThreadSelector (dropdown with archived threads)    │
│  │   └── ThreadArchiveForm (save with title/subtitle)       │
│  ├── MessageList                                            │
│  │   ├── MessageItem (user/assistant messages)              │
│  │   ├── MarkdownRenderer (formatted responses)             │
│  │   └── LoadingIndicator (streaming state)                 │
│  ├── ChatInput (textarea with send button)                  │
│  └── QuickSuggestions (one-click prompts)                   │
└─────────────────────────────────────────────────────────────┘
```

### Thread Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│  Thread Creation & Persistence Flow                         │
├─────────────────────────────────────────────────────────────┤
│  1. User opens lab → Check localStorage for saved threadId  │
│  2. If found → Restore thread with retry logic (3 attempts) │
│  3. If not → Create new thread on first message             │
├─────────────────────────────────────────────────────────────┤
│  4. Messages sent → Real-time streaming response            │
│  5. Thread auto-saved → localStorage + database sync        │
│  6. Message count tracked → Update database periodically    │
├─────────────────────────────────────────────────────────────┤
│  7. User archives → Save title/subtitle, mark as archived   │
│  8. New thread created → localStorage cleared, fresh start  │
│  9. User can restore → Select from dropdown, switch thread  │
│  10. User can delete → Permanent removal from database      │
└─────────────────────────────────────────────────────────────┘
```

### Custom Hooks

| **Hook**                | **Purpose**                                          |
| :---------------------- | :--------------------------------------------------- |
| `useThreadPersistence`  | localStorage management, thread ID tracking, restore |
| `useThreadDatabase`     | Background sync of thread metadata to PostgreSQL     |
| `useActualUsageLogging` | Token usage tracking after AI response completion    |

### AI-Rendered Components

The AI can dynamically render interactive learning components by returning structured JSON:

```typescript
// AI returns component specification
{
  "component": "ExerciseGenerator",
  "props": {
    "title": "Verb Aspect Practice",
    "exercises": [
      {
        "question": "Wczoraj _____ (czytać/przeczytać) książkę przez cały dzień.",
        "options": ["czytałem", "przeczytałem", "czytam"],
        "correctAnswer": "czytałem",
        "explanation": "Use imperfective 'czytałem' for duration"
      }
    ]
  }
}

// Component registry maps to React component with Zod validation
const tamboComponents = [
  { name: 'ExerciseGenerator', component: ExerciseGenerator, propsSchema: exerciseGeneratorSchema },
  { name: 'LearningHintCard', component: LearningHintCard, propsSchema: learningHintCardSchema },
  { name: 'ProgressVisualization', component: ProgressVisualization, propsSchema: progressVisualizationSchema }
];
```

### • Database Schema

```sql
model TamboThread {
  id          String    @id @default(cuid())
  userId      String
  labContext  String    -- "aspect-master", "reflexive-lab", etc.
  threadId    String    -- Tambo SDK thread identifier
  title       String?   -- User-provided archive title
  subtitle    String?   -- Optional description
  isCurrent   Boolean   @default(true)
  isArchived  Boolean   @default(false)
  messageCount Int      @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  archivedAt  DateTime?

  @@unique([userId, labContext, threadId])
}
```

### • Testing Strategy

- **122+ tests** covering Tambo components and integration
- **Component isolation** — Each UI component tested independently with mocked Tambo hooks
- **Integration tests** — Full AITutorAssistant flow with mocked SDK responses
- **Server action tests** — Thread CRUD operations with Prisma mocking

</details>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>💬 Real-Time Chat with Stream & Firebase Push Notifications</strong> — Multi-tenant messaging, FCM push</summary>

<div align="center">
<em>Multi-tenant messaging with cross-platform push notification delivery</em>
</div>

<br/>

A production-grade real-time chat system built on Stream Chat SDK with Firebase Cloud Messaging (FCM) integration for reliable push notifications across web, Android, and iOS.

### Architecture Overview

| **Component**       | **Responsibility**                       | **Pattern**                                      |
| :------------------ | :--------------------------------------- | :----------------------------------------------- |
| Stream Chat Client  | Real-time messaging & channel management | Singleton with Clerk authentication              |
| Firebase Messaging  | Push notification delivery               | FCM with service worker background handling      |
| Push Template API   | Server-side notification configuration   | Stream Chat Push v3 with Handlebars templates    |
| Device Registration | FCM token management with Stream         | `addDevice()`/`removeDevice()` with localStorage |
| Service Worker      | Background notification handling         | Firebase Messaging SW with message listener      |
| Company Isolation   | Multi-tenant user filtering              | Clerk ID validation with company-scoped queries  |

### • Core Features

- **Multi-Tenant Messaging** — Users can only chat with members of their organization through Clerk ID validation and company-scoped user queries
- **Real-Time Updates** — Instant message delivery with typing indicators, read receipts, and presence status via Stream Chat WebSocket
- **Channel Management** — Create, archive, and restore conversation channels with persistent state across sessions
- **Per-Channel Muting** — Users can mute specific channels while maintaining global notification settings
- **Responsive Design** — Adaptive sidebar/channel layout with mobile-first breakpoint management
- **Internationalization** — Polish language support with custom translations via Streami18n

### • Push Notification Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Push Notification Flow (Stream Chat Push v3 + Firebase)   │
├─────────────────────────────────────────────────────────────┤
│  1. User enables notifications → Browser permission request │
├─────────────────────────────────────────────────────────────┤
│  2. Permission granted → Firebase SDK requests FCM token    │
├─────────────────────────────────────────────────────────────┤
│  3. FCM token obtained → Register with Stream Chat          │
│     via client.addDevice(token, 'firebase', userId)         │
├─────────────────────────────────────────────────────────────┤
│  4. Push template configured → Stream API receives template │
│     with platform-specific notification payloads            │
├─────────────────────────────────────────────────────────────┤
│  5. New message event → Stream sends to Firebase servers    │
├─────────────────────────────────────────────────────────────┤
│  6. Firebase delivers → Service worker receives & displays  │
│     notification even when app is backgrounded/closed       │
└─────────────────────────────────────────────────────────────┘
```

### • Multi-Platform Push Template

Stream Chat Push v3 uses Handlebars-style templates for customizable notifications:

```json
{
  "data": {
    "version": "v2",
    "sender": "stream.chat",
    "type": "{{ event_type }}",
    "channel_id": "{{ channel.id }}",
    "message_id": "{{ message.id }}"
  },
  "android": {
    "priority": "high",
    "notification": {
      "title": "{{ sender.name }}",
      "body": "{{ truncate message.text 150 }}",
      "sound": "default"
    }
  },
  "webpush": {
    "notification": {
      "title": "{{ sender.name }}",
      "body": "{{ truncate message.text 150 }}",
      "icon": "{{ sender.image }}"
    },
    "fcm_options": { "link": "/chat" }
  },
  "apns": {
    "payload": {
      "aps": {
        "alert": {
          "title": "New message from {{ sender.name }}",
          "body": "{{ truncate message.text 150 }}"
        },
        "badge": "{{ unread_count }}",
        "sound": "default"
      }
    }
  }
}
```

### • Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  ChatPage                                                   │
│  ├── Chat (Stream Chat Provider)                            │
│  │   ├── ChannelIdHandler (deep-link support)               │
│  │   ├── ChannelRestorer (session persistence)              │
│  │   ├── ChatSidebar                                        │
│  │   │   ├── ChannelList (filterable channel list)          │
│  │   │   └── UserSearch (company-scoped user discovery)     │
│  │   └── ChatChannel                                        │
│  │       ├── Menubar                                        │
│  │       │   ├── ThemeToggle                                │
│  │       │   └── PushSubscriptionToggleButton               │
│  │       ├── CustomChannelHeader                            │
│  │       │   └── ChannelNotificationToggle (per-channel)    │
│  │       ├── MessageList                                    │
│  │       └── MessageInput                                   │
│  └── usePushNotifications (FCM hook)                        │
└─────────────────────────────────────────────────────────────┘
```

### • Security & Multi-Tenancy

| **Security Layer**      | **Implementation**                                        |
| :---------------------- | :-------------------------------------------------------- |
| User Authentication     | Clerk-issued tokens validated on both client and server   |
| Company Isolation       | Clerk ID format validation (`user_[a-zA-Z0-9_]+`)         |
| Device Token Management | FCM tokens stored locally, registered server-side only    |
| Push Template Auth      | Server action with `auth()` guard before Stream API calls |
| Channel Access Control  | Stream Chat channel membership enforced at SDK level      |

### • Push Notification Hook

The `usePushNotifications` hook manages the complete FCM lifecycle:

```typescript
interface UsePushNotificationsReturn {
  isSupported: boolean; // Browser supports notifications & Firebase configured
  isEnabled: boolean; // User granted permission
  isLoading: boolean; // Operation in progress
  error: string | null; // Last error message
  enablePushNotifications: () => Promise<boolean>;
  disablePushNotifications: () => Promise<boolean>;
}

// Key responsibilities:
// 1. Check browser support & Firebase configuration
// 2. Register Firebase service worker
// 3. Request notification permission
// 4. Obtain and cache FCM token
// 5. Register/unregister device with Stream Chat
// 6. Auto-register on client reconnection
```

### • Service Worker Implementation

The Firebase Messaging service worker handles background notifications:

```javascript
// firebase-messaging-sw.js
importScripts('firebase/firebase-app-compat.js');
importScripts('firebase/firebase-messaging-compat.js');

// Receive config from main app via postMessage
self.addEventListener('message', (event) => {
  if (event.data?.type === 'FIREBASE_CONFIG') {
    firebase.initializeApp(event.data.config);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      const { title, body, icon } = payload.notification;
      self.registration.showNotification(title, { body, icon });
    });
  }
});
```

</details>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>🛡️ Testing & Quality</strong> — Jest, Playwright, k6, Artillery, type safety</summary>

PoliLex is validated with a **full testing pipeline** that combines automated tests, static analysis, and load testing.  
Every change is validated through:

- **Automated unit and integration suites** using **Jest** and **React Testing Library** for components and business logic
- **End-to-end regression tests** with **Playwright** for critical user journeys in the browser
- **Load and performance exercises** with **k6** and **Artillery** focused on core APIs, server-side operations, and caching behavior
- **Strict static typing and schema validation** with **TypeScript (strict mode)**, **Prisma**, **Zod**, and **@t3-oss/env-nextjs** for data, inputs, and configuration
- **Automated linting and formatting** with **ESLint**, **Prettier**, and import-sorting to enforce consistent, production-grade code quality

</details>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>🔗 Resources & Links</strong></summary>

<div align="center">

[![Watch Demo](https://img.shields.io/badge/YouTube-Watch%20Demo-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=1Q7oyvCVanE)

</div>

</details>

<details style="margin-bottom: 16px;">
<summary style="cursor: pointer; font-size: 1.1rem;"><strong>📚 Background</strong> — Education, training, specialization</summary>

<table width="100%" style="font-size: 16px;">
<tr>
<td width="33%" style="text-align: center; padding: 12px; border: 1px solid #374151; background-color: #1f2937;"><strong>Education</strong></td>
<td width="33%" style="text-align: center; padding: 12px; border: 1px solid #374151; background-color: #1f2937;"><strong>Training</strong></td>
<td width="34%" style="text-align: center; padding: 12px; border: 1px solid #374151; background-color: #1f2937;"><strong>Specialization</strong></td>
</tr>
<tr>
<td style="text-align: center; padding: 12px; border: 1px solid #374151;"><strong>Boolean UK Graduate</strong><br>Full-stack development fundamentals</td>
<td style="text-align: center; padding: 12px; border: 1px solid #374151;"><strong>JS Mastery Graduate</strong><br>(Feb 2024) - Advanced React & Next.js Masterclass</td>
<td style="text-align: center; padding: 12px; border: 1px solid #374151;"><strong>Polish Language Enthusiast</strong><br>Combined technical expertise with language learning</td>
</tr>
</table>

</details>

---

<div align="center">
  <sub style="font-size: 14px;">Always learning, always building. Currently exploring advanced AI integration and enterprise-scale applications.</sub>
</div>

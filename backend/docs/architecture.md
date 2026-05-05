# Architecture & Invariants

## Technology Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind, Zustand. Hosted on Vercel.
- **Backend API:** Node.js, Express.js, Zod. Hosted on Render (Auto-Scaled).
- **Data Layer:** Neon PostgreSQL, Prisma ORM, PgBouncer.
- **Caching & Queue:** Redis, BullMQ.
- **External CDNs:** Cloudflare R2 (Files), Bunny.net (Video DRM).

## Layer Boundaries
- **Strict Separation:** The Next.js frontend is a pure client. It must NEVER connect directly to Neon DB or Redis. 
- **The Bouncer:** All incoming data must pass through Zod validation middleware before hitting a Controller.
- **Direct-to-Cloud:** Files > 5MB must use Presigned URLs and upload directly from the browser to R2.

## Codebase Invariants (NEVER VIOLATE)
1. **Stateless Backend:** Node.js instances must hold ZERO local state. All sessions, locks, and active user counts must live in Redis.
2. **Idempotent Payments:** Any `/pay` endpoint must use a unique database lock (`userId` + `month`) to prevent double-charging.
3. **Never Trust the Client:** Frontend timers (e.g., exams) are purely visual. Node.js dictates all absolute timestamps.


| **Layer / Category** | **Technology** | **Primary Role / Purpose** |
| --- | --- | --- |
| **Frontend Framework** | **Next.js (App Router) + TS** | Client UI, server-side rendering, and SEO optimization. |
| **Frontend State & Data** | **Zustand & Axios/React Query** | Cross-tab state synchronization and API data caching. |
| **Validation (Full-Stack)** | **Zod** (+ React Hook Form) | Strict type-checking and form validation before/after data transit. |
| **Backend API** | **Node.js + Express.js** | Core business logic using a stateless, 3-tier Controller-Service-Route architecture. |
| **Real-Time Data** | **Server-Sent Events (SSE)** | One-way HTTP streams pushing live updates (timers, attendance) to clients. |
| **Backend Security** | **Helmet.js & express-rate-limit** | HTTP header protection and IP-based rate limiting to prevent spam. |
| **Authentication** | **JWT (JSON Web Tokens)** | Secure user sessions stored in HTTP-only cookies. |
| **Primary Database** | **Neon (Serverless PostgreSQL)** | Relational source of truth for users, payments, and academic records. |
| **Database Middleware** | **Prisma & PgBouncer** | Type-safe ORM querying and connection pooling to survive auto-scaling. |
| **In-Memory Cache** | **Redis** | High-speed temporary storage for sessions, caching results, and Pub/Sub routing. |
| **Background Processing** | **BullMQ** | Task queue running on a separate worker to handle heavy jobs asynchronously. |
| **Secure File Storage** | **Cloudflare R2** | Zero-egress S3-compatible storage for exam PDFs via presigned URLs. |
| **Video Streaming** | **Bunny.net (Bunny Stream)** | VOD hosting with dynamic, IP-bound DRM to prevent piracy. |
| **Third-Party APIs** | **Zoom API & PayHere** | Webhook integrations for automated attendance and idempotent payments. |
| **Infrastructure / Host** | **Vercel & Render** | Vercel for the Next.js frontend; Render for auto-scaling Node.js backend/workers. |
| **Observability** | **Sentry & Pino** | Global crash reporting/error tracking (Sentry) and structured JSON logging (Pino). |





### The Data Flow Explained:

1. **Public Marketing Traffic:** When a new user hits the landing page, Next.js pulls the banners and schedules directly from **Sanity CMS**. Your Node.js server isn't even touched, keeping performance high.
2. **Standard API Traffic:** When an Admin logs in or updates a student's role, Next.js sends an Axios request with a JWT token to **Node.js**, which uses **Prisma** to update the **PostgreSQL** database.
3. **Heavy File Traffic (Exams):** When a student uploads an exam, Node.js acts only as a gatekeeper. It hands the student a secure "Presigned URL," and the student's device uploads the 5MB PDF directly into **Cloudflare R2**.
4. **Video & Live Classes:** Pre-recorded videos stream directly from **Bunny.net's** encrypted CDN to the browser. For live classes, the **Zoom SDK** runs entirely in the browser, but it secretly fires a webhook back to Node.js the second the student joins to log their attendance.




Key Setup Highlights for Your Architecture:
src/index.ts: This is where you will initialize your Express app, attach your global middlewares (like cors and helmet), connect to your routes, and start the app.listen() port.

src/workers/: This folder is crucial. The code in here will technically run on a completely separate Render server (your Background Worker) so it never slows down the main API in index.ts.

src/types/: Because you are using TypeScript, you will often need to tell Express about custom data. For example, after your middleware verifies a JWT, it attaches the student's ID to req.user. You will create an express.d.ts file in this folder so TypeScript knows req.user exists.

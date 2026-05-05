# Progress Tracker

**Current Phase:** Phase 1 - Infrastructure Setup
**Status:** 🟢 Ready to begin code initialization.

## Phases

### [ ] Phase 1: Foundation
- [x] Finalize System Architecture & Database Schema.
- [ ] Initialize Next.js Frontend Repository.
- [ ] Initialize Node.js Backend Repository (Express + TS).
- [ ] Setup Docker Compose for local Redis & Postgres.

### [ ] Phase 2: Core Auth & Users
- [ ] Implement Prisma Schema.
- [ ] Build JWT Authentication Flow.
- [ ] Setup Role-Based Access Control (RBAC) middleware.

### [ ] Phase 3: The LMS Engine
- [ ] Build hybrid Class & Attendance system.
- [ ] Integrate Cloudflare R2 Presigned URLs.
- [ ] Integrate Bunny.net DRM Token generation.
- [ ] Set up Server-Sent Events (SSE) broadcasting.

### [ ] Phase 4: Scaling & Async
- [ ] Implement BullMQ for background tasks.
- [ ] Setup Rate Limiting and Helmet.js.
- [ ] Prepare deployment pipelines (Vercel + Render).

## Architectural Decisions Log
- **[2026-05-05]:** Decided on Node.js/Express over Next.js API Routes for the backend to ensure pure stateless scaling, SSE streaming, and independent worker instances via BullMQ.
- **[2026-05-05]:** Chose Bunny.net over custom HLS server to guarantee IP-bound DRM security.
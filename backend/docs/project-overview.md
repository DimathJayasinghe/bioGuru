# Project Overview: Academy LMS

## Product Summary
A high-concurrency Learning Management System (LMS) designed for a university environment (UCSC). Built to handle 1,200+ concurrent students with enterprise-grade stability, secure video delivery, and real-time academic updates.

## Core Goals
- Survive "Thundering Herd" traffic spikes (e.g., exam result publications).
- Prevent piracy via IP-bound Video DRM.
- Ensure zero database locking during heavy background tasks.

## User Base
- **Students (1200+):** Consume video, upload exams, view real-time scores, pay fees.
- **Main Admins:** Publish schedules, trigger real-time UI updates, manage users.
- **Marking Panel:** Download exam batches, grade, and upload results.

## Key Flows
- **Hybrid Attendance:** Physical barcode scanning combined with Zoom Webhook integration.
- **Exam Submissions:** Direct-to-Cloudflare R2 uploads via presigned URLs (bypassing backend).
- **Live Broadcasting:** Real-time dashboard updates via Server-Sent Events (SSE).

## Explicitly Out of Scope
- Native mobile app development (PWA/Responsive Web is the target).
- Local server file storage (strictly R2/Bunny.net).
- Built-in video transcoding (offloaded to Bunny Stream).
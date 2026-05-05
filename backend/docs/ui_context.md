# UI Context & Design System

## Core Libraries
- **Styling:** Tailwind CSS.
- **Components:** Shadcn UI (Radix primitives).
- **Icons:** Lucide React / Lordicon (for animated states).

## Design Tokens
- **Theme:** Clean, academic, and distraction-free. 
- **Color Palette (Primary):** Use deep blues and slate grays for structure, distinct semantic colors for status (Green = Present, Red = Absent, Amber = Pending).
- **Responsiveness:** Mobile-first. The dashboard must function flawlessly on 360px mobile screens (for physical barcode scanning).

## Component Conventions
- **Forms:** Use `react-hook-form` integrated with `@hookform/resolvers/zod` for immediate error feedback.
- **Loading States:** Always provide Skeleton loaders for dashboard widgets instead of blank white screens.
- **Error States:** Use friendly, non-technical error boundaries (e.g., "We couldn't load your timetable. Reconnecting...").
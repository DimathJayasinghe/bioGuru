# Code Standards

## Global
- Strict TypeScript: No `any` types. Use exact interfaces or Zod inference.
- Error Handling: Do not swallow errors. Pass them to the Global Error Handler via `next(err)`.

## Backend (Node.js/Express)
- **3-Tier Architecture Strictness:**
  - `Routes`: Only define paths and attach middleware.
  - `Controllers`: Extract `req.body`, call Services, format `res.json`. NO database logic here.
  - `Services`: Contains Prisma queries and core business logic.
- **Transactions:** Use `$transaction` for any Prisma operation affecting more than one table.

## Frontend (Next.js)
- **State:** Use `Zustand` for global state. Avoid React Context unless absolutely necessary to prevent re-renders.
- **Data Fetching:** Use `Axios` or `React Query` for backend API calls. 
- **Components:** Favor small, single-responsibility Client Components inside Server Component layouts.
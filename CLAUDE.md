# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # Start dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # Run ESLint
```

No test suite is configured yet.

## Architecture

**CodeColab** is a Next.js 16 app (App Router) with React 19. It serves two separate consumers:

1. **Web UI** — standard Next.js pages for the CodeColab web experience
2. **Unity game client** — a REST API at `/api/game/auth/*` used by a Unity WebGL game

### Dual-client auth pattern

There are two distinct auth flows that must not be conflated:

- **Web auth** (`/auth/sign-in`, `/auth/sign-up`, `/auth/forgot-password`) uses `@supabase/ssr` with cookie-based sessions. The Supabase client here is `src/lib/supabase/client.ts` (browser) and `src/lib/supabase/server.ts` (server components / route handlers). The server client uses the **service role key** and disables cookie writes — this is intentional for SSR reads.

- **Game auth** (`/api/game/auth/*`) uses `src/lib/supabase/admin.ts`, a cookie-free admin client built with the raw `supabase-js` SDK. It returns JWT `access_token` + `refresh_token` in JSON for Unity to store natively. All endpoints include CORS headers via `src/lib/api/cors.ts` because Unity WebGL runs in a browser context — **do not remove or restrict those headers without updating the Unity client**.

The `GameAuthResponse` type in `src/types/auth.ts` is the shared contract between this API and the Unity client. Do not change its shape without coordinating with the Unity side.

### OTP callback

`/auth/callback` handles Supabase email OTP verification (signup confirmation, magic link, password recovery, email change). It reads `token_hash` + `type` from query params, validates against an allowlist, and calls `verifyOtp`.

### UI layer

Components live in `src/components/ui/` (shadcn/ui, radix-vega style, Tailwind v4, lucide icons) and `src/components/features/` (domain-specific, currently only auth forms). Forms use `react-hook-form` + `zod` with schemas from `src/validations/auth.ts`.

Toasts use `sonner`. The `Toaster` is mounted once in `src/app/layout.tsx`.

### Path aliases

`@/` maps to `src/` — use it for all internal imports.

### Environment variables

| Variable | Used in |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | All Supabase clients |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser client only |
| `SUPABASE_SERVICE_ROLE_KEY` | Server client + admin client |

The admin client bypasses Row Level Security — only use it in trusted server-side route handlers.

### Database schema

Defined in `src/types/supabase.ts` (auto-generated). Current tables: `games`, `history`, `player_datas`.

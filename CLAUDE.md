# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test framework is configured.

## Architecture

**AuraTwin** is a Next.js 14 (App Router) web dashboard for an emotion-recognition digital twin system. The physical client (a Windows Python app with a camera) detects emotions and pushes data to AWS; this web app reads that data and surfaces it to the user.

### Data flow

```
Windows client → AWS (Mini-Xception model) → Firestore → This web app → Gemini report
```

AWS resolves user identity via `app_keys/{app_key}` → uid (O(1) lookup), then writes to `users/{uid}/emotions/{autoId}`.

### Firestore schema

```
app_keys/{app_key}          → { uid, created_at }
users/{uid}/profile/data    → { name, surname, email, app_key, created_at }
users/{uid}/last_report/data → { generated_at, content }
users/{uid}/emotions/{autoId} → { timestamp, emotion_label, confidence }
```

### Key library files

| File | Role |
|------|------|
| `src/lib/firebase.ts` | Firebase init (guards double-init) |
| `src/lib/firestore.ts` | `getUserProfile`, `getEmotionLogs`, `saveReport`, `getLastReport` |
| `src/lib/gemini.ts` | Calls Gemini 3.1 Flash Lite to generate well-being reports |
| `src/context/AuthContext.tsx` | `useAuth()` → `{ user, loading, logout }` |
| `src/context/ThemeContext.tsx` | Dark/light mode, persisted to localStorage |

### Routes

- `/` — Landing page
- `/dashboard` — Protected; recharts pie+line charts, AI report, App Key display
- `/login`, `/register`, `/forgot-password` — Auth flow
- `/settings` — User settings
- `/product`, `/about`, `/science` — Marketing/info pages
- `/privacy-policy`, `/terms` — Legal

### Styling

Tailwind CSS with class-based dark mode. Custom palette defined in `tailwind.config.ts`:
- `primary` — sky blue (`#0ea5e9` base)
- `accent` — purple (`#a855f7` base)
- `warm` — orange (`#f97316` base)

Path alias `@/*` maps to `src/*`.

### Environment variables (`.env.local`)

`NEXT_PUBLIC_FIREBASE_*` (6 vars) + `NEXT_PUBLIC_GEMINI_API_KEY`

### Deployment

Netlify — config in `netlify.toml`.

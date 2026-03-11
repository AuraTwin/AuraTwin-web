# AuraTwin Website

Official website for AuraTwin — An Affective Digital Twin for Personalized Well-being

**Live:** [https://auratwin.netlify.app/](https://auratwin.netlify.app/)

---

## About

Website repository for the COMP4920 graduation project at **Yaşar University, Computer Engineering Department**. AuraTwin uses facial expression analysis and AI to help users understand their emotional patterns through a privacy-first digital twin system.

## Tech Stack

- **Next.js 14** (App Router) — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Firebase Auth** — User authentication
- **Cloud Firestore** — Emotion log & profile storage
- **Gemini 2.0 Flash** — AI Digital Twin report generation
- **recharts** — Dashboard charts
- **Netlify** — Deployment

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, features, how it works, privacy guarantees |
| `/product` | Affective digital twin concept and technology |
| `/science` | Academic & research foundation (affective computing, FER datasets) |
| `/about` | Team, values, university affiliation |
| `/privacy-policy` | Privacy policy — data collection, processing, user rights |
| `/terms` | Terms of service |
| `/login` | Sign in with email & password |
| `/register` | Create account — generates App Key, writes Firestore profile |
| `/forgot-password` | Password reset via Firebase email |
| `/dashboard` | Protected — emotion charts, App Key, Digital Twin Report |
| `/settings` | Protected — profile info, password change, account deletion |

## Dashboard Features

- **Your App Key** — Collapsible card split into two equal columns: App Key + copy button on the left, Windows client download link on the right.
- **Stats** — Total sessions (last 14 days), most common emotion (last 7 days), last session date & time.
- **Emotion Distribution** — Donut chart with per-emotion color coding.
- **Recent Sessions** — Paginated table showing date/time, color-coded emotion badge, and probability score from the model.
- **Digital Twin Report** — AI-generated report via Gemini 2.0 Flash. The model speaks as the user's emotional digital twin, reflecting observed patterns over up to 14 days of data.

## Emotion Color Palette

| Emotion | Color |
|---|---|
| Happiness | `#22c55e` (green) |
| Neutral | `#94a3b8` (slate) |
| Sadness | `#3b82f6` (blue) |
| Anger | `#ef4444` (red) |
| Fear | `#8b5cf6` (purple) |
| Disgust | `#14b8a6` (teal) |
| Surprise | `#f59e0b` (amber) |
| Contempt | `#7c3aed` (violet) |

## Firestore Data Structure

```
app_keys/{app_key}              → { uid, created_at }           (O(1) lookup by AWS)

users/{uid}/
  profile/data                  → { name, surname, email, app_key, created_at }
  last_report/data              → { generated_at, content }
  emotions/{autoId}             → { timestamp, emotion_label, confidence_score }
                                    ↑ written by AWS via Firebase Admin SDK
```

## Authentication & Data Flow

1. User registers at `/register` → Firebase Auth account created + Firestore profile written with a unique `ATV-XXXX-YYYY` App Key; a reverse-lookup document is written to `app_keys/{app_key}`
2. App Key is entered in the AuraTwin Windows desktop client to link the account
3. Desktop client captures facial expressions → sends frames + App Key to AWS FastAPI
4. AWS resolves `app_keys/{app_key}` → uid, runs emotion recognition model, writes `{ emotion_label, confidence_score, timestamp }` to Firestore
5. Dashboard reads logs; user can generate a Digital Twin Report on demand via the Gemini API

## Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_GEMINI_API_KEY=...
```

## Development

```bash
npm install
npm run dev
```

## Team

| Name | Student ID |
|---|---|
| Ali Haktan SIĞIN | 21070001004 |
| Yiğit Emre ÇAY | 21070001008 |
| Utku DERİCİ | 21070001031 |
| Ahmet Özgür KORKMAZ | 21070001046 |

**Academic Advisor:** Doç. Dr. Mete Eminağaoğlu

## Project

COMP4920 Senior Design Project — Yaşar University, Computer Engineering Department

&copy; 2026 AuraTwin

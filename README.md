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
- **Firebase Auth** — User authentication
- **Cloud Firestore** — Emotion log &amp; profile storage
- **Gemini 2.0 Flash** — AI well-being report generation
- **recharts** — Dashboard charts
- **Netlify** — Deployment

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, features, how it works |
| `/product` | Technology, capabilities, system architecture |
| `/privacy` | Privacy-first architecture |
| `/science` | Academic &amp; research foundation |
| `/about` | Team and mission |
| `/faq` | Frequently asked questions |
| `/blog` | Resources &amp; educational content |
| `/login` | Sign in (redirects to dashboard if already logged in) |
| `/register` | Create account — generates App Key, writes Firestore profile |
| `/dashboard` | Protected — emotion charts, App Key display, Gemini AI report |

## Authentication Flow

1. User registers at `/register` → Firebase Auth account created + Firestore profile written (`users/{uid}/profile/data`) with a unique `ATV-XXXX-YYYY` App Key
2. App Key is entered in the AuraTwin Windows desktop client to link the account
3. Desktop client sends emotion logs to AWS FastAPI → stored in Firestore (`users/{uid}/emotions/`)
4. Dashboard reads logs and generates AI well-being reports via Gemini API

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

# AuraTwin Website

The official website for AuraTwin - an Affective Digital Twin for Personalized Well-being and Self-Correction.

## Overview

AuraTwin is a senior design project from Yaşar University's Computer Engineering Department. This website showcases the product, explains the technology, and provides information about our privacy-first approach to emotion recognition.

## Features

- **Modern Design**: Clean, professional design with calming blue/purple color palette
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewing
- **8 Complete Pages**:
  - Home - Hero section with key features and benefits
  - Product - Detailed product capabilities and technical information
  - Privacy & Security - Comprehensive privacy-first architecture explanation
  - Science & Research - Academic foundation and research background
  - Pricing/Get Access - Beta waitlist signup and future pricing plans
  - About/Team - Mission, team members, and values
  - FAQ - Comprehensive Q&A across all topics
  - Resources/Blog - Educational content (coming soon)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (ready to implement)
- **Font**: Inter (via Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AuraTwin-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation and footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles and Tailwind directives
│   ├── product/            # Product page
│   ├── privacy/            # Privacy & Security page
│   ├── science/            # Science & Research page
│   ├── pricing/            # Pricing/Get Access page
│   ├── about/              # About/Team page
│   ├── faq/                # FAQ page
│   ├── blog/               # Blog/Resources page
│   ├── privacy-policy/     # Privacy Policy page (placeholder)
│   └── terms/              # Terms of Service page (placeholder)
└── components/
    ├── Navigation.tsx      # Header navigation
    └── Footer.tsx          # Site footer
```

## Color Palette

- **Primary (Blues)**: Calming, trustworthy blues for main UI elements
- **Accent (Purples)**: Creative purples for highlights and CTAs
- **Warm (Orange)**: Energetic orange for special elements
- **Neutrals**: Grays for text and backgrounds

## Team

- Yiğit Emre Çay - Lead Developer
- Ali Haktan Sığın - Backend Engineer
- Utku Derici - Full Stack Developer
- Ahmet Özgür Korkmaz - Systems Engineer

**Academic Advisor**: Doç. Dr. Mete Eminağaoğlu

## License

This project was developed as part of COMP4910 Senior Design Project at Yaşar University.

## Contact

For questions or feedback, please contact the team through the website's contact form.

# Running Coach

A personal running training PWA built for tracking and executing structured training plans. Currently ships with a full 12-week 10K plan, with half marathon and marathon plans coming soon.

## Features

- **Training Calendar** — full plan overview with week-by-week sessions, phase badges, and completion tracking
- **Session Detail** — tap any session to see intervals, target paces, warm-up instructions, and training notes
- **Interval Timer** — audio-cued timer with countdown beeps, work/recovery phases, wake lock, and circular progress display
- **Progress Charts** — weekly volume and session completion charts powered by Recharts
- **Cross-device Sync** — sign in with a magic link to sync progress across devices via Supabase
- **Offline Support** — works fully offline using localStorage; syncs to the cloud when online
- **PWA** — installable on iOS and Android via "Add to Home Screen"

## Tech Stack

- [Next.js 14+](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) — auth + database
- [Recharts](https://recharts.org) — progress charts
- Deployed on [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (optional — app works offline without it)

### Installation

```bash
git clone https://github.com/Leogricci/running-coach.git
cd running-coach
npm install
```

### Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

If you leave these blank the app still works — data is stored in localStorage only.

### Database Setup

Run the schema in your Supabase SQL editor:

```bash
cat supabase/schema.sql
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components (calendar, timer, session, progress)
├── data/plans/       # Training plan data (10K, half, marathon stubs)
├── hooks/            # useActivePlan, useSessionLog, useWakeLock, useAudioCues
├── lib/              # Supabase client, auth context, sync logic, localStorage
├── types/            # TypeScript types (Plan, Week, Session, Interval)
└── utils/            # Pace formatting, date helpers
```

## Training Plans

Plans are defined as TypeScript objects in `src/data/plans/`. Each plan is fully self-contained and the UI is plan-agnostic — components take a `Plan` object as input.

| Plan | Status | Weeks |
|------|--------|-------|
| 10K | Complete | 12 |
| Half Marathon | Coming soon | — |
| Marathon | Coming soon | — |

## Deployment

The app is deployed on Vercel. Every push to `main` triggers a new production deployment.

To deploy your own instance:

1. Fork the repo
2. Import into [Vercel](https://vercel.com)
3. Add the two Supabase environment variables
4. Deploy

## License

MIT

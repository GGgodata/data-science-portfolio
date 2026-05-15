# NANY Provider Prototype

פרוטוטייפ ויזואלי של צד הספק (נותן השירות) בפלטפורמת NANY — Marketplace שירותי בית פרימיום בישראל.

⚠️ זהו פרוטוטייפ ויזואלי בלבד. כל הנתונים הם mock data, אין backend ואין auth אמיתי.

## נקודות גישה

- `/providers/join` — דף נחיתה לספקיות
- `/providers/onboarding` — תהליך הרשמה ב-16 שלבים
- `/providers/onboarding/success` — מסך הצלחה
- `/providers/dashboard` — דשבורד ספקית (Home, הזמנות פתוחות, ההזמנות שלי, לוז, הכנסות, דירוגים, פרופיל)

## פיתוח

```bash
npm install
npm run dev
```

פותח את האפליקציה ב-`http://localhost:5173`.

## Build

```bash
npm run build
```

Build artifacts יוצרים בתיקיית `dist/`.

## Deployment ל-Netlify

הקובץ `netlify.toml` כבר מוגדר (build command + SPA fallback redirect).

### אפשרות א' — Drag & Drop
1. הרץ `npm run build`
2. כנס ל-[app.netlify.com](https://app.netlify.com)
3. גרור את תיקיית `dist/` ל-dashboard. תקבל URL אקראי תוך כ-30 שניות.

### אפשרות ב' — Git
דחוף את ה-repo ל-GitHub, חבר ב-Netlify, ו-deploy אוטומטי בכל push.

### אפשרות ג' — CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## מבנה הפרויקט

```
src/
├── components/
│   ├── shared/       # Header, Footer, Layout
│   ├── landing/      # Hero, WhyNany, HowItWorks, Testimonials, FAQ, FinalCTA
│   ├── onboarding/   # OnboardingLayout, ProgressBar, StepWrapper + 16 step components
│   ├── dashboard/    # Sidebar, TopBar, KPICard, JobCard, BookingCard, charts, modals, etc.
│   └── ui/           # (reserved for future shared UI primitives)
├── pages/
│   ├── Landing.tsx
│   ├── Onboarding.tsx
│   ├── OnboardingSuccess.tsx
│   └── dashboard/    # Home, AvailableJobs, MyJobs, Schedule, Earnings, Reviews, Profile
├── context/          # OnboardingContext
├── data/             # categories, subcategories, cities, mock-jobs, mock-bookings, mock-earnings, mock-reviews
└── lib/              # utils (cn), provider (localStorage helpers)
```

## טכנולוגיות

- **Vite + React 19 + TypeScript**
- **Tailwind CSS 3** (Hebrew RTL, theme: cream / ink / wine / gold / stone)
- **React Router 7** (BrowserRouter, nested routes)
- **Framer Motion** (page transitions, scroll-in animations)
- **Recharts** (Earnings BarChart)
- **lucide-react** (icons)

## פונטים

- **Heebo** (sans, ממשק)
- **Cormorant Garamond** (serif, כותרות editorial)

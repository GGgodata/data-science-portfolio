# NANY Provider Prototype

פרוטוטיפ ויזואלי ופונקציונלי של **צד הספק** בפלטפורמת NANY — מרקטפלייס לשירותי בית
שמחבר בין משפחות (צד הביקוש) לבין נותנות שירות (צד ההיצע).

נבנה ב-React + TypeScript + Vite + Tailwind + Framer Motion + Recharts, בעברית מלאה (RTL).

## פיתוח

```bash
npm install
npm run dev
```

האפליקציה תרוץ ב-http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## נקודות גישה

- `/providers/join` — דף נחיתה לגיוס ספקיות
- `/providers/onboarding` — תהליך הרשמה בן 16 שלבים (כמו Typeform, נשמר ב-localStorage)
- `/providers/onboarding/success` — מסך הצלחה
- `/providers/dashboard` — דשבורד הספקית (בית, הזמנות פתוחות, ההזמנות שלי, לוז, הכנסות, דירוגים, פרופיל)

## הערות

- כל הנתונים הם mock (`src/data/`). העלאות קבצים, תשלומים והגשת הצעות הם דמה בלבד.
- ה-onboarding נשמר ב-localStorage; השם והפרופיל מועברים לדשבורד לאחר הסיום.

## Deployment

מוכן ל-deploy ב-Netlify (ראה `netlify.toml`). אפשרויות:

1. **Drag & Drop**: גררו את תיקיית `dist/` ל-app.netlify.com.
2. **Git**: חברו את ה-repo ל-Netlify ל-deploy אוטומטי בכל push.
3. **CLI**: `netlify deploy --prod --dir=dist`

-- Income Scout — סכימת הדאטהבייס
-- פרויקט Supabase: income-scout
--
-- זהו מקור האמת של המערכת. קבצי ה-Markdown ב-reports/ הם פלט לקריאה בלבד.
-- כל טבלה כאן מוגנת ב-RLS ללא policies: הגישה היחידה היא דרך service role / MCP.
-- אין לחשוף את הטבלאות האלה ללקוח עם anon key.

-- ============================================================
-- runs — ריצה יומית אחת
-- ============================================================
create table if not exists public.runs (
  id                uuid primary key default gen_random_uuid(),
  run_date          date not null unique,
  domains_scanned   text[] not null default '{}',
  raw_candidates    integer not null default 0,   -- כמה מועמדים גולמיים נבחנו בסך הכול
  survived_filter   integer not null default 0,   -- שרדו את 10 סעיפי הפסילה
  passed_redteam    integer not null default 0,   -- שרדו את ה-Red Team
  reported          integer not null default 0,   -- הגיעו לדוח הסופי
  report_path       text,                         -- reports/YYYY-MM-DD.md
  notes             text,                         -- "מה השתנה מאז הריצה הקודמת"
  created_at        timestamptz not null default now()
);

comment on table public.runs is 'ריצה יומית אחת של Income Scout, כולל מספרי המשפך';

-- ============================================================
-- ideas — כל רעיון שנבחן אי פעם, כולל שנפסלו
-- ============================================================
create table if not exists public.ideas (
  id                     uuid primary key default gen_random_uuid(),
  run_id                 uuid references public.runs(id) on delete set null,
  run_date               date not null,

  title                  text not null,
  domain                 text not null,           -- micro-saas-ai | services | content | ecommerce | wildcard
  one_liner              text,
  core_mechanic          text not null,           -- מפתח הכפילות. לפי זה בודקים חזרות, לא לפי השם
  buyer                  text,                    -- הקונה המדויק בשם התפקיד

  score                  integer,                 -- Reality Score 0-100
  score_breakdown        jsonb,                   -- {"need":22,"willingness":18,...}
  confidence             text check (confidence in ('high','medium','low')),

  status                 text not null default 'proposed'
                         check (status in ('proposed','rejected_by_redteam','rejected_by_user',
                                           'in_progress','shipped')),
  reason                 text,                    -- למה נפסל / פסק הדין

  -- המספרים שמכריעים החלטה
  offer_price            text,                    -- המחיר וההצעה, כטקסט חופשי (מדרגות/מטבעות)
  setup_cost_ils         numeric(12,2),           -- עלות הקמה חד-פעמית
  monthly_cost_ils       numeric(12,2),           -- עלות חודשית שוטפת
  capital_at_risk_ils    numeric(12,2),           -- כמה כסף בסיכון לפני שיודעים אם יש ביקוש
  days_to_first_revenue  integer,
  mvp_hours              integer,                 -- שעות עבודה ל-MVP

  plan_md                text,                    -- 14 הסעיפים המלאים ב-Markdown
  report_path            text,

  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists ideas_core_mechanic_idx on public.ideas (lower(core_mechanic));
create index if not exists ideas_status_idx        on public.ideas (status);
create index if not exists ideas_domain_idx        on public.ideas (domain);
create index if not exists ideas_score_idx         on public.ideas (score desc);
create index if not exists ideas_run_date_idx      on public.ideas (run_date desc);

comment on column public.ideas.core_mechanic is
  'מנגנון הליבה. שני רעיונות עם אותו מנגנון = אותו רעיון, גם אם השם שונה. זה מפתח מניעת החזרות';
comment on column public.ideas.capital_at_risk_ils is
  'כמה כסף נשרף לפני שיודעים אם יש ביקוש. המספר שמכריע יותר מסך ההשקעה';

-- ============================================================
-- evidence — הראיות לכל רעיון. בלי זה הרעיון לא קיים
-- ============================================================
create table if not exists public.evidence (
  id           uuid primary key default gen_random_uuid(),
  idea_id      uuid not null references public.ideas(id) on delete cascade,
  url          text not null,
  source_type  text,        -- reddit | review | freelance | competitor | ad_library | trend | workaround | other
  quote        text,        -- הציטוט עצמו, כדי שלא צריך לפתוח את הלינק
  verified     boolean not null default false,   -- אומת ע"י Red Team
  captured_at  timestamptz not null default now()
);

create index if not exists evidence_idea_idx on public.evidence (idea_id);

-- ============================================================
-- feedback — התגובות של המפעיל. המקור בעל המשקל הגבוה ביותר
-- ============================================================
create table if not exists public.feedback (
  id          uuid primary key default gen_random_uuid(),
  idea_id     uuid references public.ideas(id) on delete set null,
  verdict     text check (verdict in ('interested','rejected','building','shipped')),
  note        text not null,   -- ה"למה". שווה יותר מהפסק דין עצמו
  created_at  timestamptz not null default now()
);

-- ============================================================
-- directives — הנחיות קבועות מהמפעיל. גוברות על כל כלל אחר
-- ============================================================
create table if not exists public.directives (
  id          uuid primary key default gen_random_uuid(),
  directive   text not null,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

comment on table public.directives is
  'הנחיות קבועות כמו "אל תציע רעיונות שדורשים מכירה טלפונית". הסוכן מתייחס אליהן כהוראה';

-- ============================================================
-- lessons — זיכרון ארוך טווח שמשנה חיפושים עתידיים
-- ============================================================
create table if not exists public.lessons (
  id          uuid primary key default gen_random_uuid(),
  lesson      text not null,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- תחזוקה
-- ============================================================
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists ideas_touch_updated_at on public.ideas;
create trigger ideas_touch_updated_at
  before update on public.ideas
  for each row execute function public.touch_updated_at();

-- ============================================================
-- תצוגות נוחות
-- ============================================================

-- מה שממתין להחלטה שלך
create or replace view public.v_pending_decisions as
select run_date, title, domain, score, confidence,
       capital_at_risk_ils, days_to_first_revenue, one_liner
from public.ideas
where status = 'proposed'
order by score desc nulls last, run_date desc;

-- המשפך לאורך זמן — האם המערכת באמת סורקת רחב
create or replace view public.v_funnel as
select run_date, raw_candidates, survived_filter, passed_redteam, reported,
       array_to_string(domains_scanned, ', ') as domains
from public.runs
order by run_date desc;

-- מה נדחה ולמה — הדפוסים שמכווננים ריצות עתידיות
create or replace view public.v_rejection_patterns as
select i.domain, i.status, count(*) as n,
       array_agg(distinct coalesce(f.note, i.reason)) filter (
         where coalesce(f.note, i.reason) is not null
       ) as reasons
from public.ideas i
left join public.feedback f on f.idea_id = i.id
where i.status in ('rejected_by_user', 'rejected_by_redteam')
group by i.domain, i.status
order by n desc;

-- ============================================================
-- אבטחה: RLS מופעל ללא policies.
-- הגישה היחידה היא service role / MCP. anon key לא רואה כלום.
-- אם יתווסף אי פעם דאשבורד ללקוח — יש להוסיף policies במפורש.
-- ============================================================
alter table public.runs       enable row level security;
alter table public.ideas      enable row level security;
alter table public.evidence   enable row level security;
alter table public.feedback   enable row level security;
alter table public.directives enable row level security;
alter table public.lessons    enable row level security;

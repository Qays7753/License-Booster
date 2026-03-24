# Refinement Pass V2 — Post-Execution Polish & New Features

## Context

The first refinement prompt (`REFINEMENT-PROMPT.md`) has been **fully executed**. The codebase is now split into section components, government platforms are integrated, the survey is rewritten, animations are reduced, and the navbar is polished.

This second prompt addresses **new issues discovered after execution** and adds features that were not in the original scope. Treat this as an additive pass — do NOT undo any work from the first pass unless explicitly stated.

---

## Technology & Dependencies (unchanged — DO NOT modify)

- **Runtime:** Vite 6 + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite` — uses `@theme inline` syntax, NOT `tailwind.config.js`
- **Animation:** framer-motion
- **Routing:** wouter (currently single `/` route — you will add `/dashboard`)
- **UI primitives:** shadcn/ui (Radix-based) in `src/components/ui/`
- **Icons:** lucide-react
- **Fonts:** Cairo (headings) + Tajawal (body) from Google Fonts
- **State:** React useState/useEffect only

---

## TASK 1 — Fix Arabic Voice: Remove Excessive Colloquial Language

### Problem

Multiple visible texts across the page use **overly colloquial Arabic** ("وش", "شو", "وين", "ليش", "هالصفحة") or inconsistent register. The target audience is Jordanian professionals — the voice should be **spoken-formal Jordanian Arabic** (عربية أردنية مبسطة رسمية): clear and approachable, but not street slang or stiff academic.

### 1.1 — Global find-and-replace for colloquial words

Scan ALL `.tsx` and `.ts` files in `src/` for the following words in **visible Arabic text** (not variable names or comments) and replace:

| Find | Replace with | Notes |
|---|---|---|
| وش | ما / ماذا | "وش تسوي" → "ماذا تفعل" |
| شو | ما / ماذا | "شو المطلوب" → "ما المطلوب" — BUT keep "شو" only in very short, punchy button labels if it sounds natural |
| وين | أين | "وين أنت" → "أين أنت" |
| ليش | لماذا | "ليش التنظيم" → "لماذا التنظيم" |
| هالصفحة | هذه الصفحة | Always |
| هالسؤال | هذا السؤال | Always |
| شو اللي | ما الذي | Always |
| مو | ليس / ليست | "مو مستوى المعرفة" → "ليس مستوى المعرفة" |
| بس | لكن / فقط | Context-dependent: "بس مو" → "لكن ليس", "هذا بس" → "هذا فقط" |
| هذي | هذه | Always |
| تسوي | تفعل | Always |
| تسويه | تفعله | Always |
| يوديك | يأخذك / ينقلك | Always |
| تقدر | يمكنك / تستطيع | Always |
| خلصنا | انتهينا | Always |

**Words that are ACCEPTABLE and should NOT be changed** (universally understood Jordanian Arabic):
- "بدون" (without) — fine
- "لسه" (still/not yet) — fine
- "شغّال" (running/operating) — fine
- "ملف ناقص" (incomplete file) — fine
- "خلّ" in "خلّ خطوتك" — borderline, replace with "اجعل"

### 1.2 — Specific texts to rewrite

**In `SurveySection.tsx` — questions array:**

Current Question 1 subtitle: `"نقيس نقطة البداية، مو مستوى المعرفة."`
→ Change to: `"نقيس نقطة البداية، وليس مستوى المعرفة."`

Current Question 2 question: `"بعد القراءة، شو أكثر شي أصبح واضح لك؟"`
→ Change to: `"بعد القراءة، ما أكثر شيء أصبح واضحاً لك؟"`

Current Question 3 question: `"بعد القراءة، كم تحس إنك جاهز تبدأ بخطوة عملية؟"`
→ Change to: `"بعد القراءة، كم تشعر أنك جاهز لبدء خطوة عملية؟"`

Current Question 4 question: `"شو أول شي ممكن تسويه بعد ما تطلع من هالصفحة؟"`
→ Change to: `"ما أول شيء قد تفعله بعد مغادرة هذه الصفحة؟"`

Current ENCOURAGEMENTS[1]: `"هالسؤال يساعدنا نقيس وضوح المعلومات."`
→ Change to: `"هذا السؤال يساعدنا في قياس وضوح المعلومات."`

Current ENCOURAGEMENTS[3]: `"سؤال واحد بعد وخلصنا."`
→ Change to: `"سؤال واحد بعد وانتهينا."`

**In `EntitiesSection.tsx` — SectionHeader description:**

Current: `"هذي المنصات الرسمية اللي تقدر تبدأ منها مباشرة. كل رابط يوديك للموقع الحكومي الرسمي."`
→ Change to: `"هذه المنصات الرسمية التي يمكنك البدء منها مباشرة. كل رابط ينقلك إلى الموقع الحكومي الرسمي."`

**In `content.ts` — GOVERNMENT_PLATFORMS useCase fields:**

- `"ابدأ هنا إذا تريد تعرف شو المطلوب قبل ما تبدأ أي إجراء."` → `"ابدأ هنا إذا أردت معرفة المتطلبات قبل البدء بأي إجراء."`
- `"ابدأ هنا إذا تفضّل تسوي كل شي من مكان واحد."` → `"ابدأ هنا إذا كنت تفضّل إنجاز كل شيء من مكان واحد."`

**In `FooterSection.tsx`:**

Current: `"خلّ خطوتك الجاية أوضح"`
→ Change to: `"اجعل خطوتك القادمة أوضح"`

**In `SectionConnector` calls across all section files:**

Scan all `SectionConnector` `text` props for colloquial words and apply the same replacements.

### 1.3 — The voice standard (apply everywhere)

After making specific replacements above, do a **final sweep** of every Arabic string in the codebase. For each string, ask: "Would a Jordanian professional say this in a semi-formal meeting?" If it sounds like a text message, elevate it. If it sounds like a government decree, simplify it.

---

## TASK 2 — Restrict Quiz Project Types to 4 Categories

### 2.1 — Replace the `type` question options in `PathQuiz.tsx`

The current first question offers 6 project types (food, trade, digital, craft, home, manufacturing). Replace with exactly **4 categories** aligned with Jordan's economic sector classification:

```typescript
{
  key: "type",
  title: "ما القطاع الأقرب لمشروعك؟",
  options: [
    {
      label: "صناعة وإنتاج",
      value: "industry",
      Icon: Package,
      iconClassName: "bg-amber-100 text-amber-700",
    },
    {
      label: "زراعة",
      value: "agriculture",
      Icon: Sprout,        // ADD import: import { Sprout } from "lucide-react"
      iconClassName: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "خدمات",
      value: "services",
      Icon: Monitor,
      iconClassName: "bg-cyan-100 text-cyan-700",
    },
    {
      label: "سياحة وضيافة",
      value: "tourism",
      Icon: Utensils,
      iconClassName: "bg-orange-100 text-orange-700",
    },
  ],
}
```

### 2.2 — Update `typeLabels`

```typescript
const typeLabels: Record<string, string> = {
  industry: "نشاط صناعي أو إنتاجي",
  agriculture: "نشاط زراعي",
  services: "نشاط خدمات",
  tourism: "نشاط سياحي وضيافة",
};
```

### 2.3 — Update `buildQuizResult()` logic

- Replace `answers.type === "food"` and `answers.type === "manufacturing"` with:
  ```typescript
  const needsSectorReview = answers.type === "industry" || answers.type === "agriculture" || answers.type === "tourism";
  ```
- The `isHomeOnly` check must come ONLY from `answers.location === "home_only"`, NOT from project type. Remove any `answers.type === "home"` checks.
- Search for ALL references to old values (`food`, `trade`, `digital`, `craft`, `home` as type, `manufacturing`) and update them.

### 2.4 — Update `buildPrintableMarkup()`

Verify the PDF export renders correctly with the new type labels.

---

## TASK 3 — Apply Justified Text Alignment for Long Paragraphs

### 3.1 — Add utility class in `index.css`

```css
.text-justify-ar {
  text-align: justify;
  text-align-last: right;
}
```

### 3.2 — Apply `text-justify-ar` to these elements

- Section descriptions (the `<p>` inside `SectionHeader`'s `description` prop) — update `SectionHeader.tsx` to apply the class to the description wrapper
- Benefit card descriptions
- Comparison section row descriptions (both columns)
- Scenario carousel: challenge and takeaway paragraphs
- Legal forms card descriptions
- Home-based section body paragraphs
- Journey steps descriptions
- Entity/platform `description` and `useCase` text
- Footer disclaimer text
- Quiz result `summary` paragraph

### 3.3 — Do NOT apply to

- Headlines (`h1`, `h2`, `h3`)
- Short labels, badges, buttons, nav items
- Quiz/Survey question text (short sentences)
- Single-sentence list items

---

## TASK 4 — Audit and Fix References & Statistics

### 4.1 — Verify existing source links

The Stats section uses `SOURCE_FACTS` in `content.ts` with these 3 statistics:

1. **21.1%** — GEM 2024/2025 report via `jordan.gov.jo` URL
2. **98%** — EIB 2016 report PDF
3. **71%** — Same EIB 2016 source

**Action:**
- Open each URL in a browser and verify it loads a real page/document.
- If a URL returns 404 or is broken: **remove that entire statistic** from `SOURCE_FACTS` and adjust the grid (2 cards instead of 3, or find a replacement with a verifiable source).
- Do NOT invent replacement statistics or URLs.
- If a link works but the specific number cannot be found in the source document, add a note: `// VERIFY: Could not locate exact figure in source document`

### 4.2 — Add a "sources may change" note

Below the Stats section cards in `StatsSection.tsx`, add:

```html
<p className="mt-6 text-center text-sm text-muted-foreground">
  المؤشرات مبنية على مراجع منشورة في تاريخها. الأرقام قد تختلف في تقارير أحدث.
</p>
```

### 4.3 — Sync `RESEARCH_LINKS` with verified `SOURCE_FACTS`

If any source was removed from Stats, remove it from `RESEARCH_LINKS` in `content.ts` too.

---

## TASK 5 — Rewrite Disclaimers to Sound Natural

### 5.1 — ScenarioCarousel disclaimer (`ScenarioCarousel.tsx`)

Current:
> "هذه أمثلة مركبة من أسئلة تتكرر في السوق الأردني، وليست شهادات فردية موثقة. الهدف منها توضيح الأنماط الشائعة لا الادعاء بنتائج مضمونة."

Replace with:
> "أمثلة توضيحية مبنية على أنماط شائعة في السوق، وليست تجارب شخصية محددة."

### 5.2 — Entities section disclaimer (`EntitiesSection.tsx`)

Current:
> "إذا كانت حالتك فيها تفاصيل خاصة، افتح المنصة الأقرب لحالتك ثم راجع الجهة المختصة قبل ما تعتمد على أي افتراض عام."

Replace with:
> "الروابط تنقلك إلى المنصة الرسمية مباشرة. إذا كانت حالتك فيها تفاصيل خاصة، راجع الجهة المختصة."

### 5.3 — Global scan

Scan all section files for any remaining long disclaimers (more than 2 sentences). Shorten each to 1 sentence maximum. The footer disclaimer is the ONLY comprehensive one — everything else is a brief note.

---

## TASK 6 — Replace Hero Illustration

### 6.1 — Problem

The current `public/images/hero-illustration.png` is **clearly AI-generated**: it contains a fictional company logo ("JordanTech Solutions"), cartoon-style characters with AI-typical rendering, and a generic "corporate office" scene. This directly contradicts the project's core goal of having zero visible AI fingerprints.

### 6.2 — Action

**Option A (if the project owner provides a replacement):** Replace with the provided image, ensure it's optimized (under 200KB, or convert to WebP).

**Option B (if no replacement is provided):** Remove the illustration entirely and restructure the Hero right column:
- Remove the `<img>` and its wrapper card
- Keep only the "الفكرة الأساسية" card (the text content below the image)
- Make the Hero a single-column centered layout on desktop instead of the current 2-column grid
- Increase the headline size slightly to fill the visual space

**Option C (recommended):** Replace with a **simple, abstract SVG illustration** that doesn't depict people. Create an inline SVG or use a simple geometric pattern/icon composition that represents "organizing documents" or "building structure" abstractly. Use the page's existing color palette (primary teal-blue, accent coral). This avoids the AI-image problem entirely.

Add a code comment: `{/* TODO: Replace with professionally designed illustration if available */}`

### 6.3 — Hero background

The `hero-bg.png` (408KB) is a simple gradient — it's acceptable but oversized. Compress it to under 100KB, or better yet, replace it with a CSS gradient since it's just a color transition:

```css
/* In the Hero section, replace the <img> background with: */
background: radial-gradient(circle at top left, rgba(255,255,255,0.14), transparent 34%),
            radial-gradient(circle at bottom right, rgba(221,107,77,0.22), transparent 32%),
            linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary)));
```

This eliminates a 408KB image load entirely.

### 6.4 — Future illustration placeholders

Add HTML comments (not visible to users) in these sections for future illustrations:
- Benefits section: `{/* TODO: Optional illustration — "before vs after" formalization concept */}`
- Journey Steps section: `{/* TODO: Optional step-by-step visual timeline */}`
- Home-Based section: `{/* TODO: Optional home-based business illustration */}`

---

## TASK 7 — Analytics Dashboard

### 7.1 — Create a minimal backend for tracking

Since the project has NO backend currently, implement the simplest possible solution:

**Option A — Supabase (preferred if credentials are available):**
- Create two tables:
  - `page_visits`: `id (auto)`, `created_at (timestamp)`, `referrer (text)`, `user_agent (text)`
  - `survey_responses`: `id (auto)`, `created_at (timestamp)`, `source (text)`, `baseline (text)`, `clarity_gain (text)`, `readiness (text)`, `next_action (text)`, `segment (text)`
- Create a Supabase client in `src/lib/supabase.ts` using environment variables
- Track page visits with a `useEffect` in `Home.tsx` that inserts into `page_visits` on mount
- Update survey submission to insert into `survey_responses`

**Option B — Local JSON (fallback if no Supabase):**
- Create `/api/analytics` and `/api/survey` endpoints using Vite's built-in server proxy or a simple Express server in `server/index.ts`
- Store data in `data/visits.json` and `data/survey.json`
- Add `server/` to .gitignore if it contains sensitive data

### 7.2 — Dashboard page at `/dashboard`

Create a new route using wouter:

```typescript
// In App.tsx or equivalent routing file
<Route path="/dashboard" component={DashboardPage} />
```

**Dashboard layout:**

```
+----------------------------------+
|  Dashboard Header (title + date) |
+----------------------------------+
|  Total Visits | Today | This Week |
+----------------------------------+
|  Survey Completion Rate          |
|  (responses / visits × 100)     |
+----------------------------------+
|  Source Distribution (Q0)        |
|  [====== bar chart ======]      |
+----------------------------------+
|  Baseline Clarity (Q1)          |
|  [====== bar chart ======]      |
+----------------------------------+
|  Post-Reading Clarity (Q2)      |
|  [====== bar chart ======]      |
+----------------------------------+
|  Readiness Shift (Q3)           |
|  [====== bar chart ======]      |
+----------------------------------+
|  Next Action Intent (Q4)        |
|  [====== bar chart ======]      |
+----------------------------------+
|  Visitor Segment (Q5)           |
|  [====== bar chart ======]      |
+----------------------------------+
```

**Implementation rules:**
- Use the same design system: Tailwind, Cairo/Tajawal fonts, same colors
- **No charting library** — use simple CSS/Tailwind bars: `<div className="h-6 bg-primary" style={{ width: `${percentage}%` }} />`
- Bar charts should show: option text (Arabic) + count + percentage
- Add a "Back to page" link at the top
- Add a comment: `// TODO: Add authentication before deploying to production`
- Page language should be Arabic (`dir="rtl" lang="ar"`)

### 7.3 — Update survey submission

In `SurveySection.tsx`, update the POST to use the real endpoint from 7.1. The success screen must still show regardless of API response (the existing graceful-failure logic from the first prompt must be preserved).

---

## TASK 8 — Defer Survey Question Validation

The survey questions were written to measure the page's impact (clarity gain, readiness shift). However, **the accuracy of the survey depends on the final content being correct** — which will only be true after all content enrichment from external references is complete.

**Action:** Add this comment block at the top of the `questions` array in `SurveySection.tsx`:

```typescript
/**
 * IMPORTANT: These survey questions are designed to measure page impact.
 * Each answer option maps to specific page content:
 * - Q2 option "الفرق بين التسجيل والترخيص" → maps to ComparisonSection
 * - Q2 option "الجهة اللي لازم أبدأ منها" → maps to EntitiesSection + Quiz results
 * - Q2 option "الخطوات تختلف حسب النوع والموقع" → maps to Quiz logic + LegalForms
 * - Q2 option "خطوات ناقصة" → maps to JourneySteps + Quiz results
 *
 * After any major content change, verify that each option still
 * corresponds to actual content on the page.
 *
 * TODO: Review and update after content enrichment from external references.
 */
```

Do NOT change the survey questions themselves in this pass — they will be reviewed after content enrichment.

---

## Validation Checklist

After completing all tasks, verify:

- [ ] `npm run typecheck` passes with zero errors
- [ ] `npm run build` succeeds
- [ ] No colloquial words from Task 1 table remain in visible Arabic text
- [ ] Quiz offers exactly 4 project types: industry, agriculture, services, tourism
- [ ] Quiz results generate correctly for all 4 type × location × team × stage combinations
- [ ] PDF export works with new type labels
- [ ] `text-justify-ar` is applied to all specified paragraphs, not to headings or short text
- [ ] All source URLs in `SOURCE_FACTS` are verified (or removed if broken)
- [ ] `RESEARCH_LINKS` matches verified `SOURCE_FACTS`
- [ ] ScenarioCarousel disclaimer is shortened to 1 sentence
- [ ] EntitiesSection disclaimer is shortened
- [ ] Hero illustration is replaced or removed (no AI-generated images visible)
- [ ] Hero background is replaced with CSS gradient (or compressed to under 100KB)
- [ ] Dashboard page loads at `/dashboard`
- [ ] Dashboard shows visitor count and survey breakdown
- [ ] Survey submission posts to real endpoint
- [ ] Survey shows success screen even when API fails
- [ ] All section IDs and scroll navigation still work
- [ ] RTL layout intact, no broken Arabic text on mobile (375px)
- [ ] No `console.error` in production

---

## Execution Order

1. **Task 1** — Fix Arabic voice (global sweep, specific rewrites)
2. **Task 2** — Restrict quiz types (changes PathQuiz logic)
3. **Task 5** — Rewrite disclaimers (small text changes)
4. **Task 3** — Apply justified text (CSS + class additions)
5. **Task 4** — Audit references (verify URLs, remove broken ones)
6. **Task 6** — Replace hero illustration (visual change)
7. **Task 7** — Analytics dashboard (new feature, biggest scope)
8. **Task 8** — Add survey validation comment (trivial)
9. **Validation checklist** — Run all checks

---

## Critical Rules

1. **ALL content must remain in Arabic.** Dashboard included.
2. **Do NOT re-introduce AI fingerprints:** no floating orbs, shimmer/glow effects, animated gradient text, pulsing elements.
3. **Do NOT add new npm dependencies** except `@supabase/supabase-js` if using Supabase for the dashboard.
4. **Do NOT change the quiz result calculation logic** beyond updating type values. The structure of `buildQuizResult()` stays the same.
5. **Do NOT modify the section order** or remove any sections.
6. **Arabic voice standard:** spoken-formal Jordanian Arabic. Not slang, not academic. See Task 1 word table for the exact register.
7. **All Arabic punctuation rules from the first prompt still apply:** `،` not `,`, `؟` not `?`, `«»` for quotes.
8. **Preserve all existing component props and interfaces.**
9. **The dashboard is a SEPARATE page** — do not add dashboard UI to the landing page itself.
10. **Do NOT modify the footer disclaimer** — it stays as-is.

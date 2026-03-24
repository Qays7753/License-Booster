# Landing Page Refinement Prompt — Final Polish Pass

## Context

You are working on an Arabic RTL landing page about business formalization (registration & licensing) in Jordan. The project is a Vite + React + TypeScript + Tailwind CSS 4 application. The page has already gone through two major iterations:

1. **V1:** AI-generated template with heavy visual effects (floating orbs, shimmer buttons, glow cards, gradient text animations, repetitive section badges). Content had unverified statistics, fear-based language, fake testimonials, and implicit promises.
2. **V2 (current):** Significant improvement — removed AI fingerprints, added a fixed navbar with IntersectionObserver-based active tracking, sourced statistics with references, honest language, extracted components (TopNav, PathQuiz, ScenarioCarousel, SurveySection, SectionHeader), a proper footer with disclaimer and official links, and a rich quiz result with PDF export.

The current version scores roughly **8/10** on credibility and professionalism. This prompt describes the **final refinement pass** to reach **9.5/10** — eliminating remaining weaknesses in content voice, visual monotony, technical structure, and interaction polish.

---

## File Structure (current)

```
src/
  pages/
    Home.tsx               # ~1340 lines — main page, still contains all section markup
  components/
    home/
      TopNav.tsx           # Fixed navbar with mobile menu
      SectionHeader.tsx    # Reusable section header (eyebrow + title + description)
      PathQuiz.tsx         # 4-step diagnostic quiz with dynamic result + PDF export
      ScenarioCarousel.tsx # "Common scenarios" carousel (replaced fake testimonials)
      SurveySection.tsx    # 6-question anonymous survey
    ui/                    # shadcn/ui primitives (accordion, button, tooltip, etc.)
  index.css                # Tailwind config, custom properties, base styles
index.html                 # lang="ar" dir="rtl"
```

---

## Technology & Dependencies (DO NOT change)

- **Runtime:** Vite 6 + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite` — uses `@theme inline` syntax, NOT `tailwind.config.js`
- **Animation:** framer-motion (already installed)
- **Routing:** wouter (single-page, only `/` route matters)
- **UI primitives:** shadcn/ui (Radix-based) — in `src/components/ui/`
- **Icons:** lucide-react
- **Fonts:** Cairo (headings) + Tajawal (body) loaded from Google Fonts in `index.css`
- **State:** React useState/useEffect only — no Redux, no Zustand
- **Build:** `npm run build` → `vite build`, `npm run typecheck` → `tsc --noEmit`

---

## Current Page Section Order (preserve this order unless explicitly told otherwise)

1. **Hero** (`id="top"`) — gradient primary background, two-column: text left + illustration card right
2. **Stats** (no id) — 3 sourced fact cards with animated counters and reference links
3. **Benefits** (`id="benefits"`) — split layout: SectionHeader + note on left, 6 cards on right
4. **Quiz** (`id="find-path"`) — PathQuiz component, 4 steps → dynamic result with PDF export
5. **FAQ + Concerns** (`id="faq"`) — two-column: concerns accordion left, FAQ accordion right
6. **Registration vs License** (`id="reg-vs-license"`) — dark primary bg, two explanation cards + comparison rows
7. **Legal Forms** (`id="legal-forms"`) — 6 legal structure cards in 3-column grid
8. **Home-Based Business** (`id="home-based"`) — split layout with icon card + content
9. **Scenarios** (no id) — ScenarioCarousel with disclaimer
10. **Delay Tradeoffs** (no id) — 4 cards about cost of postponement
11. **Journey Steps** (`id="what-changes"`) — 5 numbered steps with timeline
12. **Entities / Government Platforms** (`id="entities"`) — 5 government e-service platform cards (replaces old 4 authority cards) + disclaimer note
13. **Survey** (`id="survey"`) — SurveySection component, 6 questions
14. **Footer** (`id="footer"`) — CTA, last-updated, disclaimer, official links, research links
15. **Mobile Sticky CTA** — fixed bottom bar on mobile, appears after 720px scroll

---

## TASK 1 — Content Rewrite (Voice, Headlines, Flow)

### 1.1 — Rewrite all section headlines

Current headlines are **descriptive and defensive** — they explain what the section is rather than engaging the reader. Rewrite every `<h2>` to be:
- **Short** (under 10 words in Arabic)
- **Tension-creating or curiosity-provoking** — not merely descriptive
- Written in **spoken-formal Arabic** (not academic, not slang)

Examples of what to change (translate intent, not literally):

| Current (Arabic) | Problem | Direction |
|---|---|---|
| "التنظيم ليس وعداً سحرياً، لكنه يحسّن نقطة انطلاق المشروع" | Too long, hedging, defensive | Something like "ما الذي يتغيّر فعلاً عندما تنظّم ملفك؟" |
| "خريطة طريق أولية خلال أربع خطوات" | Purely descriptive, no pull | Something like "أربع أسئلة تكشف أين أنت بالضبط" |
| "ما الذي قد يقيّده التأجيل المستمر؟" | Too soft for a section meant to motivate | Something like "الفرص التي لا تنتظرك" |
| "بدل الشهادات العامة، هذه أمثلة أقرب لما يتكرر فعلاً" | Meta-commentary about the page redesign — the visitor never saw V1 | Something like "ثلاث قصص من السوق الأردني" |
| "رأيك يساعد على تحسين المحتوى لا على جمع بياناتك" | Defensive, talks about the page instead of the visitor | Something like "ساعدنا نفهم واقعك" |

Apply this same principle to ALL section titles and subtitles across the page. Do NOT use English. All content must remain Arabic.

### 1.2 — Remove all meta-commentary

The page currently contains sentences that talk **about the page itself** rather than **to the visitor**. Find and remove or rewrite every instance. Specific targets:

- Hero eyebrow: "صفحة إرشادية مبنية على مراجع معلنة ومكتوبة بلغة مباشرة، بدون وعود مبالغ فيها." — This is a description of the page, not a message to the visitor. Replace with a one-line value proposition that addresses the visitor directly.
- ScenarioCarousel SectionHeader description: "غيّرنا قسم التجارب الحقيقية إلى أمثلة مركبة..." — The visitor never saw V1. Rewrite to focus on what the scenarios offer, not what they replaced.
- Any sentence that starts with "هذه الصفحة..." or "هدفنا من هذا القسم..." — rewrite to address the visitor's need, not the page's methodology.

### 1.3 — Reduce disclaimer repetition

The following message appears in **5+ places** across the page in various forms:
> "التفاصيل تختلف حسب النشاط والموقع والشكل القانوني"
> "هذه الصفحة لا تحل محل الاستشارة القانونية"
> "النتيجة ليست بديلاً عن مراجعة الجهة المختصة"

**Action:** Keep ONE clear, comprehensive disclaimer in the footer (already exists). Remove or significantly shorten all other instances. Where a section genuinely needs a caveat (like the quiz result), keep it to ONE short sentence maximum — not a paragraph.

### 1.4 — Add concrete micro-stories

The Benefits section and the Delay Tradeoffs section currently use **abstract statements** that don't stick. Add 2-3 concrete, one-sentence scenarios inline. These should feel like real situations, not marketing copy.

Example for Benefits — under "وصول أوسع إلى السوق والعملاء":
> Current: "المشروع المنظم يكون أكثر جاهزية للتعامل مع جهات وعملاء لا يتعاملون عادة مع نشاط غير مكتمل الوضع."
> Add after it: "مثال: عرض توريد من شركة كبيرة يحتاج فاتورة رسمية وعقد باسم كيان واضح — بدون تنظيم، هذا العرض يضيع."

Example for Delay Tradeoffs — under "فرص تمويل أصعب":
> Add: "بنك لا يستطيع فتح ملف تمويل لنشاط بدون سجل. البرنامج التمويلي ينتهي قبل ما تجهّز ملفك."

These are **not testimonials** — they are illustrative scenarios clearly written as examples. Keep them short (1-2 sentences max).

### 1.5 — Add section-to-section flow connectors

After each major section, add a **bridge sentence + CTA button** that links to the next logical section. The page should feel like a guided narrative, not isolated islands.

Examples:
- After Benefits: "الآن بعد ما عرفت لماذا التنظيم مهم — أين مشروعك بالضبط؟" → Button: "ابدأ الاختبار التشخيصي" → scrolls to #find-path
- After Quiz result: "عرفت مسارك؟ افهم الفرق بين التسجيل والترخيص" → scrolls to #reg-vs-license
- After Legal Forms: "الشكل القانوني واضح؟ راجع الخطوات العملية" → scrolls to #what-changes

These connectors should be styled differently from section content — perhaps a centered block with a subtle background, a short sentence, and one button. NOT a full section.

### 1.6 — Add ONE memorable "anchor moment"

Somewhere in the first third of the page (after Hero, before or within Benefits), add a single **high-impact statement** that creates a "this is me" moment for the reader. This should be:
- Visually distinct — larger text, different background, stands alone
- Emotionally resonant but honest — not manipulative
- Short — 1-2 sentences max

Example direction (write the actual Arabic):
> "أنت تبيع اليوم لزبون يعرفك شخصياً. التنظيم هو اللي يخليك تبيع لزبون ما يعرفك — ويثق فيك."

Style this as a **standalone quote block** between sections — not inside a card, not inside Benefits. Full-width, generous padding, large text.

---

## TASK 2 — Design & Visual Polish

### 2.1 — Unify border-radius

The current codebase uses 9+ different border-radius values: `rounded-[2.4rem]`, `rounded-[2rem]`, `rounded-[1.9rem]`, `rounded-[1.8rem]`, `rounded-[1.6rem]`, `rounded-[1.5rem]`, `rounded-full`, `rounded-3xl`, `rounded-2xl`.

**Action:** Standardize to exactly 3 values:
- `rounded-2xl` (1rem) — small elements, inner cards, accordion items
- `rounded-3xl` (1.5rem) — main cards, section containers
- `rounded-full` — buttons, pills, badges, nav items

Find-and-replace ALL arbitrary `rounded-[Xrem]` values with the closest standard value. No exceptions.

### 2.2 — Break card monotony

Four sections currently use the **exact same card layout** (icon box + title + description):
- Benefits (6 cards)
- Legal Forms (6 cards)
- Entities (4 cards)
- Delay Tradeoffs (4 cards)

**Action — make each section visually distinct:**

- **Benefits:** Make the first 2 cards "featured" — larger, spanning full width or 2 columns, with a different background color. The remaining 4 stay as smaller cards in a 2-column grid.
- **Legal Forms:** Keep cards but add a **left/right color accent bar** on each card to differentiate them visually. Or use an alternating layout (card left, card right) for the first 3 most relevant forms.
- **Entities:** Replace cards with a **simple 4-row list** with icon + name + description inline. These are just reference items — they don't need the visual weight of cards.
- **Delay Tradeoffs:** Replace cards with a **horizontal scrollable strip** on mobile or a **single-row layout with vertical dividers** on desktop. Or use a numbered list with bold titles.

The goal: **no two sections should look like the same component rendered with different data.**

### 2.3 — Add functional color variety

Currently ALL icon containers use `bg-primary/9 text-primary`. This makes the page feel monotone.

**Action:** Introduce 3-4 semantic icon colors used consistently:
```css
/* In index.css or as Tailwind classes */
primary   → main informational sections (registration, licensing, entities)
accent    → CTAs, highlights, important callouts
emerald   → positive outcomes ("عند التنظيم" column, success states, quiz "formal" result)
amber     → warnings, attention items (delay tradeoffs, important notes)
```

Apply these colors to icon containers, eyebrow text, and card accent elements throughout the page. Be consistent — same meaning = same color everywhere.

### 2.4 — Simplify the Hero right card

The Hero section has a right-side card containing 4 nested elements:
1. Hero illustration image
2. "الفكرة الأساسية" mini-card
3. "ما الذي ستجده هنا" mini-card with 3 bullet points
4. "مبدأ الصفحة" mini-card

**This is too dense.** The visitor's eye doesn't know where to start.

**Action:** Reduce to 2 elements only:
1. The hero illustration (keep, it's good)
2. ONE card — either "الفكرة الأساسية" or the bullet points, not both

Move "مبدأ الصفحة" content elsewhere (e.g., it can become the "anchor moment" from Task 1.6 if rewritten). Delete "ما الذي ستجده هنا" — the navbar already serves this purpose.

### 2.5 — Add breathing space

The page is dense — every section is `py-20 md:py-28` with no variation. Insert **2 visual breathers**:

1. **After Benefits, before Quiz:** The "anchor moment" from Task 1.6 — full-width, generous vertical padding (`py-16 md:py-24`), large centered text on a warm background.
2. **After Comparison section, before Legal Forms:** A single large stat or a pull-quote — something that gives the eye a rest before the next information-dense section.

These breathers should have **no cards, no grids, no icons** — just text and space.

### 2.6 — Fix the Comparison section column order

Current order: `[عند التنظيم] [Label] [بدون تنظيم مكتمل]`

**Change to:** `[بدون تنظيم مكتمل] [Label] [عند التنظيم]`

The narrative logic is: **current pain → pivot → better state.** Reading right-to-left in Arabic, this means the "without" state should be on the RIGHT (first read) and the "with" state on the LEFT (resolution). Adjust the grid column order and the reveal animation direction accordingly.

---

## TASK 3 — Animation Reduction & Polish

### 3.1 — Remove whileInView from repeated cards

Currently EVERY card in EVERY section has:
```tsx
initial={{ opacity: 0, y: 22 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-70px" }}
transition={{ delay: index * 0.05, duration: 0.4 }}
```

**Action:** Remove `motion.*` wrapper and all `whileInView` props from:
- Benefit cards
- Legal Form cards
- Entity cards
- Delay Tradeoff cards

Keep them as plain `<article>` elements. They should simply **be there** when the user scrolls to them.

### 3.2 — Keep animation ONLY on these elements

- **Hero section** — initial page load animation (already good)
- **SectionHeader** — the single `whileInView` on each section title (already in SectionHeader.tsx — keep it)
- **Quiz steps** — the step transitions (already good)
- **Survey steps** — the step transitions (already good)
- **Comparison cards** — the left-column "عند التنظيم" reveal (this is a meaningful reveal, keep it)
- **The anchor moment quote** — a subtle fade-in for impact

Everything else should be static. This makes the animations that DO exist feel intentional and premium instead of "every element animates because a library is installed."

### 3.3 — Add a smooth active-section indicator to Navbar

In `TopNav.tsx`, the active nav item currently switches instantly. Add a `layoutId` animated pill behind the active item using framer-motion's `layout` prop:

```tsx
// Inside the nav items loop:
{isActive && (
  <motion.div
    layoutId="nav-active-pill"
    className="absolute inset-0 rounded-full bg-primary"
    transition={{ type: "spring", stiffness: 380, damping: 30 }}
  />
)}
```

This creates a smooth sliding pill effect when the active section changes during scroll. It's a small detail that signals intentional craft.

---

## TASK 4 — Technical Structure & Cleanup

### 4.1 — Split Home.tsx into section components

Home.tsx is still ~1340 lines. Extract each section into its own component file under `src/components/home/sections/`:

```
src/components/home/sections/
  HeroSection.tsx
  StatsSection.tsx
  BenefitsSection.tsx
  AnchorMoment.tsx          # The new breather/quote element
  QuizSection.tsx            # Wrapper around PathQuiz
  FaqConcernsSection.tsx
  ComparisonSection.tsx
  LegalFormsSection.tsx
  HomeBasedSection.tsx
  ScenarioSection.tsx        # Wrapper around ScenarioCarousel
  DelayTradeoffsSection.tsx
  JourneyStepsSection.tsx
  EntitiesSection.tsx
  SurveySection.tsx          # Wrapper, actual logic stays in components/home/SurveySection.tsx
  FooterSection.tsx
```

Home.tsx should become ~80-120 lines — just imports, the scroll/nav state management, and a clean list of section components.

Each section component receives `onNavigate: (id: string) => void` as a prop where needed (for CTA buttons that scroll to other sections).

### 4.2 — Add Open Graph meta tags

In `index.html`, add:

```html
<meta property="og:title" content="دليل التنظيم والتسجيل للمشاريع في الأردن" />
<meta property="og:description" content="صفحة إرشادية تساعدك على فهم مسار تسجيل وترخيص مشروعك في الأردن — بخطوات واضحة ومراجع معلنة." />
<meta property="og:image" content="/opengraph.jpg" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="ar_JO" />
<meta name="twitter:card" content="summary_large_image" />
```

### 4.3 — Add mobile menu overlay

In `TopNav.tsx`, when the mobile menu is open, add a **backdrop overlay** that:
- Covers the full viewport behind the menu
- Has a semi-transparent dark background (`bg-black/40`)
- Closes the menu when tapped
- Uses `AnimatePresence` for smooth fade-in/out

### 4.4 — Fix contrast issues

Check and fix these low-opacity text values that may fail WCAG AA (4.5:1 ratio) on the dark primary background:
- `text-primary-foreground/72`
- `text-primary-foreground/68`
- `text-primary-foreground/74`

Replace all values below `/78` with at least `/80` or use a dedicated muted light color: `text-primary-foreground/82` minimum for body text, `text-primary-foreground/70` acceptable only for labels/captions at 14px+.

### 4.5 — Reduce Navbar items

Current: 7 items (لماذا التنظيم, اختبار المسار, التسجيل والترخيص, الأشكال القانونية, المشروع المنزلي, أسئلة ومخاوف, الاستبيان)

**Reduce to 5:**
1. لماذا التنظيم
2. اختبار المسار
3. التسجيل والترخيص
4. أسئلة ومخاوف
5. الاستبيان

Remove "الأشكال القانونية" and "المشروع المنزلي" from the nav — they're still on the page, just not in the nav. This reduces desktop crowding and makes the nav scannable.

### 4.6 — Survey endpoint graceful handling

The survey currently POSTs to `/api/survey` with an empty `catch` block. There is no backend.

**Action:**
- Keep the `fetch` call (future-proofing), but add a visible but non-blocking feedback after submission completes:
  - If the fetch succeeds → show the existing success screen (no change)
  - If the fetch fails → **still show the success screen** (the UX should not break), but log a `console.warn` instead of silently swallowing the error
- Remove the word "وصلت إجاباتك" from the success message if the endpoint is known to not exist yet — replace with something like "شكراً على وقتك" which is true regardless of whether the data was saved
- The success screen must always appear after the last question, regardless of network status

### 4.7 — Hero section responsive behavior

On screens **below 1024px** (before `lg:` breakpoint), the Hero currently stacks vertically. Verify and fix:
- The illustration card should appear **below** the text, not above it — mobile users should see the headline and CTA first
- The 3 trust cards ("آخر تحديث", "الخصوصية", "المرجعية") should stack into a 1-column layout on mobile, not remain as a cramped 3-column grid
- The Hero CTA buttons should be full-width on mobile (`w-full` below `sm:`)

### 4.8 — Add `<meta name="description">` tag

`index.html` currently has `<title>` but no `<meta name="description">`. Add:

```html
<meta name="description" content="صفحة إرشادية لأصحاب المشاريع في الأردن: افهم الفرق بين التسجيل والترخيص، اكتشف المسار المناسب لمشروعك، واعرف الجهات المختصة والخطوات العملية." />
```

### 4.9 — Performance: lazy-load below-fold images

The hero illustration and hero background load eagerly (good). But ensure any images added in future sections use `loading="lazy"`. Also, verify that the hero-illustration.png is reasonably sized (should be under 200KB for a PNG of that dimension — if larger, note it in a comment for future optimization).

### 4.10 — Keyboard navigation & focus management

- All interactive elements (nav items, quiz options, survey options, accordion triggers, CTA buttons) must be **reachable via Tab key** and **activatable via Enter/Space**
- The mobile menu should **trap focus** when open — Tab should cycle within the menu, not escape to background content
- When the mobile menu closes, focus should return to the menu toggle button
- Quiz step transitions should move focus to the new question heading for screen reader users — add a `ref` + `focus()` call after step change

---

## TASK 5 — Validation Checklist

After completing all tasks, verify:

- [ ] `npm run typecheck` passes with zero errors
- [ ] `npm run build` succeeds
- [ ] All section IDs still work for scroll navigation
- [ ] The quiz still produces correct results for all answer combinations
- [ ] The PDF export from quiz results still works
- [ ] The survey submission still works (or fails gracefully)
- [ ] The mobile sticky CTA still appears on scroll
- [ ] The navbar active state correctly tracks scroll position
- [ ] All external links (official sites, research sources) still work
- [ ] RTL layout is intact — no LTR leaks
- [ ] No Arabic text is broken or truncated on mobile (test at 375px width)
- [ ] The page loads without layout shift (CLS)
- [ ] All images have proper `alt` attributes (empty string for decorative, descriptive for meaningful)
- [ ] Keyboard Tab navigation reaches all interactive elements in logical order
- [ ] Mobile menu traps focus when open
- [ ] Quiz step transition moves focus to the new question
- [ ] `<meta name="description">` is present in index.html
- [ ] Hero stacks correctly on mobile (text first, illustration below)
- [ ] Survey shows success screen even when `/api/survey` returns an error
- [ ] No `console.error` in production — only `console.warn` for expected failures
- [ ] No references to `istd.gov.jo` or `ssc.gov.jo` remain anywhere in the codebase
- [ ] No references to دائرة ضريبة الدخل والمبيعات or المؤسسة العامة للضمان الاجتماعي remain in entities, footer, or quiz results
- [ ] All 5 government platform links (`daleel.mit.gov.jo`, `ccd.gov.jo`, `eservices.mola.gov.jo`, `e-services.ammancity.gov.jo`, `sanad.gov.jo`) are present and clickable in the Entities section, footer, and relevant quiz results

---

## TASK 6 — Rewrite the Survey to Measure Page Impact

The current survey (in `SurveySection.tsx`) asks 6 general questions about the visitor's situation. These are useful as demographic data but **do not measure whether the page changed anything**. The page will be used as the informational companion to 3 motivational video stories published on social media. The videos inspire ("why formalize"), the page informs ("how to formalize"). The survey must measure: **did the page convert motivation into clarity and readiness?**

### 6.1 — Replace ALL existing survey questions with these 6 questions

Delete the entire current `questions` array in `SurveySection.tsx` and replace it with the following. Preserve the exact Arabic text, options, and order below. Do NOT rephrase, summarize, or "improve" the Arabic — use it verbatim.

**Question 0 — Source (how the visitor arrived)**

```
question: "كيف وصلت لهذه الصفحة؟"
subtitle: "يساعدنا نفهم كيف يتحرك المحتوى."
options:
  - { text: "شفت فيديو لصاحب مشروع على وسائل التواصل", emoji: "🎬" }
  - { text: "أرسلي أحد الرابط", emoji: "🔗" }
  - { text: "بحثت بنفسي عن تسجيل أو ترخيص المشاريع", emoji: "🔍" }
  - { text: "طريقة ثانية", emoji: "📌" }
```

**Question 1 — Baseline clarity (before reading the page)**

```
question: "قبل ما تقرأ هالصفحة، كم كان واضح لك شو المطلوب عشان ترخّص مشروعك؟"
subtitle: "نقيس نقطة البداية، مو مستوى المعرفة."
options:
  - { text: "ما كنت أعرف من وين أبدأ أصلاً", emoji: "🌫️" }
  - { text: "كنت أعرف الفكرة العامة بس مو التفاصيل", emoji: "🌤️" }
  - { text: "كنت أعرف الخطوات بشكل جيد", emoji: "☀️" }
```

**Question 2 — Post-exposure clarity (what became clearer)**

```
question: "بعد القراءة، شو أكثر شي أصبح واضح لك؟"
subtitle: "اختر الأقرب — ولو ما تغيّر شي، قلها بصراحة."
options:
  - { text: "عرفت الفرق بين التسجيل والترخيص وإنهم خطوتين مختلفتين", emoji: "💡" }
  - { text: "عرفت الجهة اللي لازم أبدأ منها لنوع مشروعي", emoji: "🏛️" }
  - { text: "فهمت إن الخطوات تختلف حسب نوع المشروع والموقع", emoji: "🗂️" }
  - { text: "اكتشفت إن عندي خطوات ناقصة كنت ما أعرف عنها", emoji: "🔎" }
  - { text: "ما حسيت إن الصفحة أضافت شي جديد لي", emoji: "😐" }
```

**Question 3 — Readiness shift (motivation → readiness)**

```
question: "بعد القراءة، كم تحس إنك جاهز تبدأ بخطوة عملية؟"
subtitle: "لا نقيس الحماس — نقيس الوضوح."
options:
  - { text: "جاهز وعارف شو أول خطوة", emoji: "🟢" }
  - { text: "أقرب من قبل بس لسه عندي أسئلة", emoji: "🟡" }
  - { text: "لسه ما حسيت إني جاهز", emoji: "🔴" }
  - { text: "مشروعي منظم أصلاً", emoji: "✅" }
```

**Question 4 — Specific next action**

```
question: "شو أول شي ممكن تسويه بعد ما تطلع من هالصفحة؟"
subtitle: "اختر الأقرب لنيّتك الفعلية."
options:
  - { text: "أفتح موقع الجهة المختصة اللي طلعت لي", emoji: "🏛️" }
  - { text: "أسأل محامي أو شخص عنده خبرة عن حالتي", emoji: "🤝" }
  - { text: "أشارك الصفحة مع شخص يحتاجها", emoji: "📤" }
  - { text: "أرجع أقرأ أقسام معينة بتركيز أكبر", emoji: "📖" }
  - { text: "ما عندي خطوة محددة حالياً", emoji: "⏸️" }
```

**Question 5 — Visitor segmentation**

```
question: "كيف تصف وضعك الآن؟"
subtitle: "آخر سؤال — شكراً على وقتك."
options:
  - { text: "أفكر أبدأ مشروع ولسه ما بدأت", emoji: "🌱" }
  - { text: "عندي مشروع شغّال بدون تنظيم مكتمل", emoji: "⚡" }
  - { text: "بدأت التسجيل لكن الملف ناقص", emoji: "📋" }
  - { text: "مسجل ومرخص", emoji: "🏁" }
```

### 6.2 — Update the survey submission payload

Change the POST body to include the new question keys that map to their analytical purpose:

```typescript
body: JSON.stringify({
  source: answers[0],        // how they arrived
  baseline: answers[1],      // clarity before reading
  clarity_gain: answers[2],  // what became clearer
  readiness: answers[3],     // readiness to act
  next_action: answers[4],   // specific intended action
  segment: answers[5],       // current business status
})
```

### 6.3 — Update the survey header text

Change the SectionHeader for the survey section:
- **eyebrow:** "استبيان قصير"
- **title:** "ساعدنا نفهم إذا الصفحة وضّحت الصورة" (short, visitor-focused, NOT meta-commentary)
- **description:** "6 أسئلة خفيفة بدون بيانات شخصية — نستخدمها لتحسين المحتوى ومعرفة إذا المعلومات توصل بالشكل الصحيح."

### 6.4 — Update the success screen text

After survey completion, the message should acknowledge the **purpose** of the survey:

- **Title:** "شكراً على وقتك."
- **Body:** "إجاباتك تساعدنا نعرف إذا المعلومات توصل بوضوح — وأين نحتاج نحسّن. لا نجمع أي بيانات شخصية."

### 6.5 — Update the ENCOURAGEMENTS array

Current encouragements are generic. Replace with contextual ones that match the new questions:

```typescript
const ENCOURAGEMENTS = [
  "إجابتك تساعدنا نفهم كيف يتحرك المحتوى.",
  "هالسؤال يساعدنا نقيس وضوح المعلومات.",
  "تقريباً انتهينا.",
  "سؤال واحد بعد وخلصنا.",
  "شكراً — هذا آخر سؤال.",
];
```

---

## TASK 7 — Integrate Government E-Service Platforms as Clickable Action Links

The page currently lists 4 government entities in the "Entities" section with names and generic descriptions but **no direct links to their e-service portals**. The following 5 official platforms must be integrated as **clickable, directly navigable links** so visitors can take action immediately after reading.

### 7.1 — The 5 platforms (use these EXACT URLs and Arabic names)

```typescript
const governmentPlatforms = [
  {
    name: "دليل الخدمات — وزارة الصناعة والتجارة والتموين",
    entity: "وزارة الصناعة والتجارة والتموين",
    type: "معلوماتي",
    typeLabel: "دليل مرجعي",
    description: "يشرح المتطلبات والمستندات والرسوم لكل خدمة متعلقة بتسجيل المنشآت والأسماء التجارية.",
    useCase: "ابدأ هنا إذا تريد تعرف شو المطلوب قبل ما تبدأ أي إجراء.",
    href: "https://daleel.mit.gov.jo",
  },
  {
    name: "دائرة مراقبة الشركات — الخدمات الإلكترونية",
    entity: "دائرة مراقبة الشركات",
    type: "تنفيذي",
    typeLabel: "تسجيل فعلي",
    description: "تسجيل الشركات إلكترونياً، فتح ملفات، تعديل بيانات، واستخراج شهادات.",
    useCase: "ابدأ هنا إذا قررت تسجّل شركتك وجاهز تفتح الملف.",
    href: "https://ccd.gov.jo",
  },
  {
    name: "نظام الرخص المهنية — وزارة الإدارة المحلية",
    entity: "وزارة الإدارة المحلية (البلديات)",
    type: "تنفيذي",
    typeLabel: "ترخيص فعلي",
    description: "التقديم على رخصة مهن إلكترونياً للبلديات خارج حدود أمانة عمّان.",
    useCase: "ابدأ هنا إذا مشروعك خارج عمّان وتحتاج رخصة مهن.",
    href: "https://eservices.mola.gov.jo",
  },
  {
    name: "أمانة عمّان الكبرى — الخدمات الإلكترونية",
    entity: "أمانة عمّان الكبرى",
    type: "تنفيذي",
    typeLabel: "ترخيص فعلي",
    description: "التقديم على رخصة مهن ومتطلبات الموقع إلكترونياً داخل حدود أمانة عمّان.",
    useCase: "ابدأ هنا إذا مشروعك داخل عمّان وتحتاج رخصة مهن.",
    href: "https://e-services.ammancity.gov.jo",
  },
  {
    name: "منصة سند",
    entity: "وزارة الاقتصاد الرقمي والريادة",
    type: "تنفيذي",
    typeLabel: "نقطة دخول موحّدة",
    description: "بوابة حكومية موحّدة تجمع خدمات التسجيل والضريبة والضمان وغيرها في مكان واحد.",
    useCase: "ابدأ هنا إذا تفضّل تسوي كل شي من مكان واحد.",
    href: "https://sanad.gov.jo",
  },
];
```

### 7.2 — Replace the Entities section entirely with these platforms

The current Entities section (`id="entities"`) has 4 generic cards (وزارة الصناعة، أمانة عمّان، الضريبة، الضمان). **Remove all 4 existing entities** — specifically, **delete دائرة ضريبة الدخل والمبيعات (ISTD) and المؤسسة العامة للضمان الاجتماعي (SSC) entirely**. These are not relevant to the page's scope (registration & licensing). Replace the entire section with the 5 government e-service platforms from 7.1. The new section should:

1. **Show each platform as a clickable card** with:
   - Platform name (Arabic)
   - One-line description of what the visitor can DO there
   - The `useCase` sentence (tells the visitor WHEN to use this platform)
   - A `typeLabel` badge ("دليل مرجعي" / "تسجيل فعلي" / "ترخيص فعلي" / "نقطة دخول موحّدة")
   - A **prominent clickable link/button** that opens the URL in a new tab (`target="_blank" rel="noreferrer"`)
   - The button text should be: "افتح المنصة ←" or "زيارة الموقع ←"

2. **Visual differentiation by type:**
   - "معلوماتي" (informational) platforms → use a distinct style (e.g., `amber` accent or outlined card) to signal "start here for research"
   - "تنفيذي" (transactional) platforms → use a different style (e.g., `primary` or `emerald` accent) to signal "take action here"

3. **Add a short intro sentence** above the cards:
   > "هذي المنصات الرسمية اللي تقدر تبدأ منها مباشرة. كل رابط يوديك للموقع الحكومي الرسمي."

4. **Keep the existing disclaimer** at the bottom of the section about consulting the relevant authority.

### 7.3 — Link platforms from Quiz results

In `PathQuiz.tsx`, the `buildQuizResult()` function currently returns an `authorities` array with text descriptions of relevant entities. **Enhance this** to also include the matching platform URL where applicable:

- When the result mentions "وزارة الصناعة والتجارة" → append link to `https://daleel.mit.gov.jo`
- When result mentions "أمانة عمّان" → append link to `https://e-services.ammancity.gov.jo`
- When result mentions "البلدية المختصة" (outside Amman) → append link to `https://eservices.mola.gov.jo`
- When result mentions "دائرة مراقبة الشركات" → append link to `https://ccd.gov.jo`
- For any result, always include `https://sanad.gov.jo` as a fallback unified portal
- **Remove all references to `https://www.istd.gov.jo/` (ISTD/الضريبة) and `https://www.ssc.gov.jo/` (SSC/الضمان الاجتماعي)** from the authorities array and from the quiz result output. These entities are outside the page's scope. If the current `buildQuizResult()` function includes them in the `authorities` array for any answer combination, remove those entries.

In the quiz result UI, each authority entry should render as **clickable** — showing the description text with a small external-link icon button that opens the platform URL in a new tab.

Also, add a single line at the top of the authorities list in the quiz result:
> "هذي الجهات اللي يُحتمل أن تحتاج مراجعتها. اضغط على أي رابط لفتح الموقع الرسمي مباشرة."

### 7.4 — Add platforms to the Footer

In the footer's "روابط الجهات الرسمية" section, **delete all existing links** (including any ISTD/الضريبة and SSC/الضمان الاجتماعي links) and **replace with the 5 platform links from 7.1**. Each must be a clickable `<a>` that opens in a new tab. Use the same card/link style already established in the footer.

### 7.5 — Add platforms to the PDF export

In `PathQuiz.tsx` `buildPrintableMarkup()`, when authorities are listed, **include the platform URL as visible text** next to each authority name so the printed/saved PDF contains actionable links even offline:

```html
<li>
  وزارة الصناعة والتجارة والتموين — دليل الخدمات
  <br/><small>https://daleel.mit.gov.jo</small>
</li>
```

---

## TASK 8 — Restrict Quiz Project Types to 4 Categories

The current quiz (`PathQuiz.tsx`) offers 6 project types in the first question: food, trade, digital, craft, home, manufacturing. **Replace these with exactly 4 categories** that align with Jordan's economic sector classification:

### 8.1 — Replace the `type` question options

Delete ALL current options in the first `QUESTION_STEPS` entry and replace with:

```typescript
{
  key: "type",
  title: "ما القطاع الأقرب لمشروعك؟",
  options: [
    {
      label: "صناعة وإنتاج",
      value: "industry",
      Icon: Package,       // reuse existing icon
      iconClassName: "bg-amber-100 text-amber-700",
    },
    {
      label: "زراعة",
      value: "agriculture",
      Icon: Sprout,        // add import from lucide-react: Sprout
      iconClassName: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "خدمات",
      value: "services",
      Icon: Monitor,       // reuse existing icon
      iconClassName: "bg-cyan-100 text-cyan-700",
    },
    {
      label: "سياحة وضيافة",
      value: "tourism",
      Icon: Utensils,      // reuse existing icon
      iconClassName: "bg-orange-100 text-orange-700",
    },
  ],
}
```

### 8.2 — Update `typeLabels` to match

```typescript
const typeLabels: Record<string, string> = {
  industry: "نشاط صناعي أو إنتاجي",
  agriculture: "نشاط زراعي",
  services: "نشاط خدمات",
  tourism: "نشاط سياحي وضيافة",
};
```

### 8.3 — Update `buildQuizResult()` logic

The current function uses `answers.type === "food"` and `answers.type === "manufacturing"` for `needsSectorReview`. Update this:

```typescript
const needsSectorReview = answers.type === "industry" || answers.type === "agriculture" || answers.type === "tourism";
```

Review ALL references to old type values (`food`, `trade`, `digital`, `craft`, `home`, `manufacturing`) throughout `buildQuizResult()` and replace with logic that maps to the new 4 values. The `isHomeOnly` check should now come ONLY from the `location` question (which already asks if the project operates from home), NOT from the project type.

### 8.4 — Update the PDF export

In `buildPrintableMarkup()`, verify that the type label renders correctly with the new values.

---

## TASK 9 — Typography: Apply Justified Text Alignment

### 9.1 — Add a utility class for justified paragraphs

In `index.css`, add:

```css
.text-justify-ar {
  text-align: justify;
  text-align-last: right; /* RTL: last line stays right-aligned */
}
```

### 9.2 — Apply to all long-form body paragraphs

Apply `text-justify-ar` to:
- Section descriptions (the `<p>` inside `SectionHeader`'s `description` prop)
- Benefit card descriptions
- Comparison section row descriptions (both "with" and "without" columns)
- Scenario carousel challenge and takeaway text
- Legal forms descriptions
- Home-based section body text
- Journey steps descriptions
- Entity/platform descriptions and use-case text
- Footer disclaimer text
- Quiz result `summary` paragraph

Do NOT apply to:
- Headlines/titles (`<h1>`, `<h2>`, `<h3>`)
- Short labels, badges, buttons, nav items
- Quiz/Survey question text (these are short)
- List items (`<li>`) that are single sentences

---

## TASK 10 — Audit and Fix References & Statistics

### 10.1 — Verify existing references

The page currently shows 3 statistics in the Stats section (`SOURCE_FACTS` in `content.ts`):

1. **21.1% — "نشاط ريادي مبكر"** — sourced from "المنصة الحكومية الأردنية" linking to jordan.gov.jo (GEM report 2024/2025)
2. **98% — "من المنشآت كانت صغيرة ومتوسطة"** — sourced from "البنك الأوروبي للاستثمار" (EIB 2016 report)
3. **71% — "من عمالة القطاع الخاص"** — same EIB 2016 source

**Action for the executor:**
- **Verify link #1** (`jordan.gov.jo/Ar/NewsDetails/...`): Open this URL and confirm it leads to an actual published page about the GEM 2024/2025 report. If the URL returns 404 or is broken, **remove this statistic entirely** or replace with a verifiable one.
- **Verify link #2 and #3** (`eib.org/attachments/...`): Open this URL and confirm it leads to the actual EIB PDF. If accessible, the 98% and 71% figures should be verifiable in the document. If the URL is broken, remove or replace.
- **If any link is dead:** Do NOT invent a replacement. Instead, either find the correct URL for the same source, or remove the statistic and reduce the grid to show only verified facts.
- **Mark the `year` field accurately.** The EIB source is from 2016 — this is already noted. Do not present it as current data.

### 10.2 — Add a "sources may change" note

Below the Stats section cards, add a single small-text note:
> "المؤشرات مبنية على مراجع منشورة في تاريخها. الأرقام قد تختلف في تقارير أحدث."

### 10.3 — Research links in footer

The `RESEARCH_LINKS` array in `content.ts` should match the verified `SOURCE_FACTS` links exactly. If a source was removed from Stats, remove it from Research Links too.

---

## TASK 11 — Rewrite Disclaimer Texts to Sound Natural (Not Technical)

### 11.1 — ScenarioCarousel disclaimer

The current text in `ScenarioCarousel.tsx`:
> "هذه أمثلة مركبة من أسئلة تتكرر في السوق الأردني، وليست شهادات فردية موثقة. الهدف منها توضيح الأنماط الشائعة لا الادعاء بنتائج مضمونة."

This reads like a legal instruction written for internal use. **Rewrite** to sound like a natural note to the visitor:
> "هذه أمثلة توضيحية مبنية على أنماط متكررة في السوق، وليست تجارب شخصية محددة."

Short, honest, non-defensive. One sentence, not two.

### 11.2 — Entities section disclaimer

Current:
> "إذا كانت حالتك فيها تفاصيل خاصة، افتح المنصة الأقرب لحالتك ثم راجع الجهة المختصة قبل ما تعتمد على أي افتراض عام."

This is acceptable but slightly long. Shorten to:
> "الروابط توصلك للمنصة الرسمية مباشرة. إذا حالتك فيها تفاصيل خاصة، راجع الجهة المختصة."

### 11.3 — Remove all other inline disclaimers

Per Task 1.3 (already in the prompt), but re-emphasize: the footer disclaimer is the ONE comprehensive disclaimer. All other instances should be at most one short sentence. Scan every section for any remaining long disclaimers and shorten them.

---

## TASK 12 — Dashboard for Visitor Analytics & Survey Responses

### 12.1 — Backend: Simple API with Supabase or JSON file

Since the project currently has NO backend, implement the simplest possible solution:

**Option A (preferred if Supabase is available):**
- Create a Supabase project and add the connection URL as an environment variable
- Create two tables: `page_visits` (timestamp, referrer, user_agent) and `survey_responses` (timestamp, source, baseline, clarity_gain, readiness, next_action, segment)
- Update the survey POST endpoint to write to Supabase
- Add a simple page-load tracker that records visits

**Option B (minimal, no external service):**
- Create an API route at `/api/analytics` that appends to a local JSON file
- Track: page loads (timestamp + referrer) and survey responses
- This is for development/demo only — not production-ready

**The executor should choose Option A if Supabase credentials are provided, otherwise Option B.**

### 12.2 — Dashboard page at `/dashboard`

Create a new route `/dashboard` (using wouter) with a simple, clean dashboard showing:

1. **Total visitors** (count of page_visits)
2. **Visitors today / this week / this month**
3. **Survey completion rate** (responses / visits)
4. **Survey answer breakdown** — for each of the 6 questions, show a horizontal bar chart of answer distribution
5. **Source distribution** — pie or bar chart showing how visitors arrived (Question 0)
6. **Clarity gain** — compare Question 1 (baseline) vs Question 3 (readiness) to show if the page moved people from "unclear" to "ready"

**Styling:** Use the same design system (Tailwind, Cairo/Tajawal fonts, same color palette). Keep it minimal — no charting library needed, use simple CSS bars for charts.

**Access:** No authentication required for now, but add a simple note in the code: `// TODO: Add authentication before deploying to production`

### 12.3 — Update survey submission

In `SurveySection.tsx`, update the fetch endpoint from `/api/survey` to the actual endpoint created in 12.1. The success screen must still show regardless of API response (per Task 4.6).

---

## TASK 13 — Image Review & Recommendations

### 13.1 — Hero illustration

The current hero illustration (`images/hero-illustration.png`) should be reviewed:
- If the image is AI-generated with obvious AI artifacts (extra fingers, melted text, uncanny valley faces), **flag it for replacement**. Add a comment in the code: `{/* TODO: Replace with professionally designed or real illustration */}`
- If the image is clean and professional, keep it.
- Ensure the image is optimized: under 200KB for web. If larger, compress it or convert to WebP.

### 13.2 — Hero background

The `images/hero-bg.png` is used as a background texture with low opacity. Same rules: verify quality, optimize size.

### 13.3 — Section illustrations (recommendation)

Currently only the Hero has images. The page is text-heavy. **Add placeholder comments** in these sections for future illustrations:
- Benefits section: `{/* Optional: Simple icon illustration showing "before vs after" formalization */}`
- Journey Steps section: `{/* Optional: Step-by-step visual timeline illustration */}`
- Home-Based section: `{/* Optional: Illustration of home-based business setup */}`

Do NOT add actual images — just comments indicating where illustrations would improve the page. This is a recommendation for the project owner.

---

## Execution Order (recommended)

To minimize conflicts and rework, execute tasks in this order:

1. **Task 4.1** — Split Home.tsx into section components FIRST. All other changes are easier when files are small.
2. **Task 1** — Content rewrite (headlines, meta-commentary, disclaimers, micro-stories, connectors, anchor moment). Easier to do per-section when files are separate.
3. **Task 2** — Design & visual polish (border-radius, card monotony, colors, Hero simplification, breathers, comparison order).
4. **Task 3** — Animation reduction & navbar polish. Do this AFTER design changes so you know which elements remain.
5. **Task 7** — Government platforms integration (entities section, quiz results, footer, PDF). Do this before Task 6 because the survey references quiz results.
6. **Task 6** — Survey rewrite. Do this after platforms are in place.
7. **Task 4.2–4.10** — Technical cleanup (OG tags, overlay, contrast, nav items, survey endpoint, responsive, meta, performance, keyboard).
8. **Task 5** — Run the full validation checklist.

---

## Critical Rules

1. **ALL content must remain in Arabic.** Do not introduce any English text visible to the user.
2. **Do NOT re-introduce any of these AI fingerprint elements:** floating orbs, shimmer/glow effects, animated gradient text, pulsing elements, section badges with icons and colored backgrounds, star ratings on non-review content.
3. **Do NOT add new dependencies.** Work only with what is already installed.
4. **Do NOT change the color palette hue values** in index.css `:root` — only adjust opacity values and add semantic mappings.
5. **Do NOT change the quiz logic or result calculation** in PathQuiz.tsx `buildQuizResult()` — only change presentation/styling.
6. **Do NOT remove the disclaimer in the footer** — it must stay.
7. **Preserve all existing component props and interfaces** — other code may depend on them.
8. **When splitting Home.tsx, preserve EXACT scroll behavior** — the IntersectionObserver logic and scrollToSection function must continue to work identically.
9. **Maintain the current section order** unless a task explicitly says to reorder. The narrative flow was deliberately designed.
10. **Do NOT remove the `LAST_UPDATED` constant or the date display** — keep it in the Hero trust cards AND the footer.
11. **The page must work without JavaScript for initial content visibility** — SSR is not required, but ensure no critical content is hidden behind JS-only interactions without a fallback indication.
12. **All Arabic text must use proper Arabic punctuation** — use `،` (Arabic comma) not `,`, use `؟` not `?`, use `«»` for quotes if needed. Do NOT use Latin punctuation in Arabic sentences.
13. **Test your output.** Before considering any task complete, mentally verify: "If I were a Jordanian small business owner visiting this page on a phone, would this sentence/layout/interaction make sense to me?"
14. **Arabic voice standard: spoken-formal Jordanian Arabic (عربية أردنية مبسطة رسمية).** Do NOT use heavy colloquial/slang words like "وش" or "شو اللي" or Saudi/Gulf dialect. Do NOT use stiff academic Arabic. The target is Arabic that a Jordanian professional would use in a semi-formal meeting — clear, approachable, but not street slang. When rewriting headlines or body text, check every word: if it sounds like a text message between friends, it's too informal; if it sounds like a government decree, it's too formal. Examples of the right register:
    - Too informal: "وش تسوي" → Correct: "ما الذي تفعله" or "ماذا تفعل"
    - Too informal: "شو اللي" → Correct: "ما الذي"
    - Too informal: "وين" → Correct: "أين"
    - Too informal: "ليش" → Correct: "لماذا"
    - Too informal: "هالصفحة" → Correct: "هذه الصفحة"
    - Acceptable informal (Jordanian-natural): "بدون"، "لسه"، "شغّال"، "ملف ناقص" — these are fine because they're universally understood and don't sound slangy.
    - **Apply this standard to ALL visible Arabic text**: section titles, descriptions, quiz questions, survey questions, disclaimers, button labels, encouragements, and scenario text.

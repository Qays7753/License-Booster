# Execution Prompt V2 — Tone, Flow & Density Overhaul

## Context

This is an Arabic RTL landing page targeting small business owners in Jordan, helping them understand and begin the licensing (formalization) process. The page was recently rewritten, but user testing revealed three root problems:

1. **The page sells instead of guiding.** The old version walked beside the visitor ("come, let's figure this out together"). The new version talks at them ("licensing is important, here are the benefits").
2. **The red thread sentences feel artificial.** They were bolted onto the end of each section as standalone paragraphs instead of being woven into the narrative.
3. **The page is too long after the quiz.** After completing the quiz (the page's core action), the visitor encounters 8 more sections before reaching the practical steps and government links. By mid-page, mobile users are exhausted.

**Tech stack:** Vite 6 + React 19 + TypeScript + Tailwind CSS 4 + framer-motion. Arabic RTL (`dir="rtl"`, `lang="ar"`).

**Primary device:** Mobile (95% traffic), one-handed scroll, 390px viewport.

**Voice contract:** Jordanian Arabic — not MSA (formal), not heavy slang. Like a calm, knowledgeable friend who owns a business and already went through the process. "صار الوقت" not "حان الوقت". "مش" not "ليس". But no "هلأ" — use "الآن" when needed.

---

## Phase 1: Content & Tone Fixes (4 files)

### Task 1.1 — HeroSection.tsx

The current Hero confronts the visitor ("your project isn't licensed?"). It should invite them ("your project deserves clarity").

**Eyebrow** (the `<p>` above the h1) — replace:
```
رخّص مشروعك وتوسّع
```
with:
```
مشروعك يستاهل يكون رسمي — اعرف خطوتك الأولى والجهة المناسبة
```

**H1** — replace:
```
مشروعك موجود
<span>بس مشروعك مو مُرخّص؟</span>
```
with:
```
وضّح وضع مشروعك
<span>قبل ما تكبر الحيرة</span>
```

**Subtitle** (the `<p>` after the h1) — replace:
```
الترخيص مو بس ورقة رسمية — هو اللي بيفتحلك باب التمويل، بيخلّي عملاءك يثقوا أكثر، وبيخلي قراراتك أوضح.
```
with:
```
التسجيل والترخيص مش عبء — هم الطريقة اللي بتخلّي وضع مشروعك أوضح لك ولمن تتعامل معه.
```

**Everything else stays:** buttons ("ابدأ الاختبار" + "أو اقرأ عن الفوائد أولاً"), cards, "الفكرة الأساسية" box.

---

### Task 1.2 — AnchorMoment.tsx

Currently has two lines that dilute each other. The first line is strong. The second repeats the Benefits idea.

**First `<motion.p>`** — keep as-is:
```
قبل الترخيص تبيع على الثقة، وبعده تبيع على الوضوح.
```

**Second `<motion.p>`** — DELETE the entire `<motion.p>` block that says:
```
الذي يعرفك قد يشتري منك مرة، لكن وضوح وضع مشروعك يساعدك تكمل مع ناس لا يعرفونك من قبل.
```
Remove the JSX element completely. Do not leave an empty tag.

**Image** — stays as-is.

**Red thread `<p>` after the image** — replace:
```
بعدما قربت الصورة، بقي أن تعرف أين يقف مشروعك اليوم حتى لا تبدأ من خطوة لا تناسبك.
```
with:
```
اعرف الآن وين واقف مشروعك — أربع أسئلة بس.
```

---

### Task 1.3 — QuizSection.tsx

**Eyebrow** — replace `"٤ أسئلة فقط"` with `"اكتشف وضعك"`

**Title** — replace:
```
٤ أسئلة بتدلك على مسارك
```
with:
```
أربع أسئلة تكشف أين أنت
```

**Description** — replace:
```
ما تضيّع وقتك بالبحث العشوائي. جاوب عالأسئلة وبندلّك على خطوتك الأولى والجهة اللي لازم تقصدها.
```
with:
```
جاوب بصدق عن وضعك الحالي — مش عن اللي تتمنى يكون عليه.
```

**Red thread `<p>` at bottom** — replace:
```
بعدما صار مسارك أقرب، طبيعي يبقى عندك تردد عملي قبل أن تتحرك.
```
with:
```
وأنت عارف وين واقف، خلينا نفك أي تردد عندك قبل ما تبدأ.
```

---

### Task 1.4 — StatsSection.tsx

**Red thread `<p>` at bottom** — replace:
```
الصورة الكبيرة مهمة، لكن الذي يفرق فعلاً هو ماذا يتغيّر في مشروعك أنت عندما يصبح وضعه أوضح.
```
with:
```
طيب، شو بيتغير فعلاً لما وضع مشروعك يصير أوضح؟
```

### Task 1.5 — BenefitsSection.tsx — Section header + red thread

**SectionHeader eyebrow** — replace "ماذا يتغير؟" with "لأن الوضوح يصنع فرقاً"

**SectionHeader title** — replace "شو بيتغير لما يصير ملفك مُرخّص؟"
with "ليش يهمك تعرف وين واقف مشروعك؟"

**Red thread <p> at bottom** — replace:
"هذا الفرق يبان أكثر لحظة يطلع مشروعك من دائرة المعرفة الشخصية..."
with:
"صار الوقت تعرف بالضبط أين يقف مشروعك اليوم"

---

## Phase 2: Red Thread Rewrite (8 files)

Every red thread sentence must speak TO the visitor (direct address, second person). Never ABOUT them (third person). The sentence should feel like the natural next thought in the visitor's head, not an editorial addition.

### Task 2.1 — FaqConcernsSection.tsx

Replace the closing `<p>`:
```
وبعدما يخف التردد، يبقى خلط واحد لازم ينفك بسرعة: ما الذي يبدأ بالتسجيل، وما الذي يكتمل بالترخيص.
```
with:
```
خف التردد — بس قبل ما تتحرك، افهم الفرق بين التسجيل والترخيص.
```

### Task 2.2 — LegalFormsSection.tsx

Replace the closing `<p>`:
```
وإذا كان ثوب مشروعك إنه بيبدأ من البيت.. كيف تتصرف؟
```
with:
```
وإذا مشروعك من البيت — وضعك مختلف شوي، وعنده مساره.
```

### Task 2.3 — HomeBasedSection.tsx

Replace the closing `<p>`:
```
الموضوع مش تنظير، خلينا نشوف كيف غيرك أخد الخطوة ومشت أموره.
```
with:
```
ناس مثلك بدأوا من نفس المكان — شوف كيف مشت أمورهم.
```

### Task 2.4 — ScenarioSection.tsx

Replace the closing `<p>`:
```
ومن هنا تظهر كلفة التأجيل: ليس لأن الخطوة كبيرة، بل لأن الضبابية تطول أكثر مما يلزم.
```
with:
```
وكل يوم تأخير إله ثمن — مش بالضرورة كبير، بس حقيقي.
```

### Task 2.5 — DelayTradeoffsSection.tsx

Replace the closing `<p>`:
```
ولما تصير كلفة التأجيل واضحة، يصبح الطريق نفسه أبسط مما يبدو.
```
with:
```
صار الوقت تعرف الخطوات — وهي أبسط مما تتوقع.
```

### Task 2.6 — JourneyStepsSection.tsx

Replace the closing `<p>`:
```
والآن لم يعد ينقصك إلا أن تعرف أين تبدأ بحسب الجهة التي تخدم حالتك.
```
with:
```
افتح الجهة اللي بتخدم حالتك وابدأ.
```

### Task 2.7 — EntitiesSection.tsx

Replace the closing `<p>`:
```
جربت المنصات؟ رأيك بيهمنا عشان نحسّن التجربة إلك ولغيرك.
```
with:
```
قبل ما تمشي — قلنا شو حسيت بالصفحة.
```

### Task 2.8 — ComparisonSection.tsx

The existing red thread is acceptable. Keep as-is:
```
هلأ بعد ما وضح الفرق، خلينا نشوف أي شكل قانوني بيلبّي طبيعة شغلك.
```
BUT: replace "هلأ" with "الآن":
```
الآن بعد ما وضح الفرق، خلينا نشوف أي شكل قانوني بيلبّي طبيعة شغلك.
```

---

## Phase 3: Reduce Page Density (structural changes)

User testing confirmed: after the quiz, the visitor feels done but the page continues for 8 more sections. The visitor described the page as "طويلة وتحتاج صبر". These changes reduce scroll depth by ~35% without removing content.

### Task 3.1 — BenefitsSection.tsx — Collapse regular cards

Currently: 2 featured cards + 4 regular cards = ~2,400px mobile scroll.

Change: Show only the 2 featured cards by default. Wrap the 4 regular cards in a collapsible section with a toggle button.

Implementation:
1. Add a `const [showAll, setShowAll] = useState(false)` state
2. Keep the featured cards grid as-is
3. Wrap the regular cards grid in a conditional: `{showAll && (...)}`
4. Add a button after the featured cards:
```tsx
<button
  type="button"
  onClick={() => setShowAll((v) => !v)}
  className="mx-auto mt-6 flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
>
  {showAll ? "إخفاء" : "عرض الفوائد الأربعة المتبقية"}
</button>
```

This cuts the default section height by ~60%.

### Task 3.2 — FaqConcernsSection.tsx — Reduce questions

Currently: 4 concerns + 6 FAQ questions = 10 accordion items across 2 columns.

Change: Keep the 4 concerns as-is. Reduce FAQ questions from 6 to 4 — remove these two:
- "هل يكفي أن أقرأ هذه المعلومات وأقرر؟" (obvious, the page already says this)
- "هل المشروع المنزلي يمكن أن يسير في مسار نظامي؟" (covered in HomeBasedSection)

### Task 3.3 — ComparisonSection.tsx — Shorten to pass-through

Currently: heading + image + 2 full article cards + bridge = ~800-900px on mobile.

The quiz already routes users based on the registration/licensing distinction. This section should reinforce, not re-teach.

Change:
1. Keep the SectionHeader as-is
2. Keep the image as-is
3. Replace the two full `<motion.article>` cards with a compact 2-column summary:

```tsx
<div className="mt-12 grid gap-4 sm:grid-cols-2">
  <div className="rounded-2xl border border-white/12 bg-white/8 p-5 text-center backdrop-blur-md">
    <FileText className="mx-auto h-7 w-7 text-accent" />
    <h3 className="mt-3 text-xl font-bold">التسجيل</h3>
    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
      تعطي مشروعك اسم وهوية رسمية
    </p>
  </div>
  <div className="rounded-2xl border border-white/12 bg-white/8 p-5 text-center backdrop-blur-md">
    <FileCheck2 className="mx-auto h-7 w-7 text-accent" />
    <h3 className="mt-3 text-xl font-bold">الترخيص</h3>
    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
      الإذن اللي بخليك تشتغل قانونياً من موقع محدد
    </p>
  </div>
</div>
```

4. Remove the `<motion.article>` imports/animations for these cards
5. Keep the bridge text section as-is

This cuts ~400px of mobile scroll.

### Task 3.4 — ScenarioSection.tsx — Shorten scenario content

Currently: Each scenario has a "التحدي" paragraph + "الخلاصة" paragraph.

Change in ScenarioCarousel.tsx: Merge challenge and takeaway into one sentence each instead of two paragraphs. Replace the scenario data:

```typescript
const scenarios = [
  {
    title: "مطبخ منزلي في الزرقاء",
    label: "أغذية منزلية",
    summary:
      "خلطت بين السجل التجاري وموافقات النشاط الغذائي — لما عرفت إن التحقق من أهلية المنزل أولاً، صار المسار واضح.",
  },
  {
    title: "خدمة تصميم رقمي في عمّان",
    label: "خدمات رقمية",
    summary:
      "ظنّت إن العمل عبر الإنترنت ما يحتاج ترخيص — التسجيل ما كبّر المشروع فوراً، بس سهّل الفوترة والتعامل مع عملاء أكبر.",
  },
  {
    title: "ورشة خياطة صغيرة في إربد",
    label: "حرفة يدوية",
    summary:
      "الدخل موجود بس الملف ناقص — لما حددت شو بالضبط ناقص (موافقة موقع + رخصة مهن)، صارت الخطوة واضحة.",
  },
];
```

Then update the card rendering to show `scenario.summary` instead of separate `challenge` + `takeaway` fields. Remove the "التحدي:" and "الخلاصة:" labels. Just show the summary as one paragraph.

---

## Phase 4: Voice Harmonization

The Hero speaks in Jordanian Arabic. Several mid-page sections still use MSA. This breaks the voice contract.

### Task 4.1 — BenefitsSection.tsx — Rewrite benefit titles as outcomes

Current titles are observations ("الصورة تصبح أوضح"). Change to outcomes in the visitor's language:

| Current | New |
|---------|-----|
| "الصورة تصبح أوضح" | "الناس بتعرف مين أنت رسمياً" |
| "العميل ما يعود شخصياً فقط" | "عملاء جدد بيتعاملوا معك بثقة" |
| "التمويل يصبح أقرب" | "باب التمويل بينفتح" |
| "القرار يصبح أهدأ" | "القرارات بتصير أوضح" |
| "التعاملات تصبح مهنية" | "فواتير وعقود باسم مشروعك" |
| "النمو يصبح قابلاً للترتيب" | "التوسع بيصير مبني على أساس" |

**Do not change the descriptions** — only the titles.

### Task 4.2 — DelayTradeoffsSection.tsx — Match voice

**Section title** — replace:
```
شو بتخسر لمّا تأجل الترخيص؟
```
with:
```
كل يوم تأخير إله ثمن
```

**Section description** — replace:
```
كل يوم تأخير بيعني فرصة ضايعة، أو عميل متردد، أو قلق من أي مخالفة فجأة.
```
with:
```
مش بالضرورة ثمن كبير — بس فرص بتضيع وأسئلة بتزيد.
```

---

## Phase 5: Bug Fixes

### Task 5.1 — Home.tsx — Fix progress indicator visibility

The 3-phase progress indicator (`افهم → قيّم وضعك → تحرّك`) is too small and users don't notice it.

In the progress indicator `<div>`, increase the bar height and text size:
- Change `h-1.5` to `h-2`
- Change `text-xs` to `text-sm`
- Add a subtle bottom shadow: add `shadow-sm` to the container div

### Task 5.2 — Verify sticky CTA behavior

The mobile sticky CTA button ("اعرف مسارك") should be visible at all times during scroll after passing 720px. A user reported it "disappears during scrolling."

Check that the `showMobileCta` state correctly tracks scroll position and that the `motion.div` animation doesn't interfere with visibility. The button should remain fixed at the bottom of the viewport. If there's a z-index conflict with other fixed elements, resolve it.

---

## What NOT to touch

- PathQuiz.tsx (quiz questions, results, and routing logic) — already correct
- TopNav.tsx — already correct ("مسار الترخيص")
- content.ts — already correct
- index.html — already correct (meta tags updated)
- JourneyStepsSection.tsx layout — timeline design is correct, only change the red thread text
- LegalFormsSection.tsx layout — accordion pattern is correct, only change the red thread text
- SurveySection.tsx (the form component) — already correct
- HomeBasedSection.tsx layout — only change the red thread text
- EntitiesSection.tsx layout — only change the red thread text
- FooterSection.tsx — already correct

---

## Verification Checklist

After all changes, verify:

1. `npm run typecheck` passes
2. `npm run build` passes
3. Open the page on a 390px mobile viewport:
   - [ ] Hero feels like an invitation, not a confrontation
   - [ ] The eyebrow clearly tells visitors what this page is
   - [ ] AnchorMoment is ONE punchy line + image + bridge (no second line)
   - [ ] Benefits section shows 2 cards + "عرض المزيد" toggle
   - [ ] Comparison section is compact (no full article cards)
   - [ ] Scenario cards show one summary paragraph, not two
   - [ ] FAQ section has 4 concerns + 4 questions (not 6)
   - [ ] Every red thread sentence uses direct address (second person)
   - [ ] No red thread uses "بعدما..." or third-person phrasing
   - [ ] Benefit titles are outcomes in Jordanian voice
   - [ ] Progress indicator is visible and readable
   - [ ] Sticky CTA button remains visible during all scrolling
4. Read the page top-to-bottom and confirm the narrative flows as one continuous conversation, not a slideshow of sections

---

## Summary of all changes by file

| File | What changes |
|------|-------------|
| HeroSection.tsx | Eyebrow, H1, subtitle text |
| StatsSection.tsx | Red thread text |
| BenefitsSection.tsx | Benefit titles (6), collapse toggle for regular cards |
| AnchorMoment.tsx | Delete second line, replace red thread |
| QuizSection.tsx | Eyebrow, title, description, red thread |
| FaqConcernsSection.tsx | Red thread, remove 2 FAQ items |
| ComparisonSection.tsx | Replace article cards with compact summary, fix "هلأ" |
| LegalFormsSection.tsx | Red thread |
| HomeBasedSection.tsx | Red thread |
| ScenarioSection.tsx | Red thread |
| ScenarioCarousel.tsx | Merge challenge+takeaway into single summary field |
| DelayTradeoffsSection.tsx | Section title, description, red thread |
| JourneyStepsSection.tsx | Red thread |
| EntitiesSection.tsx | Red thread |
| Home.tsx | Progress indicator size increase |

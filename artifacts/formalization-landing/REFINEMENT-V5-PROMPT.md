# Refinement Pass V5 — Content Enrichment from Reference Documents

## Context

V1-V4 prompts have been executed. An external analyst reviewed 6 reference documents (Dalberg/Iqlaa research, Anderson Legal Toolkit, Formalization Policy reports) and extracted verified data to enrich the landing page content. This prompt integrates that data into the existing sections.

**Source documents:**
- MSEs' Formalization Challenges and Messages (Dalberg/Iqlaa, 2023)
- Legal Toolkit #10 (Anderson Legal/Iqlaa, 2023-2024, ~180 pages)
- Formalization Report + Evaluation of Policies (2024-2025)
- Arabic presentation on business environment reforms (2024-2025)

**Critical rules:**
1. All new data is tagged `[VERIFIED]` — it comes from official research documents. Do NOT invent or extrapolate beyond what is provided.
2. Proposed reforms (NOT yet law) are clearly marked `[PROPOSED]` — these must NEVER be presented as current requirements.
3. Maintain the existing Arabic voice: spoken-formal Jordanian Arabic (عربية أردنية مبسطة رسمية). No colloquial words like وش، هيك، كتير. No stiff formal Arabic either.
4. Do NOT add animations to any new elements. V4 defined the animation budget — it is final.
5. Do NOT change component structure or file organization. Only modify content (text, data arrays, constants).

---

## TASK 1 — Home-Based Section Enrichment (HIGH PRIORITY)

### File: `src/components/home/sections/HomeBasedSection.tsx`

The reference documents contain specific, verified conditions for home-based licenses. Replace the current generic questions with concrete, actionable information.

### 1.1 — Replace the `points` array

**Current** (generic questions):
```ts
const points = [
  "هل يسمح نوع النشاط فعلاً بالعمل من المنزل؟",
  "هل توجد اشتراطات مرتبطة بالموقع أو الجيران أو السلامة؟",
  "متى يصبح الانتقال من البيت إلى موقع آخر خطوة ضرورية؟",
];
```

**Replace with** (verified conditions from Legal Toolkit):
```ts
const points = [
  "المساحة المستخدمة لا تتجاوز 15% من مساحة المسكن أو 25 متراً مربعاً.",
  "النشاط يجب ألا يسبب إزعاجاً أو ضرراً للجيران من حيث الضوضاء أو الروائح أو الحركة.",
  "عدد الشركاء لا يزيد عن ثلاثة في الرخصة المنزلية.",
  "يُسمح بلوحة إعلانية صغيرة واحدة فقط بأبعاد لا تتجاوز 15×5 سم.",
  "الرخصة المنزلية تحتاج تجديداً سنوياً.",
];
```

### 1.2 — Update the description paragraph

**Current:**
```tsx
<p className="mt-4 text-justify-ar text-lg leading-relaxed text-muted-foreground">
  هذا لا يقلل من جدية المشروع، لكنه يجعل سؤال الموقع حاسماً من أول
  يوم، وليس تفصيلاً مؤجلاً.
</p>
```

**Replace with:**
```tsx
<p className="mt-4 text-justify-ar text-lg leading-relaxed text-muted-foreground">
  العمل من المنزل لا يقلل من جدية المشروع، لكنه يخضع لاشتراطات محددة
  تتعلق بالمساحة وطبيعة النشاط والأثر على المحيط. هذه الشروط ليست
  تعجيزية، لكن معرفتها مبكراً يوفّر وقتاً ويمنع مفاجآت لاحقة.
</p>
```

### 1.3 — Update the "الخلاصة" card

**Current:**
```tsx
<p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
  المشروع المنزلي يحتاج أسئلة عملية أكثر من أي شيء آخر: هل النشاط
  مناسب؟ ما اشتراطات الموقع؟ ومتى يصبح التوسع خارج البيت قراراً
  منطقياً؟
</p>
```

**Replace with:**
```tsx
<p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
  تأكد أولاً من أن نشاطك يناسب الشروط المنزلية: مساحة لا تتجاوز 15%
  من المسكن، عدم الإزعاج، وعدد شركاء لا يزيد عن ثلاثة. إذا كان
  النشاط يتطلب أكثر من ذلك، فالانتقال إلى موقع خارجي يصبح الخطوة
  المنطقية التالية.
</p>
```

---

## TASK 2 — Legal Forms Section: Add Registration Fees (HIGH PRIORITY)

### File: `src/components/home/sections/LegalFormsSection.tsx`

The reference documents provide verified fee figures for company registration. Add a `fee` field to the relevant legal form cards.

### 2.1 — Add fee information to the `legalForms` array

Update the type and add a `fee` string field to each item. Only add fees where we have verified data. Leave `fee` as `undefined` for forms without verified fee data.

**Modify the array items as follows** (keep ALL existing fields unchanged, only ADD the `fee` field):

```ts
const legalForms = [
  {
    // ... all existing fields for المؤسسة الفردية stay the same
    fee: undefined, // no verified fee data
  },
  {
    // ... all existing fields for شركة التضامن أو التوصية البسيطة stay the same
    fee: undefined, // no verified fee data
  },
  {
    // ... all existing fields for الشركة ذات المسؤولية المحدودة stay the same
    fee: "رسوم التسجيل: 250 ديناراً أردنياً تقريباً",
  },
  {
    // ... all existing fields for الشركة المساهمة الخاصة stay the same
    fee: undefined, // no verified fee data
  },
  {
    // ... all existing fields for الشركة المساهمة العامة stay the same
    fee: undefined, // no verified fee data
  },
  {
    // ... all existing fields for فرع الشركة الأجنبية stay the same
    fee: undefined, // no verified fee data
  },
] as const;
```

### 2.2 — Render the fee inside the card

After the existing `detail` div, add a fee display (only when fee exists):

```tsx
{form.fee && (
  <div className="mt-4 rounded-2xl border border-accent/18 bg-accent/6 p-4 text-sm leading-relaxed text-accent">
    {form.fee}
  </div>
)}
```

### 2.3 — Add a general fees note after the legal forms grid

After the closing `</div>` of the grid (the `mt-12 grid gap-5` div), add:

```tsx
<div className="mt-6 rounded-3xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-sm">
  <p className="font-semibold text-foreground">ملاحظة عن الرسوم</p>
  <p className="mt-2">
    الأرقام المذكورة مبنية على مصادر بحثية موثقة وتعكس الرسوم الأساسية
    فقط. قد تضاف رسوم أخرى مثل تسجيل الاسم التجاري (حوالي 350 ديناراً
    للعلامة التجارية) أو رسوم إيداع مستندات (10 دنانير لكل مستند). الرسوم
    الفعلية قد تختلف، لذا يُنصح بمراجعة الجهة المختصة مباشرة.
  </p>
</div>
```

---

## TASK 3 — Journey Steps: Add Post-Registration Obligations (HIGH PRIORITY)

### File: `src/components/home/sections/JourneyStepsSection.tsx`

The final step ("رتّب ما يستمر بعد البداية") is currently vague. The reference documents provide specific post-registration obligations.

### 3.1 — Update the 5th journey step description

**Current:**
```ts
{
  title: "رتّب ما يستمر بعد البداية",
  description:
    "إذا وُجد عمال أو تجديدات دورية أو متطلبات تشغيل، فهي جزء من التنظيم نفسه وليست تفصيلاً متأخراً.",
},
```

**Replace with:**
```ts
{
  title: "رتّب ما يستمر بعد البداية",
  description:
    "بعد التسجيل، تظهر التزامات مستمرة: عقد اجتماعات هيئة عامة دورية، تعيين مدقق حسابات عند الحاجة، العضوية الإلزامية في غرفة التجارة أو الصناعة، وتسجيل العمال في الضمان الاجتماعي خلال 30 يوماً من التوظيف. هذه ليست تفاصيل مؤجلة بل جزء أساسي من التنظيم.",
},
```

---

## TASK 4 — Delay Tradeoffs: Add Concrete Cost Figures (MEDIUM PRIORITY)

### File: `src/components/home/sections/DelayTradeoffsSection.tsx`

The reference documents provide verified penalty figures that make the "cost of delay" section more concrete.

### 4.1 — Add a new tradeoff card for late renewal penalties

Add a 5th item to the `tradeoffs` array. You will need to import the `AlertTriangle` icon from lucide-react.

```ts
{
  Icon: AlertTriangle,
  title: "غرامات التأخير",
  description:
    "تأخير تجديد الرخص قد يترتب عليه غرامات مالية تتراكم مع الوقت.",
  example:
    "مثال: غرامة التأخير في تجديد رخصة المهن لدى أمانة عمّان تتراوح بين 100 و150 ديناراً أردنياً.",
},
```

**Also update the import line** to include `AlertTriangle`:
```ts
import { AlertTriangle, Banknote, Globe, Info, ShieldCheck } from "lucide-react";
```

### 4.2 — Update the grid layout

Since there are now 5 cards instead of 4, update the grid class on the inner container:

**Current:**
```tsx
className="flex min-w-max gap-4 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-0"
```

**Replace with:**
```tsx
className="flex min-w-max gap-4 lg:grid lg:min-w-0 lg:grid-cols-5 lg:gap-0"
```

---

## TASK 5 — Quiz: Add Sector-Specific Cost Guidance (MEDIUM PRIORITY)

### File: `src/components/home/PathQuiz.tsx`

The reference documents provide verified sector-specific license costs. Enhance the quiz result's `cost` field to include specific figures when relevant.

### 5.1 — Update `buildQuizResult` cost strings

Find the **default return** at the bottom of `buildQuizResult` (the `"informal"` catch-all case). Update its `cost` field:

**Current:**
```ts
cost: "رسوم أساسية للتسجيل، وقد تضاف رسوم مرتبطة بالموقع أو النشاط أو التعديلات المطلوبة على الملف.",
```

**Replace with:**
```ts
cost: "رسوم التسجيل الأساسية تبدأ من حوالي 250 ديناراً للشركة ذات المسؤولية المحدودة. قد تضاف رسوم ترخيص مرتبطة بالنشاط والموقع.",
```

### 5.2 — Update the `"planning"` (non-home) result cost

**Current:**
```ts
cost: "غالباً تبدأ برسوم تسجيل أساسية، ثم قد تظهر رسوم إضافية مرتبطة بالموقع أو بالموافقات حسب النشاط.",
```

**Replace with:**
```ts
cost: "رسوم التسجيل الأساسية تبدأ من حوالي 250 ديناراً للشركة ذات المسؤولية المحدودة. رسوم الاسم التجاري قد تصل إلى 350 ديناراً. تضاف رسوم الرخصة والموافقات بحسب النشاط والموقع.",
```

### 5.3 — Add sector-specific cost note to the sector authority description

In `buildQuizResult`, find the `needsSectorReview` authority block. Update the description:

**Current:**
```ts
"الجهة القطاعية المختصة بالنشاط نفسه مثل الصحة أو السلامة الغذائية أو الموافقات الفنية المرتبطة بالإنتاج.",
```

**Replace with** (varies by sector):

Replace the entire `if (needsSectorReview)` block with:

```ts
if (needsSectorReview) {
  const sectorCostNote =
    answers.type === "tourism"
      ? " رسوم ترخيص النشاط السياحي تبدأ من حوالي 1,000 دينار (والتجديد حوالي 500 دينار)."
      : answers.type === "industry"
        ? " بعض الأنشطة الصناعية تتطلب موافقات بيئية أو فنية إضافية قد تؤثر على الكلفة والوقت."
        : "";

  authorities.set(
    "sector",
    createAuthority(
      "الجهة القطاعية",
      "الجهة القطاعية المختصة بالنشاط نفسه مثل الصحة أو السلامة الغذائية أو الموافقات الفنية المرتبطة بالإنتاج." + sectorCostNote,
      [
        {
          label: GOVERNMENT_PLATFORMS.sanad.name,
          href: GOVERNMENT_PLATFORMS.sanad.href,
        },
      ],
    ),
  );
}
```

---

## TASK 6 — FAQ: Add Tax and Social Security Questions (MEDIUM PRIORITY)

### File: `src/components/home/sections/FaqConcernsSection.tsx`

The reference documents provide important tax and social security obligations that many MSEs are unaware of. Add these as FAQ items.

### 6.1 — Add 3 new items to the `faqs` array

Append these items at the end of the existing `faqs` array (before the closing `]`):

```ts
{
  q: "ما الالتزامات الضريبية الأساسية بعد التسجيل؟",
  a: "الضرائب الرئيسية تشمل ضريبة الدخل (20% للشركات)، ضريبة المبيعات (16%)، وضريبة الاستقطاع (5%). إذا تجاوزت الإيرادات 30,000 دينار سنوياً فقد تلزمك التسجيل في ضريبة المبيعات. التفاصيل تعتمد على طبيعة النشاط والشكل القانوني.",
},
{
  q: "متى يجب تسجيل العمال في الضمان الاجتماعي؟",
  a: "خلال 30 يوماً من تاريخ التوظيف. هذا التزام قانوني وليس اختيارياً، ويشمل حتى المشاريع الصغيرة التي لديها موظف واحد على الأقل.",
},
{
  q: "هل يجب الانتساب لغرفة التجارة أو الصناعة؟",
  a: "نعم، العضوية في الغرفة المناسبة (تجارة أو صناعة) إلزامية بعد التسجيل. هذه ليست خطوة اختيارية بل جزء من المتطلبات الأساسية.",
},
```

---

## TASK 7 — Scenarios: Enrich with Specific Details (MEDIUM PRIORITY)

### File: `src/components/home/ScenarioCarousel.tsx`

Make the scenarios more concrete with verified details from the reference documents.

### 7.1 — Update scenario takeaways

**Scenario 1 (مطبخ منزلي في الزرقاء) — update `takeaway`:**

**Current:**
```ts
takeaway:
  "عندما اتضحت الخطوات، صار القرار أبسط: التحقق من أهلية النشاط المنزلي أولاً، ثم ترتيب الموافقات المطلوبة قبل التوسع.",
```

**Replace with:**
```ts
takeaway:
  "الخطوة الأولى هي التأكد من أن النشاط يناسب شروط الرخصة المنزلية: مساحة لا تتجاوز 15% من المسكن، وعدم إزعاج الجيران. بعد التحقق، ترتيب الموافقات الغذائية يصبح أوضح.",
```

**Scenario 3 (ورشة خياطة صغيرة في إربد) — update `takeaway`:**

**Current:**
```ts
takeaway:
  "أغلب الوقت لا تبدأ من الصفر. يكفي تحديد ما هو ناقص: موافقة موقع، رخصة مهن، أو استكمال متطلبات العمال والضمان.",
```

**Replace with:**
```ts
takeaway:
  "أغلب الوقت لا تبدأ من الصفر. يكفي تحديد ما هو ناقص: موافقة موقع، رخصة مهن، أو تسجيل العمال في الضمان الاجتماعي خلال 30 يوماً من التوظيف. تأخير التجديد قد يكلف غرامة تتراوح بين 100 و150 ديناراً.",
```

---

## TASK 8 — Content.ts: Add Research Links (LOW PRIORITY)

### File: `src/components/home/content.ts`

Add the reference documents as research sources for transparency.

### 8.1 — Add new items to `RESEARCH_LINKS`

Append these items to the `RESEARCH_LINKS` array:

```ts
{
  label: "دراسة تحديات توثيق المنشآت الصغيرة ومتناهية الصغر — برنامج إقلاع/Dalberg (2023)",
  href: "#", // internal research document — no public URL
},
{
  label: "مجموعة الأدوات القانونية للمنشآت — Anderson Legal/إقلاع (2023-2024)",
  href: "#", // internal research document — no public URL
},
```

**Note:** These are internal research documents without public URLs. Use `"#"` as href. In the footer where RESEARCH_LINKS are rendered, add a condition: if `href === "#"`, render as plain text (not a link). Find the footer rendering of RESEARCH_LINKS and add this logic:

```tsx
{link.href === "#" ? (
  <span className="text-muted-foreground">{link.label}</span>
) : (
  <a href={link.href} ...>{link.label}</a>
)}
```

---

## TASK 9 — Disclaimer Update (LOW PRIORITY)

### File: `src/components/home/sections/FooterSection.tsx`

Update the disclaimer to reference the verified source documents.

### 9.1 — Find the existing disclaimer text and append source attribution

Find the disclaimer paragraph in the footer. After the existing disclaimer text, add a new line:

```tsx
<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
  المعلومات الواردة في هذه الصفحة مبنية على مصادر بحثية موثقة تشمل
  مجموعة الأدوات القانونية (Anderson Legal/إقلاع، 2024) ودراسة تحديات
  التوثيق (Dalberg/إقلاع، 2023) وتقارير تقييم السياسات (2024-2025).
  الأرقام والرسوم المذكورة قد تتغير، ويُنصح دائماً بالتحقق من الجهة
  الرسمية المختصة.
</p>
```

---

## IMPORTANT: What NOT to Change

1. **Do NOT present proposed reforms as current law.** The reference documents mention proposed changes (LLC minimum capital raise to JOD 500, auditor waiver for small companies). These are NOT yet enacted. Do NOT include them.
2. **Do NOT change the hero section, benefits section, comparison section, or anchor moment.** These sections are content-complete.
3. **Do NOT modify any animations or component structure.** Only change text content and data arrays.
4. **Do NOT change the Arabic voice style.** Review the word replacement table from V2 if unsure.
5. **Do NOT add any new sections or components.** All changes are within existing sections.

---

## Validation

After all tasks:

- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] HomeBasedSection shows 5 specific conditions instead of 3 generic questions
- [ ] LegalFormsSection shows LLC fee (250 JOD) and general fees note
- [ ] JourneyStepsSection step 5 mentions specific post-registration obligations
- [ ] DelayTradeoffsSection has 5 cards (including late renewal penalties)
- [ ] PathQuiz results include specific cost figures (250 JOD LLC, 350 JOD trademark)
- [ ] PathQuiz tourism sector shows JOD 1,000 license cost
- [ ] FaqConcernsSection has 3 new FAQ items (tax, social security, chamber membership)
- [ ] ScenarioCarousel takeaways include specific verified figures
- [ ] Footer disclaimer references source documents
- [ ] RESEARCH_LINKS includes 2 new internal sources (rendered as plain text)
- [ ] No proposed reforms are presented as current law
- [ ] Arabic voice is consistent — no colloquial or overly formal text
- [ ] All existing animations still work correctly
- [ ] Page renders correctly on mobile (375px)

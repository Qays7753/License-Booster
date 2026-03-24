# Execution Prompt — Full Page Overhaul: Content + UX + Mobile Optimization

---

## Role & Context

You are a senior frontend developer working on an Arabic RTL landing page built with **Vite 6 + React 19 + TypeScript + Tailwind CSS 4 + framer-motion**. The page targets small business owners in Jordan, encouraging them to formalize (license) their businesses.

**95% of visitors use mobile phones.** Every decision you make must prioritize mobile-first.

The codebase is clean and modular — each section lives in its own component file under `src/components/home/sections/`. You will be modifying existing files, not creating new architecture.

---

## Tech Stack Reference

- **Fonts**: Cairo (headings) + Tajawal (body) via Google Fonts
- **Color palette**: Primary `#1b4d5c` (teal), Accent `#dd6b4d` (coral), Background `#f9f5ef` (beige)
- **Animation**: framer-motion (whileInView, motion.div)
- **Layout**: RTL (`dir="rtl"`, `lang="ar"`)
- **Components**: SectionHeader (reusable), SectionConnector (TO BE DELETED), PathQuiz, TopNav, ScenarioCarousel

---

## Overview of ALL Changes

This prompt covers **5 problems** with specific solutions for each. Execute them **in the order listed** (Phase 1 → Phase 2 → Phase 3).

### Phase 1 — Content & Messaging (Problems 1, 2)
### Phase 2 — Navigation & Visual Separation (Problems 3, 4)
### Phase 3 — Mobile Density & Progress Indicator (Problem 5)

---

# PHASE 1: Content & Messaging

## Problem 1: Page educates instead of motivating action
## Problem 2: The word "التنظيم" confuses visitors

### Solution: Replace ALL content (headings, descriptions, red thread, quiz results, site name)

---

### TASK 1.1 — Replace site name in Navbar

**File**: `src/components/home/TopNav.tsx`

**Line 112-116** — Change:
```
<span className="block text-sm font-semibold text-accent">الأردن</span>
<span className="block text-lg font-bold md:text-xl">مسار التنظيم</span>
```
To:
```
<span className="block text-sm font-semibold text-accent">الأردن</span>
<span className="block text-lg font-bold md:text-xl">مسار الترخيص</span>
```

---

### TASK 1.2 — Replace Hero Section content

**File**: `src/components/home/sections/HeroSection.tsx`

Replace the following content strings:

| Element | Current | New |
|---|---|---|
| Eyebrow (line 22) | `إذا كان مشروعك عالقاً بين خطوة ناقصة ومعلومة ناقصة...` | `رخّص مشروعك وتوسّع` |
| H1 (line 25-28) | `رتّب ملف مشروعك` + `قبل أن تتّسع الحيرة` | `مشروعك موجود` + `بس مشروعك مو مُرخّص؟` |
| Description (line 29-31) | `التسجيل والترخيص ليسا عبئاً...` | `الترخيص مو بس ورقة رسمية — هو اللي بيفتحلك باب التمويل، بيخلّي عملائك يثقوا أكتر، وبيخلي قراراتك أوضح.` |

**IMPORTANT — Hero Buttons**: Replace the TWO buttons with ONE primary button + ONE text link:

Replace the current `div` containing 2 buttons (lines 34-51) with:
```tsx
<div className="mt-8 flex flex-col items-start gap-3">
  <Button
    size="lg"
    className="h-14 w-full rounded-full px-8 text-lg sm:w-auto"
    onClick={() => onNavigate("find-path")}
  >
    ابدأ الاختبار
    <ArrowLeft className="ms-2 h-4 w-4" />
  </Button>
  <button
    type="button"
    onClick={() => onNavigate("benefits")}
    className="text-sm font-semibold text-primary-foreground/70 underline underline-offset-4 hover:text-primary-foreground/90"
  >
    أو اقرأ عن الفوائد أولاً
  </button>
</div>
```

---

### TASK 1.3 — Replace Stats Section content

**File**: `src/components/home/sections/StatsSection.tsx`

Replace SectionHeader props (lines 64-73):
| Prop | Current | New |
|---|---|---|
| eyebrow | `الصورة قبل التفاصيل` | `أنت لست وحدك` |
| title | `قطاع ضخم، وخطوة ناقصة` | `98% من المشاريع بالأردن صغيرة ومتوسطة... وأنت جزء منهم` |
| description | `هذه المؤشرات لا تحسم قرارك...` | `السوق مش مليان شركات ضخمة بس، مليان ناس مثلك ابتدت من مكان صغير وبنفس التساؤلات.` |

**Add Red Thread** — After the closing `</p>` disclaimer (line 117-119), add:
```tsx
<p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  الصورة الكبيرة مهمة، لكن الذي يفرق فعلاً هو ماذا يتغيّر في مشروعك أنت عندما يصبح وضعه أوضح.
</p>
```

---

### TASK 1.4 — Replace Benefits Section content

**File**: `src/components/home/sections/BenefitsSection.tsx`

Replace SectionHeader props (lines 97-106):
| Prop | Current | New |
|---|---|---|
| eyebrow | `قبل أي إجراء` | `ماذا يتغير؟` |
| title | `ما الذي يختلف عندما تنظّم ملفك؟` | `شو بيتغير لما يصير ملفك مُرخّص؟` |
| description | `الفكرة ليست وعوداً كبيرة...` | `ستة تغييرات بسيطة بس تأثيرها كبير على قرارك اليومي: صورتك عند العميل بتصير أوضح، التمويل بيجيك أسرع، والتعاملات بتصير مهنية بدون ما تتعب.` |

**Delete** the SectionConnector at lines 154-159. Replace with Red Thread text:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  هذا الفرق يبان أكثر لحظة يطلع مشروعك من دائرة المعرفة الشخصية إلى التعامل المهني.
</p>
```

Also update benefit item descriptions — replace every instance of "التنظيم" and "تنظّم" with "الترخيص" or "ترخّص". Specifically in the `benefits` array:
- Item 1 (line 27): `عندما يتنظّم الملف` → `عندما يترخّص الملف`
- Item 2 (line 37): `التنظيم يساعد` → `الترخيص يساعد`
- Item 2 (line 39): `وبدون تنظيم` → `وبدون ترخيص`

---

### TASK 1.5 — Replace Anchor Moment content

**File**: `src/components/home/sections/AnchorMoment.tsx`

Replace the two `<motion.p>` text strings (lines 15, 24):
- First: `أنت اليوم تبيع لمن يعرفونك.` → `قبل الترخيص تبيع على الثقة، وبعده تبيع على الوضوح.`
- Second: `التنظيم هو ما يساعدك على البيع لمن لا يعرفونك، ويتعاملون معك بجدية.` → `الذي يعرفك قد يشتري منك مرة، لكن وضوح وضع مشروعك يساعدك تكمل مع ناس لا يعرفونك من قبل.`

**Add Red Thread** — After the image `</div>` (line 35), add:
```tsx
<p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  بعدما قربت الصورة، بقي أن تعرف أين يقف مشروعك اليوم حتى لا تبدأ من خطوة لا تناسبك.
</p>
```

---

### TASK 1.6 — Replace Quiz Section content

**File**: `src/components/home/sections/QuizSection.tsx`

Replace SectionHeader props (lines 13-21):
| Prop | Current | New |
|---|---|---|
| eyebrow | `اختبار تشخيصي` | `٤ أسئلة فقط` |
| title | `أربع أسئلة تكشف أين أنت` | `٤ أسئلة بتدلك على مسارك` |
| description | `أجب حسب وضعك الحالي...` | `ما تضيّع وقتك بالبحث العشوائي. جاوب عالأسئلة وبندلّك على خطوتك الأولى والجهة اللي لازم تقصدها.` |

**Delete** the SectionConnector at lines 28-33. Replace with Red Thread:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  بعدما صار مسارك أقرب، طبيعي يبقى عندك تردد عملي قبل أن تتحرك.
</p>
```

---

### TASK 1.7 — Replace FAQ Section content

**File**: `src/components/home/sections/FaqConcernsSection.tsx`

Replace SectionHeader props (lines 59-68):
| Prop | Current | New |
|---|---|---|
| eyebrow | `أسئلة ومخاوف` | `مخاوف وأسئلة` |
| title | `ما الذي يقلقك حتى الآن؟` | `الأسئلة اللي بتأخرّك` |
| description | `هنا تفصل بين التردد النفسي...` | `خلينا نجاوب على اللي بيقلقك قبل ما تاخد قرار، من التكاليف للإجراءات للمواقع.` |

**Add Red Thread** — After the closing grid `</div>` (line 121), add:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  وبعدما يخف التردد، يبقى خلط واحد لازم ينفك بسرعة: ما الذي يبدأ بالتسجيل، وما الذي يكتمل بالترخيص.
</p>
```

Also in the FAQ items — replace "التنظيم" with "الترخيص":
- FAQ item 5 (line 47): `هل التنظيم يضمن` → `هل الترخيص يضمن`

---

### TASK 1.8 — Replace Comparison Section content & SHORTEN it

**File**: `src/components/home/sections/ComparisonSection.tsx`

Replace SectionHeader props (lines 36-46):
| Prop | Current | New |
|---|---|---|
| eyebrow | `قبل أن تبدأ` | `فك الاشتباك` |
| title | `أين يختلط التسجيل بالترخيص؟` | `التسجيل والترخيص.. فك الاشتباك` |
| description | `التسجيل يعرّف الكيان...` | `باختصار: التسجيل هو إنك تعطي مشروعك اسم وهوية رسمية. والترخيص هو الإذن اللي بخليك تشتغل عالأرض قانونياً.` |

**DELETE the comparison table** — Remove the entire `comparisonRows` array (lines 6-27) and the rendering div (lines 93-118). Also delete the `"بدون تنظيم مكتمل"` and `"عند التنظيم"` labels.

Keep ONLY: the two cards (التسجيل and الترخيص, lines 58-91) and the closing statement.

Replace the closing statement text (line 124):
- Current: `أكبر تأخير لا يحدث عند الرخصة. يحدث عندما تبدأ من الخطوة الخاطئة.`
- New: `أكبر تأخير بيصير لما تبدأ من الخطوة الغلط.`

**Add Red Thread** after the closing statement:
```tsx
<p className="mx-auto mt-6 max-w-2xl text-center text-lg font-semibold leading-relaxed text-primary-foreground/70">
  هلأ بعد ما وضح الفرق، خلينا نشوف أي شكل قانوني بيلبّي طبيعة شغلك.
</p>
```

---

### TASK 1.9 — Replace Legal Forms Section content

**File**: `src/components/home/sections/LegalFormsSection.tsx`

Replace SectionHeader props (lines 65-74):
| Prop | Current | New |
|---|---|---|
| eyebrow | `الأشكال القانونية` | `الشكل القانوني` |
| title | `أي شكل قانوني يشبه وضعك؟` | `اختار الشكل القانوني اللي بريّحك` |
| description | `لا يوجد شكل واحد يناسب الجميع...` | `كل مشروع إله ثوب بيناسبه. تعرّف على الأشكال القانونية واختار اللي بيعطي مشروعك المرونة والحماية.` |

**Delete** the SectionConnector at lines 99-104. Replace with Red Thread:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  وإذا كان ثوب مشروعك إنه بيبدأ من البيت.. كيف تتصرف؟
</p>
```

---

### TASK 1.10 — Replace Home-Based Section content

**File**: `src/components/home/sections/HomeBasedSection.tsx`

Replace the `<h3>` (line 24-26): `إذا كان مشروعك من البيت` → `مشروعك من البيت؟ إله ترخيص`

Replace the description text (line 27-30): current text → `شغلك من البيت ما بيمنعك تكون رسمي. في رخص مخصصة للمهن المنزلية بتحميك وبتخليك تشتغل براحتك.`

Replace SectionHeader title (line 51): `في البيت، الموقع يغيّر المسار` → `إذا شغلك من البيت، اعرف ما يلزمك قبل أن تبدأ`

**Add Red Thread** — At the end of the section's inner content:
```tsx
<p className="mt-10 text-center text-lg font-semibold leading-relaxed text-foreground/70">
  الموضوع مش تنظير، خلينا نشوف كيف غيرك أخد الخطوة ومشت أموره.
</p>
```

---

### TASK 1.11 — Replace Scenario Section content

**File**: `src/components/home/sections/ScenarioSection.tsx`

Replace SectionHeader props (lines 8-17):
| Prop | Current | New |
|---|---|---|
| title | `ثلاث قصص من السوق الأردني` | `قصص قريبة من السوق الأردني` |
| description | `أحياناً توضح القصة القصيرة...` | `مطبخ منزلي، مصمم، وورشة خياطة. هيك بدأوا، وهيك الترخيص فرّق بشغلهم ونقلهم لمرحلة ثانية.` |

**Add Red Thread** after the `ScenarioCarousel` div:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  ومن هنا تظهر كلفة التأجيل: ليس لأن الخطوة كبيرة، بل لأن الضبابية تطول أكثر مما يلزم.
</p>
```

---

### TASK 1.12 — Replace Delay Tradeoffs content

**File**: `src/components/home/sections/DelayTradeoffsSection.tsx`

Replace SectionHeader props (lines 49-58):
| Prop | Current | New |
|---|---|---|
| eyebrow | `أثر التأجيل` | `كلفة الانتظار` |
| title | `الفرص التي لا تنتظرك` | `شو بتخسر لمّا تأجل الترخيص؟` |
| description | `ليس المقصود التخويف...` | `كل يوم تأخير بيعني فرصة ضايعة، أو عميل متردد، أو قلق من أي مخالفة فجأة.` |

**Delete** the SectionConnector at lines 86-91. Replace with Red Thread:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  ولما تصير كلفة التأجيل واضحة، يصبح الطريق نفسه أبسط مما يبدو.
</p>
```

---

### TASK 1.13 — Replace Journey Steps content

**File**: `src/components/home/sections/JourneyStepsSection.tsx`

Replace SectionHeader props (lines 41-50):
| Prop | Current | New |
|---|---|---|
| eyebrow | `الطريق العملي` | `خطوات المسار` |
| title | `كيف يمشي الطريق عادة؟` | `كيف بيمشي المسار عادة؟` |
| description | `ليس كل مشروع يمر بكل المحطات...` | `خطوات واضحة ومجربة بتبدأ من تحديد نشاطك وبتنتهي بحصولك على رخصتك. امشِها صح من البداية.` |

In `journeySteps` array, replace "التنظيم" in step 5 (line 29): `جزء من التنظيم نفسه` → `جزء من الترخيص نفسه`

**Delete** the SectionConnector at lines 91-96. Replace with Red Thread:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  والآن لم يعد ينقصك إلا أن تعرف أين تبدأ بحسب الجهة التي تخدم حالتك.
</p>
```

---

### TASK 1.14 — Replace Entities Section content

**File**: `src/components/home/sections/EntitiesSection.tsx`

Replace SectionHeader props (lines 30-39):
| Prop | Current | New |
|---|---|---|
| eyebrow | `منصات حكومية` | `أبوابك الرسمية` |
| title | `منصات تبدأ منها مباشرة` | `أبوابك الرسمية.. من وين تبدأ؟` |
| description | `هذه المنصات الرسمية...` | `بدل البحث المشتت، هنا تجد المنصات والجهات المرتبطة بكل خطوة في المسار. ادخل على الجهة المناسبة لحالتك وخذ أول إجراء مباشر.` |

**Delete** the SectionConnector at lines 92-97. Replace with Red Thread:
```tsx
<p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
  جربت المنصات؟ رأيك بيهمنا عشان نحسّن التجربة إلك ولغيرك.
</p>
```

---

### TASK 1.15 — Replace Survey Section content

**File**: `src/components/home/sections/SurveySection.tsx` (the wrapper)

Replace SectionHeader props (lines 15-24):
| Prop | Current | New |
|---|---|---|
| eyebrow | `استبيان قصير` | `رأيك بيهمنا` |
| title | `ساعدنا نفهم إذا الصفحة وضّحت الصورة` | `قل لنا أين علّقت معك الصفحة` |
| description | `6 أسئلة خفيفة بدون بيانات شخصية...` | `إجابتك السريعة تساعدنا نبسّط اللغة، ونوضح الخطوات، ونقرب المسار أكثر لمن يريد يبدأ بترخيص مشروعه.` |

**NO Red Thread here** — this is the last section before footer. End with silence and a button.

---

### TASK 1.16 — Replace Footer content

**File**: `src/components/home/sections/FooterSection.tsx`

Replace the content (lines 23-32):
| Element | Current | New |
|---|---|---|
| Eyebrow | `قبل أن تغادر الصفحة` | `خطوتك الأولى` |
| H2 | `اجعل خطوتك القادمة أوضح` | `ترخيص مشروعك يبدأ بخطوة واضحة` |
| Description | `إذا لم تكن جاهزاً تبدأ اليوم...` | `ليس المطلوب أن تنجز كل شيء اليوم. المطلوب أن تعرف خطوتك الأولى، وتذهب للجهة الصحيحة.` |

---

### TASK 1.17 — Replace Quiz Results (CRITICAL — most important moment on the page)

**File**: `src/components/home/PathQuiz.tsx`

This is the most important change. The quiz result must follow this exact sequence:
1. **Recognition** (1 sentence) — acknowledge the visitor's current situation
2. **One step** (1 sentence) — the single next action
3. **Immediate action** (1 button) — link to the relevant government platform

**Replace the `buildQuizResult` function results.** For each result case, replace `title`, `summary`, and `steps` as follows:

#### Case: `stage === "formal"` (line 320-336)
```
title: "وضعك بالسليم ومشروعك مرخص بالكامل"
summary: "هلأ بدك تتأكد إنك عم تستفيد من هالرخصة بأحسن طريقة."
steps: ["خطوتك الأولى حالياً هي تجديد رخصك بوقتها، واستكشاف فرص العطاءات والدعم اللي صارت متاحة إلك."]
status: "جاهزية ممتازة"
```

#### Case: `stage === "partial"` (line 338-354)
```
title: "قطعت نص الطريق بتسجيل مشروعك"
summary: "بس لسا ناقصك الموافقة النهائية لتشتغل براحة بال."
steps: ["خطوتك الأولى هي استكمال استخراج رخصة المهن من البلدية أو الأمانة اللي تابع إلها موقعك."]
status: "استكمال الملف"
```

#### Case: `stage === "planning" && isHomeOnly` (line 356-372)
```
title: "أنت لسا بمرحلة التخطيط ومشروعك من البيت"
summary: "وهاد أحسن وقت ترتّب فيه ملفك قبل ما تكبر."
steps: ["خطوتك الأولى هي تتأكد إذا كان نشاطك ينفع يترخّص من المنزل ولا لأ."]
status: "تخطيط أولي"
```

#### Case: `stage === "planning"` (non-home, line 374-390)
```
title: "عندك مكان تجاري بالمخطط بس لسه ما افتتحت رسمياً"
summary: "هالوقت ذهبي تخلص فيه الإجراءات."
steps: ["خطوتك الأولى هي تستفسر عن متطلبات الموقع التجاري من البلدية."]
status: "بداية محسوبة"
```

#### Default case: `stage === "informal"` (line 392-406)
```
title: "أنت شغال ومبيعاتك موجودة، بس ملفك ناقص"
summary: "والفراغ هاد بيقلقك حتى لو ما بيظهر."
steps: ["خطوتك الأولى هي تعرف شو بالظبط ناقصك عشان تكمل الملف."]
status: "ترخيص تدريجي"
```

**ALSO** — Replace all `"تنظيم"` strings in the quiz result labels:
- `stageLabels.informal` (line 166): `يعمل بدون تنظيم مكتمل` → `يعمل بدون ترخيص مكتمل`
- `status: "تنظيم تدريجي"` → `"ترخيص تدريجي"`

**Quiz result visual treatment** — Wrap the result display in a distinctive background:
```tsx
<div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 md:p-8">
  {/* result content */}
</div>
```
And add smooth scroll to the result when it appears:
```tsx
// After setting the result state, scroll to it:
resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
```

---

### TASK 1.18 — Global "التنظيم" search & replace

**After completing all tasks above**, search the ENTIRE codebase for any remaining instances of "التنظيم" or "تنظّم" or "تنظيم" and replace with "الترخيص" or "ترخّص" or "ترخيص" as appropriate.

**Files to check**: `content.ts` (NAV_ITEMS line 18: `لماذا التنظيم` → `لماذا الترخيص`), all section files, PathQuiz.tsx, ScenarioCarousel.tsx.

---

### TASK 1.19 — Delete SectionConnector component

**File**: `src/components/home/SectionConnector.tsx` — DELETE this entire file.

Then remove all imports of `SectionConnector` from every file that imports it:
- `BenefitsSection.tsx`
- `QuizSection.tsx`
- `DelayTradeoffsSection.tsx`
- `JourneyStepsSection.tsx`
- `LegalFormsSection.tsx`
- `EntitiesSection.tsx`

Also remove the `onNavigate` prop from any section that ONLY used it for SectionConnector (check if the section still needs `onNavigate` for other purposes).

---

### TASK 1.20 — Update mobile sticky CTA button

**File**: `src/pages/Home.tsx` (lines 150-163)

Change the button text from `ابدأ من الاختبار التشخيصي` to `اعرف مسارك`.

---

# PHASE 2: Navigation & Visual Separation

## Problem 3: Buttons jump the user around the page
**(Already solved by deleting SectionConnector in Phase 1)**

## Problem 4: Quiz and Timeline look identical on mobile

---

### TASK 2.1 — Redesign JourneyStepsSection as a vertical timeline

**File**: `src/components/home/sections/JourneyStepsSection.tsx`

Replace the current card-based layout (lines 62-89) with a **vertical timeline** design:

```tsx
<div className="mt-14 space-y-0">
  {journeySteps.map((step, index) => (
    <div key={step.title} className="relative flex gap-4 pb-8 last:pb-0 md:gap-6">
      {/* Vertical line */}
      {index < journeySteps.length - 1 && (
        <div className="absolute right-[18px] top-10 bottom-0 w-0.5 bg-primary/15 md:right-[22px]" />
      )}

      {/* Number circle */}
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground md:h-11 md:w-11 md:text-base">
        {index + 1}
      </div>

      {/* Content — NO card styling, just text */}
      <div className="pt-1">
        <h3 className="text-lg font-bold text-foreground md:text-xl">
          {step.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </div>
  ))}
</div>
```

**Key differences from quiz buttons:**
- No borders, no cards, no shadows
- Small circles (36-44px) with thin connecting line
- Text sits beside the circle, not inside a card
- Purely informational — nothing looks clickable

---

### TASK 2.2 — Add progress indicator to Quiz

**File**: `src/components/home/PathQuiz.tsx`

Find where the current step labels are rendered (the STEP_LABELS array and its rendering). Replace the step labels with a simple numeric progress bar:

```tsx
<div className="mb-6 flex items-center justify-between">
  <p className="text-lg font-bold text-foreground">
    سؤال {currentStep + 1} من {QUESTION_STEPS.length}
  </p>
  <div className="flex gap-1.5">
    {QUESTION_STEPS.map((_, i) => (
      <div
        key={i}
        className={`h-2 rounded-full transition-all ${
          i <= currentStep ? "w-8 bg-primary" : "w-8 bg-border"
        }`}
      />
    ))}
  </div>
</div>
```

**Remove** the STEP_LABELS array (lines 75-80) and its full rendering — the expandable step indicators that look like timeline stations. Replace them entirely with the simple progress bar above.

---

# PHASE 3: Mobile Density & Progress Indicator

## Problem 5: Content is too dense on mobile

---

### TASK 3.1 — Add a 3-stage progress indicator (mobile only)

**File**: `src/pages/Home.tsx`

Add a new sticky progress bar that appears **below the Navbar on mobile only**. It shows 3 stages:

```
افهم → قيّم وضعك → تحرّك
```

The stages map to sections:
- **افهم**: Hero, Stats, Benefits, Anchor Moment
- **قيّم وضعك**: Quiz, FAQ, Comparison
- **تحرّك**: Legal Forms, Home-Based, Scenarios, Delay, Journey, Entities, Survey

Implementation:

```tsx
// Add state for current phase
const [currentPhase, setCurrentPhase] = useState(0);

const PHASES = ["افهم", "قيّم وضعك", "تحرّك"] as const;

const PHASE_MAP: Record<string, number> = {
  top: 0, benefits: 0,
  "find-path": 1, faq: 1, "reg-vs-license": 1,
  "legal-forms": 2, "home-based": 2, "what-changes": 2, entities: 2, survey: 2, footer: 2,
};

// Update currentPhase inside the existing IntersectionObserver callback:
// After setActiveSection(nextId), add:
setCurrentPhase(PHASE_MAP[visibleEntries[0].target.id] ?? 0);
```

Render the progress bar (inside the return, after the TopNav):
```tsx
{/* Mobile-only progress indicator */}
<div className="fixed inset-x-0 top-[72px] z-30 border-b border-border/50 bg-background/90 px-4 py-2 backdrop-blur-md md:hidden">
  <div className="flex items-center justify-between gap-2">
    {PHASES.map((phase, i) => (
      <div key={phase} className="flex flex-1 items-center gap-2">
        <div className={`flex-1 rounded-full h-1.5 transition-colors ${
          i <= currentPhase ? "bg-primary" : "bg-border"
        }`} />
        <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${
          i === currentPhase ? "text-primary" : "text-muted-foreground/50"
        }`}>
          {phase}
        </span>
      </div>
    ))}
  </div>
</div>
```

**IMPORTANT**: Adjust the top padding of `<main>` to account for this extra bar on mobile — add `pt-[40px] md:pt-0` or adjust accordingly so content isn't hidden behind it.

---

### TASK 3.2 — Convert Legal Forms to Accordion layout

**File**: `src/components/home/sections/LegalFormsSection.tsx`

Replace the grid of cards (lines 76-96) with an Accordion:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Replace the grid with:
<Accordion type="single" collapsible className="mt-12 space-y-3">
  {legalForms.map((form, index) => (
    <AccordionItem
      key={form.title}
      value={`form-${index}`}
      className="rounded-2xl border border-border bg-card px-5"
    >
      <AccordionTrigger className="py-5 text-right hover:no-underline">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary`}>
            <form.Icon className="h-5 w-5" />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-accent">{form.eyebrow}</p>
            <h3 className="text-lg font-bold text-foreground">{form.title}</h3>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-5">
        <p className="text-base leading-relaxed text-muted-foreground">
          {form.description}
        </p>
        <div className="mt-3 rounded-xl bg-secondary/55 p-3 text-sm leading-relaxed text-foreground/80">
          {form.detail}
        </div>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

This works on both mobile and desktop with the same code — no separate layouts needed.

---

### TASK 3.3 — Shorten Comparison Section (technical cleanup)

**File**: `src/components/home/sections/ComparisonSection.tsx`

After Task 1.8 deleted the comparison table, also remove the `comparisonRows` import/variable if it still exists. Ensure the section is now ONLY:
1. SectionHeader
2. Image
3. Two cards (التسجيل + الترخيص)
4. Closing statement
5. Red thread text

The section should feel like a **30-second read**, not a deep comparison.

---

### TASK 3.4 — Update index.html meta tags

**File**: `index.html`

Replace the following:

| Element | Current | New |
|---|---|---|
| `<title>` (line 6) | `دليل التنظيم والتسجيل للمشاريع في الأردن` | `مسار الترخيص — رخّص مشروعك وتوسّع` |
| `<meta name="description">` (line 8-9) | `صفحة إرشادية لأصحاب المشاريع في الأردن: افهم الفرق بين التسجيل والترخيص...` | `صفحة إرشادية لأصحاب المشاريع في الأردن: اكتشف مسارك نحو الترخيص، واعرف خطوتك الأولى والجهة المختصة.` |
| `og:title` (line 12-13) | `دليل التنظيم والتسجيل للمشاريع في الأردن` | `مسار الترخيص — رخّص مشروعك وتوسّع` |
| `og:description` (line 16-17) | `صفحة إرشادية تساعدك على فهم مسار تسجيل وترخيص مشروعك...` | `اكتشف خطوتك الأولى نحو ترخيص مشروعك في الأردن — اختبار سريع، خطوات واضحة، وروابط مباشرة للجهات الرسمية.` |

---

### TASK 3.5 — Replace "تنظيم" in ScenarioCarousel.tsx

**File**: `src/components/home/ScenarioCarousel.tsx`

Line 19: `لا يحتاج أي تنظيم` → `لا يحتاج أي ترخيص`

---

### TASK 3.6 — Clean up onNavigate props after SectionConnector deletion

After deleting SectionConnector, the following sections **no longer need** the `onNavigate` prop (they only used it for SectionConnector):

- `DelayTradeoffsSection` — remove `onNavigate` prop, type, and from Home.tsx usage
- `LegalFormsSection` — remove `onNavigate` prop, type, and from Home.tsx usage
- `EntitiesSection` — remove `onNavigate` prop, type, and from Home.tsx usage

The following sections **STILL need** `onNavigate` for other purposes (buttons inside section, not SectionConnector):
- `HeroSection` — Hero buttons
- `BenefitsSection` — check if still needed after button removal; if only SectionConnector used it, remove it too
- `QuizSection` — PathQuiz uses it
- `JourneyStepsSection` — check if still needed; if only SectionConnector used it, remove it too
- `FooterSection` — footer buttons
- `SurveySectionBlock` — SurveySection uses it

**Rule**: If a section's ONLY use of `onNavigate` was inside SectionConnector, remove the prop entirely. Check each file.

---

## Verification Checklist

After completing all tasks, verify:

1. `npm run typecheck` — passes with no errors
2. `npm run build` — builds successfully
3. Search entire codebase for "التنظيم" — should return 0 results (except possibly in PROMPT files)
4. Search for "SectionConnector" — should return 0 results in component files
5. Mobile view (Chrome DevTools, iPhone 14 size):
   - Progress bar visible below navbar
   - No card-styled elements in JourneySteps
   - Quiz shows "سؤال X من 4" progress
   - Legal Forms shows accordion
   - No jump-buttons between sections
6. Desktop view: everything still looks correct and no broken layouts
7. All Red Thread texts are plain text paragraphs — NO buttons anywhere in them

---

## File Change Summary

| File | Action |
|---|---|
| `TopNav.tsx` | Change site name |
| `HeroSection.tsx` | Replace content + change buttons |
| `StatsSection.tsx` | Replace content + add red thread |
| `BenefitsSection.tsx` | Replace content + delete SectionConnector + add red thread |
| `AnchorMoment.tsx` | Replace content + add red thread |
| `QuizSection.tsx` | Replace content + delete SectionConnector + add red thread |
| `FaqConcernsSection.tsx` | Replace content + add red thread |
| `ComparisonSection.tsx` | Replace content + DELETE comparison table + add red thread |
| `LegalFormsSection.tsx` | Replace content + convert to Accordion + delete SectionConnector + add red thread |
| `HomeBasedSection.tsx` | Replace content + add red thread |
| `ScenarioSection.tsx` | Replace content + add red thread |
| `DelayTradeoffsSection.tsx` | Replace content + delete SectionConnector + add red thread |
| `JourneyStepsSection.tsx` | Replace content + redesign as timeline + delete SectionConnector + add red thread |
| `EntitiesSection.tsx` | Replace content + delete SectionConnector + add red thread |
| `SurveySection.tsx` (wrapper) | Replace content (NO red thread) |
| `FooterSection.tsx` | Replace content |
| `PathQuiz.tsx` | Replace quiz results + add progress bar + remove step labels + style result |
| `Home.tsx` | Add progress indicator + change sticky CTA text |
| `content.ts` | Replace "التنظيم" in NAV_ITEMS |
| `SectionConnector.tsx` | DELETE entire file |
| `ScenarioCarousel.tsx` | Replace "التنظيم" if found |

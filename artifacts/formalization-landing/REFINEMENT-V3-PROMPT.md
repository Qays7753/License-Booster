# Refinement Pass V3 — Bug Fixes & Final Polish

## Context

Both V1 and V2 refinement prompts have been fully executed. This V3 prompt fixes **specific bugs and inconsistencies** found during post-execution review. These are targeted, small changes — not a redesign.

---

## BUG 1 — Server Survey Labels Out of Sync with Frontend (HIGH PRIORITY)

### Problem

The `SURVEY_FIELDS` object in `server/index.js` (lines 13-51) contains **old colloquial Arabic text** that does NOT match the updated survey questions in `SurveySection.tsx`. This means the dashboard's breakdown charts will fail to match responses correctly.

### Fix

Replace the entire `SURVEY_FIELDS` object in `server/index.js` with labels that **exactly match** the current `questions` array in `src/components/home/SurveySection.tsx`:

```javascript
const SURVEY_FIELDS = {
  source: [
    "شاهدت فيديو لصاحب مشروع على وسائل التواصل",
    "أرسل إليّ أحدهم الرابط",
    "بحثت بنفسي عن تسجيل أو ترخيص المشاريع",
    "طريقة ثانية",
  ],
  baseline: [
    "ما كنت أعرف من أين أبدأ أصلاً",
    "كنت أعرف الفكرة العامة، لكن ليس التفاصيل",
    "كنت أعرف الخطوات بشكل جيد",
  ],
  clarity_gain: [
    "عرفت الفرق بين التسجيل والترخيص وأنهما خطوتان مختلفتان",
    "عرفت الجهة التي يلزم أن أبدأ منها لنوع مشروعي",
    "فهمت أن الخطوات تختلف حسب نوع المشروع والموقع",
    "اكتشفت أن لدي خطوات ناقصة لم أكن أعرف عنها",
    "لم أشعر أن الصفحة أضافت شيئاً جديداً لي",
  ],
  readiness: [
    "جاهز وأعرف ما أول خطوة",
    "أقرب من قبل، لكن ما زالت لدي أسئلة",
    "ما زلت لا أشعر أنني جاهز",
    "مشروعي منظم أصلاً",
  ],
  next_action: [
    "أفتح موقع الجهة المختصة التي ظهرت لي",
    "أسأل محامياً أو شخصاً لديه خبرة في حالتي",
    "أشارك الصفحة مع شخص يحتاجها",
    "أعود لقراءة أقسام معينة بتركيز أكبر",
    "ليس لدي خطوة محددة حالياً",
  ],
  segment: [
    "أفكر في بدء مشروع ولم أبدأ بعد",
    "لدي مشروع يعمل بدون تنظيم مكتمل",
    "بدأت التسجيل لكن الملف ناقص",
    "مسجل ومرخص",
  ],
};
```

**IMPORTANT:** These labels must be **character-for-character identical** to the `text` field in each option of the `questions` array in `SurveySection.tsx`. If there is any mismatch, the dashboard breakdown will not group responses correctly. After replacing, compare each label side-by-side with `SurveySection.tsx` to confirm exact match.

---

## BUG 2 — Remaining Colloquial Word: "فيروح"

### File: `src/components/home/sections/DelayTradeoffsSection.tsx`, line 13

### Current:
```
"مثال: عميل مؤسسي جاهز يطلب عقداً وفاتورة، فيروح لجهة ثانية لأن ملفك غير واضح."
```

### Replace with:
```
"مثال: عميل مؤسسي جاهز يطلب عقداً وفاتورة، فيتوجه إلى جهة أخرى لأن ملفك غير واضح."
```

---

## BUG 3 — Remaining Colloquial useCase Text in content.ts

### File: `src/components/home/content.ts`

### Fix 1 — Line 92 (CCD platform useCase):
**Current:** `"ابدأ هنا إذا قررت تسجّل شركتك وجاهز تفتح الملف."`
**Replace:** `"ابدأ هنا إذا قررت تسجيل شركتك وأنت جاهز لفتح الملف."`

### Fix 2 — Line 101 (MOLA platform useCase):
**Current:** `"ابدأ هنا إذا مشروعك خارج عمّان وتحتاج رخصة مهن."`
**Replace:** `"ابدأ هنا إذا كان مشروعك خارج عمّان وتحتاج رخصة مهن."`

### Fix 3 — Line 110 (Amman platform useCase):
**Current:** `"ابدأ هنا إذا مشروعك داخل عمّان وتحتاج رخصة مهن."`
**Replace:** `"ابدأ هنا إذا كان مشروعك داخل عمّان وتحتاج رخصة مهن."`

---

## BUG 4 — Final Colloquial Sweep

After applying Bugs 2 and 3, do a **final grep** across all `.tsx`, `.ts`, and `.js` files in the project for these patterns in **visible Arabic strings** (not variable names or comments):

| Pattern | What to look for |
|---|---|
| `فيروح` | Replace with "فيتوجه" or "فيذهب" |
| `إذا مشروعك` (without كان) | Replace with "إذا كان مشروعك" |
| `إذا قررت تسجّل` | Replace with "إذا قررت تسجيل" |
| `وجاهز تفتح` | Replace with "وأنت جاهز لفتح" |
| `تحتاج تعرف` | Replace with "تحتاج أن تعرف" or "أردت معرفة" |
| `بدون ما` | Check context — may be acceptable |

If any new instances are found, apply the same spoken-formal standard: clear, approachable, but not street slang.

---

## Validation

After all fixes:

- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Start server (`npm run server`) + dev (`npm run dev`), submit a test survey response, then verify `/dashboard` shows the response correctly grouped under the right labels
- [ ] Grep for `فيروح` in `src/` — should return zero results
- [ ] Grep for `إذا مشروعك` (without كان before it) in `src/` — should return zero results
- [ ] Compare every label in `server/index.js` `SURVEY_FIELDS` with `SurveySection.tsx` `questions` — must be identical

---

## Critical Rules

1. These are **exact text replacements** — do not rewrite surrounding code or restructure anything.
2. Do NOT change any component logic, layout, or styling.
3. Do NOT add new features or files.
4. Do NOT modify any file not mentioned in this prompt.

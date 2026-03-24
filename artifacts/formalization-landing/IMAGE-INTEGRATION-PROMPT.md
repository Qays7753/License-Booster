# Image Integration Prompt — Replace TODO Placeholders with Illustrations

## Context

The project owner is providing 5 illustrations + 1 OG image as attachments in this conversation. Your job is to:

1. **Save each image** to the correct path in the project at the **highest available quality** (no compression, no resizing, no conversion)
2. **Replace the TODO comment placeholders** (added in V4) with actual `<img>` elements
3. **Remove the Hero inline SVG** and replace it with the new Hero illustration

**Rule: Do NOT modify any text content, animations, or component logic. Only handle images.**

---

## STEP 0 — Save the Attached Images

The project owner will attach images in this conversation. Save each one to the correct path based on its content:

| Image Content | Save To | Purpose |
|---|---|---|
| Hero illustration (project files/folders concept) | `public/images/hero-illustration.png` | Hero section |
| Selling to strangers concept | `public/images/anchor-moment.png` | Anchor Moment section |
| Working from home concept | `public/images/home-based.png` | Home-Based section |
| Journey/path steps concept | `public/images/journey-path.png` | Journey Steps section |
| Registration vs licensing split concept | `public/images/reg-vs-license.png` | Comparison section |
| OG social sharing image | `public/opengraph.jpg` | Social media preview |

**Critical:**
- Create the `public/images/` directory if it doesn't exist
- Save at the **highest quality** — do NOT compress, resize, optimize, or convert the format
- Keep the exact format the image was provided in (PNG stays PNG, JPG stays JPG)
- If an image is not provided, skip its task and leave the TODO comment in place

---

## TASK 1 — Hero Illustration (Replace SVG)

### File: `src/components/home/sections/HeroSection.tsx`

The Hero section currently has an inline SVG with framer-motion animations (motion.rect, motion.path). Replace the entire SVG block with the new illustration image.

### 1.1 — Remove the inline SVG and replace with image

Find this block (the entire `<div className="rounded-3xl bg-[#efe7da] p-4">` containing the `<motion.svg>`). Replace its contents:

**Remove:** Everything inside the `<div className="rounded-3xl bg-[#efe7da] p-4">` (the full `<motion.svg>...</motion.svg>`)

**Replace with:**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
>
  <img
    src="/images/hero-illustration.png"
    alt="رسم توضيحي يرمز إلى تنظيم ملفات المشروع"
    className="h-full w-full rounded-3xl"
    width="520"
    height="340"
    loading="eager"
  />
</motion.div>
```

**Also:** Remove the `<title id="hero-abstract-title">` comment/element since it was for the SVG accessibility. The `alt` attribute on the `<img>` replaces it.

**Also:** Remove the old TODO comment above the SVG (`{/* Current: inline SVG placeholder. Replace with... */}`).

### 1.2 — Clean up unused imports

After removing the SVG, the `motion` import from framer-motion is still needed (for `motion.div`). But check if any SVG-specific code remains and remove dead code.

---

## TASK 2 — Anchor Moment Illustration

### File: `src/components/home/sections/AnchorMoment.tsx`

Find the TODO comment placeholder:
```tsx
<div className="mx-auto mt-10 max-w-3xl">
  {/* TODO: Replace with <img src="images/anchor-moment.png" alt="..." /> when available */}
</div>
```

**Replace with:**
```tsx
<div className="mx-auto mt-10 max-w-3xl">
  <img
    src="/images/anchor-moment.png"
    alt="رسم توضيحي يعبّر عن الانتقال من البيع لمن يعرفك إلى البيع لمن لا يعرفك"
    className="w-full rounded-3xl"
    width="800"
    height="400"
    loading="lazy"
  />
</div>
```

---

## TASK 3 — Home-Based Illustration

### File: `src/components/home/sections/HomeBasedSection.tsx`

Find the TODO comment:
```tsx
{/* TODO: Replace icon card with <img src="images/home-based.png" alt="..." className="rounded-3xl" /> when available */}
```

**Remove** the TODO comment line.

Then find the icon block inside the card (the `<div>` containing `<HomeIcon>`):
```tsx
<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/12 text-accent">
  <HomeIcon className="h-8 w-8" />
</div>
```

**Replace with:**
```tsx
<img
  src="/images/home-based.png"
  alt="رسم توضيحي يمثل العمل من المنزل"
  className="w-full rounded-2xl"
  width="480"
  height="480"
  loading="lazy"
/>
```

**Also:** Remove the `HomeIcon` (aliased `Home as HomeIcon`) from the lucide-react import if it is no longer used anywhere else in the file. Keep `CheckCircle2` since it's still used for the points list.

---

## TASK 4 — Journey Path Illustration

### File: `src/components/home/sections/JourneyStepsSection.tsx`

Find the TODO comment:
```tsx
<div className="mt-14">
  {/* TODO: Add <img src="images/journey-path.png" alt="..." className="w-full" /> when available */}
</div>
```

**Replace with:**
```tsx
<div className="mt-14">
  <img
    src="/images/journey-path.png"
    alt="رسم توضيحي يوضح مراحل الطريق العملي لتنظيم المشروع"
    className="w-full rounded-3xl"
    width="900"
    height="300"
    loading="lazy"
  />
</div>
```

---

## TASK 5 — Registration vs Licensing Illustration

### File: `src/components/home/sections/ComparisonSection.tsx`

Find the TODO comment:
```tsx
<div className="mx-auto mt-12 max-w-2xl">
  {/* TODO: Add <img src="images/reg-vs-license.png" alt="..." className="mx-auto max-w-2xl" /> when available */}
</div>
```

**Replace with:**
```tsx
<div className="mx-auto mt-12 max-w-2xl">
  <img
    src="/images/reg-vs-license.png"
    alt="رسم توضيحي يوضح الفرق بين التسجيل والترخيص"
    className="mx-auto w-full rounded-3xl"
    width="800"
    height="400"
    loading="lazy"
  />
</div>
```

---

## TASK 6 — OG Image

The new `opengraph.jpg` should already be placed at `public/opengraph.jpg` (replacing the old file). No code change needed — `index.html` already references `/opengraph.jpg`.

**Verify only:** Confirm the file exists and is a valid JPEG at 1200x630.

---

## Validation

After all tasks:

- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Hero section shows the new illustration with a fade-in + scale animation (no more inline SVG)
- [ ] Anchor Moment shows illustration below the quote text
- [ ] Home-Based section shows illustration replacing the icon
- [ ] Journey Steps shows the path illustration above the step cards
- [ ] Comparison section shows illustration between header and the two cards
- [ ] All images have proper `alt` text in Arabic
- [ ] All images except Hero use `loading="lazy"` (Hero uses `loading="eager"`)
- [ ] All images have explicit `width` and `height` attributes (prevents layout shift)
- [ ] No broken image icons — if a file is missing, its TODO comment should remain
- [ ] No unused imports remain (e.g., `HomeIcon` if replaced)
- [ ] All existing animations on OTHER elements still work correctly
- [ ] Page loads fast — total image payload should be reasonable (check with DevTools Network tab)
- [ ] Mobile: images scale correctly and don't overflow at 375px width
- [ ] OG image shows correctly when URL is shared (test with a social media preview tool)

---

## Critical Rules

1. **Do NOT modify text content, data arrays, or component logic** — this prompt is ONLY about images
2. **Do NOT add new animations** beyond the Hero image entrance (motion.div with opacity + scale)
3. **If an image file is missing, leave the TODO comment** — do NOT add an `<img>` with a broken path
4. **All images must have Arabic `alt` text** — not English, not empty
5. **Hero image loads eagerly** (`loading="eager"`) because it's above the fold. All others load lazily (`loading="lazy"`)
6. **Do NOT resize or compress the images in code** — the project owner handles image optimization separately

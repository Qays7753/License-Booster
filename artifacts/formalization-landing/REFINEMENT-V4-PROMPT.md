# Refinement Pass V4 — Micro-Animations & Image Integration

## Context

V1, V2, and V3 prompts have been executed. The project owner is generating 5 illustrations + 1 OG image separately. This prompt adds **6 purposeful micro-animations** using framer-motion (already installed) and prepares the codebase to receive the new images.

**Rule: Every animation must answer "what story does this tell?" If there's no clear answer, don't add it.**

---

## TASK 1 — Hero Illustration Animation

### 1.1 — Animate the SVG elements on page load

The Hero currently has an inline SVG (`HeroSection.tsx`) with 3 stacked rectangles (representing papers/folders) and a checkmark path. Animate them on initial page load:

**The stacked papers — stagger entrance:**
```tsx
// Wrap each of the 3 <rect> elements (the white papers at x=96, x=152, x=208) in motion.rect
// They should slide in from the right and stack, one after another

// Paper 1 (back):
<motion.rect
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
  // ... keep all existing attributes
/>

// Paper 2 (middle):
<motion.rect
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
/>

// Paper 3 (front):
<motion.rect
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
/>
```

**The checkmark — draw stroke:**
```tsx
// The <path d="M168 231l22 22 48-58"> should animate its stroke
<motion.path
  d="M168 231l22 22 48-58"
  fill="none"
  stroke="#dd6b4d"
  strokeWidth="12"
  strokeLinecap="round"
  strokeLinejoin="round"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
  transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
/>
```

**The text placeholder bars** (the 3 horizontal bars inside the front paper) should fade in after the checkmark:
```tsx
// Each bar:
initial={{ opacity: 0 }}
animate={{ opacity: targetOpacity }}  // preserve original opacity values (0.92, 0.28, 0.2)
transition={{ delay: 1.4, duration: 0.4 }}
```

**Total animation duration:** ~2 seconds from page load. Runs ONCE, not on scroll.

### 1.2 — When new Hero illustration image is provided

The project owner will replace the SVG with a real illustration later. When that happens:
- Remove the inline SVG and its animations
- Replace with an `<img>` tag
- Add a simple entrance animation on the `<img>` wrapper:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
>
  <img src="..." alt="..." />
</motion.div>
```

**For now, implement the SVG animation (1.1) since the SVG is what's currently in place.**

---

## TASK 2 — Anchor Moment Text Reveal

### File: `src/components/home/sections/AnchorMoment.tsx`

The Anchor Moment contains a powerful quote. Animate the text to appear line-by-line when the section scrolls into view.

```tsx
// Read the current AnchorMoment component and identify the main quote text.
// Split it into 2 lines (the quote is likely 2 sentences).
// Wrap each line in a motion.span or motion.p:

<motion.p
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5 }}
  className="..."
>
  {/* First line of the quote */}
</motion.p>

<motion.p
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="..."
>
  {/* Second line of the quote */}
</motion.p>
```

**Keep:** The existing `SectionHeader` whileInView animation (if it has one).
**Total animation:** ~1 second after scroll trigger. Runs ONCE.

---

## TASK 3 — Journey Steps Progressive Path Line

### File: `src/components/home/sections/JourneyStepsSection.tsx`

Add a **vertical connecting line** between the 5 journey step cards that draws itself progressively as the user scrolls through the section.

### 3.1 — Add the visual line

Between the step number circle and the next step, add a vertical line element:

```tsx
// Inside the steps map, after each article (except the last one):
{index < journeySteps.length - 1 && (
  <div className="mr-[27px] hidden h-6 w-0.5 bg-primary/20 md:block" />
  // 27px = centers under the 56px circle (14w/2 + padding)
)}
```

### 3.2 — Animate each step card on scroll

Wrap each step `<article>` with a staggered whileInView animation:

```tsx
<motion.article
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ delay: index * 0.12, duration: 0.4, ease: "easeOut" }}
  // ... keep existing className
>
```

**Note:** This is the ONLY section where card stagger animation is allowed. All other sections (Benefits, Legal Forms, Entities, Tradeoffs) must remain static as specified in V1 prompt.

---

## TASK 4 — Comparison Cards Split Animation

### File: `src/components/home/sections/ComparisonSection.tsx`

The two cards ("التسجيل" and "الترخيص") should animate as if splitting apart from each other when scrolled into view.

```tsx
// Registration card (first article):
<motion.article
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="..."
>

// Licensing card (second article):
<motion.article
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
  className="..."
>
```

This creates a visual "split" effect — the two cards slide apart from the center, reinforcing that registration and licensing are **two different things**.

The comparison rows below should remain static (no animation).

---

## TASK 5 — Quiz Result Entrance

### File: `src/components/home/PathQuiz.tsx`

When the quiz result appears (after the user completes all 4 steps), the result card should have a distinct entrance animation:

```tsx
// Find the result display section (it should be conditionally rendered when result exists)
// Wrap the result container in:

<motion.div
  initial={{ opacity: 0, y: 24, scale: 0.97 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* existing result card content */}
</motion.div>
```

**Do NOT animate** individual items inside the result (steps list, authorities, etc.) — only the outer container gets one smooth entrance. The content should be immediately readable once the card appears.

---

## TASK 6 — Prepare Image Slots for Future Illustrations

The project owner is generating illustrations that will be placed in these locations. **Add placeholder wrappers now** so dropping in the images later requires only changing the `src` attribute.

### 6.1 — Anchor Moment image slot

In `AnchorMoment.tsx`, add an optional image container beside or below the quote:

```tsx
{/* Image placeholder — will be replaced with anchor-moment.png */}
<div className="mx-auto mt-10 max-w-3xl">
  {/* TODO: Replace with <img src="images/anchor-moment.png" alt="..." /> when available */}
</div>
```

### 6.2 — Home-Based section image slot

In `HomeBasedSection.tsx`, the left column already has a card with an icon. Below the icon card or as a replacement for the icon area, add:

```tsx
{/* TODO: Replace icon card with <img src="images/home-based.png" alt="..." className="rounded-3xl" /> when available */}
```

### 6.3 — Journey Steps image slot

In `JourneyStepsSection.tsx`, above the steps list:

```tsx
{/* TODO: Add <img src="images/journey-path.png" alt="..." className="w-full" /> when available */}
```

### 6.4 — Comparison section image slot

In `ComparisonSection.tsx`, between the SectionHeader and the two cards:

```tsx
{/* TODO: Add <img src="images/reg-vs-license.png" alt="..." className="mx-auto max-w-2xl" /> when available */}
```

### 6.5 — Hero illustration

The Hero SVG will eventually be replaced with `hero-illustration.png`. Add a comment above the current SVG:

```tsx
{/* Current: inline SVG placeholder. Replace with <img src="images/hero-illustration.png" /> when professional illustration is ready */}
```

### 6.6 — OG Image

Replace `public/opengraph.jpg` when the new version is provided. No code change needed — the `index.html` already references it.

---

## Validation

After all tasks:

- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Hero SVG animates on page load: papers slide in → checkmark draws → bars fade in
- [ ] Anchor Moment quote fades in line-by-line on scroll
- [ ] Journey Steps cards stagger-animate on scroll with connecting line visible
- [ ] Comparison cards split-animate on scroll
- [ ] Quiz result card slides in smoothly after completing quiz
- [ ] NO other sections have card-level animations (Benefits, Legal Forms, Entities, Tradeoffs remain static)
- [ ] All TODO comments for image slots are present
- [ ] Animations run only ONCE (viewport `once: true` or initial page load)
- [ ] Mobile: all animations work and don't cause layout shift or jank
- [ ] Page still scrolls smoothly — no animation blocking scroll performance

---

## Critical Rules

1. **Use ONLY framer-motion** — no CSS @keyframes, no GSAP, no new libraries
2. **Maximum 6 animated elements** across the entire page (the 5 tasks above + the existing SectionHeader whileInView). Everything else is static.
3. **All animations run ONCE** — `viewport={{ once: true }}` for scroll-triggered, no looping
4. **No animation on these sections:** Benefits cards, Legal Forms cards, Entity cards, Delay Tradeoff cards, FAQ accordion, Survey questions (their step transitions are sufficient)
5. **Do NOT add a loading animation or skeleton screen** — the page should render content immediately
6. **Do NOT animate on mobile if it causes jank** — test at 375px width. If any animation causes visible stutter on a mid-range device, wrap it in a `useReducedMotion()` check from framer-motion and skip it
7. **Image placeholders are TODO comments only** — do NOT add actual `<img>` tags with broken src paths

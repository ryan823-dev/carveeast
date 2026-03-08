# CarveEast Design System

## Design Philosophy

**Editorial. Premium. Culturally Rich. Trustworthy.**

CarveEast is not an e-commerce site. It is a curated art discovery platform. The design should feel:
- Like a contemporary art publication
- Like a high-end gallery experience
- Like a trustworthy cultural institution

Avoid:
- Flashy marketplace aesthetics
- Bright, aggressive colors
- Dense product grids
- Discount/sale messaging
- Generic "Chinese art" clichés

---

## Color System

### Primary Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#FAFAF8` | Page background, warm off-white |
| `--color-background-secondary` | `#F5F4F2` | Section backgrounds, cards |
| `--color-background-tertiary` | `#EFEDEA` | Image placeholders, subtle areas |
| `--color-foreground` | `#1A1A1A` | Primary text, headings |
| `--color-foreground-secondary` | `#4A4A48` | Body text, descriptions |
| `--color-foreground-muted` | `#7A7A78` | Captions, meta text |
| `--color-foreground-subtle` | `#9A9A98` | Placeholders, disabled |

### Accent Color

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#B83A2F` | Cinnabar red - CTAs, highlights, Chinese cultural reference |
| `--color-accent-hover` | `#9A2F26` | Hover states |
| `--color-accent-subtle` | `#F5E8E6` | Light backgrounds, badges |

### Dark Mode (Sections)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-dark-bg` | `#1A1A1A` | Dark sections (auctions, trust) |
| `--color-dark-fg` | `#FAFAF8` | Text on dark |
| `--color-dark-muted` | `#9A9A98` | Muted text on dark |
| `--color-dark-border` | `#2D2D2D` | Borders on dark |

### Ink Tones (Cultural Reference)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-ink-black` | `#0D0D0D` | Deepest black |
| `--color-ink-charcoal` | `#2D2D2D` | Charcoal |
| `--color-ink-wash` | `#6B6B6B` | Ink wash gray |
| `--color-ink-light` | `#C4C4C4` | Light ink |

### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border` | `#E5E4E2` | Standard borders |
| `--color-border-light` | `#F0EFED` | Subtle dividers |
| `--color-border-dark` | `#D5D4D2` | Stronger borders |

---

## Typography System

### Font Families

| Token | Font | Usage |
|-------|------|-------|
| `--font-serif` | Playfair Display | Headings, titles, brand moments |
| `--font-sans` | Inter | Body text, UI elements, captions |

### Type Scale

| Style | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| Display XL | 4.5rem (72px) | 1.1 | -0.02em | 600 | Hero headlines |
| Display LG | 3.5rem (56px) | 1.15 | -0.02em | 600 | Section headlines |
| Display MD | 2.5rem (40px) | 1.2 | -0.01em | 600 | Page titles |
| Display SM | 2rem (32px) | 1.25 | -0.01em | 600 | Sub-section titles |
| Title XL | 1.5rem (24px) | 1.3 | 0 | 600 | Card titles |
| Title LG | 1.25rem (20px) | 1.4 | 0 | 600 | Small headings |
| Title MD | 1.125rem (18px) | 1.4 | 0 | 500 | Labels |
| Body LG | 1.125rem (18px) | 1.7 | 0 | 400 | Lead paragraphs |
| Body | 1rem (16px) | 1.7 | 0 | 400 | Standard text |
| Body SM | 0.875rem (14px) | 1.6 | 0 | 400 | Small text |
| Caption | 0.75rem (12px) | 1.5 | 0.05em | 400 | Meta, timestamps |
| Label | 0.6875rem (11px) | 1.4 | 0.1em | 500 | Tags, badges, uppercase |

### Typography Patterns

**Eyebrow (Section Label)**:
```
font: Label (11px, uppercase, tracking 0.3em)
color: accent (#B83A2F)
margin-bottom: 1rem
```

**Section Title**:
```
font: Display LG (56px) or Display MD (40px)
font-family: serif
line-height: 1.15
margin-bottom: 1.5rem
```

**Body Text**:
```
font: Body (16px) or Body LG (18px)
font-family: sans
line-height: 1.7
color: foreground-secondary
max-width: 65ch (for readability)
```

**Chinese Names**:
```
font: serif
style: italic (optional, for elegance)
color: foreground-muted
```

---

## Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Micro spacing |
| `--space-2` | 8px | Tight spacing |
| `--space-3` | 12px | Compact spacing |
| `--space-4` | 16px | Standard spacing |
| `--space-6` | 24px | Medium spacing |
| `--space-8` | 32px | Large spacing |
| `--space-12` | 48px | Section internal |
| `--space-16` | 64px | Section padding |
| `--space-24` | 96px | Large sections |
| `--space-32` | 128px | Hero sections |

### Section Spacing

- **Standard section**: `py-24` (96px vertical)
- **Large section**: `py-32` (128px vertical)
- **Compact section**: `py-16` (64px vertical)

### Content Spacing

- **Between elements**: `gap-6` (24px)
- **Between cards**: `gap-8` (32px)
- **Text blocks**: `space-y-4` (16px)

---

## Layout System

### Container

| Token | Value | Usage |
|-------|-------|-------|
| `--container-sm` | 640px | Narrow content |
| `--container-md` | 768px | Reading width |
| `--container-lg` | 1024px | Standard content |
| `--container-xl` | 1280px | Wide content |
| `--container-2xl` | 1440px | Maximum width |

### Grid System

**12-column grid** for desktop
**4-column grid** for mobile

### Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1440px | Large screens |

### Responsive Patterns

**Mobile First**:
```css
/* Base: mobile */
.class {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .class {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .class {
    padding: 3rem;
  }
}
```

---

## Component Styles

### Buttons

**Primary**:
```
background: #1A1A1A
color: #FAFAF8
padding: 12px 24px
font: 14px, medium, tracking-wide
hover: background #4A4A48
transition: 300ms ease
```

**Secondary**:
```
background: transparent
border: 1px solid #1A1A1A
color: #1A1A1A
padding: 12px 24px
hover: background #1A1A1A, color #FAFAF8
```

**Accent**:
```
background: #B83A2F
color: #FAFAF8
padding: 12px 24px
hover: background #9A2F26
```

**Ghost**:
```
background: transparent
color: #1A1A1A
padding: 12px 24px
hover: background #F5F4F2
```

### Cards

**Standard Card**:
```
background: #FAFAF8
border: none
shadow: none
hover: shadow-lg (subtle)
transition: 300ms ease
```

**Featured Card**:
```
background: #F5F4F2
padding: 32px
```

### Forms

**Input**:
```
background: #FAFAF8
border: 1px solid #E5E4E2
padding: 12px 16px
font: 16px
focus: border #1A1A1A, outline none
```

**Select**:
```
/* Same as input */
appearance: none
background-image: chevron-down icon
```

### Badges

**Default**:
```
background: #F5F4F2
color: #4A4A48
padding: 4px 12px
font: 11px, uppercase, tracking-wide
```

**Accent**:
```
background: #B83A2F
color: #FAFAF8
```

**Outline**:
```
background: transparent
border: 1px solid #E5E4E2
color: #7A7A78
```

---

## Shadows & Effects

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | none | Flat design default |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.05)` | Cards hover |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.05)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.05)` | Hero images |

### Transitions

**Standard**:
```
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

**Smooth**:
```
transition: all 500ms cubic-bezier(0.16, 1, 0.3, 1)
```

**Fast**:
```
transition: all 150ms ease
```

---

## Image Treatment

### Aspect Ratios

| Ratio | Usage |
|-------|-------|
| 1:1 (square) | Works, seals, ceramics |
| 4:5 (portrait) | Artist portraits |
| 16:9 (landscape) | Stories, hero images |
| 3:2 (landscape) | Paintings, calligraphy |

### Placeholder Style

```css
background: linear-gradient(135deg, #E5E4E2, #D5D4D2);
/* Display Chinese character watermark */
```

### Hover Effects

```css
.image-container:hover .image {
  transform: scale(1.05);
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Animation Guidelines

### Principles

1. **Subtle**: Animations should not distract
2. **Purposeful**: Every animation serves UX
3. **Fast**: 150-500ms duration
4. **Smooth**: Ease-out curves

### Common Animations

**Fade In**:
```
opacity: 0 → 1
duration: 300ms
easing: ease-out
```

**Slide Up**:
```
transform: translateY(20px) → translateY(0)
opacity: 0 → 1
duration: 500ms
easing: cubic-bezier(0.16, 1, 0.3, 1)
```

**Scale Hover**:
```
transform: scale(1) → scale(1.05)
duration: 700ms
easing: cubic-bezier(0.16, 1, 0.3, 1)
```

### Scroll Behavior

```css
html {
  scroll-behavior: smooth;
}
```

---

## Accessibility

### Color Contrast

- All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- Interactive elements have visible focus states
- Don't rely on color alone for information

### Focus States

```css
:focus-visible {
  outline: 1px solid #1A1A1A;
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Usage Examples

### Hero Section

```tsx
<section className="bg-[#FAFAF8] py-32">
  <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
    <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
      Discover Contemporary Chinese Art
    </p>
    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1A1A1A] leading-[1.1]">
      Where Tradition<br />Meets Expression
    </h1>
  </div>
</section>
```

### Artist Card

```tsx
<div className="bg-[#FAFAF8] hover:shadow-lg transition-shadow duration-300">
  <div className="aspect-[4/5] bg-[#EFEDEA]" />
  <div className="p-6">
    <p className="text-xs uppercase tracking-[0.2em] text-[#7A7A78] mb-2">
      Seal Engraving
    </p>
    <h3 className="font-serif text-xl font-semibold text-[#1A1A1A]">
      Wang Mingde <span className="italic text-[#7A7A78]">王明德</span>
    </h3>
  </div>
</div>
```

---

## File Organization

```
styles/
├── globals.css          # Global styles, imports
├── tokens.css           # CSS variables
├── typography.css       # Font definitions
└── utilities.css        # Custom utilities
```

## Tailwind Config Extensions

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        foreground: '#1A1A1A',
        accent: '#B83A2F',
        // ... etc
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '1440px',
      },
    },
  },
}
```

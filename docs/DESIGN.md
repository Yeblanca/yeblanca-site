---
# Design Tokens - Yeblanca v2
# Y-3 × Yeezus × YSL applied to web development

metadata:
  name: Yeblanca Design System
  version: "2.0"
  description: Geometric cold minimalism. Luxury restraint. Dark-first design with pink as accent.
  lastUpdated: "2026-05-12"

# ============================================
# COLOR PALETTE
# ============================================

colors:
  # Dark Mode (Default)
  dark:
    background: "#0a0a0a"
    surface: "#111111"
    elevated: "#1a1a1a"
    foreground: "#f0f0f0"
    muted: "rgba(240, 240, 240, 0.45)"
    subtle: "rgba(240, 240, 240, 0.15)"
    border: "rgba(240, 240, 240, 0.08)"

  # Light Mode
  light:
    background: "#f5f5f5"
    surface: "#ffffff"
    elevated: "#ebebeb"
    foreground: "#0a0a0a"
    muted: "rgba(10, 10, 10, 0.45)"
    subtle: "rgba(10, 10, 10, 0.08)"
    border: "rgba(10, 10, 10, 0.08)"

  # Accent (Both modes - never changes)
  accent:
    primary: "#FF3E7F"
    muted: "rgba(255, 62, 127, 0.15)"
    border: "rgba(255, 62, 127, 0.30)"
    hover: "rgba(255, 62, 127, 0.20)"

# ============================================
# TYPOGRAPHY
# ============================================

typography:
  # Primary Font - Space Grotesk (Google Fonts)
  primary:
    family: "Space Grotesk"
    source: "next/font/google"
    weights:
      - weight: 300
        usage: "Body text"
        lineHeight: 1.7
        opacity: 0.75
      - weight: 500
        usage: "Headings"
        letterSpacing: "-0.02em"
      - weight: 700
        usage: "Display / Logo"
        letterSpacing: "-0.03em"
        uppercase: true

  # Monospace Font - Space Mono (Google Fonts)
  mono:
    family: "Space Mono"
    source: "next/font/google"
    weights:
      - weight: 400
        usage: "Labels, badges, indexes, code snippets"
        case: "uppercase"
        letterSpacing: "0.10em - 0.15em"
        opacity: "0.45 - 0.55"

  # Font Sizes
  sizes:
    - name: "xs"
      value: "0.75rem"
      usage: "Small labels, badges"
    - name: "sm"
      value: "0.875rem"
      usage: "Meta information"
    - name: "base"
      value: "1rem"
      usage: "Body text"
    - name: "lg"
      value: "1.125rem"
      usage: "Subheadings"
    - name: "xl"
      value: "1.25rem"
      usage: "Section titles"
    - name: "2xl"
      value: "1.5rem"
      usage: "Page titles"
    - name: "3xl"
      value: "1.875rem"
      usage: "Major headings"
    - name: "4xl"
      value: "2.25rem"
      usage: "Hero text (mobile max)"
    - name: "5xl"
      value: "3rem"
      usage: "Display text"

  # Line Heights
  lineHeights:
    tight: 1.1
    normal: 1.5
    relaxed: 1.7
    loose: 2.0

  # Letter Spacing
  letterSpacing:
    tight: "-0.03em"
    normal: "-0.02em"
    wide: "0.08em"
    wider: "0.10em"
    widest: "0.15em"

# ============================================
# BORDER RADIUS
# ============================================

borderRadius:
  - name: "none"
    value: "0"
    usage: "Edge cases only"
  - name: "sm"
    value: "2px"
    usage: "Buttons, cards, inputs, badges (DEFAULT - creates Y-3 feel)"
  - name: "md"
    value: "4px"
    usage: "Not used - avoid"
  - name: "lg"
    value: "8px"
    usage: "Not used - avoid"
  - name: "full"
    value: "9999px"
    usage: "Avatar circles ONLY"

# ============================================
# SPACING SYSTEM
# ============================================

spacing:
  - name: "0"
    value: "0"
  - name: "1"
    value: "0.25rem"  # 4px
  - name: "2"
    value: "0.5rem"   # 8px
  - name: "3"
    value: "0.75rem"  # 12px
  - name: "4"
    value: "1rem"     # 16px - DEFAULT between elements
  - name: "5"
    value: "1.25rem"  # 20px
  - name: "6"
    value: "1.5rem"   # 24px
  - name: "8"
    value: "2rem"     # 32px
  - name: "10"
    value: "2.5rem"   # 40px
  - name: "12"
    value: "3rem"     # 48px
  - name: "16"
    value: "4rem"     # 64px
  - name: "20"
    value: "5rem"     # 80px
  - name: "24"
    value: "6rem"     # 96px - Section padding mobile
  - name: "32"
    value: "8rem"     # 128px - Section padding desktop

  # Semantic spacing
  sectionPadding:
    mobile: "py-24"    # 6rem
    desktop: "md:py-32" # 8rem

  maxContentWidth:
    value: "max-w-5xl"  # 64rem - Luxury brands don't fill viewport

# ============================================
# BORDERS
# ============================================

borders:
  - name: "subtle"
    width: "0.5px"
    color: "rgba(240, 240, 240, 0.08)"
    usage: "Cards, inputs default"
  - name: "medium"
    width: "1px"
    color: "rgba(240, 240, 240, 0.15)"
    usage: "Dividers, separators"
  - name: "accent"
    width: "2px"
    color: "#FF3E7F"
    usage: "Featured cards (left border only)"

# ============================================
# SHADOWS
# ============================================

# NOTE: No shadows allowed - use borders instead
shadows:
  - name: "none"
    value: "none"
    note: "Zero tolerance for shadows - use borders instead"

# ============================================
# LAYERS / ELEVATION
# ============================================

elevation:
  - name: "base"
    level: 0
    bg: "surface"
    border: "subtle"
  - name: "elevated"
    level: 1
    bg: "elevated"
    border: "subtle"
    note: "Hover states only - no shadows"

# ============================================
# COMPONENT SPECIFICATIONS
# ============================================

components:
  # BUTTONS
  buttons:
    primary:
      background: "#FF3E7F"
      color: "white"
      textCase: "uppercase"
      letterSpacing: "0.08em"
      borderRadius: "2px"
      padding: "0.75rem 1.5rem"
      hover:
        background: "rgba(255, 62, 127, 0.85)"
    ghost:
      background: "transparent"
      border: "0.5px solid var(--color-border)"
      color: "foreground"
      borderRadius: "2px"
      hover:
        background: "elevated"
        borderColor: "foreground"
    danger:
      background: "transparent"
      border: "0.5px solid rgba(255, 62, 127, 0.3)"
      color: "#FF3E7F"
      borderRadius: "2px"

  # CARDS
  cards:
    default:
      background: "surface"
      border: "0.5px solid border"
      borderRadius: "2px"
      padding: "1.5rem"
    featured:
      background: "surface"
      border: "0.5px solid border"
      borderLeft: "2px solid #FF3E7F"
      borderRadius: "2px"
      padding: "1.5rem"

  # BADGES / TAGS
  badges:
    pink:
      background: "rgba(255, 62, 127, 0.15)"
      color: "#FF3E7F"
      border: "rgba(255, 62, 127, 0.30)"
      borderRadius: "2px"
      uppercase: true
      letterSpacing: "0.08em"
    neutral:
      background: "transparent"
      color: "muted"
      border: "border"
      borderRadius: "2px"
      uppercase: true
      letterSpacing: "0.08em"

  # INPUTS
  inputs:
    default:
      background: "transparent"
      border: "0.5px solid rgba(240, 240, 240, 0.2)"
      borderRadius: "2px"
      padding: "0.75rem 1rem"
      focus:
        borderColor: "#FF3E7F"
        outline: "none"
        boxShadow: "none"

  # NAVIGATION
  navigation:
    logo:
      font: "Space Grotesk 700"
      case: "uppercase"
      letterSpacing: "0.06em"
    links:
      font: "Space Mono"
      size: "11px"
      case: "uppercase"
      letterSpacing: "0.12em"
      opacity: 0.45
    active:
      opacity: 1
      color: "#FF3E7F"
    localeToggle:
      font: "Space Mono"
      size: "11px"
      case: "uppercase"
      letterSpacing: "0.12em"
      alignment: "right"

  # PROJECT CARDS
  projectCards:
    index:
      font: "Space Mono"
      color: "muted"
      format: "001, 002..."
    divider:
      width: "16px"
      height: "1px"
      color: "#FF3E7F"
    title:
      font: "Space Grotesk 500"
    meta:
      font: "Space Mono"
      case: "uppercase"
      color: "muted"
      separator: "·"

  # SECTION LABELS
  sectionLabels:
    divider:
      width: "24px"
      height: "1px"
      color: "#FF3E7F"
    text:
      font: "Space Mono"
      case: "uppercase"
      letterSpacing: "0.12em"
      color: "muted"
    position: "before heading"

# ============================================
# DARK MODE
# ============================================

darkMode:
  strategy: "class"
  default: "dark"
  trigger: "class=\"dark\" on <html>"
  toggle:
    location: "navbar"
    persistence: "localStorage"
    overrideSystemPreference: true
    note: "No system preference override - dark is brand default"

# ============================================
# ANIMATION / MOTION
# ============================================

motion:
  # NOTE: No animations on card hover that scale or lift
  transitions:
    - name: "border"
      duration: "200ms"
      timing: "ease"
      property: "border-color"
      hoverOnly: true
    - name: "opacity"
      duration: "150ms"
      timing: "ease"
      property: "opacity"

# ============================================
# WHAT NOT TO DO (Constraints)
# ============================================

constraints:
  prohibited:
    - name: "gradients"
      severity: "zero tolerance"
    - name: "box shadows"
      resolution: "use borders instead"
    - name: "rounded-full"
      exception: "avatar circles only"
    - name: "non-pink accent colors"
      resolution: "no blue info states, no green success - use opacity variants of fg"
    - name: "card hover animations"
      resolution: "scale or lift - use border-color transition to #FF3E7F only"
    - name: "hero background images"
      resolution: "full flat dark/light surface only"
    - name: "font sizes above 48px"
      scope: "mobile"

---

# Design Narrative

## Philosophy

**Y-3 × Yeezus × YSL applied to web development.**

This is not a typical "dark mode" website. This is architectural minimalism translated to UI — where every element earns its space, and silence is as important as signal.

The aesthetic draws from high-fashion runway sensibilities: geometric, cold, restrained. There's no warmth here — except the pink. Pink is a weapon, not a decoration. It's the single focal point that breaks the monotony without decorating.

## Design Intent

### Dark-First, Always

The default state is dark. This isn't a toggleable "preference" — it's the brand identity. Light mode exists as an alternative, but dark is the origin and the default. The `class="dark"` strategy on `<html>` ensures this persists. The toggle exists in the navbar, but it's an override, not a detection.

### The 2px Rule

Everything — buttons, cards, inputs, badges — uses `border-radius: 2px`. This single constraint creates the entire Y-3 aesthetic. It differentiates from the sea of rounded rectangles in modern UI. The only exception: `rounded-full` for avatar circles.

### Pink as Accent

`#FF3E7F` never changes between dark and light mode. It appears in:
- Primary buttons
- Active navigation links
- Featured card left borders
- Section label dividers
- Project card index dividers
- Hover states

Beyond pink, everything else is grayscale with opacity. No blue for info, no green for success — only opacity variants of the foreground color.

### Typography Hierarchy

**Space Grotesk** carries the weight of communication — headlines, titles, body. It ranges from weight 300 (body, with 0.75 opacity) to 700 (display, uppercase, tight letter-spacing).

**Space Mono** is for metadata — labels, badges, indexes, technical information. Always uppercase, always tracked out (0.10–0.15em), always muted (0.45–0.55 opacity). It provides the technical/industrial contrast to Grotesk's humanist geometry.

### Generous Empty Space

Luxury brands don't fill the viewport. Section padding of `py-24` (mobile) and `md:py-32` (desktop) creates breathing room. Content maxes at `max-w-5xl` — never 7xl. The empty space isn't empty; it's active negative space that frames content.

### Borders Over Shadows

Zero shadows. Zero gradients. Every layer of elevation is communicated through border manipulation:
- Base state: subtle 0.5px border
- Hover: elevated background
- Featured: 2px left border in pink

This creates a tactile, architectural feel rather than the floating card effect of shadow-based elevation.

### What This Feels Like

A quiet, expensive room. Dark walls, precise furniture, a single pink accent flower. Nothing moves dramatically. Interactions are subtle — a border color shifts, an opacity changes. No bouncing, no scaling, no lifting. Just refinement.

This isn't for everyone. It's for people who understand that restraint is a form of luxury.

## Implementation Notes

- shadcn/ui base theme modified from "zinc" dark
- `--radius` overridden to `0.125rem` (2px) in globals.css
- `--primary` set to `339 100% 61%` (HSL for #FF3E7F)
- Color tokens use rgba with decimal opacity for fine control
- Fonts loaded via `next/font/google` as Space_Grotesk and Space_Mono
- Dark mode toggle persists in localStorage with no system preference detection
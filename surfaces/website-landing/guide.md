# Perfil: Website / Landing

La superficie de **marketing público** de Singular. Marca **azul/cyan** (`brand-web`), dark-first, fondos de marca por pagina, secciones narrativas, cards glass, big-pill tabs y CTAs premium.

> Fuente actual: `singular-landing`, rama `codex/home-gargantua-scroll-camera`. Los primitivos son router-agnósticos y no portan `BookingProvider`, rutas, navbar/footer ni datos del sitio.

## Setup
```css
/* index.css del sitio */
@import "@singular/ds/tokens/theme-web.css";          /* core + brand cyan + utilities */
@import "@singular/ds/backgrounds/brand-background.css";
@import "@singular/ds/surfaces/website-landing/website.css";
```
```tsx
import {
  PageShell,
  HeroSection,
  Section,
  SectionHeading,
  Eyebrow,
  CtaButton,
  InteractiveHeroBackground,
  LandingTabs,
  MarketingCard,
  FinalCTA,
  Reveal,
  LogoMarquee,
} from "@singular/ds/surfaces/website-landing/primitives"
```

## Anatomía de una página
1. **Page shell** — `<PageShell>` como wrapper neutral; el host decide nav, footer, routing y booking.
2. **Hero** — `<HeroSection size="compact|standard|immersive" layout="center|split" backgroundVariant="interactive">` con palabra en `.text-gradient-brand`, CTAs como children y fondo de marca.
3. **Secciones** — `<Section pad="s|m|l|prefooter" alt>` con `<SectionHeading>` y grids de `<MarketingCard>`.
4. **Tabs / disclosure** — `<LandingTabs>` para contenido por capas; entrega roles, relaciones tab/panel y navegación con flechas/Home/End.
5. **Prefooter CTA** — `<FinalCTA>` o `<Section pad="prefooter" className="singular-cta-section">`.

## Reglas del perfil
- **Ritmo de sección**: `.section-pad-s/-m/-l/-prefooter` (no `py-16` sueltos).
- **Eyebrow**: `<Eyebrow>` (`.eyebrow.eyebrow--brand`) — el patrón de marca, no `text-[10px] uppercase` a mano (estaba 332× en el sitio).
- **Acentos tokenizados**: base azul/cyan; variaciones por pagina con `data-page-accent="home|solutions|custom-ai|success|assessment|editorial"`.
- **CTA**: `primary` (azul), `accent` (gradiente azul/cyan), `secondary` (glass outline). `CtaButton` soporta scroll-to-anchor (`#id`) y links. Los CTAs primarios usan `--button-*`, no `--primary`: siguen azul/cyan aunque el acento de página sea púrpura, verde u naranja.
- **Hero interactivo**: `backgroundVariant="interactive"` usa el nuevo `<InteractiveHeroBackground>` del home. Pinta el fondo estático de inmediato y monta la lente mouse-follow después del primer movimiento de puntero; con `prefers-reduced-motion` queda estático.
- **Motion**: `<Reveal>` para entradas on-scroll; fondos con estrellas estaticas por performance; no animar `background-position`.
- **Logo marquee**: `<LogoMarquee>` duplica el grupo solo visualmente (`aria-hidden` en la copia), acepta `ariaLabel`/`className` y debe recibir imágenes con dimensiones estables; para logos reales usar `loading="lazy"`, `decoding="async"` y `alt` vacío en duplicados.
- **Rojo/naranja**: usar solo como semantica o accent de auditoria (`data-page-accent="assessment"`), no como marca base.

## Anti-patterns (limpiar al migrar el sitio — Fase 7)
- ❌ `py-m-sm` / `section-padding` heredadas del sitio → usar `section-pad-*`.
- ❌ `FadeIn` redefinido por página → usar `<Reveal>`.
- ❌ hex de acento inline a mano → tokens / `--singular-*`.
- ❌ `bg-white/5 border-white/10` repetido → `.marketing-card`.
- ❌ portar `BookingProvider`, rutas, copy o datos del homepage al DS.
- ❌ usar `--gradient-primary` para el CTA principal: los acentos de página pueden cambiarlo a púrpura. Usar `CtaButton variant="primary|accent"` o `--button-gradient-primary`.

## Ejemplo portable
```tsx
<HeroSection
  eyebrow="Operating systems for growth"
  title={<>Turn complexity into <span className="text-gradient-brand">repeatable advantage.</span></>}
  subtitle="A reusable hero recipe with a performance-aware interactive background."
  size="immersive"
  backgroundVariant="interactive"
>
  <CtaButton cta={{ label: "Start a conversation", href: "#contact" }} />
</HeroSection>

<LandingTabs
  ariaLabel="How Singular works"
  tabs={[
    { id: "outcome", label: "Outcome", panel: <p>Lead with the operating result.</p> },
    { id: "system", label: "System", panel: <p>Use shared primitives and tokens.</p> },
  ]}
/>
```

## Preview
`demo.html` — landing de ejemplo armada 100% con el DS. `open surfaces/website-landing/demo.html`.

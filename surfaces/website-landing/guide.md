# Perfil: Website / Landing

La superficie de **marketing público** de Singular. Marca **azul/cyan** (`brand-web`), light-first, canvas continuo, secciones narrativas, cards, big-pill tabs y CTAs. Dark mode usa navy compartido con App.

> Actualizado desde `singular-landing` **main `ef592ba`**, verificado el 2026-10-12. Los primitivos son router-agnósticos y no portan `BookingProvider`, rutas, navbar/footer ni datos del sitio. Ver [provenance y decisiones](../../references/singular-landing-portable-patterns.md).

## UX writing

Empezar por [Singular foundations](../../docs/05-experience-foundations.md)
para conectar la narrativa con la situación real del buyer y entender por qué
la marca se expresa como lo hace.
Para positioning, narrative, proof y conversion, leer
[Marketing voice and tone](../../ux-voice/marketing.md)
y el [evidence appendix](../../docs/08-application-map.md#evidence-appendix).
Si la superficie comunica error, recovery, estado o una decisión operativa,
usar en cambio [Product voice and tone](../../ux-voice/product.md).

## Setup
No hay un paquete npm `@singular/ds` publicado. Las rutas siguientes asumen
un snapshot `singular/` junto al entry CSS/ejemplo. Requiere React, TypeScript,
lucide-react, framer-motion y Tailwind v4 escaneando los archivos copiados.
Ver [consumo y compatibilidad](../../references/consumption-and-compatibility.md).

```css
/* index.css del sitio */
@import "./singular/tokens/theme-web.css";
@import "./singular/backgrounds/brand-background.css";
@import "./singular/surfaces/website-landing/website.css";
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
} from "./singular/surfaces/website-landing/primitives"
```

## Anatomía de una página
1. **Page shell** — `<PageShell>` como wrapper neutral; el host decide nav, footer, routing y booking.
2. **Hero** — `<HeroSection size="compact|standard|immersive" layout="center|split" backgroundVariant="none">` para un canvas continuo. `.singular-hero--wide` alinea el copy al contenedor de 80rem; `secondaryEyebrow` agrega una segunda pill opcional. El título no espera un reveal para aparecer.
3. **Secciones** — `<Section pad="s|m|l|prefooter">` con `<SectionHeading>` y grids de `<MarketingCard>`. Fondo transparente por defecto; `.landing-section--atmosphere` opt-in. `alt` se conserva por compatibilidad, ya no pinta bandas opacas.
4. **Tabs / disclosure** — `<LandingTabs>` para contenido por capas; entrega roles, relaciones tab/panel y navegación con flechas/Home/End.
5. **Prefooter CTA** — `<FinalCTA>` o `<Section pad="prefooter" className="singular-cta-section">`.

## Reglas del perfil
- **Ritmo de sección**: `.section-pad-s/-m/-l/-prefooter` (no `py-16` sueltos).
- **Tema**: omitir `.dark` para light; agregarla a `<html>` para dark. Persistencia y detección del sistema quedan en el host. El demo empieza light salvo preferencia explícita guardada. Cuerpo Inter y display Poppins: el host debe cargar las fuentes o usar los fallbacks.
- **Headings**: `SectionHeading` acepta `maxWidth` y `subtitleClassName`. Evitar `100vw` para títulos, panels o tabs; el contenedor y sus columnas son `minmax(0, ...)`.
- **Eyebrow**: `<Eyebrow>` (`.eyebrow.eyebrow--brand`) — el patrón de marca, no `text-[10px] uppercase` a mano (estaba 332× en el sitio).
- **Acentos tokenizados**: base azul/cyan; variaciones por página agrupadas en `home`, solutions/AI, custom AI/agentic, success/editorial, assessment, journey y schedule. Ver `tokens/brand-web.css`.
- **CTA**: `primary` (azul), `accent` (gradiente azul/cyan), `secondary` (outline). `cta.shortLabel` es opcional para móvil; el nombre accesible conserva `cta.label`. Los anchors válidos actualizan el hash, trasladan foco y respetan reduced motion; clicks modificados conservan el comportamiento del navegador. Los primarios usan `--button-*`, no `--primary`: siguen azul/cyan aunque cambie el acento de página.
- **Fondo hero**: `none` para la receta quiet; `static` sigue siendo el default de API por compatibilidad. `animated`/`interactive` son opt-in. Interactive monta la lente tras el primer movimiento de puntero y queda estático con reduced motion. No apilarlo con otro backdrop global.
- **Motion**: `<Reveal direction="up|left|right" distance={32}>` para entradas on-scroll. Defaults: up/18px o lateral/56px. Reduced motion muestra el contenido inmediatamente, sin desplazamiento. No animar `background-position`.
- **Logo marquee**: acepta `ariaLabel`, `className`, `trackClassName`, `gap`, `speed`, `pauseLabel` y `resumeLabel`. El gap vive en el track y el loop compensa la separación entre grupos. La copia es `aria-hidden` + `inert`; pausa con botón, hover o foco; reduced motion muestra un solo grupo completo y estático. Proveer suficiente contenido para cubrir el ancho del rail. Imágenes con dimensiones estables, `loading="lazy"`, `decoding="async"` y alt descriptivo en el grupo original.
- **TestimonialCard**: avatar con dimensiones y alt vacío (el autor ya está anunciado). Usar quotes y datos aprobados, con fuente/contexto en el host; no fabricar ratings por defecto.
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
  eyebrow="Website surface"
  secondaryEyebrow="One shared language"
  title={<>Clear stories. <span className="text-gradient-brand">One Singular language.</span></>}
  subtitle="Explain the outcome, the system, and the next useful step."
  backgroundVariant="none"
  className="singular-hero--wide"
>
  <CtaButton variant="accent" cta={{ label: "Explore the patterns", shortLabel: "Explore", href: "#patterns" }} />
</HeroSection>
<Section id="patterns"><h2>Start with the reader’s situation.</h2></Section>

<LandingTabs
  ariaLabel="How Singular works"
  tabs={[
    { id: "outcome", label: "Outcome", panel: <p>Lead with the operating result.</p> },
    { id: "system", label: "System", panel: <p>Use shared primitives and tokens.</p> },
  ]}
/>
```

## Preview
[demo.html](./demo.html) — ilustración HTML con tokens y CSS reales; no monta React.
Incluye tabs con teclado, theme toggle, marquee pausable y copy de tres recetas
React. Si clipboard está bloqueado, deja el código seleccionable. Los datos
comerciales del sitio no forman parte del ejemplo. Probar las APIs en el host
antes de afirmar compatibilidad runtime.

Exportar desde un clon del repo (destino nuevo):
```bash
node scripts/export-snapshot.mjs --bundle=core,website-landing --target=../my-project/src/singular
```

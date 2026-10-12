# Patrones portables aprendidos de `singular-landing`

Fuente auditada: `SingularAgency/singular-landing`, rama `main`, commit
[`ef592bafecfbf260ef83c48d901f2e7a128d9b5b`](https://github.com/SingularAgency/singular-landing/commit/ef592bafecfbf260ef83c48d901f2e7a128d9b5b), verificado el 2026-10-12.
Este documento registra qué se promueve al DS y qué permanece en el sitio host.

## Actualización 2026-10-12

Trabajo del usuario: componer una landing legible y consistente desde el repo
o la skill, sin reconstruir los patrones ni heredar dependencias de negocio.
Riesgo: tabs descentradas en móvil, foco/contraste perdido y ejemplos de proof
confundidos con afirmaciones reales. Foundations: claridad, control, precisión
y transparencia; ver [mapa de aplicación](../docs/08-application-map.md).

| Evidencia revisada | Promoción al perfil |
|---|---|
| `src/components/marketing/MarketingPrimitives.tsx` | Hero con doble eyebrow; `shortLabel` con nombre accesible completo; headings configurables; reveals direccionales; spacing de marquee; avatar decorativo. |
| `src/styles/website-host.css` | Canvas continuo, light-first, ancho de hero alineado al contenedor, separación entre tabs y panel, sin bleed de `100vw` en tabs móviles. |
| `src/app/components/HomeHero.tsx` | Receta de composición amplia, jerarquía hero → proof → logos. Métricas, clientes, reconocimientos y quotes NO copiados. |

Adaptaciones deliberadas: el dark mantiene los neutrales navy comunes del DS,
los CTA usan blue/teal contrastado, y el marquee agrega pausa explícita,
duplicado `inert` y todos los elementos visibles con reduced motion. La nueva
opción `backgroundVariant="none"` evita apilar fondos; el default `static`
anterior sigue disponible. El demo es HTML ilustrativo, no runtime React.

La composición de navegación/footer del demo no es una nueva API compartida.
Este registro viaja en los snapshots core y en la skill descargable.

## Promovido al core

| Patrón | Por qué sirve en varias surfaces | API / clase |
|---|---|---|
| Proof y métricas | Resume resultados en una banda que funciona en una landing, una app, un deck o una pieza social. | `components/MetricStrip.tsx` |
| Comparación | Hace visible la diferencia entre dos opciones sin depender de copy ni de un producto. | `components/ComparisonTable.tsx` |
| Fuente / contexto | Identifica una fuente, dataset, cita o salida de IA sin inventar una tarjeta nueva. | `components/SourceTag.tsx` |
| Carga diferida | Evita montar charts, media y carruseles antes de tiempo; mantiene fallback sin JS especial. | `components/LazyVisible.tsx` |
| Atmósfera de sección | Permite continuidad visual sin pintar bandas opacas ni bloquear overflow de decoraciones. | `.section-atmosphere` |
| Texto y motion seguros | Gradientes legibles en forced-colors y hover/marquee apagables con reduced-motion. | `.text-gradient-safe`, `.motion-*` |

## Promovido al perfil website

- `PageShell`, `HeroSection`, `MarketingCard`, `TestimonialCard`, `FinalCTA` e `InlineLinkCTA`.
- `InteractiveHeroBackground`, activado después de interacción y con reduced-motion.
- Big-pill tabs con navegación de teclado, `aria-selected`, `aria-controls` y targets de al menos 44px.
- Logo marquee con duplicado visual, `loading="lazy"`, `decoding="async"` y fallback cuando una imagen falla.
- Ritmo de sección, superficies glass y CTA primaria azul/cyan mediante tokens.

## Se queda en `singular-landing`

- Navbar con rutas, dropdowns, autohide y booking.
- Footer, providers, datos de clientes, labels comerciales y enlaces internos.
- `ArchitectureStack` y otras visualizaciones ligadas a Company Brain o a una página concreta.
- Motion ornamental específico del home que no aporta significado fuera de su contexto.

## Reglas de implementación

1. Promover estructura y garantías, no el contenido ni los nombres de negocio.
2. Resolver color, superficie, radio y sombra con tokens del profile activo.
3. Toda animación debe tener fallback estático; no animar estrellas con `background-position`.
4. Mantener semántica HTML, foco visible, targets táctiles de 44px y contraste AA.
5. Diferir contenido costoso cuando no es necesario para el primer viewport.

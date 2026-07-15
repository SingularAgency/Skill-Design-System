# Patrones portables aprendidos de `singular-landing`

Fuente auditada: implementación actual del repo `singular-landing`.
Este documento registra qué se promueve al DS y qué permanece en el sitio host.

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

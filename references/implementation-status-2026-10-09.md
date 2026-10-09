# Primera entrega de implementación — 2026-10-09

Estado: candidate local `2026.10-candidate.1`, rama `codex/ds-stories-sync`.
No publicado ni desplegado. Los cambios están en el working tree; los artefactos
registran `sourceDirty: true` y hashes de contenido, no una release estable.
Stories no se modificó. No se movieron carpetas ni instalaciones personales de skills.

## Qué se implementó

- Type primitives/roles y consumo por utilities; overrides responsive del perfil app.
- Seis tonos de estado con cinco slots cada uno, aliases Tailwind y skeleton.
  Tokens anteriores y mapping default in-progress → info preservados.
- Aliases spacing s/m/l sin sobrescribir xs/xl nativos de Tailwind.
- Interacción/CTA/input/sidebar app ajustados por contraste. Dark primary brillante
  usa texto oscuro; CTA dedicado oscuro conserva texto blanco. No se copió cada
  hex de Stories sin medirlo.
- StatusBadge admite tone explícito; prioridad alta usa urgencia naranja;
  critical/urgent usan danger rojo. PillFilter expone grupo y aria-pressed.
  Padding superior de side-modal alineado con el contrato promovido de Stories.
- Registro compartido entre home/catalog: 25 entradas, 79 ejemplos, seis foundations,
  CompactFieldSelector y OverlayLaneHost. Componentes, recipes y foundations se
  distinguen; todos los previews se etiquetan como ilustraciones.
- Copy según ejemplo con imports reales, deps/setup explícitos y snippets completos;
  sin DataRow/AgentTraceRow ficticios, props inexistentes ni paquete npm publicado.
- Permalinks story/variant, restauración y Back/Forward; source local de la misma
  versión mostrada; fallback seleccionable si Clipboard falla y feedback accesible.
- Docs de setup, tema, ownership y portabilidad corregidas. Núcleo de skill conciso,
  completo y sin asumir misma instalación en todos los entornos.
- Skill construida por allowlist en una carpeta raíz; hashes, versión, dirty flag y
  licencia de terceros. Export de snapshots por staging a destinos nuevos, sin
  borrar integraciones. Build de ZIP no reemplaza archivos ajenos ni archivos fuente.
- Tests Node, validator y workflow CI inicial; reporte de coverage desde exports.

Las guías de Singular y de creación de skills orientaron la separación entre
contratos compartidos, lógica del host y formato/instalación por agente. Esa
separación no sustituye pruebas reales de consumo ni de comportamiento del modelo.

## Evidencia obtenida

| Verificación | Resultado y alcance |
|---|---|
| `npm test` | 21 pruebas locales pasan: catálogo, lógica con doubles DOM, tokens/contraste, todos los bundles y ZIP extraído/hash-verified |
| `npm run validate` | 87 archivos de bundles y 96 archivos allowlisted de skill; entrypoints/imports relativos/file-links/licencias resuelven (no anchors ni URLs dinámicas) |
| `quick_validate.py .` de skill-creator | Frontmatter de skill válido; no prueba discovery ni comportamiento |
| `node scripts/check-catalog-types.mjs --dependencies=... --peer-dependencies=...` | 44 ejemplos TSX verifican tipos contra fuentes reales; lee deps del checkout Stories sin escribirlo, con framer-motion 12.43.0 en temp |
| `npm run build:skill` | ZIP candidate en dist/, una raíz y recursos requeridos completos, sourceDirty visible; su exporter también funciona desde el ZIP extraído sin consultar el clone original |
| `git diff --check` | Sin errores de whitespace |
| Preview local HTTP | catalog.html responde 200 en 127.0.0.1:4789 |
| Browser visual/UI | No completado: CLI no accedió a npm dentro del sandbox; luego el navegador bloqueó la acción por política. No se intentó eludir el bloqueo |

Los tests DOM usan doubles para selección, query params, copy y fallback. No
son renders ni tests reales de teclado, layout, screen reader o Clipboard del
navegador. Type-check no significa que el componente se montó o se vio bien.

La métrica `npm run coverage:catalog` referencia 15 de 44 exports React con nombre
mayúsculo. No cubre todavía todos los exports, estados, tokens, recetas ni APIs
SwiftUI. 79 ejemplos no equivalen a 79 variantes de API implementadas.

## Próximas entregas y gates pendientes

1. Host React limpio con shadcn/deps declaradas, Tailwind scan y estilos; fixtures
   que importen la fuente y alimenten tanto render como copy. Completar coverage
   de exports publicados, incluidos navegación, side-modal y primitivas website.
2. Promoción opt-in del nuevo dock/shell responsive de Stories, sin reemplazar
   silenciosamente el layout anterior; desktop/tablet/mobile + side-modal abierto.
3. Website: token explorer por perfil/tema, docs legibles sin React, voz/marketing,
   templates/downloads versionados, source/provenance y cobertura completa.
4. Smoke real de navegador: búsqueda, URL/reload/Back/Forward, copy/fallback,
   light/dark, zoom/reflow, teclado, reduced motion, forced colors y contraste.
5. Instalar en scopes frescos y evaluar explícita/implícita/negativa la skill en
   clientes Claude y ChatGPT/Codex soportados. Registrar versiones, recursos
   cargados, outputs y fallos. No retirar las skills viejas hasta verificar migración.
6. Release coordinada site/skill/snapshots desde commit limpio, hashes, changelog
   y rollback. Después, reorganización de carpetas con aliases/compatibilidad.

No se crean PRs, merges, deployments, monitores ni cambios en otros productos
como efecto de este estado de avance.

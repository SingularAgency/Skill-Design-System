# Plan de evolución del Singular Design System

Status: in progress — initial foundation, catalog and distribution slice implemented locally

Scope: updated design-system contracts, consumption, skill portability, complete synchronized website, repository architecture and governance

Non-goal: move files before the compatibility contract and automated checks exist

## Objetivo y prioridades actualizados — 2026-10-09

El objetivo no es solamente ordenar carpetas. Es que cualquier persona pueda
usar el DS correctamente desde el repo, el website o una skill descargada:
developers, marketing, diseño, producto y agentes.

Una misma release debe entregar contratos coherentes de foundations,
componentes, patrones, superficies, voz y assets. El website y las skills son
consumidores de esa fuente; no sistemas paralelos escritos a mano.

Primero actualizar el contenido con las mejoras comprobadas de Stories.
Después asegurar consumo, cobertura y distribución. Reorganizar carpetas al
final, cuando las pruebas protejan rutas, imports y artefactos.

Baseline y decisiones de promoción:
[Auditoría Stories → DS del 9 de octubre](stories-ds-sync-audit-2026-10-09.md).
Se verificó Stories main 6c55bea1, con mejoras hasta el 8 de octubre. El checkout
local tiene otra rama y cambios propios: no se modifica durante esta revisión.

### Contrato de una fuente compartida

    Stories y otros productos → candidatos revisados → DS canónico versionado
                                                      ├─ repo / snapshots
                                                      ├─ skill / adaptadores
                                                      └─ website / copy / links / downloads

Cada contrato publicado tiene un ID estable, owner, categoría, estado,
superficies soportadas, fuente, dependencias, versión, documentación y ejemplos.
Una revisión del producto no sustituye automáticamente el contrato del DS.
El dominio, datos, permisos, routing y estado de negocio siguen en el host.

El registro debe distinguir:

- foundations de experiencia: usuarios, jobs, pain/risk, evidencia y principios;
- foundations visuales: marca, color, type, spacing, radius, elevation y motion;
- componentes realmente exportados y sus variantes/estados;
- patrones/recetas de composición, sin fingir que son componentes instalables;
- adaptaciones por plataforma y superficie;
- guías de voz, marketing/product y assets;
- candidatos, deprecated e históricos, fuera del inventario estable.

No convertir el registro en una segunda copia de tokens o de tipos. Referenciar
fuentes y extraer datos derivables del código; escribir sólo metadata editorial.

### Recorridos que deben funcionar

| Usuario | Recorrido | Criterio de aceptación |
|---|---|---|
| Developer | Elegir superficie → instalar/copy → implementar → verificar | El ejemplo compila y funciona en un host limpio con las dependencias y estilos declarados |
| Marketing | Elegir pieza → consultar marca/voz → copiar plantilla o descargar assets | Puede producir una pieza sin leer React ni clonar el repo; formatos y licencia son claros |
| Diseño/producto | Encontrar foundation/patrón → revisar estados/reglas → compartir | Permalink estable y ejemplos completos, con rationale y límites |
| Agente con repo | Entrar por SKILL.md → seleccionar recursos → aplicar → validar | Encuentra las rutas sin asumir un filesystem o runtime que no existe |
| Agente con descarga | Instalar paquete → invocar → leer recursos incluidos → generar | No necesita archivos del repo original para completar la tarea soportada |
| Persona sin skill | Abrir website → consultar/copiar/enlazar/descargar | Información pública usable sin login ni herramienta de IA |

### Compatibilidad de skills: especificar el entorno

No declarar compatible con todo ChatGPT/Claude por tener un SKILL.md.
La compatibilidad combina formato, instalación, discovery, recursos, ejecución
y resultado. La matriz de release debe registrar versión de cliente/modelo,
capacidades disponibles, fecha, escenario y evidencia.

| Entorno objetivo | Distribución propuesta | Verificación |
|---|---|---|
| Claude con custom skills / Cowork | ZIP con una carpeta raíz, SKILL.md y recursos | Upload, activación explícita/implícita y tareas desde paquete descargado |
| Claude Code | Carpeta instalable en el scope documentado | Discovery y referencias/scripts desde otro repo |
| ChatGPT desktop / Codex | Skill local con metadata OpenAI opcional | Instalación, discovery, tareas y recursos completos |
| ChatGPT web/mobile donde corresponda | Plugin o mecanismo de skills soportado en el workspace | Probar el mecanismo real; no asumir que un ZIP local se instala igual |
| Otros agentes | Núcleo Agent Skills y guía de adaptación | Pruebas por entorno declarado, no promesa universal |
| Chat sin mecanismo de skills habilitado | Docs/brief copiable, links y recursos descargables | Uso guiado; no etiquetarlo como skill instalada |

La documentación oficial distingue skills locales, skills de workspace y plugins;
no comparten instalación ni permisos. El formato común permite compartir
instrucciones, no garantiza idéntico comportamiento. Ver
[OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills),
[controles de skills](https://learn.chatgpt.com/docs/enterprise/skills) y
[Claude: custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills).

Mantener un núcleo común y adaptadores mínimos generados cuando el host los
necesite. No duplicar reglas de marca. Un plugin para distribución amplia es una
opción de empaquetado a decidir/probar, no una publicación autorizada por este plan.

Las carpetas references/scripts/assets son convenciones útiles, no una obligación
universal de todos los hosts. Mantener los entrypoints exigidos por cada formato
y resolver el resto con rutas correctas dentro del paquete.

### Website completo y fiel

1. Generar navegación, índices, categorías y conteos desde el registro.
2. Mostrar todos los contratos estables publicados, no todos los componentes
   privados de Stories. Medir cobertura contra ese inventario.
3. Incluir las dos clases de foundations, tokens por tema/superficie, componentes,
   patrones, layouts, voz, assets, setup y changelog.
4. Cada componente: cuándo usarlo/no usarlo, API, variantes, estados aplicables,
   ejemplo funcional, deps, source, versión y reglas de accesibilidad.
5. Cada token: nombre/rol, valor resuelto por tema, referencia/alias, usos,
   restricciones y Copy variable/value según la necesidad.
6. Copy code por variante desde el mismo fixture que se prueba/renderiza.
   Incluir imports, prerequisitos y fixture de datos; marcar pseudocódigo.
7. Copy link conserva item, variante y superficie; restauración al recargar,
   compartir y usar Back/Forward. Documentar cómo comparte el estado de tema.
8. Source enlaza al commit de la release mostrada; latest puede ser otro enlace.
9. Downloads: assets, templates y skill versionada; bundle de código por perfil.
   Cada acción describe formato, uso, versión y dependencias.
10. Copy debe ofrecer alternativa seleccionable ante Clipboard bloqueado y
    feedback accesible. No anunciar éxito si la acción falló.
11. Buscar por nombre, rol, alias, token, superficie y necesidad; empty states
    explican cómo recuperar resultados.
12. Verificar navegación por teclado, foco, headings, responsive, zoom/reflow,
    screen-reader smoke, contraste, forced colors y reduced motion.

No afirmar accesibilidad porque un ejemplo usa ARIA. Medir cada combinación real
de texto/fill/background, incluidos colores con alpha, estados y temas.

### Programa principal y entregables

Las fases de reorganización que aparecen más abajo son un workstream secundario.
Este orden principal reemplaza su secuencia como prioridad del programa.

| Fase | Entrega | Gate para avanzar |
|---|---|---|
| A — Baseline y protección | Inventario canónico, audit de Stories/DS, contratos y validadores iniciales | Inputs identificados por commit; brechas visibles; no mover archivos todavía |
| B — Actualizar DS | Tipografía, tonos/slots de estado, spacing, shell responsive, side modals y dock opt-in | Tests, compatibilidad, documentación y contraste; dominio aislado |
| C — Consumo real | Setup por perfil, deps, exports/recipes y snippets corregidos | Host React limpio funciona; imports y comandos reales, sin paquete publicado ficticio |
| D — Website sincronizado | Registro + foundations + catálogo completo + copy/links/downloads | Todos los items estables cubiertos; ejemplos coinciden con APIs y tokens |
| E — Skills verificadas | Paquetes mínimos completos, adaptadores, setup y suite de tareas | Discovery, recursos y resultados comprobados por host; límites publicados |
| F — Release coordinada | Site + skill + snapshots desde un mismo commit/release | CI, checksums/provenance y recorridos públicos; rollback probado |
| G — Reorganizar repo | Estructura acordada, aliases y migración incremental | Mismas pruebas pasan; bookmarks/bundles previos siguen compatibles |

Fase B incluye revisar valores, no copiar todo globals.css. Mantener aliases de
tokens/APIs anteriores y migración explícita ante cambios incompatibles.
No reemplazar el layout de overlays actual sin una variante o versión adecuada.

### Pruebas y garantías operativas

- Integridad: paths con case correcto, links/anchors, imports, CSS URLs, licencia,
  schema y closure de recursos internos de cada artefacto.
- Consumo: exportar todos los bundles y probar código/copias en fixtures limpios.
  Dependencias externas permitidas se declaran; no deben estar todas embebidas.
- Cobertura: cero contratos estables huérfanos de docs, story/ejemplo aplicable,
  fuente y modo de consumo. Estado no implementado siempre visible.
- Paridad: website, skill y snapshots reportan la misma release/commit de origen.
  Fixtures importan la fuente; mocks conceptuales están etiquetados.
- Agentes: mismos escenarios en Claude y ChatGPT/Codex; evaluar elección de
  superficie, lectura de recursos, uso correcto de tokens, APIs, voz y límites.
  Probar invocación explícita, implícita y casos que NO deben disparar.
- Escenarios mínimos: landing, dashboard con filtros, side modal, estados
  light/dark, email, slide/social, copy de marketing/producto y actividad agentic.
- Offline: la skill incluye la guía necesaria aunque no haya red; si no puede
  ejecutar un script, ofrece el recorrido documental y declara la limitación.
- Human use: buscar/copiar un componente, compartir variante, descargar logos,
  producir una pieza marketing y descargar/instalar skill sin conocer el repo.
- Release: crawl del website generado, browser smoke desktop/tablet/mobile,
  broken-link gate, a11y automático + revisión manual de recorridos críticos.

Los tests de empaquetado no prueban comportamiento del modelo. Los evals de agente
no prueban por sí solos UI accesible. Registrar ambos tipos de evidencia.
Compatibilidad se declara para entornos/escenarios comprobados, con fallos y
limitaciones visibles; no se promete éxito absoluto en cualquier agente futuro.

### Seguridad, versionado y mantenimiento

- Paquetear por allowlist desde una fuente limpia; excluir configuración local,
  .env, caches y archivos no destinados a distribución.
- Exportar a staging y proteger carpetas existentes; no borrar un target ajeno.
- Guardar inventario, hashes, release, sourceCommit, deps y licencias.
- Rebuild coordinado ante cambios de tokens/API/guías/registry; CI falla ante
  documentación generada desactualizada.
- Asignar responsables de core, superficies, docs/site y skill. Un cambio en
  Stories abre un candidato de promoción, no actualiza DS silenciosamente.
- Consolidar o retirar skills antiguas que contradicen la release nueva mediante
  instrucciones de migración; no borrar instalaciones personales automáticamente.
- No programar monitores, publicar plugins, instalar en otras cuentas ni hacer
  merges desde este plan sin la solicitud correspondiente.

### Primera entrega recomendada

Una PR pequeña de baseline/validación con inventario y regresiones reproducibles,
seguida de una PR de tokens/estados/tipografía y sus ejemplos. No empezar moviendo
carpetas, ni mezclar reorganización masiva con cambios visuales.

### Avance de implementación — 2026-10-09

La primera entrega local incorpora foundations visuales, corrige copy/API del
catálogo y protege distribución por allowlist. El detalle de cambios, pruebas
y límites está en [Implementation status](implementation-status-2026-10-09.md).

| Fase | Estado actual |
|---|---|
| A | Audit por commit + validación/CI inicial; inventario y cobertura todavía parciales |
| B | Type roles, tonos/slots, spacing, contraste y padding de side modal implementados; shell/dock responsive opt-in pendiente |
| C | Guías corregidas y 44 ejemplos TSX type-checked con deps existentes/temporales; falta host limpio con estilos y comportamiento real |
| D | Registro único, seis foundations, links/copy por ejemplo; 15 de 44 exports React referenciados, no cobertura completa ni previews fuente reales |
| E | ZIP autocontenido e integridad comprobados; discovery y tareas reales en Claude/ChatGPT/Codex pendientes |
| F | Candidate local con hashes/dirty flag; sin publicación, deployment ni release coordinada |
| G | Sin mover carpetas; sigue pendiente el acuerdo de estructura y migración |

Ninguna fase completa se declara aprobada sólo por los tests iniciales. La
revisión visual quedó bloqueada por el navegador de la sesión y sigue pendiente.

## Detalle técnico de reorganización

La propuesta siguiente conserva decisiones y tareas del plan inicial. Es
subordinada al contrato de consumo y a las fases A–G, y la estructura final sigue
pendiente de acuerdo. No define compatibilidad por sí sola.

### Outcome

Make the repository easy to scan for a person while keeping it deterministic for
Claude, Codex, ChatGPT and other agents. The source tree, distributed skill,
product snapshots and public website should be related, but they should no
longer be the same accidental directory layout.

The migration is successful when:

- `SKILL.md` remains a small, stable entrypoint at the repository and packaged
  skill root;
- every path routed from `SKILL.md` and `design-system.json` resolves;
- agents load only the context required for a task;
- existing public preview URLs continue working during migration;
- snapshots preserve their declared bundle contract;
- repository navigation is understandable without reading implementation code;
- a path change cannot merge while links, imports, bundles or previews are
  broken.

## Design principles

1. **Keep ecosystem entrypoints conventional.** Preserve the required
   `SKILL.md` layout and supported host metadata. Prefer `references/`,
   `scripts/` and `assets/` as familiar conventions, not universal requirements.
2. **Number navigation, not implementation APIs.** Use numbered subdirectories
   for ordered reading paths. Avoid numbers in import namespaces and public
   component names.
3. **Separate source, guidance and presentation.** Portable code, agent
   references and the showcase have different consumers and release needs.
4. **Generate compatibility artifacts.** Do not preserve old source locations
   forever just because public URLs or snapshots currently depend on them.
5. **Make the manifest authoritative.** Routes and bundles should be declared
   once and validated mechanically.
6. **Migrate incrementally.** Each phase must be independently mergeable and
   reversible.

## Target structure

```text
Skill-Design-System/
├── SKILL.md
├── README.md
├── design-system.json
├── build-skill.sh
│
├── agents/
│   └── openai.yaml
├── assets/
│   ├── logos/
│   └── symbols/
├── scripts/
│   ├── validate-repository.mjs
│   ├── export-snapshot.mjs
│   ├── build-showcase.mjs
│   └── audit-products.mjs
│
├── foundations/
│   ├── README.md
│   ├── brand/
│   ├── tokens/
│   └── backgrounds/
│
├── components/
│   ├── README.md
│   ├── primitives/
│   ├── data-display/
│   ├── feedback/
│   └── agent-activity/
│
├── surfaces/
│   ├── README.md
│   ├── 01-website/
│   ├── 02-web-app/
│   ├── 03-studio/
│   ├── 04-ios/
│   ├── 05-slides/
│   └── 06-social-email/
│
├── references/
│   ├── README.md
│   ├── 01-context/
│   ├── 02-experience-foundations/
│   ├── 03-writing/
│   ├── 04-architecture/
│   ├── 05-governance/
│   └── 06-audits/
│
├── showcase/
│   ├── README.md
│   ├── pages/
│   ├── runtime/
│   ├── stories/
│   ├── ui-kits/
│   └── screenshots/
│
└── dist/                  # generated, ignored locally
    ├── skill/
    ├── snapshots/
    └── site/
```

### Why this differs from a fully numbered root

The folders recognized by skill ecosystems remain conventional. Numbering is
used where sequence has meaning: surface selection and progressive disclosure.
This gives Finder-style scanability without forcing every agent or integration
to learn nonstandard locations such as `04-reference` or `06-scripts`.

## Current-to-target mapping

| Current | Target | Migration note |
|---|---|---|
| `brand/` | `foundations/brand/` | Merge brand guidance with foundation index |
| `tokens/` | `foundations/tokens/` | Preserve token filenames and CSS contracts |
| `backgrounds/` | `foundations/backgrounds/` | Preserve component and CSS exports |
| root `colors_and_type.css` | `foundations/tokens/colors-and-type.css` | Old public URL emitted by showcase build |
| root portable components | categorized `components/` folders | Add barrel/index only if consumers need it |
| `components/agent-activity-orb/` | `components/agent-activity/` | Keep third-party notice adjacent |
| surface folders | numbered `surfaces/` folders | Stable surface IDs stay unnumbered in manifest |
| `docs/` | `references/01-context/` and `02-experience-foundations/` | Split by routing purpose, not chronology alone |
| `ux-voice/` | `references/03-writing/` | Preserve marketing/product intent split |
| current `references/` | `04-architecture/`, `05-governance/`, `06-audits/` | Plans are archived or promoted separately |
| root HTML pages | `showcase/pages/` | Root/public files become generated output |
| `site/` | `showcase/runtime/` | Split CSS/JS by page or shared runtime |
| `preview/` | `showcase/stories/` | Normalize filenames and story metadata |
| `previews/` | `showcase/screenshots/` | Treat as visual regression/reference artifacts |
| `ui_kits/` | `showcase/ui-kits/` | Use kebab-case naming |

## Compatibility contract

### Skill discovery

- `SKILL.md` remains at the root of both the repository and generated skill.
- YAML frontmatter name and description remain stable.
- `agents/openai.yaml` remains at `agents/openai.yaml`.
- Every reference linked from `SKILL.md` uses a relative path contained in the
  packaged skill.
- Claude-specific packaging and OpenAI metadata are outputs of the same source,
  not separate forks of the guidance.

### Manifest

Evolve `design-system.json` to schema version 2 with explicit stable IDs:

```json
{
  "schemaVersion": 2,
  "routes": {
    "foundation": "foundations/README.md",
    "website": "surfaces/01-website/guide.md",
    "product": "surfaces/02-web-app/guide.md",
    "studio": "surfaces/03-studio/guide.md"
  },
  "bundles": {
    "core": ["foundation", "shared-components"],
    "studio": ["studio", "agent-activity"]
  },
  "publicAliases": {
    "/catalog.html": "showcase/pages/catalog.html"
  }
}
```

Bundle definitions should refer to stable entry IDs. A resolver translates IDs
to paths. This prevents another mass edit when folders are renamed later.

### Public URLs

Keep these routes stable for at least one release cycle:

- `/index.html`
- `/catalog.html`
- `/brand-voice.html`
- `/tokens/demo.html`
- `/backgrounds/demo.html`
- `/surfaces/*/demo.html`
- `/ui_kits/web-app/index.html`

`scripts/build-showcase.mjs` should copy or generate these paths into
`dist/site/`. Hosting deploys `dist/site/`, not the repository root. Source paths
can then change without breaking bookmarks or Vercel/GitHub Pages links.

### Snapshot consumers

- Continue accepting the existing bundle names during schema v2.
- Record both `sourceId` and resolved `sourcePath` in the snapshot manifest.
- Add a `layoutVersion` independent from the design-system release.
- Provide one compatibility release where old snapshot paths are emitted or a
  machine-readable migration map is included.

## Improvement program

### Phase 0 — Baseline and safety net

Deliverables:

- inventory all internal links, imports, public URLs and bundle entries;
- capture current site routes and representative screenshots;
- add `scripts/validate-repository.mjs`;
- add a clean-checkout validation command;
- document supported consumers: Claude skill, Codex skill, direct repository,
  exported snapshot and static showcase.

Automated checks:

- frontmatter and required entrypoints;
- local Markdown links;
- HTML `href`, `src` and module imports;
- CSS `url()` references;
- manifest entries and third-party notice paths;
- snapshot export for every bundle;
- duplicate or orphaned files;
- filename policy and case-sensitive path correctness.

Exit criterion: current layout passes before any move.

### Phase 1 — Root hygiene and navigation

Deliverables:

- remove `.DS_Store` only if tracked; the current file is ignored and untracked;
  keep local metadata out of release artifacts;
- add `foundations/README.md`, `surfaces/README.md`, `references/README.md` and
  `showcase/README.md` as concise maps;
- classify active documents, historical audits and implementation plans;
- define naming rules: lowercase kebab-case for paths, stable IDs in manifests;
- mark generated artifacts explicitly.

Exit criterion: a new contributor can locate foundations, components, a surface,
writing guidance and governance from the root README in two hops or fewer.

### Phase 2 — Manifest and router v2

Deliverables:

- introduce stable route IDs and `layoutVersion`;
- update `SKILL.md` to route through IDs documented in the manifest;
- update snapshot export to resolve IDs;
- add a manifest schema validator;
- preserve current bundle names and release semantics.

Exit criterion: changing a physical path requires updating one manifest mapping,
not many unrelated files.

### Phase 3 — Reference reorganization

Move guidance first because it has no runtime imports:

1. context and user/problem evidence;
2. experience foundations and decision framework;
3. marketing/product writing;
4. architecture and agent contract;
5. governance and adoption;
6. dated audits and historical plans.

Update `SKILL.md`, README files and manifest routes in the same commit. Do not
leave duplicate authoritative copies.

Exit criterion: packaged skill passes validation in both Claude-compatible and
OpenAI-compatible layouts.

### Phase 4 — Foundations and components

Deliverables:

- move tokens, brand and background code under `foundations/`;
- group components by function without renaming public exports;
- introduce explicit component entrypoints only where consumers benefit;
- retain license/notice adjacency for adapted code;
- replace raw relative imports with manifest/export helpers where practical.

Exit criterion: all bundle exports are byte-equivalent or have an approved
migration note.

### Phase 5 — Surface normalization

Deliverables:

- number surface folders for scan order;
- add a common surface contract: `guide.md`, optional `components`, `patterns`,
  `tokens` and `demo`;
- remove empty `.gitkeep` files once directories contain real content;
- standardize naming between website, web app, Studio, iOS, slides and
  social/email;
- keep surface IDs stable in the manifest.

Exit criterion: an agent can select a surface from one router and find its guide
and implementation without searching the whole repository.

### Phase 6 — Showcase extraction

Deliverables:

- move authored pages and runtime into `showcase/`;
- split the large `brand-voice-page.css` and JS by responsibility;
- replace hardcoded catalog counts with generated metadata;
- generate public aliases into `dist/site/`;
- make local preview serve the generated site;
- configure Vercel and GitHub Pages to deploy only `dist/site/`.

Exit criterion: every current public URL returns the same content from a clean
build and source folders are no longer constrained by hosting paths.

### Phase 7 — CI and release discipline

Recommended required checks:

1. repository validator;
2. skill validator;
3. JSON/schema validation;
4. JavaScript/TypeScript syntax or type checks;
5. build all snapshot bundles;
6. build the packaged skill;
7. build the showcase;
8. link crawl over generated HTML;
9. browser smoke tests at desktop and mobile widths;
10. `git diff --check` and generated-output cleanliness.

Add a release command that produces:

- the `.skill` archive;
- versioned snapshots;
- the static website;
- a compatibility report;
- checksums and the source commit.

Exit criterion: a release is reproducible from a clean checkout with one command.

### Phase 8 — Agent portability tests

Test realistic tasks rather than checking only wording:

- Claude: select the correct surface and load only required references;
- Codex/ChatGPT: discover through frontmatter and `agents/openai.yaml`;
- repository-only agent: follow `SKILL.md` without installed metadata;
- snapshot consumer: receive all files declared by a bundle;
- writing request: route to marketing or product voice correctly;
- agent-activity request: distinguish motion from semantic status.

Record which files each test loaded. Excessive context loading is a failure even
if the final answer is correct.

Exit criterion: route selection and required resources are consistent across
supported agents.

### Phase 9 — Governance and cleanup

Deliverables:

- assign owners to foundations, components, surfaces and guidance;
- define when a product pattern is promoted into the shared system;
- expire compatibility aliases after a documented window;
- archive superseded audits and plans with dates and status;
- add a quarterly orphan/link/drift review;
- remove obsolete legacy paths only after usage evidence confirms safety.

## Additional improvements discovered

### Documentation

- `SKILL.md` is currently effective but can become more concise after manifest
  routing exists.
- Root README mixes contributor guidance, showcase links and operational
  commands; split these into navigation, contribution and release references.
- Dated audits should expose status (`current`, `superseded`, `historical`).
- Plans should not look canonical after implementation; archive or annotate them.

### Code and assets

- The showcase runtime is large and page-coupled; modularize before adding more
  stories.
- Catalog story metadata should generate counts and filters rather than duplicate
  them in HTML.
- Keep originals and optimized derivatives distinct in `assets/`.
- Do not store downloadable ZIPs that can be reproduced unless releases require
  the exact binary.

### Local development

- replace the Python-only preview command with a repository script that builds
  and serves `dist/site/`;
- choose one documented port with automatic fallback;
- provide preview, validate and release commands without requiring global tools.

### Security and provenance

- validate that packaging excludes `.git`, local settings, `.env*`, temporary
  files and generated screenshots not intended for distribution;
- fail validation when a third-party component lacks version, commit, license,
  upstream URL or notice;
- emit an inventory of third-party material in releases.

## Migration sequencing

Use one PR per phase. Recommended order:

```text
validator → navigation indexes → manifest v2 → references → foundations and
components → surfaces → showcase build → CI/release → compatibility cleanup
```

Avoid a single PR that moves everything. Git can track renames, but reviewers,
agents and deployment checks cannot reliably distinguish structural changes from
behavior changes at that scale.

## Rollback strategy

- Tag the last pre-migration release.
- Keep each phase behavior-preserving and separately revertible.
- Generate public aliases instead of deleting routes during the transition.
- Store a path migration map in each release artifact.
- Do not advance `layoutVersion` until all consumers pass.
- If an agent portability test fails, revert the phase rather than adding a
  second authoritative copy of the moved content.

## Definition of done

The program is complete when:

- the target tree is in place;
- no authored duplicate is required for compatibility;
- all compatibility files are generated;
- all current public URLs and bundle names either work or have documented
  replacements;
- skill validation passes from the repository and packaged archive;
- every manifest route resolves;
- every bundle exports from a clean checkout;
- representative Claude, Codex/ChatGPT and repository-only agent tasks route
  correctly;
- CI blocks broken links, imports, manifests, snapshots and previews;
- the previous layout can be removed without relying on tribal knowledge.

## Recommended first implementation slice

Start with Phase 0 only:

1. add `scripts/validate-repository.mjs`;
2. capture a machine-readable inventory of routes and bundle paths;
3. make the existing repository pass that validator;
4. add the validator to CI;
5. only then open the first move PR for references.

This produces immediate value and makes every later reorganization safer.

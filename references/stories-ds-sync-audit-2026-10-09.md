# Auditoría de sincronización: Stories → Singular DS

Fecha: 2026-10-09

Estado: diagnóstico y candidatos de promoción; no implementados

Alcance: tokens, layouts, navegación, estados, documentación y distribución

No incluye una auditoría visual completa ni certificación de accesibilidad

## Resultado

Actualizar el DS antes de reorganizarlo. Stories evolucionó su lenguaje de
estados, tipografía, shell responsive y side modals. El DS central y el website
todavía muestran contratos anteriores o ejemplos que no coinciden con sus APIs.

Stories aporta evidencia de implementación, no convierte automáticamente toda
decisión de producto en una regla de marca. La promoción requiere un contrato
portable, documentación, pruebas y una decisión explícita de ownership.

## Baseline y procedencia

- Repo local inspeccionado: /Users/csrspinozzi/Projects/v0-singular-stories-app.
- Su origin actual apunta a SingularAgency/singular-stories-design, no al nombre
  registrado en design-system.json. Confirmar nombre canónico y conservar un
  alias antes de actualizar enlaces.
- Main remoto comprobado con GitHub: 6c55bea1abb127fef9924ab08f67467857b0f355,
  del 8 de octubre de 2026.
- La rama local design/release-con-johnny está en d90ef613 y tiene cambios sin
  commit. Su historia diverge de main: no usar HEAD local como sinónimo de
  última versión publicada.
- La gran actualización de septiembre está integrada en main por el commit
  3ad12b38, PR #143. También se revisaron las mejoras posteriores #144, #145 y
  #147. #148 y #149 son cambios de cálculo/posición de releases, no foundations.
- Baseline del DS inspeccionado: 5f2a66a, manifest release 2026.08.
- Se consultaron los blobs de origin/main de Stories, cuya referencia coincide
  con el SHA remoto verificado. No se cambió ni actualizó su checkout.

Fuentes:
[main verificado](https://github.com/SingularAgency/singular-stories-design/commit/6c55bea1abb127fef9924ab08f67467857b0f355),
[actualización DS/layouts #143](https://github.com/SingularAgency/singular-stories-design/pull/143),
[estados #144](https://github.com/SingularAgency/singular-stories-design/pull/144),
[branding/navegación #145](https://github.com/SingularAgency/singular-stories-design/pull/145),
[scroll de proyectos #147](https://github.com/SingularAgency/singular-stories-design/pull/147).

## Cambios de Stories y decisión propuesta

| Área | Evidencia en main | Tratamiento en el DS |
|---|---|---|
| Color semántico | Seis tonos: success, warning, urgent, danger, info, neutral; cinco slots por tono: bg, fg, border, solid, on-solid | Promover el contrato de tonos/slots; medir contraste antes de fijar valores; mantener aliases antiguos durante migración |
| Estado activo | Active, In Progress y completed comparten tratamiento success; QA/testing usan info | El tono es compartible; la relación entre un estado de Stories y ese tono pertenece al host |
| Tipografía | Escala primitiva y roles --type-*; narrativa de entidad distinta del nombre/título | Promover jerarquía y roles generales; evaluar cada rol para no imponer semántica Stories a marketing/iOS |
| Espaciado Tailwind | --spacing-s/m/l expone la escala como utilidades de margen, padding y separación | Añadir mappings comprobados; no registrar xs/xl de forma que cambien los tamaños de contenedor existentes |
| Chrome | Divider y frosted surface propios; tabs en header desde md; selector compacto en mobile | Promover shell por slots y contrato responsive; no importar contextos o router Next del host |
| Overflow de tabs | Pills sin wrap; EdgeFadeScroller con controles de scroll, nombres accesibles y reduced motion | Candidato a componente portable; probar teclado, foco visible y tab activo alcanzable |
| Dock inferior | Utilidades de cuenta/tema, feedback y agent en un dock; notificaciones encima; safe areas y reserva de contenido | Evolucionar el perfil web-app con variante nueva; no sustituir silenciosamente OverlayLaneHost |
| Branding | PoweredByBadge con wordmark y ubicación en rail de cliente | Evaluar patrón de atribución y assets oficiales; selección de marca/cliente se mantiene en el host |
| Side modals | Identidad alineada en dos columnas; bloque de estado separado; footer por slot; padding y scroll comunes | Promover anatomía genérica por slots; excluir lógica de entidades, Team, approvals y datos |
| KPIs | Tres KPIs principales a través de PageHeader; SecondaryStatGrid dentro de paneles | Layout reusable; settings-context, cómputos y obligación de tres KPIs en toda app no son core universal |
| Loading | Skeleton base/highlight, composiciones compartidas y shell persistente | Promover tokens y recetas; boundaries de Next y transición de datos permanecen en el host |
| Hit areas | Checkbox y sort headers con targets mayores y búsqueda Users etiquetada | Incorporar reglas y casos de prueba; no declarar todo el producto accesible por estas mejoras |
| Releases/PERT/Brain | Mejoras de timelines, checks y visualización de red | Mantener dominio local; evaluar sólo primitivas generales con un caso de reutilización real |

### Inventario de nombres de variables

Comparación estática entre app/globals.css de Stories main y todos los CSS bajo
tokens/ y surfaces/ del DS. Cuenta definiciones de nombres únicos, no equivalencia
de valores, cascada, uso real ni cumplimiento de contraste.

| Familia | Nombres en Stories | Ausentes por nombre en DS |
|---|---:|---:|
| --type-* | 49 | 49 |
| --status-* | 38 | 38 |
| --overlay-* | 10 | 9 |
| --skeleton-* | 2 | 2 |
| --sidebar-* | 11 | 4 |

Los 38 --status-* incluyen extensiones de dominio; no se propone promoverlos
todos. La escala genérica de seis tonos por cinco slots suma 30 tokens.
El DS ya tiene tokens de estado con nombres anteriores y un layout de overlays:
ausencia del nombre nuevo no significa ausencia total de esa capacidad.

## Brechas verificadas del DS y del website

### P0 — Copy no garantiza una implementación válida

site/component-explorer.js usa renders HTML independientes del código fuente.
Ejemplos concretos de discrepancia:

- StatusBadge se copia con tone y children; su API portable pide status y label.
- EmptyState se copia con message; la API usa description.
- SourceTag se copia con verified, prop que no existe.
- ComparisonTable se copia con highlightedColumn, prop que no existe.
- DataRow aparece como ejemplo, pero patterns.ts entrega clases, no ese export.

Acción: distinguir componente implementado, receta y demo conceptual. Compilar
los snippets de cada variante contra el bundle real y, para componentes React,
renderizar el mismo fixture que se copia. Las ilustraciones HTML no pueden
presentarse como prueba de funcionamiento del componente.

### P0 — Distribución incompleta o demasiado amplia

- SKILL.md exige docs/, ux-voice/ y el contrato para IA. El bundle core del
  manifest no incluye esas guías; export-snapshot no resuelve su cierre.
- build-skill.sh copia el repo por exclusiones; no excluye explícitamente
  configuración local del agente ni .env*. Esto es riesgo de empaquetado,
  no evidencia de que se haya publicado un secreto.
- El exportador borra el target antes de copiar y sólo protege / y la raíz del
  DS. Necesita staging y protección contra destinos ajenos, ancestros, symlinks
  y carpetas con contenido no generado.
- Los imports @singular/ds de las guías deben corresponder a una instalación
  probada. Este repo no declara un paquete publicado con ese nombre.

Acción: contratos distintos para skill completa y snapshot de código;
allowlist, dependencias explícitas, validación de rutas dentro de cada artefacto
y prueba desde un checkout/host limpio.

### P1 — Catalog coverage y navegación

- Hay 17 stories; cero stories con category foundation.
- CompactFieldSelector y OverlayLaneHost ya están en el código portable pero
  no figuran en esas 17 stories.
- Los totales 17/55 están escritos en catalog.html.
- El estado inicial siempre elige button/primary; selección/variante no se
  restaura desde un enlace directo.
- Copy command exporta siempre core + website-landing, sin atender el perfil
  seleccionado ni explicar que el comando debe ejecutarse dentro del repo.
- La caída de Clipboard sólo cambia el texto a Select and copy; falta un
  recorrido alternativo accesible, explícito y probado.

Acción: registro canónico, cobertura completa del inventario publicado,
permalinks y acciones específicas por componente/superficie.

### P1 — Instrucciones y fuente de verdad contradictorias

- Stories main usa defaultTheme light en app/layout.tsx; la skill instalada y
  la guía web-app del DS aún indican dark-first/defaultTheme dark.
- La skill instalada de marca habla de primary #4567ed y no enruta Studio/iOS;
  el repo ya separa identidad #4567ed de acción #0b84ff e incluye esas superficies.
- La skill antigua singular-design-app-v2 llama al globals.css del host fuente
  única. Los docs actuales de Stories asignan foundations al DS central.
- Algunos docs de Stories describen selector tablet y overlays antiguos aunque
  el runtime ya usa pills tablet y dock. Un frontmatter last_verified no basta.

Acción: DS central dueño de los contratos promovidos; Stories implementación de
referencia y dominio. Guiar temas por superficie, no por regla global. Generar
distribuciones de la misma release y retirar o redirigir skills contradictorias
con una migración explícita.

## Orden recomendado

1. Inventario y baseline reproducibles; tests para contratos actuales.
2. Promover tipografía, estados y spacing con compatibilidad y contraste medido.
3. Actualizar shell responsive, side-modal anatomy y dock como contrato opt-in.
4. Corregir APIs, snippets y dependencias de consumo.
5. Completar registro, foundations, stories y recorridos del website.
6. Validar skill instalada y descargada en cada entorno soportado.
7. Publicar una release coordinada; luego reorganizar carpetas.

## Límites de esta revisión

No se modificó Stories, no se copiaron componentes de dominio, no se publicó una
release y no se ejecutaron evaluaciones de Claude/ChatGPT ni pruebas visuales
completas. Los hallazgos son de inspección de código, historia, manifest y docs.
Los candidatos siguen pendientes de diseño, implementación y verificación.

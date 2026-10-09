# Consume the Singular DS

## Choose an artifact

- Repo: canonical source, docs, assets and development tooling.
- Code snapshot: core + selected surface, preserving source-relative paths.
  This is not an npm package or an installed agent skill.
- Agent skill ZIP: SKILL.md, instructions, supporting code/assets and scripts
  inside one singular-design-system folder. It does not need the original clone.
- Website: browsing, source links, copy examples and asset downloads.

Candidate 2026.10 is not a published release. Read skill-release.json or
.singular-ds-snapshot.json for version, dirty-source flag and file hashes.

## Developers: actual setup

From a cloned repo, export to a NEW destination:

    node scripts/export-snapshot.mjs --bundle=core,web-app --target=./dist/my-app-snapshot

The exporter refuses existing destinations and source directories. Review and
merge a new snapshot into your host; it never deletes your existing integration.

There is no published @singular/ds package in this repository. Copy the snapshot
under your host's design-system/singular directory and use its real relative
paths. An example CSS entry under host/src:

    @import "../design-system/singular/tokens/theme-app.css";
    @import "../design-system/singular/surfaces/web-app/web-app.css";

Adjust paths to your chosen directory. Tailwind v4 must scan the copied TSX/TS
sources so semantic classes are emitted; use an explicit @source when needed.
For a no-build HTML preview, load core.css, brand-app.css, core-utilities.css and
web-app.css in that order. Use .dark for dark surfaces.

React components require React, TypeScript and lucide-react. Web-app components
also use your shadcn Badge, Button, Sheet and cn helper through the host @/ alias.
These primitives are dependencies, not files this DS claims to export.
Routing is injected via linkComponent/pathname. Keep providers, business data,
permission checks and state transitions in the host.

Website primitives use React, lucide-react and framer-motion; see the surface
guide for setup. The catalog's TSX assumes a snapshot at ./singular beside the
example file and the correct profile CSS already loaded. Native previews are
illustrations, not proof of an Xcode build.
SwiftUI consumers use the iOS foundation, not React or web typography.
Email consumers use resolved colors and inline styles, never CSS variables in
the final message.

## Marketing, design and product

Start with [the context](../docs/README.md), then
[foundations](../docs/05-experience-foundations.md). Choose the
[Marketing](../ux-voice/marketing.md) or [Product](../ux-voice/product.md) manual
by intent, not channel. Assets in assets/logos are official source files;
preserve their geometry and use the light/dark background variant as intended.
Social, slides and email have surface-specific guides and demos.
Illustrated catalog previews are not proof that a React or native component ran.

## Skills: install the same source, adapt discovery

From the source checkout, build with npm run build:skill (Node 22+, zip and unzip
required). The default output is
dist/singular-design-system-<release>.zip. build-skill.sh accepts an explicit
.zip or legacy .skill destination. The archive is built from an allowlist,
excluding local settings, .git, .env, caches and the website runtime.
The downloaded skill can run its included build-skill.sh or snapshot exporter
with those tools; repository npm test/validate commands belong to the source
checkout and are not included as a standalone test suite in the skill.

Claude custom-skill upload uses a ZIP containing the skill folder. Claude Code
uses a filesystem skill folder in its supported skill scope. For ChatGPT desktop
and Codex use the supported local skill mechanism; agents/openai.yaml provides
optional metadata. For web/mobile/team distribution use a supported workspace
skill or plugin mechanism, not an assumed local ZIP installation.

Sources: [Claude custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills),
[OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills),
[separate distribution controls](https://learn.chatgpt.com/docs/enterprise/skills).

Install in a fresh test scope before replacing any existing personal skill.
Do not keep the old app-v2 instructions active alongside this skill when they
contradict identity/action colors or the host's theme. Installation/discovery
is separate from granting access to external tools.

## Verification status and limitations

Repository tests cover resource inclusion, paths, CSS imports, token slots,
representative contrast pairs and non-destructive export behavior. They are not
cross-model behavioral evaluations or a complete accessibility certification.
Catalog unit tests cover state and copy with DOM doubles; the optional
scripts/check-catalog-types.mjs checks snippets against source APIs using an
existing host's installed dependencies (and optional --peer-dependencies).
Neither substitutes for a clean-host runtime/browser test. Use
npm run coverage:catalog from the source checkout to list exports without copy
examples; coverage is currently partial.

Before a stable release, record Claude and ChatGPT/Codex client/model versions
and test explicit/implicit discovery plus landing, product filters, light/dark
states, email, slides/social, voice routing and agent activity tasks.
Also test prompts that should not invoke the skill. Keep outputs, loaded-resource
traces and limitations. A host without script execution can still use the
included guidance and code; it must disclose that it did not run validation.

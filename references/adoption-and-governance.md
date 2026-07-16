# Adoption and governance

## Consume the system

Choose one strategy per product:

1. **Vendored snapshot** — recommended until a package registry exists. Export
   an allowlisted bundle and commit it in the host repository.
2. **Git submodule/subtree** — acceptable for teams comfortable with Git
   lifecycle overhead.
3. **Package** — future target for web tokens/components after APIs stabilize.
4. **Skill bundle** — use `build-skill.sh` for Claude/Codex-compatible context.

Do not copy individual token files by hand. A partial copy loses contracts and
creates silent drift.

### Export a snapshot

```bash
node scripts/export-snapshot.mjs \
  --bundle=core,web-app,studio,governance \
  --target=/path/to/product/design-system/singular
```

The exporter reads `design-system.json`, copies only the requested allowlist and
writes `.singular-ds-snapshot.json` with the release and source commit.

## Product ownership

| Area | Canonical source | DS responsibility |
|---|---|---|
| Marketing composition | singular-landing | Promote stable primitives and token roles |
| Product chrome/data UI | v0-singular-stories-app | Promote portable components and interaction rules |
| Native mobile | ss-ios-prototype | Maintain platform mapping and native primitives |
| AI editing Studio | singularity-2026 | Maintain chat/canvas/evidence surface contract |
| Brand foundations | Skill-Design-System | Resolve conflicts and publish shared contracts |

Product repositories are discovery sources, not automatic authorities over the
foundation. A local experiment becomes canonical only after review here.

## Change process

For every DS change:

1. State the affected layer and surface.
2. Link the product evidence that motivated it.
3. Record whether the change is additive, breaking or a drift reconciliation.
4. Update `design-system.json` when files, bundles or ownership change.
5. Run the validation commands in `README.md`.
6. Export into a temporary directory and inspect the snapshot.
7. Update host snapshots in separate product PRs.

## Versioning

Use calendar releases while the system is repository-distributed:

- `YYYY.MM` for compatible monthly releases.
- `YYYY.MM.patch` for corrections.
- Add a migration note for renamed or removed tokens/components.

The snapshot manifest is the compatibility boundary. Host repos should record
the DS release and source commit instead of saying only “copied from DS”.

## Drift review

Run quarterly and before major redesigns:

```bash
node scripts/audit-products.mjs \
  --workspace=/path/containing/the/four/repos
```

Review:

- hardcoded color/radius growth;
- duplicated primitives;
- inaccessible state or motion behavior;
- snapshot release mismatch;
- new product patterns that appear in two or more surfaces.

Do not chase zero hardcoded values blindly. Email markup, generated assets,
chart datasets and native platform bridges may require literals. Exemptions
must be narrow and documented.

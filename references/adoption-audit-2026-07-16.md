# Adoption audit — 2026-07-16

This follow-up reviewed the four active product implementations after the
`2026.07` Design System rollout. It distinguishes code quality from delivery
state: a green local build does not mean an uncommitted migration is shipped.

| Product | Delivery state | Validation | Result |
|---|---|---|---|
| `singular-landing` | Vendored snapshot and host adapter exist in an uncommitted `design/ui-update` worktree | `npm run check`, `npm run build` | Pass |
| `v0-singular-stories-app` | Merged to `main` | `pnpm check:design-system:strict`, `pnpm exec next build` | Pass, 0 DS violations |
| `ss-ios-prototype` | Merged to `main` | strict simulator build via `make agent-verify` | Build pass; test action unavailable in the scheme |
| `singularity-2026` | Vendored snapshot and Studio migration exist as uncommitted changes on `design/ui-update` | `npm run lint`, `npm run build`, `git diff --check` | Pass |

## Shared changes promoted back

### Studio composition is opt-in

The first Studio host already owned a responsive shell. The original
`.studio-shell` and `.studio-workspace` selectors imposed grid composition and
forced the host to undo the system with overrides and `!important`.

The central profile now separates semantic chrome from reference layout:

- semantic classes remain stable;
- `.studio-shell-layout` opts into the two-column composition;
- `.studio-workspace-layout` opts into the preview/evidence/decision stack.

This keeps the profile useful for new products without treating one host shell
as universal.

### Native semantic roles stay generic

The iOS implementation validated secondary backgrounds, muted text, Dynamic
Type typography roles and soft semantic fills. Those foundations are portable.
Approval phases and Stories workflow names are not. The central API exposes
`SingularSemanticTone`; each host maps domain enums to it locally.

### Comparison tables use valid CSS

The landing migration found a central `min-width: thirtyrem` typo and required a
host override. The source is corrected to `30rem`; refreshed snapshots should
remove that exception.

## Product-local follow-up

- Commit and review the landing and Singularity worktrees before calling those
  migrations delivered.
- Refresh both vendored snapshots from release `2026.07.1`.
- Remove the landing `ComparisonTable` typo override after refreshing.
- In Singularity, consume the semantic Studio classes without the host
  `display: block` reset and reduce layout `!important` usage where the opt-in
  classes make it unnecessary.
- Add a test action or a documented build-only verification command to the iOS
  scheme. The app compiles under Swift 6 strict concurrency with warnings as
  errors, but `make agent-verify` cannot complete while tests are not configured.

## Completion gate

A product is considered adopted when:

1. its snapshot metadata identifies a clean central commit and release;
2. host/domain exceptions are documented;
3. type/lint/build gates pass;
4. representative desktop/mobile or native flows are visually checked;
5. the migration is committed and reviewed, not only present in a worktree.

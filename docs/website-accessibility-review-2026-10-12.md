# Website accessibility review — October 12, 2026

Status: targeted review of the local candidate website, not a WCAG certification.

## Scope and method

Reviewed Overview, Catalog and Brand & Voice, plus representative token and Web
App demo flows. Used computed browser colors and layout, keyboard interaction,
responsive checks at a 375px viewport (341 CSS pixels with the existing browser
zoom), and repository regression tests. Tested selected light/dark combinations;
did not exhaustively inspect all 79 catalog examples.

## Corrections and observed results

- Replaced low-contrast command-strip text and Copy command colors. The dark
  command text pair measures 11.32:1; white Copy command text on `#0067d6`
  measures 5.37:1. Clipboard denial exposes selectable text without claiming
  success. Feedback uses a status region.
- Dark Web and App profiles share navy neutral roles. Foreground, muted text,
  semantic badge text and CTA gradient endpoint checks meet 4.5:1 for the
  representative pairs covered by tests. Removed the white CTA gloss that could
  lighten the text background. The light home heading gradient uses readable
  blue/teal endpoints rather than bright cyan.
- Catalog filter and story selections preserve focus after rendering. Verified
  Foundations and Typography selections in the browser. Documentation tabs
  support arrow keys and Home/End; copy errors have a manual fallback.
- The surface carousel has pause and previous/next controls. It pauses for focus,
  pointer interaction, hidden/offscreen state and reduced-motion preference.
  Duplicate cards are hidden from assistive technology and removed from tab order.
  Verified the six-card sequence wraps during repeated navigation.
- At the checked narrow viewport, Overview, Catalog and Web App do not overflow
  the page horizontally. Navigation, carousel and the data table retain their
  own horizontal scroll regions. Catalog filters use a native disclosure.
- Brand & Voice opens directly in its chapter reader. The mobile Chapters drawer
  closes with Escape and returns focus to its trigger. Its sticky control clears
  the full floating header; measured header bottom 167px and Chapters top 184px.
- Web App details open only on demand in a labelled native dialog. Closing after
  a local status edit returns focus to the updated story trigger.
- Navigation and primary website controls have visible focus treatment. Main
  pages retain skip links and landmarks. The website defaults to light while
  respecting an explicitly saved dark preference.
- The Website/Landing demo now uses the reviewed `singular-landing` main
  reference `ef592ba`. Checked its light/dark toggle, recipe copy and focus
  return, tab selection by arrow key, narrow layout without page overflow,
  mobile menu opening and Escape closure, and explicit marquee pause.
  Regression tests additionally cover Home/End, blocked clipboard/storage,
  reduced-motion and forced-colors CSS contracts. The last two are structural
  checks, not simulated browser preference or assistive-technology verification.

44px controls are a Design System usability goal here, not a claim that every
44px target requirement belongs to WCAG 2.1 AA.

## Remaining verification

Before making a full conformance claim, run an automated accessibility scan,
VoiceOver/NVDA reading and keyboard passes, 200%/400% zoom and text-spacing checks,
forced-colors rendering, and a complete component/state inventory. Interactive
illustrations are not proof that consuming React/Swift applications conform.
Claude/ChatGPT runtime installation and downstream product testing remain separate
from repository import/link validation and skill ZIP packaging.

## Standards used

- [WCAG 2.1 contrast minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 2.1 pause, stop, hide](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html)

The release remains `2026.10-candidate.1`. This report records checks and limits;
it does not promote the candidate to a verified stable release.

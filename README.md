# GLASS VIBE — launch site

Static, one-page launch site for **GLASS VIBE**. It has no framework or build
step and is ready to serve from GitHub Pages.

## Structure

- `index.html` — semantic page structure and first-release copy
- `styles.css` — color tokens, editorial layouts, motion, and responsive rules
- `script.js` — configuration rendering, conditional links, menu, FAQ, reveals
- `data/events.js` — the single source of truth for event and external-link data
- `assets/icons/favicon.svg` — temporary small-format favicon
- `assets/images/` — documented image and OGP replacement locations
- `assets/logo/` — documented official logo replacement location

## Updating the event

Edit only `window.GLASS_VIBE_CONFIG` in `data/events.js`. Unknown values must
remain empty strings. Empty fields and links are never rendered.

To open reservations:

1. Change `currentEvent.status` to `"RESERVATIONS OPEN"`.
2. Add confirmed `date`, `time`, `venue`, `price`, `capacity`, or
   `remainingSeats` values as appropriate.
3. Set `currentEvent.reservationUrl` to the real booking URL.

The event section and mobile bar then automatically show **RESERVE YOUR GLASS**
and **RESERVE**. To enable follow CTAs, set the top-level `instagramUrl` (or an
event-specific `currentEvent.instagramUrl`). Set `shoYamazakiUrl` and
`tsukiAkariUrl` in the same file when their destination pages are confirmed.

## Brand assets

The primary `Glass Vibe` wordmark is intentionally a replaceable text lockup. Follow
`assets/logo/README.md` to switch it to approved SVG/PNG artwork. Photo slots
use abstract, code-rendered Tokyo-night visuals until genuine commissioned event
photography exists; follow `assets/images/README.md` for filenames, dimensions,
and `<picture>` integration. Set `ogImage` only after the final 1200 × 630 image
has a publicly accessible URL. Set `canonicalUrl` only after the official domain
is known.

## Publish with GitHub Pages

In the GitHub repository, open **Settings → Pages**, choose **Deploy from a
branch**, select the publishing branch and `/ (root)`, then save. Because all
paths are relative, the site also works when deployed beneath a repository path.

## Local preview

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173/`.

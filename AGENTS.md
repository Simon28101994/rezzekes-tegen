# Rezzekes Tegen – agent notes

Single-page static site for a futsal team's season stats. No build step, no
dependencies — just `index.html` (structure + all CSS inline), `app.js`
(render logic), and `data.js` (the data to edit).

## Editing data

`data.js` is the only file that normally needs changing week to week:

- `PLAYERS` – roster.
- `MATCHES` – our own played games, each with a full per-player line
  (present, goals, cards). Drives the match history tab and all player stats.
- `UPCOMING_GAMES` – our future fixtures. Move an entry out of here and into
  `MATCHES` once it's been played.
- `LEADERBOARD` – the official league standings table, copied verbatim from
  the club's published "Klassement" image after each round. Don't compute
  this locally — always source it from the latest screenshot/table given.
- `LEAGUE_MATCHES` – every match in the competition (not just ours), grouped
  by `week`, plus a `{ week, bye: 'TEAM' }` entry for the team sitting out
  that week. Sourced from the league's own weekly results list.

Everything else (`app.js`, the HTML structure) rarely needs touching for a
routine data update.

## Testing changes

`file://` previews don't execute JS (static snapshot only). To verify a
change actually renders, serve the folder and load it over HTTP, e.g.:

```
python3 -m http.server 8123
```

then open `http://localhost:8123/index.html` in a real browser tab.

## Sponsors

`sponsors/` holds sponsor logos (PNG/SVG only, kept small — ~400px max
dimension is plenty for the footer). They're loaded at runtime via the
GitHub API (`app.js` → `loadSponsors()`), so a new file just needs to be
added to the folder and pushed — no index to update.

## Git

Origin is `git@github.com:Simon28101994/rezzekes-tegen.git` (SSH). Commits
go straight to `main` — no PR workflow in use here.

## Language

Site UI text is Dutch.

# AGENTS.md

Guidance for AI coding agents. Human developers: see [README.md](./README.md).

## Overview

A fully static personal navigation page built with [Astro](https://astro.build). **Zero runtime frameworks, a single page** — all site content is driven by one JSON file, `src/data/links.json`. No tests, no lint; verification is build + output inspection.

- Package manager: **pnpm only** (do not use npm / yarn; the repo ships `pnpm-lock.yaml`)
- Node `>= 22.12.0`

## Commands

| Command | Description |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `http://127.0.0.1:4321` (IPv4 only) |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview the build output |

## Structure

```
src/
├── data/
│   ├── links.json   # Single source of truth: all categories & links (content edits go here only)
│   └── nav.ts       # Data export: reads links.json with `satisfies NavConfig`
├── pages/
│   └── index.astro  # The only page: template + inline <style> + inline <script>
└── types.ts         # Types for links.json (NavConfig / NavCategory / NavLink)
```

`dist/` and `.astro/` are generated — never edit them by hand.

## Key Conventions

### Data (links.json)

- Category and link order in the file is the display order on the page
- A link only requires `name` + `url`; `description` and `icon` are optional
- Structural changes must be reflected in `src/types.ts` and the README

### Icons (three-tier fallback chain)

Card avatars are resolved in this priority order by `avatarImgSrc()` in `index.astro`:

1. `icon` is an emoji → render it directly
2. `icon` is an image URL → render the image
3. `icon` omitted → auto-request `{origin}/favicon.ico` (derived at build time by `faviconFor()`)

Any image load failure (`onerror`) removes the `<img>` and reveals the colored first-letter avatar underneath — broken images are impossible. **Do not introduce third-party favicon services** (Google s2, DuckDuckGo, etc. — unreachable in mainland China and a privacy leak). A few sites serve their favicon at a non-root path (Figma, Astro, TinyPNG, Bangumi, Can I use) and have explicit `icon` entries in the JSON. After adding a link, probe with `curl -s -o /dev/null -w '%{http_code}' https://<domain>/favicon.ico`; if it is not 200, find the real path in the site's HTML `<link rel="icon">`.

### Project language

- **Everything in this repo is English only**: visible page text (`lang="en"` — title, description, category names, search placeholder, empty state, footer), README, and all source comments
- Verify with a CJK scan over `dist/index.html` (see below)

### Styles & scripts

- Styles are inline in `index.astro`; theming uses CSS variables; dark mode follows `prefers-color-scheme` (no manual toggle)
- Search is pure client-side filtering over the `data-keywords` attribute (name + description + category, lowercased); shortcuts: `Ctrl/⌘+K` or `/` to focus, `Esc` to clear

## Verification After Changes

Every change must keep `pnpm build` green; add checks depending on what changed:

```bash
# JSON validity + counts
node -e "const c=JSON.parse(require('fs').readFileSync('src/data/links.json','utf8'));console.log(c.categories.map(x=>x.name+':'+x.links.length).join(', '))"

# Icon count must equal total link count
grep -o 'class="avatar-img"' dist/index.html | wc -l

# CJK scan after copy changes (must be 0)
grep -oP '[\x{4e00}-\x{9fff}]' dist/index.html | wc -l
```

Note: `dist/index.html` is minified to a single line — always count with `grep -o ... | wc -l` (`grep -c` counts lines and always returns 1).

## Do Nots

- Do not add runtime frameworks or any new dependencies (React / Vue / icon libraries, etc.)
- Do not hand-edit `dist/` or `.astro/`
- Do not break the data flow: `links.json → nav.ts → index.astro` is one-directional

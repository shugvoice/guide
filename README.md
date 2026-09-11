# shug-guide

A personal navigation page built with [Astro](https://astro.build). Fully static with zero runtime frameworks — all content is configured through a single JSON file.

## Usage

```bash
pnpm install    # Install dependencies
pnpm dev        # Local dev server at http://localhost:4321
pnpm build      # Build to dist/
pnpm preview    # Preview the build output
```

## Configuring the navigation

All site content lives in `src/data/links.json`; save your edits and they take effect immediately (hot-reloaded in dev mode):

```jsonc
{
  "title": "My Navigation",     // Site title
  "description": "Sites I use", // Optional, subtitle
  "categories": [
    {
      "name": "Development",    // Category name
      "icon": "💻",             // Optional, category icon (emoji)
      "links": [
        {
          "name": "GitHub",              // Required
          "url": "https://github.com",   // Required
          "description": "Code hosting", // Optional, card subtitle
          "icon": ""                     // Optional: emoji or image URL; empty auto-fetches the site favicon, falling back to the first letter on failure
        }
      ]
    }
  ]
}
```

- Category and link order in the file is the display order on the page
- When `icon` is empty, the site favicon is loaded automatically (requested directly from `{site-domain}/favicon.ico`, no third-party services); a failed favicon or custom image load falls back to a colored first-letter avatar; an emoji is displayed as-is
- Structural type definitions live in `src/types.ts` — keep it open as a reference while editing the JSON

## Features

- Categories grouped in a responsive grid (single column on mobile)
- Three-tier icon fallback: custom emoji / image → auto site favicon → colored first-letter avatar
- Search filter at the top: live matching on name / description / category; `Ctrl K` (`⌘K` on Mac) or `/` to focus, `Esc` to clear
- Automatic dark mode (follows the system `prefers-color-scheme`)
- Links open in a new tab with `rel="noopener noreferrer"`

## Deployment

`pnpm build` produces a fully static `dist/` that can be hosted on any static hosting platform such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

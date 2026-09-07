# SGTTOMAS Squarespace archive

Collected on 2026-09-06/07 from the owner-accessible Squarespace origin:
`https://ryan-tufts-ll95.squarespace.com`

## Contents

- `squarespace-export.xml` — Squarespace's WordPress-format content export. This is the primary structured source for page and blog text, titles, dates, categories, tags, comments, and embedded asset references.
- `pages/` — 26 unique rendered HTML snapshots collected from 27 successful page responses at the public Squarespace origin.
- `assets/` — 496 downloaded files referenced by the sitemap or rendered pages.
- `sitemap.xml` — Squarespace sitemap as collected.
- `manifest.json` — source URL, local path, content type, byte size, and any download errors for every collected item.
- `summary.json` — machine-readable crawl totals.

## Asset inventory

- 422 JPEG images
- 62 PNG images
- 7 PDF documents
- 2 XML files
- 3 plain-text responses

The archive deliberately retains responsive image variants and duplicate content so provenance is not lost. Checksum analysis found 62 duplicate groups containing 84 redundant copies. These can be consolidated during the rebuild after choosing the best-resolution file in each group.

One non-file Squarespace script-directory URL returned HTTP 405. The actual `site-bundle.js` file was downloaded successfully, so this does not represent missing site content.

## Rebuild notes

The public `sgttomas.com` hostname had no DNS records when this archive was made. The Squarespace origin remained accessible and was used in its place. The XML export covers the `Dialogue` blog and processed the site's layout pages and galleries. Squarespace does not include every platform-specific style or block type in its WordPress export, so use the rendered HTML and downloaded assets as the visual/reference fallback.

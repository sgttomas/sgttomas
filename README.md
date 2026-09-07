# sgttomas

A static rebuild of `sgttomas.com`, recovered from the owner's Squarespace site and prepared for deployment to standard shared hosting.

## Preview

Serve the repository root with any static HTTP server. For example:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

Upload the repository contents (excluding `.git`, `docs`, and `source`) to the domain's web root. The included `.htaccess` forces HTTPS, disables directory listings, and provides the custom 404 page.

## Recovered source

The Squarespace WordPress export is retained in `source/squarespace-export.xml`. The full 197 MB recovery archive, including 496 assets and rendered page snapshots, remains outside this repository at `../sgttomas-website-archive/`.


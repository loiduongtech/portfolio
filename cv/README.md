# CV (English)

Two versions:

| File | Use case |
|------|----------|
| `cv.html` → `cv.pdf` | Visual CV for email, recruiters, game studios |
| `cv-ats.html` → `cv-ats.pdf` | Single-column ATS-friendly version for job portals |

## Generate PDFs

```bash
cd cv
./generate.sh
```

Preview:

```bash
open cv/cv.html
open cv/cv-ats.html
```

## Edit content

- **Visual CV:** edit `cv.html`
- **ATS CV:** edit `cv-ats.html` (keep both in sync when content changes)
- `cv.md` is a plain-text backup only

## Requirements

- Node.js 18+
- Puppeteer (installed via `npm install` on first run)

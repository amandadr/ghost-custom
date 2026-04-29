---
sidebar_position: 6
---

# Whitepapers + case studies (PDF-first resources)

Whitepapers and case studies are **PDF-first**: the PDF is the primary content shown to readers using **PDF.js**.

In Ghost, each resource is still a **post**, but the post body is used only to store **one PDF link** (which the theme reads and then hides).

## Storage + URL requirements (your CDN)

PDF.js needs a URL it can fetch from the browser.

- **Use HTTPS**
- **Direct PDF URL** (should end in `.pdf`)
- **CORS**: allow your site origin (e.g. `https://mannyroy.com`) to fetch the PDF
- **No auth required** (this is *soft gated*, see below)

### Soft gating expectations

Whitepaper pages are gated by Ghost Members, but the PDF URL itself is still a URL. Keep it “well hidden”:

- Use **unguessable filenames** (random suffixes)
- Don’t link PDFs anywhere public
- Avoid predictable paths like `/whitepapers/foo.pdf`

## Add a whitepaper

### 1) Upload the PDF to your storage/CDN

- Upload the PDF and copy the final public URL (e.g. `https://assets.yoursite.com/resources/whitepapers/...pdf`)
- Prefer a long, unguessable filename.

### 2) Create a new post in Ghost

- **Title**: the whitepaper title
- **Tag**: `whitepaper`
- **Visibility**: **Members** (members-only)
- **Custom excerpt**: short, public summary (optional but recommended; it displays above the viewer)

### 3) Add the PDF URL (the only required body content)

In the editor body, add **one** link to the PDF URL using any of:

- Bookmark card
- Button card
- Normal link

The theme will:

- hide the post body
- detect the first `.pdf` link
- render the PDF using PDF.js (members only)

### 4) Publish

Sanity check after publishing:

- Signed out: you should see the **email gate** (no PDF viewer)
- Signed in (member): you should see the **PDF viewer**
- In Admin → Members: new signups from this gate get a label like `whitepaper:<post-slug>`

## Add a case study

### 1) Upload the PDF to your storage/CDN

Same requirements as whitepapers.

### 2) Create a new post in Ghost

- **Title**: the case study title
- **Tag**: `case-study`
- **Visibility**: **Public**
- **Custom excerpt**: short summary (optional but recommended)

### 3) Add the PDF URL (the only required body content)

Add **one** link/card to the PDF URL in the post body. The theme will hide it and render the PDF viewer.

### 4) Publish

Sanity check after publishing:

- Signed out: you should still see the PDF viewer (case studies are public)

## Common troubleshooting

- **PDF viewer is blank**
  - Confirm the stored link is a **direct** `.pdf` URL (not a share page)
  - Check CORS on your CDN/storage allows your site origin
- **Works for you, fails for others**
  - Confirm the PDF URL is reachable publicly (soft gating means no auth prompts)
- **Viewer shows, but PDF download is blocked**
  - Ensure the CDN serves the PDF with `Content-Type: application/pdf`


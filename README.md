# Muhammad Talha — Personal Portfolio

A personal portfolio website presenting frontend development and creative services, built with HTML, CSS, and JavaScript.

[Visit the portfolio](https://mtalhacdx.github.io/Talha/) · [GitHub profile](https://github.com/mtalhacdx)

## Pages

- `index.html` — main portfolio page.
- `Website-Development.html` — website development services.
- `Graphic-Designing.html` — graphic design services.
- `UI-Design.html` — UI design services.
- `Video-Editing.html` — video editing services.
- `Content-Writing.html` — content writing services.
- `portfolio-Graphic-Designing.html` — graphic design portfolio.
- `thankyou.html` and `waiting.html` — supporting pages.

## Run locally

Clone the repository and serve the folder with a local static server:

```bash
git clone https://github.com/mtalhacdx/Talha.git
cd Talha
python -m http.server 8000
```

Open http://localhost:8000. Python is only used to serve the files; the website itself does not require a build step. An editor's static-server extension is an alternative.

## Project files

| Path | Purpose |
| --- | --- |
| `style.css` | Shared site styling |
| `script.js` | Browser interactions |
| `images/` | Visual assets |
| `*.html` | Portfolio and service pages |

## Working on the website

Update page content in the relevant HTML file, shared styles in `style.css`, and interactions in `script.js`. Keep relative paths intact so images and links continue to work under the `/Talha/` hosting path.

Before publishing, check navigation, image loading, mobile layouts, and contact forms. A static server does not provide an email or form-processing backend.

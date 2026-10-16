# yoonji.me

Static personal site — plain HTML, one stylesheet, one script. No build step; GitHub Pages serves it as-is (custom domain in `CNAME`).

## Structure

```
index.html              one-page home: hero → about → what i do → resume → gallery → contact
about.html  resume.html  gallery.html  gallery-modeling.html
builds.html  blog.html  gallery-film.html  contact.html   (builds/blog/film are "coming soon")
css/style.css           all styles — colors live in :root (the doodle-star palette)
js/site.js              clock, menu, scroll reveals, draggable stars, hover previews,
                        click-confetti, parallax, cassette music, modeling lightbox
images/web/             web-sized copies of photos (use these in pages)
images/model/           full-res originals
assets/                 logo, doodles, desktop-icon stars, cassette, music
```

## Editing

- **Text** — edit the HTML directly. Nav + footer are repeated in each page.
- **New photo** — resize first so pages stay fast:
  `sips -s format jpeg -s formatOptions 72 -Z 1600 images/model/NEW.JPG --out images/web/NEW.jpg`
  then add a `<button class="lift reveal" data-full="images/web/NEW.jpg">…</button>` to the modeling grid.
- **Fonts** — Helvetica Neue Condensed (system on Mac/iPhone), Archivo Narrow fallback elsewhere, Gaegu for scribbles.

## Run locally

```bash
npx http-server . -p 3000 -c-1
```

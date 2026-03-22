# How to Update Your Website

This guide explains how to change text, images, links, and add new pages. All paths are relative to the project root (the `website` folder).

---

## Changing Text

- **Home page:** Open `index.html` and edit the content inside `<main class="main-content">`. Look for `<h1>`, `<p>`, and section text.
- **About page:** Open `about.html` and edit the content inside `<main class="main-content">`.
- **Contact page:** Open `contact.html` and edit the content inside `<main class="main-content">`.
- **Site name / logo:** In every HTML file, find `<a href="index.html" class="logo">My Site</a>` and change "My Site" to your name or brand.
- **Footer:** In every HTML file, find the `<footer>` and edit the text inside it.

---

## Changing or Adding Images

1. Put image files in **`assets/images/`** (e.g. `hero-bg.png`, `profile.jpg`). Use lowercase names with hyphens, no spaces.
2. In your HTML, add an image like this:
   ```html
   <img src="assets/images/your-image.png" alt="Short description for accessibility">
   ```
3. For background images in CSS, use:
   ```css
   background-image: url('../assets/images/your-image.png');
   ```
   (The `../` goes up one folder from `css/` to the project root.)

**Icons:** Put SVG files in **`assets/icons/`** and reference them the same way, or paste the SVG code inline in HTML if you prefer.

---

## Changing Links

- **Navigation:** Edit the `<nav>` section in each HTML file. Each link looks like:
  ```html
  <a href="about.html" class="nav-link">About</a>
  ```
  Change `href` to the target page (e.g. `contact.html`) and the text between the tags to what you want to show.
- **Other links:** Use `href="page.html"` for other pages in this site, or `href="https://..."` for external sites. Always include `class="nav-link"` on nav links so the current-page highlight works.

---

## Adding a New Page

1. Copy an existing page (e.g. `about.html`) and rename the copy (e.g. `projects.html`).
2. In the new file:
   - Change the `<title>` to something like `Projects | My Personal Site`.
   - Change the `<meta name="description" content="...">` to describe the new page.
   - Update the `<main>` content to your new page content.
   - If you use page-specific CSS, add `css/pages/projects.css` and link it in `<head>`, then create that file.
3. Add a link to the new page in the `<nav>` on **every** page:
   ```html
   <li><a href="projects.html" class="nav-link">Projects</a></li>
   ```

---

## Adding Background Music

1. Place your audio file in **`assets/audio/`** (e.g. `background-music.mp3`). MP3 is widely supported.
2. In each page where you want the music player, find the `<audio id="bg-audio">` element and add a source:
   ```html
   <audio id="bg-audio" preload="metadata">
     <source src="assets/audio/background-music.mp3" type="audio/mpeg">
   </audio>
   ```
3. The music player (play/pause and volume) will appear at the bottom-right. It does not autoplay; the user clicks Play.

---

## Changing Colors and Fonts

Open **`css/main.css`**. At the top, the `:root` block has variables:

- `--color-primary` — main brand color (buttons, links).
- `--color-background`, `--color-surface`, `--color-text`, `--color-text-muted` — backgrounds and text.
- `--font-heading`, `--font-body` — fonts. To use a Google Font, add a `<link>` in the `<head>` of each HTML file, then set e.g. `--font-heading: "Your Font", sans-serif;`.

Change these values to match your Figma design; the rest of the site will update.

---

## Drag-and-Drop Sections

To add a drag-and-drop area on another page:

1. Wrap the draggable items in a container with class **`drop-zone`**.
2. Give each draggable item the class **`draggable`** (and optionally `card` for styling). You can add `data-drag-id="1"` etc. to identify items in code.
3. Example:
   ```html
   <div class="drop-zone">
     <div class="draggable card">Item A</div>
     <div class="draggable card">Item B</div>
   </div>
   ```
4. The script in `js/drag-drop.js` will make them draggable automatically.

---

## File Structure Quick Reference

| What you want to change | File or folder |
|-------------------------|----------------|
| Home content            | `index.html`   |
| About content           | `about.html`   |
| Contact content         | `contact.html` |
| Global colors/fonts     | `css/main.css` → `:root` |
| Buttons, nav, cards     | `css/components.css`     |
| Page-specific layout   | `css/pages/home.css` (or about.css, contact.css) |
| Images                  | `assets/images/`        |
| Icons (SVG)             | `assets/icons/`         |
| Background music        | `assets/audio/` + `<audio>` in HTML |

If you keep assets in these folders and use relative paths like `assets/images/photo.png`, your site will work locally and when deployed (e.g. GitHub Pages, Netlify, Vercel).

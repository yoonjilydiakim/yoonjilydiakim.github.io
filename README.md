# My Personal Site

A static multi-page personal website built with HTML5, CSS3, and vanilla JavaScript. No build step required.

## Project structure

```
website/
├── index.html          # Home page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   ├── main.css        # Global styles, variables, layout
│   ├── components.css  # Nav, buttons, cards, music player
│   └── pages/         # Page-specific CSS
├── js/
│   ├── main.js        # Footer year, global init
│   ├── navigation.js   # Current-page highlight
│   ├── music-player.js # Background music controls
│   └── drag-drop.js   # Drag-and-drop for .drop-zone / .draggable
├── assets/
│   ├── images/        # PNG, JPG, WebP
│   ├── icons/         # SVGs
│   ├── audio/         # Background music (MP3)
│   └── fonts/         # Custom fonts (optional)
└── docs/
    └── HOW-TO-UPDATE.md   # How to edit content and add pages
```

## Run locally

Use a local server so paths and links work correctly.

**Option A — Live Server (recommended)**  
1. Install the "Live Server" extension in VS Code or Cursor.  
2. Right-click `index.html` and choose "Open with Live Server."  
3. The site opens in your browser with live reload.

**Option B — Terminal**  
From the project root (`website/`):

```bash
npx serve .
```

Then open the URL shown (e.g. `http://localhost:3000`) in your browser.

## Features

- **Multiple pages:** Home, About, Contact with shared header, nav, and footer.
- **Navigation:** Links between pages; current page is highlighted in the nav.
- **Background music:** Play/pause and volume control (add an audio file in `assets/audio/` and a `<source>` inside `<audio id="bg-audio">` in your HTML).
- **Drag and drop:** On the home page, the "Try it: drag and drop" section uses `.drop-zone` and `.draggable`; you can add the same pattern to other pages.
- **Responsive:** Layout adapts to mobile, tablet, and desktop.
- **Accessible:** Semantic HTML, ARIA where needed, keyboard-friendly controls.

## Updating content

See [docs/HOW-TO-UPDATE.md](docs/HOW-TO-UPDATE.md) for how to:

- Change text and images  
- Add or edit pages  
- Add background music  
- Change colors and fonts  
- Add more drag-and-drop sections  

## Deployment

The site is static: no build step. Deploy the whole folder as-is.

- **GitHub Pages:** Push the repo, then in repo Settings → Pages, choose the branch (e.g. `main`) and root (or `docs` if you put the site there). The site will be at `https://username.github.io/repo-name/`.
- **Netlify / Vercel:** Drag the project folder into the dashboard or connect the Git repo. They serve the files with no extra config.

Use **relative paths** for all assets (e.g. `css/main.css`, `assets/images/photo.png`) so the site works on any host and path.

## Browser support

Modern browsers (Chrome, Firefox, Safari, Edge). JavaScript is used for nav highlight, music player, and drag-and-drop; the site still works with JS disabled except for those features.

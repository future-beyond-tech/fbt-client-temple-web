# Jai Maa Kali Mandir Donation

A responsive, multi-language Single Page Application (SPA) for the **Jai Maa Kali Mandir Renovation Trust** donation campaign. Built with React 19 and Vite.

> Repository: `fbt-client-temple-web` (by [Future Beyond Tech](https://github.com/future-beyond-tech)) · package name: `temple-donation`

![Temple Donation SPA](public/icon-192.png)

## 🙏 Overview

This SPA is the public donation page for the **Jai Maa Kali Mandir** in Birnia (Post–Jotha, Dhoraiya, Banka, Bihar – 813109). The temple is roughly 80+ years old; rising road levels now cause rainwater to flood the temple during monsoon, so the committee is raising the structure and rebuilding it. Construction is scheduled to begin **April 20, 2026**.

The page lets devotees donate via UPI, bank transfer, or WhatsApp confirmation, and pulls a **live donation total and donor list directly from Google Sheets** so the campaign stays transparent.

## ✨ Features

### Multi-language support
Six languages, selectable from the navigation bar (default: **Hindi**):

- 🇬🇧 English (`en`)
- 🇮🇳 हिन्दी / Hindi (`hi`)
- 🇮🇳 తెలుగు / Telugu (`te`)
- 🇮🇳 मराठी / Marathi (`mr`)
- 🇮🇳 বাংলা / Bengali (`bn`)
- 🇮🇳 ଓଡ଼ିଆ / Odia (`od`)

### Donation methods
- **UPI QR scan** (`QR.jpeg`) — works with Google Pay, PhonePe, Paytm, etc.
- **Receipt reference** (`Receipt.jpeg`) — sample donation receipt
- **WhatsApp confirmation** — pre-filled message to **+91 99114 14416** for sending a payment screenshot

### Live transparency (Google Sheets)
- **Total raised** auto-refreshes from a sheet cell every 60 seconds.
- **Donor list** modal fetches the full sheet and splits donors into *Deposited* and *Pending*.
- Includes a fallback proxy (`r.jina.ai`) if the direct Google Sheets fetch is blocked.

### Experience
- Welcome popup with a construction-progress graphic (`NewImage.jpeg`)
- Animated stat counters that fire when scrolled into view (Intersection Observer)
- Donation progress bar, smooth-scroll navigation, scroll-down helper
- Floating "diya" particle animations and traditional temple aesthetics
- **PWA** support (installable, with manifest and icons)
- Vercel Analytics for page insights

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool & dev server |
| **@vitejs/plugin-react-swc** | Fast React compilation (SWC) |
| **@vercel/analytics** | Privacy-friendly page analytics |
| **Plain CSS** | Single stylesheet with CSS custom properties |
| **Google Sheets (CSV/GViz export)** | Live donor & fund data — no backend |

There is **no server-side component** — the app is a fully static SPA that reads public Google Sheets exports at runtime.

## 📁 Project Structure

```
fbt-client-temple-web/
├── index.html                      # HTML entry + PWA meta tags
├── package.json                    # Dependencies & scripts
├── vite.config.mts                 # Vite config (dev server on :5173)
├── temple-donation.jsx             # Thin re-export of the main component
├── QR.jpeg                         # UPI QR code
├── Receipt.jpeg                    # Sample donation receipt
├── NewImage.jpeg                   # Before/During/After graphic shown in the welcome popup
├── Construction.jpeg               # Earlier construction photo (no longer used in the popup)
├── README.md
├── TECHNICAL.md                    # Deeper architecture / implementation notes
├── CHANGELOG.md
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── icon-192.png                # PWA icon (192×192)
│   ├── icon-512.png                # PWA icon (512×512)
│   └── site.webmanifest            # PWA manifest
└── src/
    ├── main.jsx                    # React entry; mounts <TempleDonation /> + Analytics
    └── temple-donation/
        ├── TempleDonation.jsx      # Main component: state, layout & all sections
        ├── temple-donation.css     # All styles + design tokens
        ├── translations.js         # 6-language content + langNames map
        ├── components/
        │   ├── Counter.jsx         # Intersection-Observer animated number
        │   ├── DonorModal.jsx      # Donor list modal + FundModal (total raised)
        │   ├── Icons.jsx           # Inline SVG icons + Divider
        │   ├── Navigation.jsx      # Top nav bar + language dropdown
        │   └── WelcomePopup.jsx    # Intro popup with construction image
        └── utils/
            └── sheetParser.js      # parseAmount() + parseSheetCSV()
```

> **Note:** the root `temple-donation.jsx` simply re-exports `src/temple-donation/TempleDonation.jsx`. The real entry point is `src/main.jsx`, which `index.html` loads.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install & run

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

### Build & preview

```bash
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start the development server |
| `build` | `vite build` | Create a production build in `dist/` |
| `preview` | `vite preview` | Preview the production build locally |

## ⚙️ Configuration

Campaign settings live as constants at the top of **`src/temple-donation/TempleDonation.jsx`**:

```javascript
const SHEET_ID = "…";                                  // Google Sheet ID
const TOTAL_FUND_SHEET = { gid: "1116878055", range: "B6" }; // cell holding the running total
const TOTAL_RAISED_REFRESH_MS = 60000;                 // auto-refresh interval (ms)
const PROGRESS_PERCENT = "42.6%";                       // progress bar fill
const INITIAL_TOTAL_RAISED = 10000;                     // fallback before the sheet loads
const WHATSAPP_URL = "https://wa.me/919911414416?text=…"; // confirmation link
```

### Google Sheets integration
The app reads two things from one public Google Sheet:

1. **Total raised** — a single cell (`gid` + `range`, e.g. `B6`) via the CSV `export` endpoint, refreshed on an interval.
2. **Donor list** — the whole sheet via the GViz endpoint (`/gviz/tq?tqx=out:csv`), parsed by `parseSheetCSV()`.

`parseSheetCSV()` (in `src/temple-donation/utils/sheetParser.js`) expects the **name in the 3rd column** and the **amount in the 6th column**, and detects payment status from any header containing `status`, `paid`, `payment`, `deposited`, or `स्थिति`. A donor counts as *deposited* when the status cell contains `paid`, `yes`, `confirmed`, `deposited`, `done`, `हाँ`, or `जमा`; otherwise they're listed as *pending*. To use a different sheet, publish it to the web and update `SHEET_ID`.

### Editing content
- **Text & translations:** `src/temple-donation/translations.js` — edit the keys under each language (`en`, `hi`, `te`, `mr`, `bn`, `od`); `langNames` controls the labels in the language dropdown.
- **Images:** replace `QR.jpeg`, `Receipt.jpeg`, or `NewImage.jpeg` (the welcome-popup graphic) in the project root.
- **WhatsApp number / payee details:** update `WHATSAPP_URL` in `TempleDonation.jsx` and the relevant translation strings.

## 🎨 Design System

Styling lives entirely in `src/temple-donation/temple-donation.css` and is driven by CSS custom properties:

| Variable | Value | Variable | Value |
|----------|-------|----------|-------|
| `--gold` | `#C4922A` | `--crimson-deep` | `#5C0E0E` |
| `--gold-light` | `#E8C56D` | `--saffron` | `#FF6F00` |
| `--gold-dark` | `#8B6914` | `--cream` | `#FFF8E7` |
| `--crimson` | `#8B1A1A` | `--dark` | `#1A0A0A` |
| `--vermillion` | `#E23D28` | `--dark-warm` | `#2D1410` |

**Typography** (Google Fonts): *Cinzel Decorative* for headings, *Cormorant Garamond* for body text, and the *Noto Sans* families (Devanagari, Telugu, Bengali, Oriya) for Indian-language scripts.

See **[TECHNICAL.md](TECHNICAL.md)** for the component hierarchy, state model, data-flow diagrams, animation keyframes, and responsive breakpoints.

## 🌐 Deployment

The build output in `dist/` is fully static and can be hosted anywhere (Vercel, Netlify, GitHub Pages, or any web server). The project already includes `@vercel/analytics`, so **Vercel** is the natural target:

```bash
npm run build
vercel --prod      # or drag dist/ to Netlify, or push dist/ to a gh-pages branch
```

## 🔒 Notes on Security & Privacy

- The Google Sheet ID is public by necessity (client-side read access).
- No personal data is stored in the frontend; no cookies, no `localStorage`.
- The only outbound calls are to Google Sheets (and the `r.jina.ai` fallback proxy).

## 🤝 Contributing

This is a community / devotional project. Please fork, branch, and open a pull request with a clear description, and keep the spiritual tone of the content intact.

## 📄 License

Built with devotion for the Jai Maa Kali Mandir. All rights reserved by the Temple Trust.

## 🙏 Acknowledgments

- **Temple Committee**, Birnia — guidance and approval
- **Shri Arvind Singh** — Temple Treasurer (कोषाध्यक्ष)
- **Villagers of Birnia** — support and blessings

---

**Jai Maa Kali!** 🙏

*Built with devotion for the reconstruction of the sacred abode of Maa Durga.*

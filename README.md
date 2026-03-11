# Jai Maa Kali Mandir Donation SPA

A beautiful, responsive Single Page Application (SPA) for the Jai Maa Kali Mandir renovation donation campaign. Built with React, Vite, and modern web technologies.

![Temple Donation SPA](public/icon-192.png)

## 🙏 Overview

This SPA serves as the official donation platform for the **Jai Maa Kali Mandir Renovation Trust** located in Birnia, Post–Jotha, Dhoraiya, Banka, Bihar - 813109. The temple, originally built over 200 years ago, requires significant restoration and renovation to preserve its sacred heritage.

## ✨ Features

### Multi-Language Support
- 🇬🇧 English
- 🇮🇳 हिन्दी (Hindi)
- 🇮🇳 తెలుగు (Telugu)
- 🇮🇳 मराठी (Marathi)
- 🇮🇳 বাংলা (Bengali)
- 🇮🇳 ଓଡ଼ିଆ (Odia)

### Donation Methods
- **UPI QR Code Scan** - Quick and easy mobile payments
- **Bank Transfer** - Traditional NEFT/RTGS/IMPS
- **WhatsApp Confirmation** - Send payment screenshot for verification

### Transparency Features
- Real-time donation progress tracking
- Public donor records via Google Sheets integration
- Excel export functionality
- Categorized donor lists (Confirmed/Pending)

### User Experience
- Smooth scroll navigation
- Animated counters for statistics
- Responsive design for all devices
- PWA (Progressive Web App) support
- Traditional Indian temple aesthetics

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Library |
| **Vite** | Build Tool & Dev Server |
| **@vitejs/plugin-react-swc** | Fast React compilation |
| **CSS-in-JS** | Styling (inline styles + CSS template literals) |
| **Google Sheets API** | Donor data management |

## 📁 Project Structure

```
Temple/
├── index.html                 # Entry HTML with PWA manifest
├── package.json               # Dependencies & scripts
├── vite.config.mts           # Vite configuration
├── temple-donation.jsx       # Main React component (all UI logic)
├── QR.jpeg                   # UPI QR code for donations
├── Receipt.jpeg              # Sample donation receipt
├── src/
│   └── main.jsx              # React application entry point
├── public/
│   ├── favicon.svg           # Site favicon
│   ├── apple-touch-icon.png  # iOS icon
│   ├── icon-192.png          # PWA icon (192x192)
│   ├── icon-512.png          # PWA icon (512x512)
│   └── site.webmanifest      # PWA manifest
└── dist/                     # Build output (generated)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd Temple
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## ⚙️ Configuration

### Google Sheets Integration

The SPA fetches donor data from a public Google Sheet. To configure:

1. Create a Google Sheet with columns: `Name`, `Amount`, `Status`
2. Publish the sheet to web: **File → Share → Publish to web**
3. Update the `SHEET_ID` constant in `temple-donation.jsx`:

```javascript
const SHEET_ID = "YOUR_SHEET_ID_HERE";
```

### Customizing Content

All translatable content is in the `translations` object within `temple-donation.jsx`. Modify the values for each language key:

```javascript
const translations = {
  en: { /* English content */ },
  hi: { /* Hindi content */ },
  // ... other languages
};
```

### Updating Payment Details

- **QR Code**: Replace `QR.jpeg` with your UPI QR code
- **Bank Details**: Edit the translation strings for `bankName`, `accName`, `accNo`, `ifsc`
- **WhatsApp Number**: Update `whatsappNumber` in translations

## 🎨 Design System

### Color Palette
| Variable | Value | Usage |
|----------|-------|-------|
| `--gold` | `#C4922A` | Primary accents, headings |
| `--gold-light` | `#E8C56D` | Highlights, gradients |
| `--gold-dark` | `#8B6914` | Shadows, borders |
| `--crimson` | `#8B1A1A` | Secondary backgrounds |
| `--crimson-deep` | `#5C0E0E` | Deep backgrounds |
| `--saffron` | `#FF6F00` | CTAs, accents |
| `--cream` | `#FFF8E7` | Text color |
| `--dark` | `#1A0A0A` | Main background |
| `--dark-warm` | `#2D1410` | Card backgrounds |

### Typography
- **Headings**: Cinzel Decorative (serif, decorative)
- **Body**: Cormorant Garamond (serif, readable)
- **Indian Languages**: Noto Sans Devanagari, Telugu, Bengali, Oriya

## 📱 Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Desktop | > 1024px | Full layout |
| Tablet | 768px - 1024px | Reduced padding |
| Mobile | < 768px | Single column, stacked buttons |
| Small Mobile | < 480px | Compact typography |

## 🔒 Security Considerations

- The Google Sheet ID is public (required for client-side fetching)
- No sensitive data is stored in the frontend
- WhatsApp number is hardcoded for the specific campaign
- No server-side components - purely static SPA

## 🌐 Deployment

This SPA can be deployed to any static hosting service:

### Netlify
```bash
npm run build
# Drag 'dist/' folder to Netlify
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

### Traditional Hosting
Upload the contents of `dist/` to your web server after running `npm run build`.

## 📋 Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server |
| `build` | `vite build` | Create production build |
| `preview` | `vite preview` | Preview production build locally |

## 🤝 Contributing

This is a religious/community project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear description
4. Respect the spiritual nature of the content

## 📄 License

This project is built with devotion for the Jai Maa Kali Mandir. All rights reserved by the Temple Trust.

## 🙏 Acknowledgments

- **Temple Committee** - For their guidance and approval
- **Shri Arvind Singh** - Temple Treasurer (कोषाध्यक्ष)
- **Villagers of Birnia** - For their support and blessings
- **Maa Kali** - For the divine inspiration

---

**Jai Maa Kali!** 🙏

*Built with devotion for the reconstruction of the sacred abode of Maa Durga.*

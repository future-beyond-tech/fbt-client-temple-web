# Technical Documentation

## Architecture Overview

This SPA follows a **single-file component architecture** where the entire UI is contained in `temple-donation.jsx`. This approach was chosen for simplicity and ease of deployment.

## Component Hierarchy

```
TempleDonation (Main Component)
├── OmSymbol (SVG Icon)
├── TempleBadgeIcon (SVG Icon)
├── GlobeIcon (SVG Icon)
├── ChartIcon (SVG Icon)
├── LandmarkIcon (SVG Icon)
├── ClipboardIcon (SVG Icon)
├── CommitteeIcon (SVG Icon)
├── BellIcon (SVG Icon)
├── Divider (Decorative)
├── Counter (Animated number)
├── Navigation Bar
│   ├── Brand Logo
│   ├── Language Selector (Dropdown)
│   └── Donate Button
├── Hero Section
│   ├── Animated Particles
│   ├── OM Symbol
│   ├── Title & Tagline
│   ├── Scrolling Notice Bar
│   └── CTA Buttons
├── Stats Section
│   └── 4x Counter Cards
├── Progress Bar
├── About Section
│   ├── Text Content
│   ├── Reason to Donate
│   ├── Important Notice
│   └── Temple Comparison Cards
├── Donate Section
│   ├── QR Code Card
│   ├── Bank Details Card
│   └── WhatsApp Confirmation Card
├── Donors Section
│   ├── Excel Link Button
│   ├── View Donors Button
│   └── Donor Modal (Conditional)
├── Trust Section
│   └── 4x Trust Cards (Grid)
├── Committee Section
│   └── Member Card
└── Footer
```

## State Management

The application uses React's built-in `useState` and `useEffect` hooks for state management:

```javascript
const [lang, setLang] = useState("hi");              // Current language
const [showLangMenu, setShowLangMenu] = useState(false);  // Language dropdown
const [scrollY, setScrollY] = useState(0);           // Scroll position
const [showDonorModal, setShowDonorModal] = useState(false);  // Modal visibility
const [donorRows, setDonorRows] = useState([]);      // Donor data
const [loadingDonors, setLoadingDonors] = useState(false);    // Loading state
const [donorError, setDonorError] = useState("");    // Error message
```

## Data Flow

### Language Switching
```
User clicks language → setLang(code) → t = translations[lang] → Re-render with new text
```

### Donor Data Fetching
```
User clicks "View Donors" → fetchAndShowDonors() 
  → Fetch from Google Sheets CSV → parseSheetCSV() 
    → setDonorRows(parsed) → Render modal with data
```

### Scroll Effects
```
Window scroll → handleScroll() → setScrollY() 
  → nav-scrolled class applied → Visual changes to navbar
```

## Key Functions

### `parseSheetCSV(csvText)`
Parses Google Sheets CSV export into structured donor data.

**Algorithm:**
1. Split CSV by newlines
2. Parse headers (lowercase, remove quotes)
3. Find column indices for name, amount, status
4. Iterate rows, extract values
5. Determine payment status from status column
6. Return array of donor objects

### `Counter` Component
Animated number counter using Intersection Observer.

**Props:**
- `end` - Target number
- `duration` - Animation duration (default: 2000ms)
- `prefix` - String before number (e.g., "₹")
- `suffix` - String after number

**Animation:** Cubic easing for smooth deceleration

### `fetchAndShowDonors()`
Fetches donor data from Google Sheets.

**URL Pattern:**
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv
```

**Error Handling:**
- Network errors → Show error message with direct link
- Empty data → Show "No donors yet" message
- Success → Parse and categorize (paid/unpaid)

## Styling Architecture

### CSS Variables (Custom Properties)
All colors are defined as CSS variables in the global style block:

```css
:root {
  --gold: #C4922A;
  --gold-light: #E8C56D;
  --gold-dark: #8B6914;
  --crimson: #8B1A1A;
  --crimson-deep: #5C0E0E;
  --saffron: #FF6F00;
  --cream: #FFF8E7;
  --dark: #1A0A0A;
  --dark-warm: #2D1410;
  --vermillion: #E23D28;
}
```

### Animation Keyframes

| Animation | Purpose |
|-----------|---------|
| `float` | OM symbol floating effect |
| `glow` | QR card pulsing glow |
| `shimmer` | Gold gradient shimmer on text/progress |
| `fadeUp` | Section entrance animations |
| `pulse` | Button hover effects |
| `diyas` | Lamp flickering particles |
| `rotate` | Mandala background (future use) |

### Responsive Strategy

**Mobile-First Approach:**
- Base styles for mobile
- Media queries for larger screens

**Breakpoints:**
```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 480px)  { /* Small Mobile */ }
```

## Google Sheets Integration

### Expected Sheet Format

| Name | Amount | Status |
|------|--------|--------|
| John Doe | 1000 | Paid |
| Jane Smith | 500 | Pending |
| ... | ... | ... |

### Status Detection
The parser looks for these keywords (case-insensitive):
- `paid`, `yes`, `confirmed`, `deposited`, `done`
- Hindi: `हाँ`, `जमा`

Any other value or empty status is treated as pending.

### CORS Considerations
Google Sheets CSV export supports CORS for public sheets. No API key required for read-only access.

## Performance Optimizations

### Implemented
1. **Single CSS injection** - All styles in one `<style>` tag
2. **Lazy loading** - Donor data only fetched when requested
3. **Intersection Observer** - Counters only animate when visible
4. **Particle pooling** - Fixed 30 particles, no dynamic creation
5. **Image optimization** - Using WebP/optimized JPEG sources

### Bundle Size
- Main component: ~40KB (gzipped)
- Images: ~300KB (QR + Receipt + Icons)
- Total: < 500KB

## Browser Compatibility

| Feature | Support |
|---------|---------|
| CSS Variables | All modern browsers |
| CSS Grid | IE11+ (with -ms prefix), all others |
| Flexbox | All modern browsers |
| Intersection Observer | Chrome 51+, polyfill available |
| Backdrop Filter | Safari 9+, Chrome 76+ |

## Security Notes

### Content Security Policy
Recommended headers for production:

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://*.googleusercontent.com https://images.unsplash.com;
  connect-src https://docs.google.com;
```

### Data Privacy
- No cookies used
- No localStorage/sessionStorage
- No tracking scripts
- No personal data collection

## Future Enhancements

### Potential Improvements
1. **i18n Library** - Replace custom translation system with react-i18next
2. **State Management** - Redux Toolkit for complex state (if needed)
3. **Backend API** - Replace Google Sheets with proper REST API
4. **Payment Gateway** - Integrate Razorpay/Stripe for direct payments
5. **Admin Dashboard** - Separate interface for managing donations
6. **Photo Gallery** - Add temple renovation progress photos
7. **Video Section** - Embed blessing videos or drone footage
8. **Push Notifications** - PWA push for donation milestones

### Accessibility Improvements
1. Add `aria-label` to all interactive elements
2. Implement skip links
3. Add keyboard navigation support
4. Increase color contrast for WCAG AAA compliance
5. Add screen reader announcements for dynamic content

## Debugging

### Common Issues

**Donor data not loading:**
- Check if Google Sheet is published to web
- Verify SHEET_ID is correct
- Check browser console for CORS errors
- Ensure sheet has proper column headers

**Language not switching:**
- Verify translation key exists in all language objects
- Check for JavaScript errors in console

**Styles not applying:**
- Verify CSS custom properties are supported
- Check if style tag is rendering in DOM

### Development Tips

1. **Hot Reload** - Vite provides instant updates on save
2. **React DevTools** - Install browser extension for component debugging
3. **Network Throttling** - Test donor loading with slow connections
4. **Mobile Testing** - Use browser devtools device emulation

## File Encoding

All source files are UTF-8 encoded to support Indian language characters properly.

---

*For questions or issues, contact the temple committee.*

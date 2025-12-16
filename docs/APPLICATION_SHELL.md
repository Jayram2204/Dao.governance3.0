# Application Shell Documentation

## Overview
The DAO 2.0 application shell provides a professional, modern interface for decentralized governance. It includes a responsive navigation system, sidebar for internal pages, and a comprehensive footer.

## Components

### Navbar (`src/components/Navbar.jsx`)
- **Features:**
  - Sticky navigation with backdrop blur effect
  - Logo with gradient text
  - Desktop navigation links with active state indicators
  - Integrated RainbowKit wallet connection button
  - Mobile-responsive hamburger menu
  - Smooth transitions and hover effects

- **Navigation Links:**
  - Home
  - Identity
  - Voting
  - Treasury

### Sidebar (`src/components/Sidebar.jsx`)
- **Features:**
  - Collapsible sidebar (250px → 80px)
  - Icon-based navigation with labels
  - Active route highlighting
  - Smooth collapse/expand animation
  - Hidden on home page
  - Mobile-responsive (hidden on small screens)

- **Menu Items:**
  - Dashboard (Home)
  - Identity
  - Voting
  - Treasury
  - Analytics (placeholder)
  - Settings (placeholder)

### Footer (`src/components/Footer.jsx`)
- **Features:**
  - Multi-column link organization
  - Social media links (GitHub, Twitter, Discord, Telegram)
  - Brand section with description
  - Responsive grid layout
  - Copyright and tagline

- **Link Sections:**
  - Product
  - Resources
  - Company
  - Legal

### Home Page (`src/pages/Home.jsx`)
- **Sections:**
  1. **Hero Section**
     - Animated badge
     - Gradient title
     - CTA buttons
     - Quick stats display

  2. **Benefits Section**
     - Security highlights
     - Privacy features
     - Performance indicators

  3. **Features Section**
     - Identity Management card
     - Voting System card
     - Treasury Management card
     - Interactive hover effects

  4. **How It Works**
     - 4-step process guide
     - Numbered cards
     - Clear descriptions

  5. **Stats Section**
     - Key metrics display
     - Gradient numbers

  6. **CTA Section**
     - Final call-to-action
     - Launch button

## Layout Structure

```
App Container
├── Background3D (fixed)
├── Navbar (sticky)
├── App Layout
│   ├── Sidebar (conditional, not on home)
│   └── Main Content
│       └── Routes
└── Footer
```

## Responsive Breakpoints

- **Desktop:** > 968px (full layout with sidebar)
- **Tablet:** 768px - 968px (collapsed sidebar, mobile menu)
- **Mobile:** < 768px (mobile-optimized, no sidebar)

## Styling

### CSS Variables (from `src/index.css`)
- `--color-bg`: Background color
- `--color-text-primary`: Primary text
- `--color-text-secondary`: Secondary text
- `--color-link`: Link and accent color
- `--color-button-bg`: Button background
- `--color-border`: Border color

### Key Features
- Backdrop blur effects
- Gradient text and backgrounds
- Smooth transitions (0.3s ease)
- Box shadows for depth
- Hover state animations

## Integration

### Wallet Connection
The navbar integrates RainbowKit's `ConnectButton` component:
```jsx
<ConnectButton
  chainStatus="icon"
  showBalance={false}
  accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }}
/>
```

### Routing
Uses React Router v6 with conditional sidebar rendering:
```jsx
const isHomePage = location.pathname === '/';
{!isHomePage && <Sidebar />}
```

## Customization

### Adding New Navigation Items
1. Update `navLinks` array in `Navbar.jsx`
2. Add corresponding route in `App.jsx`
3. Update `menuItems` in `Sidebar.jsx` if needed

### Modifying Colors
Update CSS variables in `src/index.css` for global theme changes.

### Adding Footer Links
Edit the `footerLinks` object in `Footer.jsx`.

## Performance Considerations
- Sticky positioning for navbar (GPU-accelerated)
- CSS transitions instead of JavaScript animations
- Backdrop blur with fallback
- Optimized re-renders with React Router

## Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus-visible states
- Semantic HTML structure
- Alt text for icons (via aria-label)

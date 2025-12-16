# Quick Start Guide - DAO Application

## Project Status

✅ **Phase 1 Complete:** Color Palette & Layout  
✅ **Phase 2 Complete:** Privy Integration (Ready for configuration)  
✅ **Phase 3 Complete:** Core UI Components  

## What's Working Now

### 1. Layout System
- **Navbar** - Sticky navigation with logo and links
- **Footer** - Social links and copyright
- **Layout** - Consistent wrapper for all pages
- **Home Page** - Hero section with gradient text

### 2. UI Components
- **Button** - 5 variants (default, primary, secondary, accent-teal, accent-red)
- **Card** - Container for grouped content
- **Loader** - Animated spinner (3 sizes, 4 colors)

### 3. Design System
- **Dark Theme** - Futuristic color palette
- **Responsive** - Mobile-friendly layouts
- **Consistent** - Reusable components

## Quick Usage Examples

### Import Components
```jsx
import { Button, Card, Loader } from '../components/ui';
```

### Use Button
```jsx
<Button variant="accent-teal" onClick={handleClick}>
  Connect Wallet
</Button>
```

### Use Card
```jsx
<Card>
  <h3>Title</h3>
  <p>Content goes here</p>
</Card>
```

### Use Loader
```jsx
<Loader size="md" color="primary" />
```

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout/
│   │   ├── Navbar/
│   │   └── Footer/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Loader/
│   │   └── index.js
│   └── web3/
│       └── WalletButton/ (ready for Privy)
├── pages/
│   ├── Home.jsx
│   └── ComponentDemo.jsx
├── styles/
│   └── colors.css
└── index.css
```

## Running the App

```bash
# Start dev server
npm run dev

# Open browser
http://localhost:5174/
```

## Next Steps

### To Enable Privy (Phase 2):
1. Get App ID from [privy.io](https://privy.io/)
2. Add to `.env`: `VITE_PRIVY_APP_ID=your_app_id`
3. Uncomment Privy code in `src/main.jsx`
4. Uncomment WalletButton in `src/components/layout/Navbar/Navbar.jsx`

### Phase 4 (Coming Next):
- Modal/Dialog component
- Toast notifications
- Form components
- Advanced UI patterns

## Color Palette Reference

```css
--bg-primary: #0D1117      /* Dark Matter */
--bg-secondary: #161B22    /* Slate */
--brand-blue: #3B82F6      /* Governance Blue */
--brand-violet: #8B5CF6    /* Web3 Violet */
--accent-teal: #10B981     /* Neon Teal */
--accent-red: #EF4444      /* Warning Red */
--text-primary: #F8F8F8    /* Off-White */
--text-secondary: #8D96A0  /* Muted Grey */
--border-color: #30363d    /* Border */
```

## Component Variants

### Button Variants
- `default` - Neutral grey
- `primary` - Brand blue
- `secondary` - Transparent with border
- `accent-teal` - Positive actions
- `accent-red` - Destructive actions

### Loader Sizes
- `sm` - 16px (inline)
- `md` - 24px (default)
- `lg` - 36px (page loading)

### Loader Colors
- `primary` - Brand blue
- `secondary` - Brand violet
- `accent-teal` - Teal
- `text-primary` - White

## Documentation

- `docs/APPLICATION_SHELL.md` - Original architecture
- `docs/PHASE_2_SETUP.md` - Privy integration guide
- `docs/PHASE_3_UI_COMPONENTS.md` - Component documentation
- `docs/QUICK_START.md` - This file

## Support

For issues or questions:
1. Check the documentation in `docs/`
2. Review component examples in `src/pages/ComponentDemo.jsx`
3. Check browser console for errors

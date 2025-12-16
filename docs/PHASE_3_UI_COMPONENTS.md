# Phase 3: Core UI Components

## Overview

Phase 3 provides the foundational, reusable UI components that ensure consistency across your DAO application. All components follow the "Futurist Trust" color palette and design system.

## Components Created

### 1. Button Component

**Location:** `src/components/ui/Button/Button.jsx`

**Variants:**
- `default` - Neutral button with border
- `primary` - Main action button (blue)
- `secondary` - Less critical actions (transparent with border)
- `accent-teal` - Positive actions (Connect Wallet, Vote Yes)
- `accent-red` - Destructive actions (Vote No, Delete)

**Usage:**
```jsx
import { Button } from '../components/ui/Button/Button';

// Primary action
<Button variant="primary" onClick={handleClick}>
  Submit Proposal
</Button>

// Positive action
<Button variant="accent-teal">
  Vote Yes
</Button>

// Destructive action
<Button variant="accent-red">
  Vote No
</Button>

// With disabled state
<Button variant="primary" disabled>
  Loading...
</Button>
```

**Props:**
- `variant` - Button style variant (default: 'default')
- `onClick` - Click handler function
- `disabled` - Disable the button
- `className` - Additional CSS classes
- `children` - Button content (text, icons, etc.)

### 2. Card Component

**Location:** `src/components/ui/Card/Card.jsx`

**Description:** Universal container for sections, data displays, and interactive elements.

**Usage:**
```jsx
import { Card } from '../components/ui/Card/Card';

<Card>
  <h3>Proposal #42</h3>
  <p>Increase treasury allocation for development...</p>
</Card>

// Card with no padding (for charts)
<Card className="ui-card--no-padding">
  <YourChartComponent />
</Card>
```

**Features:**
- Consistent padding and border radius
- Subtle hover effect (lift and shadow)
- Dark theme background
- Optional no-padding variant for custom layouts

**Props:**
- `className` - Additional CSS classes
- `children` - Card content

### 3. Loader Component

**Location:** `src/components/ui/Loader/Loader.jsx`

**Description:** Animated spinner for loading states.

**Sizes:**
- `sm` - 16px (for inline loading)
- `md` - 24px (default, for buttons)
- `lg` - 36px (for page loading)

**Colors:**
- `primary` - Brand blue
- `secondary` - Brand violet
- `accent-teal` - Teal accent
- `text-primary` - White/off-white

**Usage:**
```jsx
import { Loader } from '../components/ui/Loader/Loader';

// Default loader
<Loader />

// Small loader in a button
<Button variant="primary" disabled>
  <Loader size="sm" color="text-primary" />
  Loading...
</Button>

// Large page loader
<div className="page-loading">
  <Loader size="lg" color="accent-teal" />
</div>
```

**Props:**
- `size` - Loader size (default: 'md')
- `color` - Loader color (default: 'primary')

## Easy Imports

All UI components can be imported from a single location:

```jsx
import { Button, Card, Loader } from '../components/ui';
```

## Updated Components

### Home Page
- Now uses the `Button` component instead of styled `<a>` tags
- Cleaner, more maintainable code
- Consistent styling with the rest of the app

## Design System

### Color Usage Guide

**Buttons:**
- Primary actions → `variant="primary"` (blue)
- Positive actions → `variant="accent-teal"` (teal)
- Negative actions → `variant="accent-red"` (red)
- Secondary actions → `variant="secondary"` (transparent)
- Neutral actions → `variant="default"` (grey)

**Cards:**
- Use for grouping related content
- Automatic hover effects for interactive cards
- Consistent spacing and shadows

**Loaders:**
- Match loader color to context
- Use small loaders in buttons
- Use large loaders for page-level loading

## Best Practices

1. **Consistency:** Always use these components instead of creating custom buttons/cards
2. **Variants:** Choose the appropriate variant based on action importance
3. **Accessibility:** All components support standard HTML attributes
4. **Composition:** Components can be nested and combined

## Examples

### Button with Loader
```jsx
<Button variant="primary" disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader size="sm" color="text-primary" />
      Processing...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

### Card with Content
```jsx
<Card>
  <h3>Treasury Balance</h3>
  <p className="stat-value">1,234.56 ETH</p>
  <Button variant="secondary">View Details</Button>
</Card>
```

### Loading State
```jsx
{isLoading ? (
  <div className="loading-container">
    <Loader size="lg" color="accent-teal" />
    <p>Loading proposals...</p>
  </div>
) : (
  <ProposalsList />
)}
```

## Next Steps

Phase 4 will add:
- Modal/Dialog component
- Toast notifications
- Form components (Input, Select, Textarea)
- More advanced UI patterns

## File Structure

```
src/components/ui/
├── index.js              # Central export file
├── Button/
│   ├── Button.jsx
│   └── Button.css
├── Card/
│   ├── Card.jsx
│   └── Card.css
└── Loader/
    ├── Loader.jsx
    └── Loader.css
```

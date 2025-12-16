# 📁 DAO 2.0 Project Structure

## Complete Folder Organization

```
bbt25/
├── contracts/                      # Smart Contracts
│   ├── MyDAOToken.sol             # ERC20Votes governance token
│   ├── DAOTimelock.sol            # 2-day timelock for treasury
│   └── MyDAOGovernor.sol          # Governor with security fixes
│
├── scripts/                        # Deployment Scripts
│   └── deploy.js                  # Automated deployment
│
├── test/                          # Contract Tests
│   └── contracts/
│       └── DAO.test.js            # Comprehensive tests
│
├── src/                           # Frontend Application
│   ├── components/                # React Components
│   │   ├── common/                # Reusable Components
│   │   │   ├── Badge.jsx          # Status badges
│   │   │   ├── Modal.jsx          # Modal dialogs
│   │   │   ├── Tooltip.jsx        # Hover tooltips
│   │   │   └── index.js           # Exports
│   │   │
│   │   ├── dao/                   # DAO-Specific Components
│   │   │   ├── ProposalCard.jsx   # Proposal display
│   │   │   ├── ProposalList.jsx   # List of proposals
│   │   │   └── TreasuryOverview.jsx # Treasury charts
│   │   │
│   │   ├── layout/                # Layout Components
│   │   │   ├── Navbar/            # Navigation bar
│   │   │   ├── Footer/            # Footer
│   │   │   └── Layout/            # Main layout wrapper
│   │   │
│   │   ├── ui/                    # UI Components
│   │   │   ├── Button/            # Button component
│   │   │   ├── Card/              # Card component
│   │   │   ├── Loader/            # Loading spinner
│   │   │   └── index.js           # Exports
│   │   │
│   │   ├── web3/                  # Web3 Components
│   │   │   ├── WalletButton/      # Wallet connection
│   │   │   └── SimpleWalletButton.jsx # Placeholder
│   │   │
│   │   └── ErrorBoundary.jsx      # Error handling
│   │
│   ├── pages/                     # Page Components
│   │   ├── Home.jsx               # Landing page
│   │   ├── Voting.jsx             # Governance page
│   │   ├── Treasury.jsx           # Treasury page
│   │   ├── Identity.jsx           # User profile
│   │   ├── Analytics.jsx          # DAO analytics
│   │   ├── Leaderboard.jsx        # Top contributors
│   │   └── ComponentDemo.jsx      # UI showcase
│   │
│   ├── hooks/                     # Custom Hooks
│   │   ├── useDAO.js              # DAO interactions
│   │   └── useWallet.js           # Wallet interactions
│   │
│   ├── contexts/                  # React Contexts
│   │   ├── DAOContext.jsx         # DAO state management
│   │   └── ThemeContext.jsx       # Theme management
│   │
│   ├── store/                     # State Management
│   │   ├── useDAOStore.js         # Zustand DAO store
│   │   └── useThemeStore.js       # Zustand theme store
│   │
│   ├── config/                    # Configuration
│   │   └── contracts.js           # Contract addresses & ABIs
│   │
│   ├── constants/                 # Constants
│   │   └── index.js               # All constants
│   │
│   ├── utils/                     # Utility Functions
│   │   ├── formatters.js          # Format helpers
│   │   ├── validators.js          # Validation helpers
│   │   ├── errorParser.js         # Error handling
│   │   └── index.js               # Exports
│   │
│   ├── styles/                    # Global Styles
│   │   └── colors.css             # Color palette
│   │
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App styles
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
│
├── docs/                          # Documentation
│   ├── CRITICAL_AUDIT_REPORT.md   # Security audit
│   ├── SECURITY_FIXES.md          # Security improvements
│   ├── DEPLOYMENT_STEPS.md        # Deployment guide
│   ├── WALLET_INTEGRATION_COMPLETE.md # Integration docs
│   ├── PROJECT_STRUCTURE.md       # This file
│   ├── SMART_CONTRACTS.md         # Contract documentation
│   ├── DEPLOYMENT_GUIDE.md        # Detailed deployment
│   └── TROUBLESHOOTING.md         # Common issues
│
├── deployments/                   # Deployment Info
│   └── sepolia.json              # Testnet deployment
│
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── hardhat.config.js             # Hardhat configuration
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
├── README.md                     # Project overview
└── INTEGRATION_COMPLETE.md       # Integration status
```

## 📦 Component Categories

### Common Components (`src/components/common/`)
Reusable UI components used throughout the application:
- **Badge** - Status indicators and labels
- **Modal** - Dialog boxes and popups
- **Tooltip** - Hover information displays

### DAO Components (`src/components/dao/`)
DAO-specific business logic components:
- **ProposalCard** - Individual proposal display
- **ProposalList** - List of all proposals
- **TreasuryOverview** - Treasury visualization

### Layout Components (`src/components/layout/`)
Application structure components:
- **Navbar** - Top navigation with wallet connection
- **Footer** - Bottom footer with links
- **Layout** - Main layout wrapper

### UI Components (`src/components/ui/`)
Basic UI building blocks:
- **Button** - Styled buttons with variants
- **Card** - Container cards
- **Loader** - Loading spinners

## 🎯 Key Files

### Configuration
- **src/config/contracts.js** - Contract addresses and ABIs
- **src/constants/index.js** - All application constants
- **.env** - Environment variables (not committed)

### State Management
- **src/contexts/DAOContext.jsx** - Global DAO state
- **src/contexts/ThemeContext.jsx** - Theme state
- **src/store/useDAOStore.js** - Zustand store for DAO
- **src/store/useThemeStore.js** - Zustand store for theme

### Hooks
- **src/hooks/useDAO.js** - DAO interaction hooks
- **src/hooks/useWallet.js** - Wallet interaction hooks

### Utilities
- **src/utils/formatters.js** - Format numbers, dates, addresses
- **src/utils/validators.js** - Input validation
- **src/utils/errorParser.js** - Error message parsing

## 🔧 Smart Contracts

### MyDAOToken.sol
- ERC20Votes token for governance
- Snapshot-based voting power
- Delegation support
- Minting controlled by MINTER_ROLE

### DAOTimelock.sol
- 2-day delay before execution
- Holds treasury funds
- Role-based access control
- Proposal queuing system

### MyDAOGovernor.sol
- Proposal creation and voting
- 1-day voting delay (security fix)
- 7-day voting period
- 7-day execution grace period
- Quorum requirements
- Proposal threshold

## 📊 Data Flow

```
User Action → Component → Hook → Wagmi → Smart Contract → Blockchain
                ↓
         State Update (Zustand/Context)
                ↓
         UI Re-render
```

## 🎨 Styling Architecture

### Global Styles
- **src/index.css** - Base styles, CSS variables
- **src/App.css** - App-level styles
- **src/styles/colors.css** - Color palette

### Component Styles
Each component has its own CSS file:
- **ComponentName.jsx** → **ComponentName.css**

### CSS Variables
All colors and spacing use CSS variables:
```css
--color-primary: #8B5CF6
--color-text-primary: #ffffff
--spacing-md: 1rem
```

## 🔐 Security Features

### Smart Contract Level
- Voting delay prevents flash loans
- Timelock protects treasury
- Grace period prevents stale proposals
- Quorum ensures participation
- Proposal threshold prevents spam

### Frontend Level
- Input validation
- Error boundaries
- Secure wallet connection
- Transaction confirmation
- Error handling

## 📱 Responsive Design

All components are responsive:
- **Desktop**: Full features, side-by-side layouts
- **Tablet**: Adjusted layouts, collapsible menus
- **Mobile**: Stacked layouts, mobile-optimized navigation

## 🚀 Build & Deploy

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Smart Contracts
```bash
npx hardhat compile  # Compile contracts
npx hardhat test     # Run tests
npx hardhat run scripts/deploy.js --network sepolia
```

## 📚 Documentation

All documentation is in the `docs/` folder:
- Security audit and fixes
- Deployment guides
- Integration documentation
- Troubleshooting guides
- API documentation

## 🎯 Next Steps

1. **Deploy Contracts** - Deploy to testnet
2. **Update Config** - Add deployed addresses
3. **Test Integration** - Test with real data
4. **Security Audit** - Professional audit
5. **Launch** - Deploy to mainnet

---

**Status:** ✅ Complete folder structure  
**Components:** ✅ All created  
**Documentation:** ✅ Comprehensive  
**Ready for:** Deployment and testing

# 🔧 Troubleshooting Guide - Blank Screen Fix

## What I Fixed

### 1. Routing Structure ✅
- Removed problematic Layout wrapper
- Direct component imports for Navbar and Footer
- Simplified BrowserRouter structure

### 2. WalletConnect Configuration ✅
- Fixed invalid project ID format in `.env`
- Added proper fallback in `main.jsx`
- Added QueryClient error handling

### 3. Error Boundary ✅
- Created `ErrorBoundary.jsx` component
- Wrapped App in error boundary
- Will show detailed error messages if something breaks

## Current Status

**Dev Server**: Running on http://localhost:5174/  
**HMR**: Working (Hot Module Replacement active)  
**Error Handling**: Enabled

## What You Should See Now

### Option A: ✅ Working Site
If everything is working, you should see:
- Dark themed DAO interface
- Navbar with navigation links
- Home page with hero section
- "Connect Wallet" button
- Footer at the bottom

### Option B: 🚨 Error Message
If there's still an issue, you should see:
- Red error boundary screen
- Detailed error message
- Stack trace
- "Reload Page" button

## If You Still See Blank Screen

### Step 1: Hard Refresh Browser
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Step 2: Check Browser Console
1. Press F12 to open DevTools
2. Click "Console" tab
3. Look for red error messages
4. Share the error message with me

### Step 3: Verify Dev Server
Check the terminal where `npm run dev` is running:
- Should show "ready in XXXms"
- Should show "Local: http://localhost:5174/"
- No red error messages

### Step 4: Check Network Tab
1. Open DevTools (F12)
2. Click "Network" tab
3. Refresh page
4. Look for failed requests (red status codes)

## Common Issues & Solutions

### Issue: "Module not found"
**Solution**: Run `npm install` to install missing dependencies

### Issue: "Port already in use"
**Solution**: The server will automatically use port 5174 instead of 5173

### Issue: "Invalid WalletConnect Project ID"
**Solution**: Already fixed in `.env` with placeholder ID

### Issue: Components not rendering
**Solution**: Error boundary will catch and display the error

## Manual Testing Steps

### Test 1: Basic React
Create a minimal test file:
```bash
# Already created: src/App-test.jsx
```

### Test 2: Check Individual Components
Test each component separately:
```jsx
// In App.jsx, comment out components one by one
// to find which one is causing issues
```

### Test 3: Disable Wagmi
Temporarily remove Wagmi providers from `main.jsx` to test if that's the issue.

## Files Modified

1. ✅ `src/App.jsx` - Complete routing restructure
2. ✅ `src/main.jsx` - Fixed WalletConnect config
3. ✅ `.env` - Fixed project ID format
4. ✅ `src/components/ErrorBoundary.jsx` - New error handler
5. ✅ `src/App-backup.jsx` - Backup of original
6. ✅ `src/App-test.jsx` - Minimal test version

## Quick Diagnostic Commands

```bash
# Check if dev server is running
netstat -ano | findstr :5174

# Restart dev server
# Press Ctrl+C in terminal, then:
npm run dev

# Clear npm cache if needed
npm cache clean --force
npm install

# Check for TypeScript errors
npm run type-check
```

## Get Real WalletConnect Project ID

For production, you need a real project ID:

1. Go to https://cloud.walletconnect.com
2. Sign up / Log in
3. Create a new project
4. Copy the Project ID
5. Update `.env`:
   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_real_project_id_here
   ```

## Next Steps

1. **If you see the site**: Great! Test all navigation links
2. **If you see an error**: Share the error message
3. **If still blank**: Check browser console (F12) and share errors

## Emergency Reset

If nothing works, reset to a known good state:

```bash
# Stop dev server (Ctrl+C)

# Clean install
rm -rf node_modules package-lock.json
npm install

# Restart
npm run dev
```

## Contact Points

- Check `docs/CRITICAL_AUDIT_REPORT.md` for known issues
- Check `ROUTING_FIX.md` for routing details
- Browser console (F12) for runtime errors
- Terminal output for build errors

---

**Last Updated**: November 11, 2025  
**Status**: Fixes applied, awaiting confirmation  
**Dev Server**: http://localhost:5174/

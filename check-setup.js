#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔍 Checking DAO Dashboard Setup...\n');

let hasErrors = false;

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found');
  console.log('   Create .env file and add your WalletConnect Project ID\n');
  hasErrors = true;
} else {
  console.log('✅ .env file exists');
  
  // Check WalletConnect Project ID
  const envContent = fs.readFileSync(envPath, 'utf8');
  const wcMatch = envContent.match(/VITE_WALLETCONNECT_PROJECT_ID=(.+)/);
  
  if (!wcMatch || !wcMatch[1] || wcMatch[1].includes('demo') || wcMatch[1].includes('replace')) {
    console.log('⚠️  WalletConnect Project ID not configured');
    console.log('   Get your Project ID from: https://cloud.walletconnect.com\n');
    hasErrors = true;
  } else {
    console.log('✅ WalletConnect Project ID configured');
  }
}

// Check node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules not found');
  console.log('   Run: npm install\n');
  hasErrors = true;
} else {
  console.log('✅ Dependencies installed');
}

// Check key files
const keyFiles = [
  'src/main.jsx',
  'src/App.jsx',
  'src/pages/Home.jsx',
  'src/components/layout/Navbar/Navbar.jsx',
  'package.json',
  'vite.config.js'
];

let allFilesExist = true;
keyFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    console.log(`❌ Missing file: ${file}`);
    allFilesExist = false;
    hasErrors = true;
  }
});

if (allFilesExist) {
  console.log('✅ All core files present');
}

console.log('\n' + '='.repeat(50) + '\n');

if (hasErrors) {
  console.log('⚠️  Setup incomplete. Please fix the issues above.\n');
  console.log('Quick fixes:');
  console.log('1. Run: npm install');
  console.log('2. Create .env file');
  console.log('3. Get WalletConnect ID from: https://cloud.walletconnect.com');
  console.log('4. Add to .env: VITE_WALLETCONNECT_PROJECT_ID=your_id\n');
  process.exit(1);
} else {
  console.log('✅ Setup looks good! Ready to start.\n');
  console.log('Run: npm run dev\n');
  process.exit(0);
}

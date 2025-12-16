import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Toaster } from 'react-hot-toast';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';
import App from './App';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

// Get WalletConnect project ID from env (use a valid format placeholder)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'a01e2f3b4c5d6e7f8g9h0i1j2k3l4m5n';

// Configure Wagmi with RainbowKit
const config = getDefaultConfig({
  appName: 'DAO 2.0 Dashboard',
  projectId: projectId,
  chains: [sepolia, mainnet, hardhat],
  ssr: false,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#8B5CF6',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
          showRecentTransactions={true}
        >
          <App />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#161B22',
                color: '#F8F8F8',
                border: '1px solid #30363d',
              },
              success: {
                duration: 4000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#F8F8F8',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#F8F8F8',
                },
              },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

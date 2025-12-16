import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { Toaster } from 'react-hot-toast';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import App from './App';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Configure wagmi with proper error handling
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '0000000000000000000000000000000';

const config = getDefaultConfig({
  appName: 'DAO 2.0 Dashboard',
  projectId: projectId,
  chains: [mainnet, sepolia],
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
          })}
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
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#F8F8F8',
                },
              },
              error: {
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

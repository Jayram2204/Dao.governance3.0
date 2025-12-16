import React from 'react';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const wcProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo_project_id';

const wagmiConfig = getDefaultConfig({
  appName: import.meta.env.VITE_APP_NAME || 'DAO 2.0 Dashboard',
  projectId: wcProjectId,
  chains: [mainnet, sepolia],
  ssr: false,
});

export const withWagmi = (children) => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default wagmiConfig;

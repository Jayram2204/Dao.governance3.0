import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { supportedChains } from './chains';

export const wagmiConfig = getDefaultConfig({
  appName: import.meta.env.VITE_APP_NAME || 'DAO 2.0 Dashboard',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo',
  chains: supportedChains,
  ssr: false,
});

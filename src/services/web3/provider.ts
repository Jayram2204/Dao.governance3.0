import { BrowserProvider, JsonRpcProvider, type Provider } from 'ethers';

/**
 * Return an ethers Provider.
 * If a browser injected provider is provided (MetaMask), use a BrowserProvider
 * otherwise fall back to a JSON RPC provider from env.
 */
export const getProvider = (injectedProvider?: any): Provider => {
  if (injectedProvider) {
    return new BrowserProvider(injectedProvider);
  }

  const rpcUrl = (import.meta.env.VITE_RPC_URL as string) || 'https://rpc.ankr.com/eth';
  return new JsonRpcProvider(rpcUrl);
};

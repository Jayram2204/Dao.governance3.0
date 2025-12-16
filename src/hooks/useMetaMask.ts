import { useEffect, useState, useCallback } from 'react';
import type { Provider } from 'ethers';
import { getProvider } from '@/services/web3/provider';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetaMask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const connect = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request accounts
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const addr = accounts && accounts.length ? accounts[0] : null;

      const prov = getProvider(window.ethereum);

      // ethers v6: BrowserProvider.getNetwork isn't available synchronously, use request
      const networkHex = await window.ethereum.request({ method: 'eth_chainId' });
      const numericChain = parseInt(networkHex as string, 16);

      setAccount(addr);
      setProvider(prov);
      setChainId(numericChain);

      // listeners
      window.ethereum.on?.('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on?.('chainChanged', (chainHex: string) => {
        setChainId(parseInt(chainHex, 16));
      });
    } catch (err) {
      console.error('useMetaMask.connect error', err);
      throw err;
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setChainId(null);
  }, []);

  // Auto-detect provider on mount
  useEffect(() => {
    if (window.ethereum) {
      setProvider(getProvider(window.ethereum));

      // populate current accounts if already connected
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        setAccount(accounts && accounts.length ? accounts[0] : null);
      }).catch(() => {});

      window.ethereum.request({ method: 'eth_chainId' }).then((chainHex: string) => {
        setChainId(parseInt(chainHex, 16));
      }).catch(() => {});
    }
  }, []);

  return { connect, disconnect, account, provider, chainId } as const;
};

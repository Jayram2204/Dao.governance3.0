import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWalletStore = create(
  persist(
    (set, get) => ({
      // State
      isConnected: false,
      address: null,
      chainId: null,
      balance: '0',
      ensName: null,
      
      // Actions
      setConnected: (connected) => set({ isConnected: connected }),
      
      setAddress: (address) => set({ address }),
      
      setChainId: (chainId) => set({ chainId }),
      
      setBalance: (balance) => set({ balance }),
      
      setEnsName: (ensName) => set({ ensName }),
      
      disconnect: () => set({
        isConnected: false,
        address: null,
        chainId: null,
        balance: '0',
        ensName: null,
      }),
      
      // Getters
      getShortAddress: () => {
        const { address } = get();
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
      },
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        address: state.address,
        ensName: state.ensName,
      }),
    }
  )
);

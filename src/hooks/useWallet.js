import { useAccount, useBalance, useEnsName, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useWalletStore } from '@store/useWalletStore';

export const useWallet = () => {
  const { address, isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });
  const { disconnect: wagmiDisconnect } = useDisconnect();
  
  const {
    setConnected,
    setAddress,
    setChainId,
    setBalance,
    setEnsName,
    disconnect: storeDisconnect,
    getShortAddress,
  } = useWalletStore();
  
  useEffect(() => {
    setConnected(isConnected);
    setAddress(address || null);
    setChainId(chainId || null);
  }, [isConnected, address, chainId, setConnected, setAddress, setChainId]);
  
  useEffect(() => {
    if (balance) {
      setBalance(balance.formatted);
    }
  }, [balance, setBalance]);
  
  useEffect(() => {
    if (ensName) {
      setEnsName(ensName);
    }
  }, [ensName, setEnsName]);
  
  const disconnect = () => {
    wagmiDisconnect();
    storeDisconnect();
  };
  
  return {
    address,
    isConnected,
    chainId,
    balance: balance?.formatted || '0',
    balanceSymbol: balance?.symbol || 'ETH',
    ensName,
    shortAddress: getShortAddress(),
    disconnect,
  };
};

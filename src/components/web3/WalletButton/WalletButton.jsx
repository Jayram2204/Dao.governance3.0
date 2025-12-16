import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Button } from '../../ui/Button/Button';
import './WalletButton.css';

export const WalletButton = () => {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  // If the Privy SDK is not yet ready, show loading
  if (!ready) {
    return <Button disabled>Loading...</Button>;
  }

  // If user is not authenticated, show the "Connect" button
  if (!authenticated) {
    return (
      <Button onClick={login} className="wallet-connect-button">
        Connect Wallet
      </Button>
    );
  }

  // If authenticated, display user's primary wallet info and a logout button
  const primaryWallet = wallets[0];
  const address = primaryWallet?.address;

  // Format the address for display
  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : 'Wallet Connected';

  return (
    <div className="wallet-info-container">
      <span className="wallet-display-address">{displayAddress}</span>
      <Button onClick={logout} className="wallet-disconnect-button secondary">
        Logout
      </Button>
    </div>
  );
};

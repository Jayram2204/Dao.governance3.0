export interface WalletState {
  address: string | null;
  chainId: number | null;
  balance: string;
  connected: boolean;
}

export type Nullable<T> = T | null;

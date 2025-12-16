interface ImportMetaEnv {
  readonly VITE_RPC_URL?: string;
  readonly VITE_INFURA_ID?: string;
  readonly VITE_CONTRACT_ADDRESS?: string;
  readonly VITE_CHAIN_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

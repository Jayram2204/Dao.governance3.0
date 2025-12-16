import { mainnet, sepolia, polygon, polygonMumbai } from 'wagmi/chains';

export const supportedChains = [
  mainnet,
  sepolia,
  polygon,
  polygonMumbai
];

export const defaultChain = sepolia;

export const chainConfig = {
  [mainnet.id]: {
    name: 'Ethereum Mainnet',
    rpcUrl: import.meta.env.VITE_MAINNET_RPC_URL || 'https://eth.llamarpc.com',
    blockExplorer: 'https://etherscan.io',
  },
  [sepolia.id]: {
    name: 'Sepolia Testnet',
    rpcUrl: import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org',
    blockExplorer: 'https://sepolia.etherscan.io',
  },
  [polygon.id]: {
    name: 'Polygon',
    rpcUrl: import.meta.env.VITE_POLYGON_RPC_URL || 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
  },
};

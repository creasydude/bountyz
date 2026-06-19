import { createPublicClient, http, formatEther } from 'viem';
import { mainnet, base, polygon } from 'viem/chains';

// Supported chains
export const SUPPORTED_CHAINS = {
  mainnet,
  base,
  polygon,
} as const;

// Create a public client for chain interactions
export function createChainClient(chainId: number) {
  const chain = Object.values(SUPPORTED_CHAINS).find(c => c.id === chainId);
  if (!chain) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  return createPublicClient({
    chain,
    transport: http(),
  });
}

// Format wei to ether with specified decimals
export function formatWeiToEther(wei: bigint, decimals: number = 4): string {
  const ether = formatEther(wei);
  return parseFloat(ether).toFixed(decimals);
}

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Shorten address for display
export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

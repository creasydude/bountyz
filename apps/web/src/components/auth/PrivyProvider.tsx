'use client';

import { PrivyProvider as PrivyAuthProvider } from '@privy-io/react-auth';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, polygon, base } from 'viem/chains';

// Configure supported chains
const supportedChains = [mainnet, polygon, base];

// Wagmi configuration
const wagmiConfig = {
  chains: supportedChains,
  ssr: false,
};

// Create query client
const queryClient = new QueryClient();

interface PrivyProviderProps {
  children: React.ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is not set');
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>
        <PrivyAuthProvider
          appId={appId}
          config={{
            loginMethods: ['email', 'google', 'discord', 'github', 'wallet'],
            appearance: {
              theme: 'dark',
              accentColor: '#00F5FF',
            },
            embeddedWallets: {
              createOnLogin: 'all-users',
            },
          }}
        >
          {children}
        </PrivyAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

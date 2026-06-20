'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
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

interface PrivyProviderProps {
  children: ReactNode;
}

// Error boundary component
class PrivyErrorBoundary extends React.Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Privy error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Loading component
function PrivyLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Initializing authentication...</p>
      </div>
    </div>
  );
}

// Error fallback component
function PrivyErrorFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Authentication Error</h2>
        <p className="text-gray-400 mb-4">Failed to initialize authentication service.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const [queryClient] = useState(() => new QueryClient());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Mark as initialized after component mounts
    setIsInitialized(true);
  }, []);

  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is not set');
    return <>{children}</>;
  }

  if (!isInitialized) {
    return <PrivyLoading />;
  }

  return (
    <PrivyErrorBoundary fallback={<PrivyErrorFallback />}>
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
    </PrivyErrorBoundary>
  );
}

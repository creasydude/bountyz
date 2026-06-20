'use client';

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

const REDIRECT_PATH = process.env.NEXT_PUBLIC_AFTER_AUTH_REDIRECT || '/dashboard';

export function SignUpForm() {
  const { ready, authenticated, login, connectWallet } = usePrivy();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  // Redirect after successful sign-up using useEffect
  useEffect(() => {
    if (authenticated) {
      router.push(REDIRECT_PATH);
    }
  }, [authenticated, router]);

  const handleEmailSignUp = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await login();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign up with email';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await connectWallet();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await login({ provider });
    } catch (err) {
      const message = err instanceof Error ? err.message : `Failed to sign up with ${provider}`;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!ready) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Sign Up for bountyZ
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
            aria-label="Email address"
          />
        </div>

        {/* Email Sign Up */}
        <button
          onClick={handleEmailSignUp}
          disabled={isLoading || !email}
          className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors"
          aria-label="Sign up with email"
        >
          {isLoading ? 'Loading...' : 'Sign up with Email'}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">or</span>
          </div>
        </div>

        {/* Wallet Connection */}
        <button
          onClick={handleWalletConnect}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          aria-label="Connect wallet"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded-lg transition-colors"
            aria-label="Sign up with Google"
          >
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('discord')}
            disabled={isLoading}
            className="py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded-lg transition-colors"
            aria-label="Sign up with Discord"
          >
            Discord
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
            className="py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded-lg transition-colors"
            aria-label="Sign up with GitHub"
          >
            GitHub
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}

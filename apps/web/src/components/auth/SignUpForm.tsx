'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export function SignUpForm() {
  const { ready, authenticated, login, connectWallet } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignUp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await login();
    } catch (err) {
      setError('Failed to sign up with email');
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
      setError('Failed to connect wallet');
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

  if (authenticated) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome!</h2>
        <p className="text-gray-400">You are successfully signed up.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Sign Up for bountyZ
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Email/Social Login */}
        <button
          onClick={handleEmailSignUp}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors"
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
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => login({ provider: 'google' })}
            disabled={isLoading}
            className="py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Google
          </button>
          <button
            onClick={() => login({ provider: 'discord' })}
            disabled={isLoading}
            className="py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Discord
          </button>
          <button
            onClick={() => login({ provider: 'github' })}
            disabled={isLoading}
            className="py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded-lg transition-colors"
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

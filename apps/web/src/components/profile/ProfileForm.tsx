'use client';

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface Profile {
  id: number;
  username: string | null;
  avatarUrl: string | null;
  email?: string;
  walletAddress?: string;
}

export function ProfileForm() {
  const { authenticated, getAccessToken } = usePrivy();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (authenticated) {
      fetchProfile();
    }
  }, [authenticated]);

  const fetchProfile = async () => {
    try {
      const token = await getAccessToken();
      const response = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data.data);
      setUsername(data.data.username || '');
      setAvatarUrl(data.data.avatarUrl || '');
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = await getAccessToken();
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, avatarUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfile(data.data);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const token = await getAccessToken();
      const response = await fetch('/api/profile', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      // Redirect to home page after deletion
      window.location.href = '/';
    } catch (err) {
      setError('Failed to delete profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Your Profile
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded text-green-200 text-sm" role="status">
          {success}
        </div>
      )}

      <div className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={isSaving}
            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-300 mb-1">
            Avatar URL
          </label>
          <input
            id="avatar"
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            disabled={isSaving}
            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
          />
        </div>

        {/* Email (read-only) */}
        {profile?.email && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>
        )}

        {/* Wallet Address (read-only) */}
        {profile?.walletAddress && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              value={profile.walletAddress}
              disabled
              className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isSaving}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors"
        >
          {isSaving ? 'Processing...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

function generateAppKey(): string {
  const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
  return `ATV-${uuid.slice(0, 4)}-${uuid.slice(4, 8)}`;
}

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  // Redirect already-logged-in users, but not while a registration is in progress
  // (auth state fires before Firestore writes complete, causing a premature redirect)
  useEffect(() => {
    if (!authLoading && user && !isRegistering) router.replace('/dashboard');
  }, [user, authLoading, router, isRegistering]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setIsRegistering(true);
    try {
      if (!auth || !db) throw new Error('Firebase is not configured.');
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(user, { displayName: form.name });
      const app_key = generateAppKey();
      const now = Timestamp.now();

      // User profile
      await setDoc(doc(db, 'users', user.uid, 'profile', 'data'), {
        name: form.name,
        surname: form.surname,
        email: form.email,
        app_key,
        created_at: now,
      });

      // Reverse lookup: app_key → uid (AWS uses this for O(1) user resolution)
      await setDoc(doc(db, 'app_keys', app_key), {
        uid: user.uid,
        created_at: now,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      setIsRegistering(false);
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      if (msg.includes('email-already-in-use')) {
        setError('An account with this email already exists.');
      } else if (msg.includes('weak-password')) {
        setError('Password must be at least 6 characters.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Image src="/logo.png" alt="AuraTwin" width={48} height={48} className="rounded-xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Join AuraTwin and start tracking your emotions</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ali"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  value={form.surname}
                  onChange={handleChange}
                  required
                  placeholder="Yılmaz"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              />
            </div>

            {/* Terms checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 accent-primary-600 flex-shrink-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

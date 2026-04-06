'use client';

import { useState, useEffect } from 'react';

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-white border border-black/10 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-center font-mono">🔒 Admin Access Required</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-medium">Incorrect password.</p>}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all font-mono tracking-widest"
          >
            UNLOCK
          </button>
        </form>
      </div>
    </div>
  );
}

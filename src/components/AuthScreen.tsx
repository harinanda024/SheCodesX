import React, { useState } from 'react';
import { DemoUser } from '../types';
import { HeaderBrand } from './HeaderBrand';

interface AuthScreenProps {
  initialMode?: 'login' | 'signup';
  onSuccess: (user: DemoUser) => void;
  onBack: () => void;
  onToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onSuccess,
  onBack,
  onToast,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    let accounts: Record<string, { name: string; password: string }> = {};
    try {
      accounts = JSON.parse(localStorage.getItem('ss_demo_accounts_v1') || '{}');
    } catch {
      accounts = {};
    }

    if (mode === 'signup') {
      const cleanName = name.trim();
      if (!cleanName) {
        onToast('Please enter your name.');
        return;
      }
      if (accounts[cleanEmail]) {
        onToast('An account with this email already exists. Try logging in.');
        return;
      }

      accounts[cleanEmail] = { name: cleanName, password };
      localStorage.setItem('ss_demo_accounts_v1', JSON.stringify(accounts));

      const newUser: DemoUser = { name: cleanName, email: cleanEmail };
      localStorage.setItem('ss_demo_user_v1', JSON.stringify(newUser));
      onSuccess(newUser);
      onToast('Demo account created! Welcome to Sadak Saathi.');
    } else {
      // In login mode
      if (accounts[cleanEmail] && accounts[cleanEmail].password === password) {
        const loggedUser: DemoUser = {
          name: accounts[cleanEmail].name,
          email: cleanEmail,
        };
        localStorage.setItem('ss_demo_user_v1', JSON.stringify(loggedUser));
        onSuccess(loggedUser);
        onToast(`Welcome back, ${loggedUser.name}!`);
      } else {
        // If no user exists yet, offer quick demo onboarding
        if (Object.keys(accounts).length === 0) {
          // Pre-seed a friendly user
          const demoUser: DemoUser = {
            name: email.split('@')[0] || 'Community Citizen',
            email: cleanEmail,
          };
          accounts[cleanEmail] = { name: demoUser.name, password };
          localStorage.setItem('ss_demo_accounts_v1', JSON.stringify(accounts));
          localStorage.setItem('ss_demo_user_v1', JSON.stringify(demoUser));
          onSuccess(demoUser);
          onToast('Logged into demo session.');
        } else {
          onToast('Incorrect password or account not found. Click "Create account" to sign up.');
        }
      }
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-[#17251e]">
      {/* Decorative Sidebar */}
      <aside className="auth-side hidden lg:flex flex-col justify-between p-12 lg:p-16 bg-gradient-to-br from-[#132b72] via-[#087f8c] to-[#16a878] text-white">
        <HeaderBrand
          imgClassName="w-11 h-11"
          textClassName="text-2xl text-white font-extrabold"
        />

        <div className="max-w-md my-auto">
          <span className="text-xs uppercase tracking-widest text-[#d9f99d] font-extrabold mb-2 block">
            Better streets, together
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Small reports.
            <br />
            Real-world impact.
          </h2>
          <p className="text-slate-100/90 text-base leading-relaxed">
            Report hazards in seconds, prioritize urgent safety fixes, and keep repair progress transparent across your community.
          </p>
        </div>

        <div className="text-xs text-white/60">Sadak Saathi · Hackathon Demo Prototype</div>
      </aside>

      {/* Auth Card Main */}
      <main className="flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md">
          <button
            onClick={onBack}
            className="text-xs font-bold text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-1.5 transition"
          >
            ← Back to intro
          </button>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-1.5">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            {mode === 'login'
              ? 'Log in to your Sadak Saathi demo account.'
              : 'Join your community and start reporting neighborhood road hazards.'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2 text-xs font-bold rounded-xl transition ${
                mode === 'login' ? 'bg-white text-[#18794e] shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`py-2 text-xs font-bold rounded-xl transition ${
                mode === 'signup' ? 'bg-white text-[#18794e] shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harini Nair"
                  required={mode === 'signup'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 transition"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 4 characters"
                minLength={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#18794e] to-[#087f8c] hover:brightness-105 active:scale-[0.99] text-white font-extrabold text-sm rounded-xl transition shadow-md shadow-emerald-950/20"
            >
              {mode === 'login' ? 'Log in →' : 'Create account →'}
            </button>
          </form>

          {/* Demo disclaimer */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900 leading-relaxed">
            <span className="font-bold">Hackathon Demo Notice:</span> Accounts are stored securely in this browser's local storage for prototype testing. No external server receives your credentials.
          </div>
        </div>
      </main>
    </section>
  );
};

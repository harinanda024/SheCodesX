import React, { useState } from 'react';
import { DemoUser } from '../types';
import { AppTranslation } from '../translations';

interface ProfileViewProps {
  user: DemoUser;
  t: AppTranslation;
  onUpdateName: (newName: string) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  t,
  onUpdateName,
  onLogout,
}) => {
  const [name, setName] = useState(user.name);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onUpdateName(name.trim());
  };

  return (
    <div className="max-w-xl bg-white rounded-3xl border border-[#e1e6f5] shadow-sm p-6 sm:p-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d9f99d] to-[#67e8f9] text-[#12304a] font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">{user.name}</h3>
          <p className="text-xs text-gray-500 font-mono truncate">{user.email}</p>
          <span className="inline-block mt-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Active Community Member
          </span>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="py-6 space-y-4 border-b border-gray-100">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-[#18794e] hover:bg-[#0f5c3a] text-white text-xs font-bold rounded-xl transition shadow-sm"
        >
          Save profile
        </button>
      </form>

      {/* Prototype Notice & Privacy */}
      <div className="pt-6 space-y-4">
        <h4 className="text-sm font-bold text-gray-900">Privacy & Demo Information</h4>
        <p className="text-xs text-gray-500 leading-relaxed">
          Sadak Saathi is an open civic safety prototype. All reports and login credentials are stored solely in your local browser’s storage (`localStorage`). No real government, municipal, or emergency services are currently linked.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 border border-gray-300 hover:border-red-400 text-red-600 hover:text-red-700 text-xs font-bold rounded-xl transition bg-white"
          >
            {t.logOut}
          </button>
        </div>
      </div>
    </div>
  );
};

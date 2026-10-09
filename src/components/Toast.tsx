import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      onClick={onClose}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] md:max-w-md bg-gradient-to-r from-[#173e2b] to-[#087f8c] text-white px-5 py-3 rounded-2xl shadow-xl shadow-green-950/20 text-xs md:text-sm font-medium cursor-pointer animate-fade-in flex items-center justify-between gap-3 border border-emerald-500/20"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="text-white/70 hover:text-white text-base font-bold leading-none px-1"
      >
        ×
      </button>
    </div>
  );
};

import React from 'react';
import { HeaderBrand } from './HeaderBrand';

interface IntroScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onGetStarted, onLogin }) => {
  return (
    <section className="min-h-screen splash grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] text-white">
      {/* Left Copy Column */}
      <div className="splash-copy p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
        <HeaderBrand
          className="mb-8"
          imgClassName="w-12 h-12 lg:w-14 lg:h-14"
          textClassName="text-2xl lg:text-3xl"
        />

        <div className="eyebrow text-xs uppercase tracking-[2px] text-[#d9f99d] font-extrabold mb-3">
          Community-powered street safety
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] my-4">
          Safer streets
          <br />
          start with you.
        </h1>

        <p className="text-slate-100/90 text-base sm:text-lg max-w-lg leading-relaxed font-normal mb-8">
          Spot a hazard? Report it in seconds. Help your community surface urgent road risks like open manholes, potholes, and broken footpaths, and follow repairs from report to resolution.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md">
          <button
            onClick={onGetStarted}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d9f99d] to-[#67e8f9] text-[#12304a] font-extrabold text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-cyan-950/20"
          >
            Get started&nbsp; →
          </button>
          <button
            onClick={onLogin}
            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 hover:border-white/40 transition backdrop-blur-sm"
          >
            I already have an account
          </button>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 text-xs text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>A civic civic tech prototype for safer, cleaner neighborhood streets.</span>
        </div>
      </div>

      {/* Right Art / Interactive Preview Column */}
      <div className="splash-art flex items-center justify-center p-6 sm:p-12 lg:p-16 overflow-hidden">
        <div className="art-card w-full max-w-[390px] aspect-[0.85] rounded-[32px] bg-[#f8fbf8] text-[#17251e] p-6 sm:p-7 shadow-2xl shadow-emerald-950/40 border border-white/60 relative">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 mb-2">
            <span className="tracking-wider uppercase">COMMUNITY WATCH</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              LIVE PREVIEW
            </span>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mt-2 mb-4 leading-tight">
            Your neighborhood,
            <br />
            safer together.
          </h3>

          {/* Mini Simulated Map with Pins */}
          <div className="mini-map h-48 my-3.5 rounded-2xl relative overflow-hidden bg-[#e4eee5] border border-emerald-900/10 shadow-inner">
            <div
              className="map-pin absolute left-[24%] top-[25%] bg-[#d94b48] border-2 border-white text-white rounded-[50%_50%_50%_0] w-8 h-8 flex items-center justify-center -rotate-45 shadow-md"
              title="High priority risk"
            >
              <span className="rotate-45 font-bold text-xs">!</span>
            </div>
            <div
              className="map-pin absolute left-[65%] top-[52%] bg-[#d99a24] border-2 border-white text-white rounded-[50%_50%_50%_0] w-8 h-8 flex items-center justify-center -rotate-45 shadow-md"
              title="Medium risk"
            >
              <span className="rotate-45 font-bold text-xs">!</span>
            </div>
            <div
              className="map-pin absolute left-[42%] top-[68%] bg-[#18794e] border-2 border-white text-white rounded-[50%_50%_50%_0] w-8 h-8 flex items-center justify-center -rotate-45 shadow-md"
              title="Resolved"
            >
              <span className="rotate-45 font-bold text-xs">✓</span>
            </div>
          </div>

          {/* Issue Preview Chip */}
          <div className="issue-preview p-3.5 border border-[#e6ece7] rounded-2xl flex items-center gap-3 bg-white/90 shadow-sm mt-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-xl flex items-center justify-center shrink-0">
              🕳️
            </div>
            <div className="min-w-0 flex-1">
              <strong className="text-xs font-bold block text-gray-900 truncate">
                Road hazard reported
              </strong>
              <small className="text-[11px] text-gray-500 block truncate mt-0.5">
                MG Road Pedestrian Path · Needs attention
              </small>
            </div>
            <span className="text-[10px] font-extrabold text-[#c83f42] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full shrink-0">
              HIGH
            </span>
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 mt-5 uppercase tracking-widest">
            <span>1. REPORT</span>
            <span>2. PRIORITIZE</span>
            <span>3. RESOLVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

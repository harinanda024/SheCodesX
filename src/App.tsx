import React, { useEffect, useState } from 'react';
import { DemoUser, HazardReport, LanguageCode, ReportStatus } from './types';
import { translations, languageNames, hazardIcons } from './translations';
import { initialDemoReports } from './demoData';
import { HeaderBrand } from './components/HeaderBrand';
import { IntroScreen } from './components/IntroScreen';
import { AuthScreen } from './components/AuthScreen';
import { LeafletMap } from './components/LeafletMap';
import { ReportForm } from './components/ReportForm';
import { IssuesList } from './components/IssuesList';
import { ProfileView } from './components/ProfileView';
import { EvidenceModal } from './components/EvidenceModal';
import { Toast } from './components/Toast';

const USER_KEY = 'ss_demo_user_v1';
const REPORT_KEY = 'ss_demo_reports_v1';
const LANG_KEY = 'ss_language';

type Screen = 'intro' | 'auth-login' | 'auth-signup' | 'app';
type AppPage = 'home' | 'report' | 'issues' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [user, setUser] = useState<DemoUser | null>(null);
  const [reports, setReports] = useState<HazardReport[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null);

  // Initialize data from localStorage
  useEffect(() => {
    // 1. Language
    const savedLang = localStorage.getItem(LANG_KEY) as LanguageCode | null;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }

    // 2. User
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setScreen('app');
      }
    } catch {
      // ignore
    }

    // 3. Reports
    try {
      const savedReports = localStorage.getItem(REPORT_KEY);
      if (savedReports) {
        const parsed: HazardReport[] = JSON.parse(savedReports);
        setReports(parsed.length > 0 ? parsed : initialDemoReports);
      } else {
        setReports(initialDemoReports);
        localStorage.setItem(REPORT_KEY, JSON.stringify(initialDemoReports));
      }
    } catch {
      setReports(initialDemoReports);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
    localStorage.setItem(LANG_KEY, newLang);
    document.documentElement.lang = newLang;
  };

  const handleSaveReports = (newReports: HazardReport[]) => {
    setReports(newReports);
    try {
      localStorage.setItem(REPORT_KEY, JSON.stringify(newReports));
    } catch {
      showToast('Storage limit reached. Try using smaller photos.');
    }
  };

  const handleAddReport = (report: HazardReport) => {
    const updated = [report, ...reports];
    handleSaveReports(updated);
    setActivePage('issues');
    showToast('Hazard report saved on this device!');
  };

  const handleStatusChange = (id: string, newStatus: ReportStatus) => {
    const updated = reports.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    handleSaveReports(updated);
    showToast(`Status updated to "${newStatus}"`);
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport({ ...selectedReport, status: newStatus });
    }
  };

  const handleAttachResolutionPhoto = (id: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      if (file.size > 450000) {
        showToast('Choose an image under 450 KB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const updated = reports.map((r) =>
            r.id === id
              ? {
                  ...r,
                  repairPhoto: reader.result as string,
                  status: 'Resolved' as ReportStatus,
                }
              : r
          );
          handleSaveReports(updated);
          showToast('Resolved with after-repair photo evidence!');
          if (selectedReport && selectedReport.id === id) {
            setSelectedReport({
              ...selectedReport,
              repairPhoto: reader.result as string,
              status: 'Resolved',
            });
          }
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleDeleteReport = (id: string) => {
    if (!window.confirm('Delete this report?')) return;
    const updated = reports.filter((r) => r.id !== id);
    handleSaveReports(updated);
    showToast('Report deleted.');
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setScreen('intro');
    showToast('Logged out of demo session.');
  };

  const handleUpdateUserName = (newName: string) => {
    if (!user) return;
    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    showToast('Profile updated!');
  };

  const t = translations[language] || translations.en;

  // Stats calculation
  const totalCount = reports.length;
  const highPriorityCount = reports.filter(
    (r) =>
      r.status !== 'Resolved' &&
      (r.severity === 'High' || r.type === 'Open manhole' || r.type === 'Exposed electrical wire')
  ).length;
  const inProgressCount = reports.filter((r) => r.status === 'In progress').length;
  const resolvedCount = reports.filter((r) => r.status === 'Resolved').length;

  // 1. Intro Screen
  if (screen === 'intro') {
    return (
      <div className="relative">
        <IntroScreen
          onGetStarted={() => setScreen('auth-signup')}
          onLogin={() => setScreen('auth-login')}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    );
  }

  // 2. Auth Screen
  if (screen === 'auth-login' || screen === 'auth-signup') {
    return (
      <div className="relative">
        <AuthScreen
          initialMode={screen === 'auth-signup' ? 'signup' : 'login'}
          onSuccess={(u) => {
            setUser(u);
            setScreen('app');
          }}
          onBack={() => setScreen('intro')}
          onToast={showToast}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    );
  }

  // 3. Main Dashboard & App Shell
  return (
    <div className="min-h-screen bg-[#f3f5ff] text-[#17213b] flex flex-col antialiased">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Desktop / Tablet Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white/90 backdrop-blur-md border-r border-[#e1e6f5] p-6 flex-col fixed inset-y-0 left-0 z-30 shadow-xs">
          <HeaderBrand className="mb-6" />

          {/* Language selector in sidebar */}
          <div className="mb-6 p-3 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100">
            <label className="block text-[10px] font-extrabold text-indigo-900 mb-1.5 uppercase tracking-wider">
              🌐 Language
            </label>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
              className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-white border border-indigo-200 text-indigo-950 focus:outline-none"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider px-3 mb-2">
            {t.workspace}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            <button
              onClick={() => setActivePage('home')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activePage === 'home'
                  ? 'bg-emerald-50 text-[#18794e] shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <span className="text-base">⌂</span>
              <span>{t.home}</span>
            </button>

            <button
              onClick={() => setActivePage('report')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activePage === 'report'
                  ? 'bg-emerald-50 text-[#18794e] shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <span className="text-base">＋</span>
              <span>{t.report}</span>
            </button>

            <button
              onClick={() => setActivePage('issues')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activePage === 'issues'
                  ? 'bg-emerald-50 text-[#18794e] shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <span className="text-base">☷</span>
              <span>{t.issues}</span>
            </button>

            <button
              onClick={() => setActivePage('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activePage === 'profile'
                  ? 'bg-emerald-50 text-[#18794e] shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <span className="text-base">◉</span>
              <span>{t.profile}</span>
            </button>
          </nav>

          {/* User mini profile in sidebar */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2.5 mb-3 px-1">
              <div className="w-9 h-9 rounded-full bg-[#d9f99d] text-[#12304a] font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
                {user?.name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold block text-gray-900 truncate">
                  {user?.name || 'Citizen'}
                </span>
                <span className="text-[10px] text-gray-400 block truncate">Resident account</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition text-left flex items-center gap-1.5"
            >
              <span>↪</span>
              <span>{t.logOut}</span>
            </button>
          </div>
        </aside>

        {/* Mobile Top Header */}
        <header className="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <HeaderBrand imgClassName="w-8 h-8" textClassName="text-lg" />
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
              className="px-2 py-1 text-xs font-semibold rounded-lg bg-gray-100 border border-gray-200 text-gray-800"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name.split('·')[0]}
                </option>
              ))}
            </select>
            <button
              onClick={handleLogout}
              className="p-1.5 text-xs text-gray-500 hover:text-red-600 font-bold"
              title={t.logOut}
            >
              ↪
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-10 pb-24 lg:pb-12 max-w-7xl">
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-extrabold text-[#18794e] tracking-wider mb-1">
                    COMMUNITY DASHBOARD
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                    Hello, {user?.name?.split(' ')[0] || 'Community Member'} 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {t.greetingStatic}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-full whitespace-nowrap shadow-2xs">
                    ● Live Community Demo
                  </span>
                </div>
              </div>

              {/* Live Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#e1e6f5] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{t.allReports}</span>
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                      ▤
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold mt-2 text-gray-900">
                    {totalCount}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">Recorded in this browser</div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#e1e6f5] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{t.highPriority}</span>
                    <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm">
                      ⚠️
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold mt-2 text-rose-600">
                    {highPriorityCount}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">Immediate public risk</div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#e1e6f5] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{t.inProgress}</span>
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
                      🛠️
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold mt-2 text-amber-600">
                    {inProgressCount}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">Under community work</div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#e1e6f5] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{t.resolved}</span>
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
                      ✓
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold mt-2 text-emerald-600">
                    {resolvedCount}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">Marked resolved</div>
                </div>
              </div>

              {/* Two Column Layout: Map & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left (8 cols): Interactive Leaflet Map & Recent Reports */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-gray-900">{t.mapTitle}</h3>
                      <span className="text-xs text-gray-400 font-medium">{t.mapSubtitle}</span>
                    </div>
                    <LeafletMap
                      reports={reports}
                      t={t}
                      onSelectReport={(r) => setSelectedReport(r)}
                      onToast={showToast}
                    />
                  </div>

                  {/* Recent Reports List */}
                  <div className="bg-white rounded-3xl border border-[#e1e6f5] shadow-xs p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">{t.recent}</h3>
                        <p className="text-xs text-gray-500">Latest active issues from this device</p>
                      </div>
                      <button
                        onClick={() => setActivePage('issues')}
                        className="text-xs font-bold text-[#18794e] hover:underline"
                      >
                        View all →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {reports.slice(0, 4).map((r) => {
                        const isHigh =
                          r.severity === 'High' ||
                          r.type === 'Open manhole' ||
                          r.type === 'Exposed electrical wire';
                        return (
                          <div
                            key={r.id}
                            onClick={() => setSelectedReport(r)}
                            className="p-3 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/70 transition cursor-pointer flex items-center gap-3.5"
                          >
                            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg shrink-0">
                              {hazardIcons[r.type] || '📍'}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <strong className="text-xs font-bold text-gray-900 truncate">
                                  {r.type}
                                </strong>
                                {r.isDemoData && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-200">
                                    Demo
                                  </span>
                                )}
                              </div>
                              <small className="text-[11px] text-gray-500 block truncate mt-0.5">
                                📍 {r.location}
                              </small>
                            </div>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                                r.status === 'Resolved'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : isHigh
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : 'bg-amber-50 text-amber-800 border-amber-200'
                              }`}
                            >
                              {r.status === 'Resolved' ? 'RESOLVED' : r.severity.toUpperCase()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right (4 cols): Quick Actions & Explanation */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Quick Action buttons */}
                  <div className="bg-white rounded-3xl border border-[#e1e6f5] shadow-xs p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{t.quick}</h3>
                    <p className="text-xs text-gray-500 mb-4">What would you like to do right now?</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                      <button
                        onClick={() => setActivePage('report')}
                        className="p-4 rounded-2xl border border-gray-150 hover:border-[#18794e] hover:bg-emerald-50/40 text-left transition flex items-start gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#18794e] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition">
                          📸
                        </div>
                        <div>
                          <strong className="text-xs font-bold block text-gray-900">
                            {t.reportTitle}
                          </strong>
                          <span className="text-[11px] text-gray-500 leading-snug block mt-0.5">
                            Share photo, hazard type and landmark.
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => setActivePage('issues')}
                        className="p-4 rounded-2xl border border-gray-150 hover:border-[#087f8c] hover:bg-cyan-50/40 text-left transition flex items-start gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#087f8c] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition">
                          🧭
                        </div>
                        <div>
                          <strong className="text-xs font-bold block text-gray-900">
                            {t.myReports}
                          </strong>
                          <span className="text-[11px] text-gray-500 leading-snug block mt-0.5">
                            View updates, track statuses and resolutions.
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* How it works info card */}
                  <div className="bg-white rounded-3xl border border-[#e1e6f5] shadow-xs p-6 text-xs space-y-4">
                    <h3 className="text-base font-bold text-gray-900">How Sadak Saathi works</h3>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-base">📍</span>
                        <div>
                          <strong className="text-gray-900 block font-bold">1. Spot & Report</strong>
                          <span className="text-gray-500 text-[11px]">
                            Identify open manholes, potholes, wires, or waterlogging.
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-base">🚨</span>
                        <div>
                          <strong className="text-gray-900 block font-bold">2. Prioritize</strong>
                          <span className="text-gray-500 text-[11px]">
                            Immediate public dangers get highest civic visibility.
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-base">🛠️</span>
                        <div>
                          <strong className="text-gray-900 block font-bold">3. Track & Mobilize</strong>
                          <span className="text-gray-500 text-[11px]">
                            Follow the issue as community or ward teams start repair work.
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-base">✅</span>
                        <div>
                          <strong className="text-gray-900 block font-bold">4. Verify Resolution</strong>
                          <span className="text-gray-500 text-[11px]">
                            Attach photo proof once the repair is completed.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 leading-relaxed">
                      {t.prototypeNotice}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REPORT A HAZARD PAGE */}
          {activePage === 'report' && (
            <div className="space-y-6">
              <div>
                <div className="text-[10px] uppercase font-extrabold text-[#18794e] tracking-wider mb-1">
                  COMMUNITY CONTRIBUTION
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                  {t.reportTitle}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Share hazard details safely and accurately from a distance.
                </p>
              </div>

              <ReportForm
                t={t}
                currentLang={language}
                userEmail={user?.email || 'citizen@example.com'}
                onSubmit={handleAddReport}
                onToast={showToast}
              />
            </div>
          )}

          {/* MY REPORTS / ISSUES PAGE */}
          {activePage === 'issues' && (
            <div className="space-y-6">
              <div>
                <div className="text-[10px] uppercase font-extrabold text-[#18794e] tracking-wider mb-1">
                  LOCAL REPORT ARCHIVE
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                  {t.myReports}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Review all hazards logged in this browser and manage resolution evidence.
                </p>
              </div>

              <IssuesList
                reports={reports}
                t={t}
                onStatusChange={handleStatusChange}
                onAttachResolutionPhoto={handleAttachResolutionPhoto}
                onViewReport={(r) => setSelectedReport(r)}
                onDeleteReport={handleDeleteReport}
              />
            </div>
          )}

          {/* PROFILE PAGE */}
          {activePage === 'profile' && user && (
            <div className="space-y-6">
              <div>
                <div className="text-[10px] uppercase font-extrabold text-[#18794e] tracking-wider mb-1">
                  YOUR ACCOUNT
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                  {t.profile}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Manage your local demo profile and privacy preferences.
                </p>
              </div>

              <ProfileView
                user={user}
                t={t}
                onUpdateName={handleUpdateUserName}
                onLogout={handleLogout}
              />
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActivePage('home')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold transition ${
            activePage === 'home' ? 'text-[#18794e]' : 'text-gray-500'
          }`}
        >
          <span className="text-lg leading-none">⌂</span>
          <span className="mt-1">{t.home}</span>
        </button>

        <button
          onClick={() => setActivePage('report')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold transition ${
            activePage === 'report' ? 'text-[#18794e]' : 'text-gray-500'
          }`}
        >
          <span className="text-lg leading-none">＋</span>
          <span className="mt-1">{t.report}</span>
        </button>

        <button
          onClick={() => setActivePage('issues')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold transition ${
            activePage === 'issues' ? 'text-[#18794e]' : 'text-gray-500'
          }`}
        >
          <span className="text-lg leading-none">☷</span>
          <span className="mt-1">{t.issues}</span>
        </button>

        <button
          onClick={() => setActivePage('profile')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold transition ${
            activePage === 'profile' ? 'text-[#18794e]' : 'text-gray-500'
          }`}
        >
          <span className="text-lg leading-none">◉</span>
          <span className="mt-1">{t.profile}</span>
        </button>
      </nav>

      {/* Evidence Modal */}
      <EvidenceModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onStatusChange={handleStatusChange}
        onAttachResolutionPhoto={handleAttachResolutionPhoto}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

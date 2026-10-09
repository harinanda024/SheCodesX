import React, { useState } from 'react';
import { HazardReport, ReportStatus } from '../types';
import { AppTranslation, hazardIcons } from '../translations';

interface IssuesListProps {
  reports: HazardReport[];
  t: AppTranslation;
  onStatusChange: (id: string, status: ReportStatus) => void;
  onAttachResolutionPhoto: (id: string) => void;
  onViewReport: (report: HazardReport) => void;
  onDeleteReport: (id: string) => void;
}

export const IssuesList: React.FC<IssuesListProps> = ({
  reports,
  t,
  onStatusChange,
  onAttachResolutionPhoto,
  onViewReport,
  onDeleteReport,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | ReportStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports
    .filter((r) => statusFilter === 'all' || r.status === statusFilter)
    .filter((r) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        r.type.toLowerCase().includes(term) ||
        r.location.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => b.created - a.created);

  return (
    <div className="bg-white rounded-3xl border border-[#e1e6f5] shadow-sm p-6 sm:p-8">
      {/* Filters Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{t.myReports}</h3>
          <p className="text-xs text-gray-500">Track and update the status of community reports.</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reports..."
            className="text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#18794e]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | ReportStatus)}
            className="text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium focus:outline-none focus:border-[#18794e]"
          >
            <option value="all">All statuses</option>
            <option value="Open">Open</option>
            <option value="In progress">In progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="divide-y divide-gray-100 mt-2">
        {filteredReports.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400">
            {t.noReportsYet}
          </div>
        ) : (
          filteredReports.map((r) => {
            const isResolved = r.status === 'Resolved';
            const isHigh = r.type === 'Open manhole' || r.type === 'Exposed electrical wire' || r.severity === 'High';
            const isMedium = r.severity === 'Medium';

            const badgeBg = isResolved
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : isHigh
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : isMedium
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200';

            return (
              <div key={r.id} className="py-4 sm:py-5 flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                  {hazardIcons[r.type] || '📍'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <strong className="text-sm font-bold text-gray-900 truncate">
                      {r.type}
                    </strong>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                      {isResolved ? 'RESOLVED' : `${r.severity.toUpperCase()} PRIORITY`}
                    </span>
                    {r.isDemoData && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        Demo
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400 font-medium ml-auto">
                      {new Date(r.created).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 font-medium truncate mb-1">
                    📍 {r.location}
                  </p>

                  {r.description && (
                    <p className="text-xs text-gray-700 leading-relaxed line-clamp-2 mb-2">
                      {r.description}
                    </p>
                  )}

                  {/* Badges and Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-semibold text-gray-500">
                      Status: <span className="text-gray-800">{r.status}</span>
                    </span>

                    {r.repairPhoto && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        ✓ Repair photo verified
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        onClick={() => onViewReport(r)}
                        className="px-2.5 py-1 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      >
                        {t.viewEvidence}
                      </button>

                      {r.status === 'Open' && (
                        <button
                          onClick={() => onStatusChange(r.id, 'In progress')}
                          className="px-2.5 py-1 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition"
                        >
                          {t.startWork}
                        </button>
                      )}

                      {r.status !== 'Resolved' && (
                        <button
                          onClick={() => onAttachResolutionPhoto(r.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
                        >
                          {t.resolveWithPhoto}
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteReport(r.id)}
                        className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      >
                        {t.deleteReport}
                      </button>
                    </div>
                  </div>
                </div>

                {r.photo && (
                  <button
                    onClick={() => onViewReport(r)}
                    className="shrink-0 rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 transition"
                  >
                    <img
                      src={r.photo}
                      alt={r.type}
                      className="w-14 h-14 object-cover"
                    />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

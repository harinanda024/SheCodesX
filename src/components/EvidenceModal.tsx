import React from 'react';
import { HazardReport } from '../types';
import { hazardIcons } from '../translations';

interface EvidenceModalProps {
  report: HazardReport | null;
  onClose: () => void;
  onStatusChange?: (id: string, status: 'Open' | 'In progress' | 'Resolved') => void;
  onAttachResolutionPhoto?: (id: string) => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  report,
  onClose,
  onStatusChange,
  onAttachResolutionPhoto,
}) => {
  if (!report) return null;

  const score =
    report.type === 'Open manhole' || report.type === 'Exposed electrical wire' || report.severity === 'High'
      ? 90
      : report.severity === 'Medium'
      ? 55
      : 25;

  const badgeColor =
    report.status === 'Resolved'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
      : score >= 80
      ? 'bg-rose-100 text-rose-800 border-rose-300'
      : score >= 50
      ? 'bg-amber-100 text-amber-800 border-amber-300'
      : 'bg-emerald-100 text-emerald-800 border-emerald-300';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-7 relative border border-gray-100 text-[#17251e]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition"
        >
          ×
        </button>

        <div className="flex items-start gap-3.5 mb-4 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-2xl shrink-0 shadow-sm">
            {hazardIcons[report.type] || '📍'}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">{report.type}</h2>
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                {report.status === 'Resolved' ? 'RESOLVED' : `${report.severity.toUpperCase()} PRIORITY`}
              </span>
              {report.isDemoData && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Demo Data
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 font-medium">📍 {report.location}</p>
          </div>
        </div>

        {report.description && (
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 mb-5">
            <h4 className="text-xs font-semibold text-gray-600 mb-1">Details from Community Report</h4>
            <p className="text-sm text-gray-800 leading-relaxed">{report.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-xs mb-5">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-0.5">Status</span>
            <span className="font-bold text-gray-800">{report.status}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-0.5">Reported On</span>
            <span className="font-bold text-gray-800">{new Date(report.created).toLocaleDateString()}</span>
          </div>
          {report.coords && (
            <div className="col-span-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-0.5">GPS Coordinates</span>
              <span className="font-mono text-[11px] text-gray-700">{report.coords}</span>
            </div>
          )}
        </div>

        {/* Photo Evidence Section */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
              <span>Original Hazard Evidence</span>
              <span className="text-[11px] font-normal text-gray-400">
                {report.photo ? 'Photo attached' : 'No photo submitted'}
              </span>
            </h4>
            {report.photo ? (
              <img
                src={report.photo}
                alt="Hazard evidence"
                className="w-full max-h-56 object-cover rounded-2xl border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="p-5 text-center text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No initial photo uploaded for this report.
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
              <span>Resolution / After-Repair Proof</span>
              <span className="text-[11px] font-normal text-gray-400">
                {report.repairPhoto ? '✓ Repair verified' : 'Pending verification'}
              </span>
            </h4>
            {report.repairPhoto ? (
              <img
                src={report.repairPhoto}
                alt="Repair evidence"
                className="w-full max-h-56 object-cover rounded-2xl border border-emerald-200 shadow-sm"
              />
            ) : (
              <div className="p-4 text-center text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center gap-2">
                <span>No after-repair photo attached yet.</span>
                {report.status !== 'Resolved' && onAttachResolutionPhoto && (
                  <button
                    onClick={() => onAttachResolutionPhoto(report.id)}
                    className="text-xs text-[#087a46] font-bold underline hover:opacity-80"
                  >
                    + Attach repair photo now
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions inside modal */}
        <div className="flex flex-wrap gap-2.5 justify-end pt-3 border-t border-gray-100">
          {report.status === 'Open' && onStatusChange && (
            <button
              onClick={() => {
                onStatusChange(report.id, 'In progress');
                onClose();
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Mark In Progress
            </button>
          )}
          {report.status !== 'Resolved' && onStatusChange && (
            <button
              onClick={() => {
                if (onAttachResolutionPhoto) {
                  onAttachResolutionPhoto(report.id);
                } else {
                  onStatusChange(report.id, 'Resolved');
                }
                onClose();
              }}
              className="px-4 py-2 bg-[#087a46] hover:bg-[#066338] text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Resolve Report
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

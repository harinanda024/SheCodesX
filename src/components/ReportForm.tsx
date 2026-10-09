import React, { useState } from 'react';
import { HazardReport, HazardType, LanguageCode, SeverityLevel } from '../types';
import { AppTranslation, speechLocales } from '../translations';

interface ReportFormProps {
  t: AppTranslation;
  currentLang: LanguageCode;
  userEmail: string;
  onSubmit: (report: HazardReport) => void;
  onToast: (msg: string) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  t,
  currentLang,
  userEmail,
  onSubmit,
  onToast,
}) => {
  const [hazardType, setHazardType] = useState<HazardType>('Pothole');
  const [severity, setSeverity] = useState<SeverityLevel>('Medium');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState('');
  const [photoData, setPhotoData] = useState<string>('');
  const [isListeningLoc, setIsListeningLoc] = useState(false);
  const [isListeningDesc, setIsListeningDesc] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  // Web Speech API handler
  const handleVoiceInput = (target: 'location' | 'description') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onToast('Voice recognition is not supported in this browser. You can type the details instead.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLocales[currentLang] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (target === 'location') setIsListeningLoc(true);
    else setIsListeningDesc(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      if (target === 'location') {
        setLocation((prev) => (prev ? `${prev} ${transcript}` : transcript));
      } else {
        setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
      }
      onToast(`Recognized: "${transcript}"`);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (e: any) => {
      if (e.error === 'not-allowed') {
        onToast('Microphone permission was denied. Please allow microphone access or type instead.');
      } else {
        onToast('Could not recognize voice. Please try again or type instead.');
      }
    };

    recognition.onend = () => {
      setIsListeningLoc(false);
      setIsListeningDesc(false);
    };

    try {
      recognition.start();
    } catch {
      setIsListeningLoc(false);
      setIsListeningDesc(false);
      onToast('Voice recognition is already running.');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 450000) {
      onToast('Please select an image smaller than 450 KB for browser local storage.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      onToast('Location is not supported in this browser. Please enter landmark instead.');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const formatted = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        setCoords(formatted);
        setGettingLocation(false);
        onToast('Coordinates added successfully.');
      },
      () => {
        setGettingLocation(false);
        onToast('Could not fetch GPS coordinates. Please write landmark.');
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLocation = location.trim();
    if (!cleanLocation) {
      onToast('Please provide a landmark or location.');
      return;
    }

    const newReport: HazardReport = {
      id: `rep-${Date.now()}`,
      type: hazardType,
      severity,
      location: cleanLocation,
      description: description.trim(),
      coords: coords.trim(),
      photo: photoData || undefined,
      status: 'Open',
      created: Date.now(),
      reportedBy: userEmail,
      isDemoData: false,
    };

    onSubmit(newReport);
    // Clear form
    setLocation('');
    setDescription('');
    setCoords('');
    setPhotoData('');
  };

  return (
    <div className="max-w-2xl bg-white rounded-3xl border border-[#e1e6f5] shadow-sm p-6 sm:p-8">
      {/* Safety Notice */}
      <div className="bg-amber-50/90 border border-amber-200/70 text-amber-900 rounded-2xl p-4 text-xs sm:text-sm leading-relaxed mb-6">
        <span className="font-extrabold block mb-0.5">⚠️ Safety Notice:</span>
        {t.safety}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">{t.hazardType}</label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value as HazardType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 bg-white transition"
            >
              <option value="Pothole">🕳️ Pothole</option>
              <option value="Open manhole">⚠️ Open manhole</option>
              <option value="Exposed electrical wire">⚡ Exposed electrical wire</option>
              <option value="Waterlogging">🌊 Waterlogging</option>
              <option value="Broken footpath">🚧 Broken footpath</option>
              <option value="Broken streetlight">💡 Broken streetlight</option>
              <option value="Other">📍 Other Hazard</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">{t.severity}</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 bg-white transition"
            >
              <option value="High">{t.immediateDanger}</option>
              <option value="Medium">{t.publicRisk}</option>
              <option value="Low">{t.minorIssue}</option>
            </select>
          </div>
        </div>

        {/* Location with Voice Button */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">{t.location}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Near Indiranagar Metro Station 100ft road"
              required
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 transition"
            />
            <button
              type="button"
              onClick={() => handleVoiceInput('location')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                isListeningLoc
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-[#7657e8] to-[#1689dc] text-white hover:brightness-105'
              }`}
            >
              {isListeningLoc ? t.listening : t.speak}
            </button>
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">{t.voiceHelp}</span>
        </div>

        {/* Description with Voice Button */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">{t.description}</label>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add useful details (depth, visible hazard, lane affected)..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 transition resize-y"
              />
              <button
                type="button"
                onClick={() => handleVoiceInput('description')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  isListeningDesc
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-gradient-to-r from-[#7657e8] to-[#1689dc] text-white hover:brightness-105'
                }`}
              >
                {isListeningDesc ? t.listening : t.speak}
              </button>
            </div>
          </div>
        </div>

        {/* Photo Upload with Thumbnail Preview */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">{t.photo}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
          {photoData && (
            <div className="mt-3 relative inline-block">
              <img
                src={photoData}
                alt="Selected preview"
                className="w-32 h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setPhotoData('')}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* GPS Coordinates with Geolocation button */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">{t.coordinates}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coords}
              onChange={(e) => setCoords(e.target.value)}
              placeholder="e.g. 12.97160, 77.59460"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#18794e] focus:ring-2 focus:ring-[#18794e]/15 transition"
            />
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={gettingLocation}
              className="px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#18794e] text-gray-700 hover:text-[#18794e] text-xs font-bold transition shrink-0 bg-gray-50/50"
            >
              {gettingLocation ? 'Locating…' : t.useMyLocation}
            </button>
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">
            Used to place the marker on the interactive hazard map.
          </span>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#18794e] to-[#087f8c] hover:brightness-105 active:scale-[0.99] text-white font-extrabold text-sm rounded-xl transition shadow-md shadow-emerald-950/20"
          >
            {t.submit}
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { HazardReport } from '../types';
import { AppTranslation } from '../translations';

interface LeafletMapProps {
  reports: HazardReport[];
  t: AppTranslation;
  onSelectReport?: (report: HazardReport) => void;
  onToast: (msg: string) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  reports,
  t,
  onSelectReport,
  onToast,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const userCircleRef = useRef<L.Circle | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [12.9716, 77.5946], // Centered around Bengaluru / India
        zoom: 12,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>',
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Invalidate size once rendered
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    } catch (err) {
      console.error('Leaflet initialization error:', err);
      setMapError(t.mapFallback);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [t.mapFallback]);

  // Update Markers when reports change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    const validCoordinates: L.LatLngExpression[] = [];

    reports.forEach((r) => {
      if (!r.coords) return;
      const parts = r.coords.split(',').map((x) => Number(x.trim()));
      if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return;
      if (Math.abs(parts[0]) > 90 || Math.abs(parts[1]) > 180) return;

      const latLng: [number, number] = [parts[0], parts[1]];
      validCoordinates.push(latLng);

      const isResolved = r.status === 'Resolved';
      const isHigh = r.type === 'Open manhole' || r.type === 'Exposed electrical wire' || r.severity === 'High';
      const isMedium = r.severity === 'Medium';

      const color = isResolved ? '#18794e' : isHigh ? '#d94b48' : isMedium ? '#d99a24' : '#18794e';
      const symbol = isResolved ? '✓' : '!';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            background: ${color};
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-weight: 800;
              font-size: 14px;
              user-select: none;
            ">${symbol}</span>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 38],
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(markersGroup);

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4; padding: 2px;">
          <strong style="font-size: 14px; color: #17251e; display: block; margin-bottom: 3px;">
            ${r.type}
          </strong>
          <span style="color: #65746b; font-size: 11px; display: block; margin-bottom: 6px;">
            📍 ${r.location}
          </span>
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="
              font-size: 10px;
              font-weight: 800;
              padding: 2px 7px;
              border-radius: 999px;
              background: ${color}20;
              color: ${color};
            ">
              ${isResolved ? 'RESOLVED' : `${r.severity.toUpperCase()} PRIORITY`}
            </span>
            <span style="font-size: 10px; color: #718078;">
              ${r.status}
            </span>
          </div>
          ${r.description ? `<p style="font-size: 11px; color: #444; margin: 4px 0 8px;">${r.description}</p>` : ''}
          <small style="color: #9aa69e; font-size: 10px;">${new Date(r.created).toLocaleDateString()}</small>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectReport) onSelectReport(r);
      });
    });

    // If there are valid coordinates and map is still at initial zoom, fit bounds
    if (validCoordinates.length > 0 && map.getZoom() <= 5) {
      try {
        const bounds = L.latLngBounds(validCoordinates);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      } catch {
        // ignore bounds fit error
      }
    }
  }, [reports, onSelectReport]);

  const handleSearchPlace = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query || !mapInstanceRef.current) return;

    setSearching(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      if (!data || data.length === 0) {
        onToast('No place found for this search. Try a nearby city or landmark.');
        return;
      }

      const lat = Number(data[0].lat);
      const lon = Number(data[0].lon);

      mapInstanceRef.current.setView([lat, lon], 15);

      L.marker([lat, lon])
        .addTo(mapInstanceRef.current)
        .bindPopup(`<strong>Found:</strong><br>${data[0].display_name}`)
        .openPopup();
    } catch {
      onToast('Place search failed. You can pan and zoom the map manually.');
    } finally {
      setSearching(false);
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      onToast(t.locDenied);
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const map = mapInstanceRef.current;
        if (!map) return;

        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        map.setView(coords, 16);

        if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
        if (userCircleRef.current) map.removeLayer(userCircleRef.current);

        userMarkerRef.current = L.circleMarker(coords, {
          radius: 8,
          color: '#ffffff',
          weight: 3,
          fillColor: '#2563eb',
          fillOpacity: 1,
        })
          .addTo(map)
          .bindPopup('<strong>Your current location</strong>')
          .openPopup();

        userCircleRef.current = L.circle(coords, {
          radius: Math.max(pos.coords.accuracy || 40, 25),
          color: '#2563eb',
          weight: 1,
          fillOpacity: 0.1,
        }).addTo(map);

        setLocating(false);
        onToast('Map centered at your location.');
      },
      () => {
        setLocating(false);
        onToast(t.locDenied);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e1e6f5] shadow-sm overflow-hidden flex flex-col">
      {/* Search & Location Toolbar */}
      <div className="p-3 bg-white/95 border-b border-gray-100 flex flex-wrap items-center gap-2">
        <form onSubmit={handleSearchPlace} className="flex-1 flex items-center gap-1.5 min-w-[180px]">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#087f8c] focus:ring-2 focus:ring-[#087f8c]/20 transition"
          />
          <button
            type="submit"
            disabled={searching}
            className="px-3.5 py-2.5 bg-[#18794e] hover:bg-[#0f5c3a] text-white text-xs font-bold rounded-xl transition shrink-0"
          >
            {searching ? '…' : t.searchBtn}
          </button>
        </form>

        <button
          type="button"
          onClick={handleLocateMe}
          disabled={locating}
          className="px-3 py-2.5 border border-gray-200 hover:border-[#18794e] text-gray-700 hover:text-[#18794e] text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 bg-gray-50/50"
        >
          <span>◎</span>
          <span>{locating ? t.locating : t.locate}</span>
        </button>
      </div>

      {/* Leaflet container */}
      <div className="relative w-full h-[360px] sm:h-[400px] bg-[#e9eee9]">
        {mapError ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs text-amber-800 bg-amber-50">
            {mapError}
          </div>
        ) : (
          <div ref={mapContainerRef} className="w-full h-full z-10" />
        )}
      </div>

      {/* Map Legend & Help Note */}
      <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-100 text-[11px] text-gray-500 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d94b48]" />
            High Priority
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d99a24]" />
            Medium
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#18794e]" />
            Low / Resolved
          </span>
        </div>
        <span className="text-[10px] text-gray-400">
          OpenStreetMap data · Real-time local hazard markers
        </span>
      </div>
    </div>
  );
};

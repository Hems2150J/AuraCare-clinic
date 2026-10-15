import React, { useEffect } from 'react';
import { clinicData } from '../../data/clinicData';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

export const InteractiveMap = () => {
  useEffect(() => {
    // Fix leaflet default icon issue in React bundle
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  const position = [clinicData.coordinates.lat, clinicData.coordinates.lng];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-luxury space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-teal-50 text-teal-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Interactive GPS Location
          </span>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
            Clinic Location & Directions
          </h3>
          <p className="text-xs text-slate-500">{clinicData.address}</p>
        </div>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-soft-glow flex items-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          <span>Get Turn-by-Turn GPS Directions</span>
        </a>
      </div>

      {/* Leaflet Map Frame */}
      <div className="h-96 rounded-2xl overflow-hidden border border-slate-200 z-10 relative shadow-inner">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="p-1 space-y-1 text-slate-800">
                <strong className="text-sm font-extrabold block text-medical-700">
                  {clinicData.name}
                </strong>
                <p className="text-xs">{clinicData.address}</p>
                <p className="text-xs font-bold text-emerald-700">
                  24/7 Triage: {clinicData.phones.emergency}
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Direct Contact Phone List Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="font-bold text-slate-500 uppercase tracking-wider block">Main Appointments Desk:</span>
          <a href={`tel:${clinicData.phones.appointments}`} className="font-extrabold text-slate-900 text-sm hover:text-medical-600">
            {clinicData.phones.appointments}
          </a>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="font-bold text-slate-500 uppercase tracking-wider block">Direct Pharmacy Line:</span>
          <a href={`tel:${clinicData.phones.pharmacy}`} className="font-extrabold text-slate-900 text-sm hover:text-medical-600">
            {clinicData.phones.pharmacy}
          </a>
        </div>

        <div className="bg-red-50 p-4 rounded-2xl border border-red-200 space-y-1">
          <span className="font-bold text-red-700 uppercase tracking-wider block">24/7 Ambulance Hotline:</span>
          <a href={`tel:${clinicData.phones.emergency}`} className="font-extrabold text-red-600 text-sm">
            {clinicData.phones.emergency}
          </a>
        </div>
      </div>
    </div>
  );
};

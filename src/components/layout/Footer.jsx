import React from 'react';
import { useApp } from '../../context/AppContext';
import { clinicData } from '../../data/clinicData';
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  Heart
} from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, setIsEmergencyModalOpen } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accreditations Trust Strip */}
        <div className="bg-slate-800/80 rounded-2xl p-6 mb-12 border border-slate-700/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clinicData.accreditations.map((acc, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <span className="text-2xl">{acc.logo}</span>
              <div>
                <h4 className="text-white text-sm font-bold">{acc.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{acc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-medical-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-5 h-5 transform -rotate-12" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                Aura<span className="text-medical-400">Care</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {clinicData.tagline}. Delivering patient-centered clinical care, advanced diagnostics, and reassuring telehealth solutions since {clinicData.established}.
            </p>

            {/* Emergency Hotline Highlight Box */}
            <div className="bg-emergency-950/40 border border-emergency-800/60 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold text-emergency-400 tracking-wider">
                  24/7 Emergency Triage Line
                </span>
                <p className="text-white font-extrabold text-lg tracking-tight">
                  {clinicData.phones.emergency}
                </p>
              </div>
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="bg-emergency-600 hover:bg-emergency-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                Fast-Track
              </button>
            </div>
          </div>

          {/* Clinical Departments */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-medical-500 pl-2.5">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Oncology'].map((dept) => (
                <li key={dept}>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="hover:text-medical-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-medical-400 transition-colors" />
                    {dept} Care
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2.5">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                { id: 'about', label: 'About Our Clinic' },
                { id: 'doctors', label: 'Find a Specialist' },
                { id: 'telehealth', label: 'Video Telehealth' },
                { id: 'pharmacy', label: 'Online Pharmacy' },
                { id: 'reviews', label: 'Patient Reviews' },
                { id: 'contact', label: 'Contact & Map' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className="hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3.5 text-sm text-slate-400">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Clinic Address
            </h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-medical-400 shrink-0 mt-1" />
              <span>{clinicData.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{clinicData.phones.appointments}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{clinicData.email}</span>
            </p>
            <p className="flex items-start gap-2 pt-2 border-t border-slate-800 text-xs">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{clinicData.hours.regular}</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {clinicData.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Designed for compassionate, accessible patient care <Heart className="w-3.5 h-3.5 text-emergency-500 fill-emergency-500 inline" />
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

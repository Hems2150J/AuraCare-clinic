import React from 'react';
import { useApp } from '../../context/AppContext';
import { doctorsData } from '../../data/doctorsData';
import { Video, Calendar, FileText, CheckCircle2, ShieldCheck, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';

export const TelehealthOverview = () => {
  const { setActiveTelehealthSession, setActiveTab } = useApp();

  const telehealthDoctors = doctorsData.slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Telehealth Hero Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-medical-950 text-white rounded-3xl p-8 sm:p-12 shadow-luxury border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            24/7 Virtual Care Suite
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            HD Video Consultations & Digital Prescriptions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Consult with top AuraCare clinical specialists from the comfort of your home. Encrypted WebRTC video calls, AI symptom summaries, and instant digital prescription downloads.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveTelehealthSession(doctorsData[0]);
              }}
              className="py-3.5 px-6 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold text-sm shadow-soft-glow flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Launch Instant Video Call Room</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-3">
          <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            HIPAA-Encrypted Video Call Standards
          </h4>
          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Zero App Download Required (Runs in Browser)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Instant Digital Prescription PDF Download</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>AI Symptom Summary Sync to Patient Record</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            How Telehealth Consultation Works
          </h2>
          <p className="text-xs text-slate-500">
            Simple 4-step workflow for seamless remote specialist care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Pick Doctor & Slot', desc: 'Select your preferred specialist and instant or scheduled video slot.', icon: Calendar },
            { step: '02', title: 'Enter Waiting Room', desc: 'Pre-call camera check and AI clinical intake symptom questionnaire.', icon: Video },
            { step: '03', title: 'Join HD Video Call', desc: '1-on-1 encrypted video call with screen share & medical image review.', icon: PhoneCall },
            { step: '04', title: 'Rx & Care Plan', desc: 'Download your signed digital prescription and pharmacy order.', icon: FileText }
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-extrabold text-sm flex items-center justify-center">
                  {s.step}
                </div>
                <h3 className="font-bold text-base text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Telehealth Physicians */}
      <div className="space-y-6">
        <h3 className="font-heading font-extrabold text-2xl text-slate-900">
          Doctors Currently Available for Video Call
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {telehealthDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-full h-44 object-cover rounded-2xl border border-slate-200"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Available Now
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                  <p className="text-xs text-medical-600 font-semibold">{doc.title}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTelehealthSession(doc)}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Start Call (${doc.consultationFee})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

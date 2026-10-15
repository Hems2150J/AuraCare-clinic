import React from 'react';
import {
  Award,
  Cpu,
  Clock,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { clinicData } from '../../data/clinicData';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: Award,
      title: "Board-Certified Specialists",
      desc: "Our medical directors are alumni of Harvard, Johns Hopkins, and Oxford, dedicated to personalized clinical diagnostics.",
      badges: ["48+ Consultants", "Multidisciplinary Care"]
    },
    {
      icon: Cpu,
      title: "3D & Robotic Diagnostics",
      desc: "Equipped with 3T MRI scanners, 4D echocardiographs, and computer-guided surgical arms for minimal recovery times.",
      badges: ["Ultra-High Precision", "Minimal Invasiveness"]
    },
    {
      icon: Clock,
      title: "24/7 Level-1 Emergency Triage",
      desc: "Uninterrupted ICU triage bay dispatch with zero wait times for acute cardiac or trauma emergencies.",
      badges: ["Sub-90s Response", "Dedicated Ambulance Wing"]
    },
    {
      icon: ShieldCheck,
      title: "Direct Insurance Billing",
      desc: "Hassle-free coverage with Blue Cross, Aetna, Cigna, UnitedHealthcare, Medicare, and major global insurers.",
      badges: ["Zero Out-of-Pocket Stress", "Instant Approval"]
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            Clinical Distinction
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Why Patients Entrust Their Care to{' '}
            <span className="text-medical-600">AuraCare</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every clinical protocol at AuraCare is tailored for patient reassurance, transparent communication, and rapid recovery in a calm, modern setting.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-medical-200 shadow-sm hover:shadow-card-hover transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-medical-600 to-teal-500 text-white flex items-center justify-center mb-6 shadow-md shadow-medical-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 space-y-2">
                  {item.badges.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Accepted Insurance Logo Banner */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-luxury flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading font-extrabold text-lg text-white">
              Accepted Health Insurance Networks
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              We process claims directly with over 30+ regional and international health plans.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {clinicData.insuranceAccepted.map((ins, iIdx) => (
              <span
                key={iIdx}
                className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700"
              >
                {ins}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

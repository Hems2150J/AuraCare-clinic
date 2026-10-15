import React from 'react';
import { useApp } from '../../context/AppContext';
import { servicesData } from '../../data/servicesData';
import {
  HeartPulse,
  Brain,
  Baby,
  Activity,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';

const iconMap = {
  HeartPulse,
  Brain,
  Baby,
  Activity,
  Sparkles,
  ShieldAlert
};

export const ServicesGrid = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="py-24 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-teal-50 text-teal-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Clinical Disciplines
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Multidisciplinary Departments & Centers
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              From preventative cardiovascular screenings to complex neurological consultations, our clinical suites are designed for maximum precision.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('services')}
            className="self-start md:self-auto bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-soft-glow flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc) => {
            const Icon = iconMap[svc.iconName] || HeartPulse;
            return (
              <div
                key={svc.id}
                onClick={() => setActiveTab('services')}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-card-hover transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-medical-50 text-medical-600 group-hover:bg-medical-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-xs">
                      <Icon className="w-7 h-7 group-hover:animate-heartbeat" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-medical-600 transition-colors">
                      Dept ID: {svc.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-slate-900 group-hover:text-medical-600 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {svc.shortDesc}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Key Clinical Procedures:
                    </span>
                    {svc.procedures.slice(0, 2).map((proc, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-medical-600 group-hover:text-medical-700">
                  <span>View Equipment & Specialists</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

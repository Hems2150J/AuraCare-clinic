import React from 'react';
import { clinicData } from '../../data/clinicData';
import { Award, ShieldCheck, HeartPulse, Building, Stethoscope, ChevronRight } from 'lucide-react';

export const MissionTimeline = () => {
  const milestones = [
    {
      year: '2002',
      title: 'Foundation of AuraCare Medical Center',
      desc: 'Established with a vision to redefine outpatient care by blending clinical precision with calm, humanized patient experiences.'
    },
    {
      year: '2008',
      title: 'Expansion of 24/7 Level-1 Trauma & ICU Wing',
      desc: 'Introduced state-of-the-art emergency cardiac triage suites and non-invasive surgical suites.'
    },
    {
      year: '2015',
      title: 'Joint Commission International (JCI) Gold Accreditation',
      desc: 'Awarded JCI Accreditation for meeting world-class clinical quality and patient safety protocols.'
    },
    {
      year: '2021',
      title: 'Launch of 4D Diagnostic Imaging & Telehealth',
      desc: 'Pioneered 3T MRI, digital pathology, and HD video consultation platform for instant patient accessibility.'
    },
    {
      year: '2026',
      title: 'Next-Gen Robotic Surgery & AI Health Triage',
      desc: 'Integrated computer-assisted joint replacement, precision oncology sequencing, and real-time patient portal access.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Mission & Vision Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-medical-950 text-white rounded-3xl p-8 sm:p-12 shadow-luxury border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="bg-medical-500/20 text-medical-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Our Core Mission
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Pioneering Health Solutions, Restoring Peace of Mind
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We believe healthcare should feel calm, transparent, and reassuring. Our multidisciplinary care model combines advanced clinical technology with deep human empathy.
          </p>
        </div>

        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 space-y-4">
          <h4 className="font-heading font-bold text-white text-base border-l-2 border-teal-400 pl-3">
            The AuraCare Care Promise
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero-compromise diagnostic accuracy and safety.</span>
            </li>
            <li className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Empathetic bedside manner with transparent consultation.</span>
            </li>
            <li className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-medical-400 shrink-0" />
              <span>Rapid digital prescription delivery and continuous follow-up.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* History Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="font-heading font-extrabold text-2xl text-slate-900">
            Two Decades of Healthcare Progress
          </h3>
          <p className="text-xs text-slate-500">
            A chronicle of our milestones in clinical care, facility expansion, and medical technology.
          </p>
        </div>

        <div className="relative border-l-2 border-medical-200 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Year Marker Tag on Left */}
              <div className="hidden sm:flex absolute -left-[10.5rem] top-0 items-center justify-end w-28 pr-4">
                <span className="font-heading font-extrabold text-lg text-medical-600">
                  {m.year}
                </span>
              </div>

              {/* Timeline Dot */}
              <div className="absolute -left-[31px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-medical-600 group-hover:scale-125 transition-transform" />

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-card-hover transition-all space-y-1">
                <span className="sm:hidden text-xs font-bold text-medical-600 block mb-1">
                  Year {m.year}
                </span>
                <h4 className="font-heading font-extrabold text-lg text-slate-900">
                  {m.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

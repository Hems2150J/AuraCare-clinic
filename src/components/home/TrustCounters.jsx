import React, { useEffect, useRef, useState } from 'react';
import { clinicData } from '../../data/clinicData';
import { Users, Award, Stethoscope, ThumbsUp, Activity } from 'lucide-react';

export const TrustCounters = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      value: clinicData.stats.patientsTreated.toLocaleString(),
      suffix: '+',
      label: 'Patients Treated',
      subtext: 'Across 40+ clinical disciplines',
      color: 'text-medical-600',
      bgColor: 'bg-medical-50'
    },
    {
      icon: Award,
      value: clinicData.stats.yearsOfExperience,
      suffix: '+ Yrs',
      label: 'Clinical Excellence',
      subtext: 'Established in 2002',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      icon: Stethoscope,
      value: clinicData.stats.specialistDoctors,
      suffix: '+',
      label: 'Specialist Doctors',
      subtext: 'Board-certified international faculty',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: ThumbsUp,
      value: clinicData.stats.satisfactionRate,
      suffix: '%',
      label: 'Patient Satisfaction',
      subtext: 'Based on 1,200+ verified reviews',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stat.bgColor} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <Activity className="w-4 h-4 text-slate-300 group-hover:text-medical-400 transition-colors" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                    {hasAnimated ? stat.value : '0'}
                    <span className="text-medical-600 font-bold ml-0.5">{stat.suffix}</span>
                  </h3>
                  <p className="font-bold text-slate-800 text-base">{stat.label}</p>
                  <p className="text-xs text-slate-500 font-medium">{stat.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

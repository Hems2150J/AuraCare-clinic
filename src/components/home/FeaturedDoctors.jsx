import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { doctorsData } from '../../data/doctorsData';
import { DoctorCard } from '../doctors/DoctorCard';
import { DoctorDetailModal } from '../doctors/DoctorDetailModal';
import { UserCheck, ArrowRight, Filter } from 'lucide-react';

export const FeaturedDoctors = () => {
  const { setActiveTab } = useApp();
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'];

  const filteredDoctors = selectedDepartment === 'All'
    ? doctorsData.slice(0, 4)
    : doctorsData.filter((d) => d.department === selectedDepartment);

  return (
    <section className="py-24 bg-slate-50/60 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-medical-50 text-medical-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5 text-medical-600" />
              Board-Certified Faculty
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Meet Our Specialist Physicians
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every doctor at AuraCare has years of clinical practice, dedicated research contributions, and a compassionate bedside manner.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('doctors')}
            className="self-start md:self-auto bg-white hover:bg-slate-100 text-medical-700 font-bold text-sm px-5 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 transition-all hover:shadow-md"
          >
            <span>View Full Directory (48+)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedDepartment === dept
                  ? 'bg-medical-600 text-white shadow-soft-glow'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <DoctorDetailModal />
      </div>
    </section>
  );
};

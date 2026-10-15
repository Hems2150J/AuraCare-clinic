import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { doctorsData } from '../../data/doctorsData';
import { servicesData } from '../../data/servicesData';
import { Calendar, User, Stethoscope, ArrowRight, Clock } from 'lucide-react';

export const QuickBookingBar = () => {
  const { setActiveTab } = useApp();
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );

  const filteredDoctors = selectedDept
    ? doctorsData.filter((d) => d.departmentId === selectedDept)
    : doctorsData;

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    setActiveTab('appointments');
  };

  return (
    <div className="bg-white rounded-3xl shadow-luxury border border-slate-100 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-medical-500 animate-pulse" />
        <h3 className="font-heading font-extrabold text-slate-900 text-sm tracking-wide uppercase">
          Quick Appointment Finder
        </h3>
        <span className="text-xs text-slate-400 font-medium ml-auto hidden sm:inline">
          Real-time Available Slots
        </span>
      </div>

      <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Department Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-medical-600" />
            Specialty / Department
          </label>
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setSelectedDoctorId('');
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-medical-500 focus:bg-white transition-colors"
          >
            <option value="">All Clinical Departments</option>
            {servicesData.map((svc) => (
              <option key={svc.id} value={svc.id}>
                {svc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-teal-600" />
            Specialist Doctor
          </label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-medical-500 focus:bg-white transition-colors"
          >
            <option value="">Any Available Specialist</option>
            {filteredDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.department})
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            Preferred Date
          </label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-medical-500 focus:bg-white transition-colors"
          />
        </div>

        {/* Search Slots Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-medical-600 to-teal-600 hover:from-medical-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-soft-glow flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
          >
            <span>Search Available Slots</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { doctorsData } from '../../data/doctorsData';
import { DoctorCard } from './DoctorCard';
import { DoctorDetailModal } from './DoctorDetailModal';
import { Search, Filter, Stethoscope, UserCheck } from 'lucide-react';

export const DoctorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');

  const departments = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Oncology', 'Emergency Medicine', 'Ophthalmology'];
  const days = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specializations.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    const matchesDay = selectedDay === 'All' || doc.availableDays.includes(selectedDay);

    return matchesSearch && matchesDept && matchesDay;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-medical-50 text-medical-700 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
          Board-Certified Medical Specialists
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
          Specialist Physicians Directory
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Search and filter our 48+ international clinical specialists by department, availability, or condition treated.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by doctor name, specialty, or condition (e.g., Asthma, Migraine)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-medical-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Department Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-medical-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  Department: {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Available Day Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-medical-500"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  Available Day: {day}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filteredDoctors.length}</strong> specialist physicians
          </span>
          {(searchTerm || selectedDept !== 'All' || selectedDay !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDept('All');
                setSelectedDay('All');
              }}
              className="text-medical-600 hover:text-medical-800 font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Stethoscope className="w-12 h-12 stroke-[1.2] text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-slate-700 text-lg">No doctors match your filter</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing department filters to view more available specialists.
          </p>
        </div>
      )}

      <DoctorDetailModal />
    </div>
  );
};

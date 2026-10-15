import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Calendar, Video, Star, Award, ShieldCheck } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const DoctorCard = ({ doctor }) => {
  const { setSelectedDoctorForModal, setActiveTab, setActiveTelehealthSession } = useApp();

  const handleBook = (e) => {
    e.stopPropagation();
    setSelectedDoctorForModal(doctor);
    setActiveTab('appointments');
  };

  const handleTelehealth = (e) => {
    e.stopPropagation();
    setActiveTelehealthSession(doctor);
    setActiveTab('telehealth');
  };

  return (
    <div
      onClick={() => setSelectedDoctorForModal(doctor)}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-card-hover transform hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Doctor Image Container with subtle desaturation overlay */}
        <div className="relative h-64 overflow-hidden bg-slate-100">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 group-hover:brightness-95 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />

          {/* Department Badge */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
            {doctor.department}
          </span>

          {/* Consultation Fee */}
          <span className="absolute top-3 right-3 bg-teal-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
            ${doctor.consultationFee} / Visit
          </span>

          {/* Name Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-medical-200 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-xs text-slate-300 font-medium line-clamp-1">
              {doctor.title}
            </p>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-3">
            <span className="font-semibold">{doctor.qualification}</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              {doctor.experienceYears} Yrs Exp
            </span>
          </div>

          <div className="flex items-center justify-between">
            <StarRating rating={doctor.rating} />
            <span className="text-xs text-slate-400">({doctor.reviewsCount} reviews)</span>
          </div>

          {/* Direct Contact Phone Click-to-Call */}
          <a
            href={`tel:${doctor.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-medical-600 bg-slate-50 hover:bg-medical-50 p-2.5 rounded-xl border border-slate-200/80 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-medical-600 animate-pulse" />
            <span>Direct Phone: {doctor.phone}</span>
          </a>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleBook}
          className="py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </button>

        <button
          onClick={handleTelehealth}
          className="py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-teal-200 transition-colors"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Telehealth</span>
        </button>
      </div>
    </div>
  );
};

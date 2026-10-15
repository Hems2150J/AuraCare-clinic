import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { StarRating } from '../common/StarRating';
import {
  Phone,
  Calendar,
  Video,
  Award,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Building
} from 'lucide-react';

export const DoctorDetailModal = () => {
  const { selectedDoctorForModal, setSelectedDoctorForModal, setActiveTab, setActiveTelehealthSession } = useApp();

  if (!selectedDoctorForModal) return null;

  const doc = selectedDoctorForModal;

  const handleBookNow = () => {
    setSelectedDoctorForModal(null);
    setActiveTab('appointments');
  };

  const handleTelehealthNow = () => {
    setActiveTelehealthSession(doc);
    setSelectedDoctorForModal(null);
    setActiveTab('telehealth');
  };

  return (
    <Modal
      isOpen={!!doc}
      onClose={() => setSelectedDoctorForModal(null)}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Header Hero Strip */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={doc.photo}
            alt={doc.name}
            className="w-full md:w-48 h-56 object-cover object-top rounded-2xl border border-slate-200 shadow-md shrink-0"
          />

          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-medical-100 text-medical-800 text-xs font-bold px-3 py-1 rounded-full">
                {doc.department}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                {doc.experienceYears} Years Clinical Practice
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl text-slate-900">
              {doc.name}
            </h2>
            <p className="text-sm font-semibold text-medical-600">
              {doc.title}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {doc.qualification}
            </p>

            <div className="flex items-center gap-4 pt-1">
              <StarRating rating={doc.rating} />
              <span className="text-xs text-slate-500">
                ({doc.reviewsCount} verified patient ratings)
              </span>
            </div>

            {/* Direct Phone */}
            <a
              href={`tel:${doc.phone}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-medical-50 hover:text-medical-700 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Direct Phone: {doc.phone}</span>
            </a>
          </div>
        </div>

        {/* Biography & Research */}
        <div className="border-t border-slate-100 pt-5 space-y-2">
          <h4 className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider">
            Clinical Biography
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {doc.bio}
          </p>
        </div>

        {/* Specializations Pills */}
        <div className="space-y-2">
          <h4 className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider">
            Areas of Specialization
          </h4>
          <div className="flex flex-wrap gap-2">
            {doc.specializations.map((spec, sIdx) => (
              <span
                key={sIdx}
                className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Available Schedule Slots */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-medical-600" />
              Standard Consultation Slots
            </h4>
            <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded">
              Fee: ${doc.consultationFee}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {doc.timeSlots.map((slot, tIdx) => (
              <span
                key={tIdx}
                className="bg-white text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Modal CTAs */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleBookNow}
            className="w-full py-3.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-soft-glow flex items-center justify-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Clinic Visit</span>
          </button>
          <button
            onClick={handleTelehealthNow}
            className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-soft-glow flex items-center justify-center gap-2 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Start Video Telehealth</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

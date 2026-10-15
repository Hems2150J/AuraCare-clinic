import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { StarRating } from '../common/StarRating';
import { doctorsData } from '../../data/doctorsData';
import { PenTool, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WriteReviewModal = () => {
  const { isWriteReviewOpen, setIsWriteReviewOpen, addReview } = useApp();

  const [patientName, setPatientName] = useState('');
  const [rating, setRating] = useState(5);
  const [department, setDepartment] = useState('Cardiology');
  const [doctorName, setDoctorName] = useState('Dr. Evelyn Reed');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !comment) return;

    addReview({
      patientName,
      rating,
      department,
      doctorName,
      comment
    });

    setIsWriteReviewOpen(false);
    setPatientName('');
    setComment('');
  };

  return (
    <Modal
      isOpen={isWriteReviewOpen}
      onClose={() => setIsWriteReviewOpen(false)}
      title="Share Your Healthcare Experience"
      subtitle="Help prospective patients learn about AuraCare clinical care quality"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Your Rating *
          </label>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-600 font-semibold">Select 1 to 5 Stars:</span>
            <StarRating
              rating={rating}
              interactive={true}
              onRate={(val) => setRating(val)}
              size="w-6 h-6"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g., Sarah Jenkins"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
            >
              {['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Oncology'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Attending Physician
            </label>
            <select
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
            >
              {doctorsData.map((doc) => (
                <option key={doc.id} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Your Review & Feedback *
          </label>
          <textarea
            rows="4"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe your appointment experience, staff courtesy, hygiene..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-medical-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-soft-glow flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Publish Verified Patient Review</span>
        </button>
      </form>
    </Modal>
  );
};

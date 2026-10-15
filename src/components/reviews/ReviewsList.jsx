import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReviewsBreakdown } from './ReviewsBreakdown';
import { StarRating } from '../common/StarRating';
import { WriteReviewModal } from './WriteReviewModal';
import { ShieldCheck, PenTool, MessageSquare, Filter } from 'lucide-react';

export const ReviewsList = () => {
  const { reviewsList, setIsWriteReviewOpen } = useApp();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  const filteredReviews = selectedDeptFilter === 'All'
    ? reviewsList
    : reviewsList.filter((r) => r.department === selectedDeptFilter);

  const departments = ['All', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Dermatology'];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-amber-50 text-amber-800 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
          Patient Reassurance & Trust
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
          Verified Patient Reviews
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          100% authentic feedback submitted post-consultation by verified AuraCare patients.
        </p>
      </div>

      {/* Aggregate Score Breakdown */}
      <ReviewsBreakdown />

      {/* Filter Bar & Write Review CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDeptFilter(dept)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedDeptFilter === dept
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsWriteReviewOpen(true)}
          className="w-full sm:w-auto bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-soft-glow flex items-center justify-center gap-2"
        >
          <PenTool className="w-4 h-4" />
          <span>Write a Patient Review</span>
        </button>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.photo}
                    alt={rev.patientName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-slate-900 text-base">
                      {rev.patientName}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {rev.date}
                    </span>
                  </div>
                </div>

                <span className="bg-emerald-50 text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Visit
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <StarRating rating={rev.rating} />
                <span className="text-xs font-bold text-medical-600 bg-medical-50 px-2.5 py-0.5 rounded">
                  {rev.department} • {rev.doctorName}
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed italic font-serif">
                "{rev.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>

      <WriteReviewModal />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { reviewsData } from '../../data/reviewsData';
import { StarRating } from '../common/StarRating';
import { WriteReviewModal } from '../reviews/WriteReviewModal';
import { MessageSquare, Quote, ShieldCheck, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';

export const TestimonialsCarousel = () => {
  const { reviewsList, setIsWriteReviewOpen } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reviewsList.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const currentRev = reviewsList[currentIndex] || reviewsList[0];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-amber-50 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Verified Patient Reassurance
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Real Experiences From Our Patients
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Read how our dedicated doctors, modern diagnostic suites, and compassionate staff made a difference.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="bg-medical-50 hover:bg-medical-100 text-medical-700 font-bold text-xs px-4 py-3 rounded-2xl border border-medical-200 flex items-center gap-2 transition-colors"
            >
              <PenTool className="w-4 h-4" />
              <span>Write a Patient Review</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                aria-label="Previous patient review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                aria-label="Next patient review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-luxury relative overflow-hidden">
          <Quote className="absolute top-8 right-8 w-32 h-32 text-slate-800/40 pointer-events-none stroke-[1]" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
              <StarRating rating={currentRev.rating} size="w-5 h-5" />
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Patient Visit
              </span>
            </div>

            <p className="font-serif italic text-lg sm:text-2xl text-slate-100 leading-relaxed">
              "{currentRev.comment}"
            </p>

            <div className="pt-6 border-t border-slate-800 flex items-center gap-4">
              <img
                src={currentRev.photo}
                alt={currentRev.patientName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-medical-500 shadow-md"
              />
              <div>
                <h4 className="font-heading font-extrabold text-white text-base">
                  {currentRev.patientName}
                  {currentRev.patientAge && <span className="text-slate-400 font-normal text-xs ml-2">({currentRev.patientAge} yrs)</span>}
                </h4>
                <p className="text-xs text-medical-400 font-semibold">
                  Treated in {currentRev.department} • {currentRev.doctorName}
                </p>
              </div>
            </div>
          </div>
        </div>

        <WriteReviewModal />
      </div>
    </section>
  );
};

import React from 'react';
import { reviewsData } from '../../data/reviewsData';
import { StarRating } from '../common/StarRating';
import { ShieldCheck, Award, ThumbsUp } from 'lucide-react';

export const ReviewsBreakdown = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Overall Score Badge */}
      <div className="lg:col-span-4 text-center lg:text-left space-y-3 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
        <span className="bg-amber-50 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Patient Satisfaction Score
        </span>
        <div className="flex items-center justify-center lg:justify-start gap-3">
          <span className="font-heading font-extrabold text-5xl sm:text-6xl text-slate-900">
            {reviewsData.overallScore}
          </span>
          <div className="space-y-1 text-left">
            <StarRating rating={reviewsData.overallScore} size="w-5 h-5" />
            <p className="text-xs font-bold text-slate-500">
              Based on {reviewsData.totalReviews.toLocaleString()} verified visits
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          99.4% of surveyed patients would recommend AuraCare Specialists to family & friends.
        </p>
      </div>

      {/* Category Breakdown Bars */}
      <div className="lg:col-span-8 space-y-3.5">
        {reviewsData.breakdown.map((item, idx) => (
          <div key={idx} className="space-y-1 text-xs">
            <div className="flex justify-between font-bold text-slate-800">
              <span>{item.category}</span>
              <span className="text-medical-700 font-extrabold">{item.score} / 5.0 ({item.percentage}%)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-medical-500 to-teal-500 rounded-full transition-all duration-1000"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

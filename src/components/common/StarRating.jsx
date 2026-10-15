import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({
  rating = 5,
  maxRating = 5,
  interactive = false,
  onRate,
  size = "w-4 h-4",
  showValue = true
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = interactive
            ? starValue <= (hoverRating || rating)
            : starValue <= Math.floor(rating);
          const isHalf = !interactive && !isFilled && starValue === Math.ceil(rating) && rating % 1 !== 0;

          return (
            <button
              type={interactive ? "button" : undefined}
              key={index}
              disabled={!interactive}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              onClick={() => interactive && onRate && onRate(starValue)}
              className={`${interactive ? 'cursor-pointer transform hover:scale-125 transition-transform' : 'cursor-default'}`}
            >
              <Star
                className={`${size} ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-slate-300 fill-slate-100'
                } transition-colors duration-200`}
              />
            </button>
          );
        })}
      </div>
      {showValue && !interactive && (
        <span className="text-xs font-extrabold text-slate-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

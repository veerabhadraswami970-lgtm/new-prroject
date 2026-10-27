import React, { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
  error?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const starLabels = ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"];

  const activeValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Rating <span className="text-red-500">*</span>
        </label>
        {activeValue > 0 && (
          <span className="text-xs font-semibold text-agri-700 bg-agri-50 px-2 py-0.5 rounded-md border border-agri-200">
            {starLabels[activeValue - 1]}
          </span>
        )}
      </div>

      <div
        className="flex items-center gap-1.5 focus:outline-none"
        role="radiogroup"
        aria-label="Rating from 1 to 5 stars"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= activeValue;

          return (
            <button
              key={star}
              type="button"
              disabled={disabled}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverValue(star)}
              onMouseLeave={() => setHoverValue(null)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" && star < 5) onChange(star + 1);
                if (e.key === "ArrowLeft" && star > 1) onChange(star - 1);
              }}
              role="radio"
              aria-checked={value === star}
              aria-label={`Rate ${star} out of 5 stars`}
              className={`p-1.5 rounded-lg transition-transform focus:outline-none focus:ring-2 focus:ring-agri-500 ${
                disabled ? "cursor-not-allowed opacity-50" : "hover:scale-110 cursor-pointer"
              }`}
            >
              <Star
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                  isFilled
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                    : "text-slate-300 hover:text-amber-200"
                }`}
              />
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};

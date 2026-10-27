import React from "react";
import { Star, Calendar, Tag } from "lucide-react";
import { FeedbackItem, CATEGORY_OPTIONS } from "../../types";

interface FeedbackHistoryItemProps {
  item: FeedbackItem;
}

export const FeedbackHistoryItem: React.FC<FeedbackHistoryItemProps> = ({ item }) => {
  const categoryLabel =
    CATEGORY_OPTIONS.find((c) => c.value === item.category)?.label || item.category;

  const formattedDate = new Date(item.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-agri-50 text-agri-800 border border-agri-200">
            <Tag className="w-3 h-3 text-agri-600" />
            {categoryLabel}
          </span>

          <div className="flex items-center gap-0.5 ml-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= item.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          {formattedDate}
        </span>
      </div>

      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
        {item.message}
      </p>
    </div>
  );
};

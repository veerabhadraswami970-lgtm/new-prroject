import React from "react";
import { MessageSquare, Sparkles, Bug, Layout, Wheat, HelpCircle } from "lucide-react";
import { CATEGORY_OPTIONS, FeedbackCategory } from "../../types";

interface FeedbackCategorySelectProps {
  value: FeedbackCategory | "";
  onChange: (category: FeedbackCategory) => void;
  disabled?: boolean;
  error?: string;
}

export const FeedbackCategorySelect: React.FC<FeedbackCategorySelectProps> = ({
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const getCategoryIcon = (category: FeedbackCategory) => {
    switch (category) {
      case "general_feedback":
        return <MessageSquare className="w-4 h-4" />;
      case "feature_request":
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case "bug_report":
        return <Bug className="w-4 h-4 text-rose-500" />;
      case "user_experience":
        return <Layout className="w-4 h-4 text-blue-500" />;
      case "agriculture_advisory":
        return <Wheat className="w-4 h-4 text-emerald-600" />;
      case "other":
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        Feedback Category <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {CATEGORY_OPTIONS.map((cat) => {
          const isSelected = value === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              disabled={disabled}
              onClick={() => onChange(cat.value)}
              className={`p-3 text-left rounded-xl border transition-all flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-agri-500 ${
                isSelected
                  ? "border-agri-600 bg-agri-50/80 shadow-sm ring-1 ring-agri-600"
                  : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div
                className={`mt-0.5 p-2 rounded-lg flex items-center justify-center ${
                  isSelected ? "bg-white shadow-xs" : "bg-slate-100"
                }`}
              >
                {getCategoryIcon(cat.value)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${isSelected ? "text-agri-900" : "text-slate-800"}`}>
                  {cat.label}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{cat.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};

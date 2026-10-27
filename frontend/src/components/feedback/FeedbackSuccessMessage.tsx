import React from "react";
import { CheckCircle2, RotateCcw, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { FeedbackSubmissionResponse, CATEGORY_OPTIONS } from "../../types";

interface FeedbackSuccessMessageProps {
  data: FeedbackSubmissionResponse;
  onReset: () => void;
  isAuthenticated: boolean;
}

export const FeedbackSuccessMessage: React.FC<FeedbackSuccessMessageProps> = ({
  data,
  onReset,
  isAuthenticated,
}) => {
  const categoryLabel =
    CATEGORY_OPTIONS.find((c) => c.value === data.category)?.label || data.category;

  const formattedDate = new Date(data.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white rounded-3xl border border-agri-200/90 shadow-xl shadow-agri-600/5 p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
      <div className="w-16 h-16 rounded-2xl bg-agri-100 text-agri-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
        Feedback Received!
      </h2>
      <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
        Thank you for helping us improve the AI-Powered Agriculture Crop Advisory Assistant. Your feedback has been securely stored.
      </p>

      {/* Confirmation details card */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-md mx-auto text-left text-xs space-y-2">
        <div className="flex justify-between items-center text-slate-500">
          <span>Reference ID</span>
          <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 truncate max-w-[180px]">
            {data.id}
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-500">
          <span>Category</span>
          <span className="font-semibold text-slate-800">{categoryLabel}</span>
        </div>
        <div className="flex justify-between items-center text-slate-500">
          <span>Rating</span>
          <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {data.rating} / 5
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-500">
          <span>Submitted At</span>
          <span className="text-slate-700">{formattedDate}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          id="btn-submit-another"
        >
          <RotateCcw className="w-4 h-4" />
          Submit Another Response
        </button>

        {isAuthenticated ? (
          <Link
            to="/my-feedback"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 transition-colors shadow-sm"
          >
            <span>View My Submissions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-agri-700 hover:bg-agri-50 border border-agri-200 transition-colors"
          >
            <span>Return Home</span>
          </Link>
        )}
      </div>
    </div>
  );
};

import React from "react";

interface FeedbackTextareaProps {
  value: string;
  onChange: (message: string) => void;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
}

export const FeedbackTextarea: React.FC<FeedbackTextareaProps> = ({
  value,
  onChange,
  disabled = false,
  error,
  maxLength = 2000,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor="feedback-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Feedback Message <span className="text-red-500">*</span>
        </label>
        <span
          className={`text-xs font-medium ${
            value.length > maxLength
              ? "text-red-600 font-bold"
              : value.length >= 10
              ? "text-slate-500"
              : "text-amber-600"
          }`}
        >
          {value.length} / {maxLength} chars {value.length < 10 && "(min 10)"}
        </span>
      </div>

      <textarea
        id="feedback-message"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Please describe your experience, suggestion, or issue in detail..."
        className={`w-full p-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-y min-h-[110px] ${
          error
            ? "border-red-300 focus:ring-red-400 bg-red-50/20"
            : "border-slate-300 focus:ring-agri-500 focus:border-agri-500 bg-white"
        } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-50" : ""}`}
      />

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};

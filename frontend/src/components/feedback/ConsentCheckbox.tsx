import React from "react";
import { Check } from "lucide-react";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
}

export const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  error,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        <div className="relative flex items-center h-5 mt-0.5">
          <input
            id="feedback-consent"
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-labelledby="feedback-consent-label"
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-agri-500 ${
              checked
                ? "bg-agri-600 border-agri-600 text-white"
                : error
                ? "border-red-400 bg-red-50/50"
                : "border-slate-300 bg-white hover:border-slate-400"
            } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
        </div>
        <label
          id="feedback-consent-label"
          htmlFor="feedback-consent"
          className="text-xs text-slate-600 leading-relaxed select-none cursor-pointer"
          onClick={() => !disabled && onChange(!checked)}
        >
          I consent to the storage and processing of my submitted feedback for application improvement and agriculture advisory system refinement. <span className="text-red-500">*</span>
        </label>
      </div>

      {error && <p className="text-xs text-red-600 font-medium pl-8">{error}</p>}
    </div>
  );
};

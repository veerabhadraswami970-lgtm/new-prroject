import React from "react";
import { Send, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  disabled = false,
  children = "Submit Feedback",
}) => {
  return (
    <button
      type="submit"
      id="btn-submit-feedback"
      disabled={isLoading || disabled}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 active:bg-agri-800 shadow-md shadow-agri-600/20 hover:shadow-lg hover:shadow-agri-600/30 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-agri-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Submitting Feedback...</span>
        </>
      ) : (
        <>
          <Send className="w-4 h-4" />
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

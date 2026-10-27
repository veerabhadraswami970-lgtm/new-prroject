import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message,
  className = "",
}) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 gap-3 ${className}`}>
      <Loader2 className={`${sizeMap[size]} text-agri-600 animate-spin`} />
      {message && <p className="text-sm font-medium text-slate-600 animate-pulse">{message}</p>}
    </div>
  );
};

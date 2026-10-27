import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isConfigured } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner message="Verifying authentication session..." />
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
        <h3 className="font-bold text-lg mb-2">Supabase Auth Setup Required</h3>
        <p className="text-sm text-amber-800 leading-relaxed mb-4">
          Supabase credentials are currently using safe placeholder values in <code>.env</code>. To use authenticated feedback history and user accounts, please configure your Supabase URL and Publishable Key.
        </p>
        <p className="text-xs text-amber-700">
          Anonymous feedback submission is fully active on the feedback page!
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

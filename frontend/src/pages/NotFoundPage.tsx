import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer size="sm" className="flex items-center justify-center flex-1 py-16">
      <div className="text-center space-y-5 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <Compass className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-agri-600">404</span>
          <h1 className="text-xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page you are looking for doesn't exist or has been moved to a new URL.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </PageContainer>
  );
};

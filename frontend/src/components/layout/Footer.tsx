import React from "react";
import { Sprout, ShieldCheck, Database, GitBranch } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-agri-600 flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                AI-Powered Agriculture Crop Advisory Assistant
              </p>
              <p className="text-xs text-slate-500">
                Secure Feedback Management Module &bull; Production Ready
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-agri-600" />
              Row Level Security
            </span>
            <span className="inline-flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-agri-600" />
              Supabase PostgreSQL
            </span>
            <span className="inline-flex items-center gap-1">
              <GitBranch className="w-3.5 h-3.5 text-agri-600" />
              REST API Verified
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} AI-Powered Agriculture Crop Advisory Assistant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

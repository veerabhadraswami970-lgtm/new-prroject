import React from "react";
import { Link } from "react-router-dom";
import { Sprout, MessageSquarePlus, ShieldCheck, Database, History, ArrowRight, Sparkles } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { useAuth } from "../context/AuthContext";

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageContainer size="full" className="py-12 sm:py-20 flex flex-col items-center">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agri-100 text-agri-800 border border-agri-200/80 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-agri-600" />
        <span>Agriculture Advisory Development &bull; Feedback Hub</span>
      </div>

      {/* Hero Headline */}
      <div className="text-center max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          AI-Powered Agriculture <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-700 via-agri-600 to-emerald-500">
            Crop Advisory Assistant
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Help us build the next generation of digital agriculture advisory tools. Share your experiences, feature ideas, and suggestions to directly guide our crop advisory platform.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link
          to="/feedback"
          id="btn-hero-feedback"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold text-white bg-agri-600 hover:bg-agri-700 active:bg-agri-800 shadow-lg shadow-agri-600/25 hover:shadow-xl hover:shadow-agri-600/35 transition-all hover:-translate-y-0.5"
        >
          <MessageSquarePlus className="w-5 h-5" />
          <span>Share Feedback</span>
        </Link>

        {user ? (
          <Link
            to="/my-feedback"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all"
          >
            <History className="w-5 h-5 text-agri-600" />
            <span>My Submissions</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all"
          >
            <span>Sign In to Track History</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        )}
      </div>

      {/* Feature Pillar Cards */}
      <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-agri-50 text-agri-700 flex items-center justify-center mb-4">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Farmer & Advisor Centric</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tailored categories allow you to submit feedback specifically on crop recommendations, UI workflows, and advisory usability.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
            <Database className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Supabase PostgreSQL</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your feedback is securely recorded in PostgreSQL with strict data integrity, timestamps, and schema constraints.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Row Level Security</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Authenticated feedback histories are strictly private through database-level RLS policies and verified Supabase Auth tokens.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

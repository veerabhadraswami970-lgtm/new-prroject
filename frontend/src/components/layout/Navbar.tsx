import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sprout, MessageSquarePlus, History, LogIn, LogOut, UserPlus, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "text-agri-800 bg-agri-100/80 font-semibold"
        : "text-slate-600 hover:text-agri-700 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-agri-500 rounded-lg p-1"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-agri-700 to-agri-500 flex items-center justify-center text-white shadow-md shadow-agri-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-agri-700 transition-colors">
                AgriAdvisory
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-agri-100 text-agri-800">
                Feedback Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/feedback" className={navLinkClass}>
              <MessageSquarePlus className="w-4 h-4 text-agri-600" />
              Share Feedback
            </NavLink>

            {user ? (
              <>
                <NavLink to="/my-feedback" className={navLinkClass}>
                  <History className="w-4 h-4 text-agri-600" />
                  My Submissions
                </NavLink>

                <div className="h-5 w-px bg-slate-300 mx-2" />

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 max-w-[150px] truncate font-medium bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                    id="btn-logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-5 w-px bg-slate-300 mx-2" />
                <NavLink
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-agri-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                  id="nav-link-login"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 px-4 py-2 rounded-xl shadow-sm shadow-agri-600/20 hover:shadow transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-agri-500"
                  id="nav-link-signup"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-agri-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur px-4 pt-2 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            to="/feedback"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-agri-700 bg-agri-50"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Share Feedback
          </Link>

          {user ? (
            <>
              <Link
                to="/my-feedback"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                <History className="w-4 h-4" />
                My Submissions
              </Link>
              <div className="pt-2 border-t border-slate-200">
                <p className="px-3 text-xs text-slate-500 mb-2 truncate">Signed in as {user.email}</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

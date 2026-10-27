import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, UserPlus, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authFormSchema } from "../../lib/validation";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface AuthFormProps {
  mode: "login" | "signup";
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { signIn, signUp, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const isLogin = mode === "login";
  const from = (location.state as any)?.from?.pathname || "/my-feedback";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSignupSuccess(false);

    if (!isConfigured) {
      setErrors({
        general:
          "Supabase Auth is running with placeholder credentials. Please update frontend/.env and backend/.env with your live Supabase project credentials.",
      });
      return;
    }

    const validation = authFormSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of validation.error.issues) {
        if (issue.path[0] === "email") fieldErrors.email = issue.message;
        if (issue.path[0] === "password") fieldErrors.password = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setErrors({ general: error.message });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setErrors({ general: error.message });
        } else {
          setSignupSuccess(true);
        }
      }
    } catch (err: any) {
      setErrors({ general: err.message || "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-agri-100 text-agri-700 mb-3 shadow-inner">
          {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {isLogin
            ? "Sign in to view and track your feedback submissions"
            : "Register with email to manage your feedback history"}
        </p>
      </div>

      {!isConfigured && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
          <strong>Notice:</strong> Supabase Auth requires real credentials in <code>frontend/.env</code>. Anonymous feedback submission is still fully enabled without login!
        </div>
      )}

      {errors.general && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {signupSuccess ? (
        <div className="p-6 text-center space-y-4 rounded-2xl bg-agri-50 border border-agri-200">
          <CheckCircle2 className="w-12 h-12 text-agri-600 mx-auto" />
          <h3 className="text-lg font-bold text-agri-900">Registration Complete</h3>
          <p className="text-sm text-agri-700 leading-relaxed">
            Please check your inbox at <strong>{email}</strong> if Supabase email confirmation is enabled on your project, or log in to continue.
          </p>
          <Link
            to="/login"
            className="inline-block px-5 py-2.5 text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 rounded-xl shadow-sm"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email input */}
          <div>
            <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                required
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-400 bg-red-50/30"
                    : "border-slate-300 focus:ring-agri-500 focus:border-agri-500 bg-white"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>}
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-300 focus:ring-red-400 bg-red-50/30"
                    : "border-slate-300 focus:ring-agri-500 focus:border-agri-500 bg-white"
                }`}
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 shadow-md shadow-agri-600/20 hover:shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-agri-500 disabled:opacity-60 disabled:cursor-not-allowed"
            id="btn-auth-submit"
          >
            {isSubmitting ? (
              <LoadingSpinner size="sm" className="p-0 text-white" />
            ) : isLogin ? (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create Account
              </>
            )}
          </button>
        </form>
      )}

      {/* Switch mode */}
      <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
        {isLogin ? (
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup" className="font-semibold text-agri-700 hover:underline">
              Create one now
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-agri-700 hover:underline">
              Log in here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

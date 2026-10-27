import React, { useState } from "react";
import { User, Mail } from "lucide-react";
import { FeedbackCategorySelect } from "./FeedbackCategorySelect";
import { StarRating } from "./StarRating";
import { FeedbackTextarea } from "./FeedbackTextarea";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { SubmitButton } from "./SubmitButton";
import { FeedbackSuccessMessage } from "./FeedbackSuccessMessage";
import { ErrorMessage } from "../common/ErrorMessage";
import { feedbackFormSchema, FeedbackFormValues } from "../../lib/validation";
import { api, ApiError } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { FeedbackCategory, FeedbackSubmissionResponse } from "../../types";

export const FeedbackForm: React.FC = () => {
  const { user, token } = useAuth();

  const initialFormState: FeedbackFormValues = {
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    category: "general_feedback",
    rating: 5,
    message: "",
    consent: true,
  };

  const [formData, setFormData] = useState<FeedbackFormValues>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FeedbackFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<FeedbackSubmissionResponse | null>(null);
  const [apiError, setApiError] = useState<{ message: string; details?: any } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setFieldErrors({});
    setApiError(null);

    // Frontend validation with Zod
    const validationResult = feedbackFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const errors: Partial<Record<keyof FeedbackFormValues, string>> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof FeedbackFormValues;
        if (fieldName && !errors[fieldName]) {
          errors[fieldName] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Normalize empty strings to null for backend
      const payload = {
        name: formData.name?.trim() ? formData.name.trim() : null,
        email: formData.email?.trim() ? formData.email.trim() : null,
        category: formData.category,
        rating: formData.rating,
        message: formData.message.trim(),
        consent: true as const,
      };

      const response = await api.submitFeedback(payload, token);
      setSubmissionSuccess(response);
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.details && Array.isArray(err.details)) {
          const remoteFieldErrors: Partial<Record<keyof FeedbackFormValues, string>> = {};
          err.details.forEach((item: { path: string; message: string }) => {
            const pathKey = item.path as keyof FeedbackFormValues;
            if (pathKey) remoteFieldErrors[pathKey] = item.message;
          });
          setFieldErrors(remoteFieldErrors);
        }
        setApiError({
          message: err.message || "Failed to submit feedback. Please check your information and try again.",
        });
      } else {
        setApiError({
          message: "A network or server error occurred. Please check your connection and retry.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ...initialFormState,
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      message: "",
    });
    setFieldErrors({});
    setApiError(null);
    setSubmissionSuccess(null);
  };

  if (submissionSuccess) {
    return (
      <FeedbackSuccessMessage
        data={submissionSuccess}
        onReset={handleReset}
        isAuthenticated={!!user}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-10">
      <div className="border-b border-slate-100 pb-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Agriculture Advisory Feedback Form
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Share your suggestions, report issues, or rate your experience with our crop advisory tools.
        </p>
      </div>

      {apiError && (
        <div className="mb-6">
          <ErrorMessage
            title="Submission Failed"
            message={apiError.message}
            onRetry={() => {
              const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
              handleSubmit(fakeEvent);
            }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name and Email Optional Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="field-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Name <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="field-name"
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
                maxLength={100}
                placeholder="Farmer Ramesh"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  fieldErrors.name
                    ? "border-red-300 focus:ring-red-400 bg-red-50/20"
                    : "border-slate-300 focus:ring-agri-500 focus:border-agri-500 bg-white"
                }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="field-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="field-email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                maxLength={254}
                placeholder="ramesh@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  fieldErrors.email
                    ? "border-red-300 focus:ring-red-400 bg-red-50/20"
                    : "border-slate-300 focus:ring-agri-500 focus:border-agri-500 bg-white"
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.email}</p>
            )}
          </div>
        </div>

        {/* Category Selection */}
        <FeedbackCategorySelect
          value={formData.category}
          onChange={(cat: FeedbackCategory) => setFormData({ ...formData, category: cat })}
          disabled={isSubmitting}
          error={fieldErrors.category}
        />

        {/* Rating Stars */}
        <StarRating
          value={formData.rating}
          onChange={(rating: number) => setFormData({ ...formData, rating })}
          disabled={isSubmitting}
          error={fieldErrors.rating}
        />

        {/* Message Textarea */}
        <FeedbackTextarea
          value={formData.message}
          onChange={(msg: string) => setFormData({ ...formData, message: msg })}
          disabled={isSubmitting}
          error={fieldErrors.message}
        />

        {/* Consent Checkbox */}
        <ConsentCheckbox
          checked={formData.consent}
          onChange={(checked: boolean) => setFormData({ ...formData, consent: checked as true })}
          disabled={isSubmitting}
          error={fieldErrors.consent}
        />

        {/* Submit Button & Info */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SubmitButton isLoading={isSubmitting} disabled={isSubmitting}>
            Submit Feedback
          </SubmitButton>

          <p className="text-xs text-slate-400 text-center sm:text-right">
            {user ? "Submitting as authenticated user" : "Submitting as anonymous user"}
          </p>
        </div>
      </form>
    </div>
  );
};

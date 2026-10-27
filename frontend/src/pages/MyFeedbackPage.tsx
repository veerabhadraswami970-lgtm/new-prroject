import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MessageSquarePlus, RefreshCw } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { FeedbackHistoryList } from "../components/feedback/FeedbackHistoryList";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { useAuth } from "../context/AuthContext";
import { api, ApiError } from "../lib/api";
import { FeedbackItem, FeedbackPagination } from "../types";

export const MyFeedbackPage: React.FC = () => {
  const { token, user } = useAuth();
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [pagination, setPagination] = useState<FeedbackPagination>({ page: 1, limit: 10, total: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = useCallback(
    async (pageToFetch = 1) => {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await api.getMyFeedback(token, pageToFetch, 10);
        setItems(response.items);
        setPagination(response.pagination);
      } catch (err: any) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load feedback records. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchFeedback(1);
  }, [fetchFeedback]);

  return (
    <PageContainer size="md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Feedback Submissions
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            History of feedback submitted by <span className="font-semibold text-slate-700">{user?.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fetchFeedback(pagination.page)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs disabled:opacity-50"
            title="Refresh submissions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-agri-600 hover:bg-agri-700 transition-colors shadow-sm"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            New Feedback
          </Link>
        </div>
      </div>

      {isLoading && items.length === 0 ? (
        <div className="py-16">
          <LoadingSpinner message="Fetching your submissions from Supabase..." />
        </div>
      ) : error ? (
        <ErrorMessage
          title="Could Not Load Submissions"
          message={error}
          onRetry={() => fetchFeedback(pagination.page)}
        />
      ) : (
        <FeedbackHistoryList
          items={items}
          pagination={pagination}
          onPageChange={(page) => fetchFeedback(page)}
          isLoading={isLoading}
        />
      )}
    </PageContainer>
  );
};

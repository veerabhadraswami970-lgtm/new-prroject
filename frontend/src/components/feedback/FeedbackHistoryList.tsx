import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeedbackItem, FeedbackPagination } from "../../types";
import { FeedbackHistoryItem } from "./FeedbackHistoryItem";
import { EmptyState } from "../common/EmptyState";

interface FeedbackHistoryListProps {
  items: FeedbackItem[];
  pagination: FeedbackPagination;
  onPageChange: (newPage: number) => void;
  isLoading: boolean;
}

export const FeedbackHistoryList: React.FC<FeedbackHistoryListProps> = ({
  items,
  pagination,
  onPageChange,
  isLoading,
}) => {
  if (items.length === 0 && !isLoading) {
    return (
      <EmptyState
        title="No Feedback Submitted Yet"
        description="You have not submitted any feedback records with this account. Your future submissions will appear here."
        actionText="Submit Feedback Now"
        actionHref="/feedback"
      />
    );
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Showing {items.length} of {pagination.total} submission{pagination.total === 1 ? "" : "s"}
        </span>
        <span>
          Page {pagination.page} of {totalPages}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <FeedbackHistoryItem key={item.id} item={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1 || isLoading}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>
          <span className="text-xs text-slate-600 px-2 font-medium">
            {pagination.page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= totalPages || isLoading}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

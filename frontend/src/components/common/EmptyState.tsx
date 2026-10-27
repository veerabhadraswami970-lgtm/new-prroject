import React from "react";
import { Inbox } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  actionHref,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white/70">
      <div className="w-14 h-14 rounded-full bg-agri-50 border border-agri-100 flex items-center justify-center text-agri-600 mb-4 shadow-sm">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 leading-relaxed">{description}</p>
      {actionText && actionHref && (
        <Link
          to={actionHref}
          className="mt-5 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-agri-600 hover:bg-agri-700 rounded-xl shadow-sm shadow-agri-600/20 transition-all hover:-translate-y-0.5"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export const FEEDBACK_CATEGORIES = [
  "general_feedback",
  "feature_request",
  "bug_report",
  "user_experience",
  "agriculture_advisory",
  "other",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export interface CategoryOption {
  value: FeedbackCategory;
  label: string;
  description: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: "general_feedback",
    label: "General Feedback",
    description: "General thoughts, comments, and suggestions",
  },
  {
    value: "feature_request",
    label: "Feature Request",
    description: "Suggestions for new capabilities and tools",
  },
  {
    value: "bug_report",
    label: "Bug Report",
    description: "Reports of glitches, calculation errors, or broken elements",
  },
  {
    value: "user_experience",
    label: "User Experience",
    description: "Design, navigation, and usability improvements",
  },
  {
    value: "agriculture_advisory",
    label: "Agriculture Advisory",
    description: "Feedback regarding crop advisory and farming workflows",
  },
  {
    value: "other",
    label: "Other",
    description: "Any feedback outside the listed categories",
  },
];

export interface FeedbackSubmissionPayload {
  name?: string | null;
  email?: string | null;
  category: FeedbackCategory;
  rating: number;
  message: string;
  consent: true;
}

export interface FeedbackSubmissionResponse {
  id: string;
  category: FeedbackCategory;
  rating: number;
  createdAt: string;
}

export interface FeedbackItem {
  id: string;
  category: FeedbackCategory;
  rating: number;
  message: string;
  created_at: string;
  updated_at?: string;
}

export interface FeedbackPagination {
  page: number;
  limit: number;
  total: number;
}

export interface FeedbackHistoryResponse {
  items: FeedbackItem[];
  pagination: FeedbackPagination;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ path: string; message: string }>;
  };
}

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

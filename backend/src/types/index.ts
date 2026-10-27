import { FeedbackCategory } from "../schemas/feedback.schema.js";

export interface FeedbackRecord {
  id: string;
  user_id: string | null;
  name: string | null;
  email: string | null;
  category: FeedbackCategory;
  rating: number;
  message: string;
  consent_at: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{ path: string; message: string }> | unknown;
  };
}

export interface AuthenticatedUser {
  id: string;
  email?: string;
}

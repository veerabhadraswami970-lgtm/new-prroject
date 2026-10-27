import {
  FeedbackSubmissionPayload,
  FeedbackSubmissionResponse,
  FeedbackHistoryResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  code: string;
  details?: Array<{ path: string; message: string }>;
  status: number;

  constructor(message: string, code = "UNKNOWN_ERROR", status = 500, details?: Array<{ path: string; message: string }>) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  let json: any;
  try {
    json = await res.json();
  } catch {
    throw new ApiError(
      res.statusText || "Unable to parse server response.",
      "INVALID_RESPONSE",
      res.status
    );
  }

  if (!res.ok || json.success === false) {
    const errorBody = (json as ApiErrorResponse).error;
    throw new ApiError(
      errorBody?.message || "An unexpected error occurred.",
      errorBody?.code || "REQUEST_FAILED",
      res.status,
      errorBody?.details
    );
  }

  return (json as ApiSuccessResponse<T>).data;
}

export const api = {
  async getHealth(): Promise<{ status: string; service: string }> {
    const res = await fetch(`${API_BASE_URL}/health`);
    return handleResponse<{ status: string; service: string }>(res);
  },

  async submitFeedback(
    payload: FeedbackSubmissionPayload,
    authToken?: string | null
  ): Promise<FeedbackSubmissionResponse> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_BASE_URL}/feedback`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    return handleResponse<FeedbackSubmissionResponse>(res);
  },

  async getMyFeedback(
    authToken: string,
    page = 1,
    limit = 10
  ): Promise<FeedbackHistoryResponse> {
    const res = await fetch(`${API_BASE_URL}/feedback/mine?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return handleResponse<FeedbackHistoryResponse>(res);
  },
};

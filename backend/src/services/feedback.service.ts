import { supabaseServer, isDatabaseConfigured } from "../lib/supabase.js";
import { FeedbackInput } from "../schemas/feedback.schema.js";
import { FeedbackRecord } from "../types/index.js";
import { logger } from "../lib/logger.js";

export class FeedbackService {
  /**
   * Insert feedback into Supabase PostgreSQL database
   */
  async createFeedback(input: FeedbackInput, verifiedUserId: string | null) {
    if (!isDatabaseConfigured() || !supabaseServer) {
      throw new DatabaseNotConfiguredError(
        "Database is not configured. Please supply valid Supabase credentials."
      );
    }

    const payload = {
      user_id: verifiedUserId, // Trusted user ID only from verified auth token
      name: input.name,
      email: input.email,
      category: input.category,
      rating: input.rating,
      message: input.message,
      consent_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
      .from("feedback")
      .insert(payload)
      .select("id, category, rating, created_at")
      .single();

    if (error) {
      logger.error({ error: error.message, code: error.code }, "Failed to insert feedback row into Supabase");
      throw new Error("Unable to save feedback to the database.");
    }

    return {
      id: data.id,
      category: data.category,
      rating: data.rating,
      createdAt: data.created_at,
    };
  }

  /**
   * Retrieve feedback submitted by the verified user (isolated by user_id)
   */
  async getUserFeedback(userId: string, page: number, limit: number) {
    if (!isDatabaseConfigured() || !supabaseServer) {
      throw new DatabaseNotConfiguredError(
        "Database is not configured. Please supply valid Supabase credentials."
      );
    }

    const offset = (page - 1) * limit;

    const { data, count, error } = await supabaseServer
      .from("feedback")
      .select("id, category, rating, message, created_at, updated_at", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error({ error: error.message, code: error.code, userId }, "Failed to fetch user feedback");
      throw new Error("Unable to retrieve feedback history.");
    }

    return {
      items: (data || []) as Pick<
        FeedbackRecord,
        "id" | "category" | "rating" | "message" | "created_at" | "updated_at"
      >[],
      pagination: {
        page,
        limit,
        total: count ?? 0,
      },
    };
  }
}

export class DatabaseNotConfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseNotConfiguredError";
  }
}

export const feedbackService = new FeedbackService();

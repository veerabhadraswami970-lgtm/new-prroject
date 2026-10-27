import { Request, Response } from "express";
import { feedbackService, DatabaseNotConfiguredError } from "../services/feedback.service.js";
import { FeedbackPaginationQuery } from "../schemas/feedback.schema.js";
import { logger } from "../lib/logger.js";

export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const verifiedUserId = req.user?.id || null;
    const result = await feedbackService.createFeedback(req.body, verifiedUserId);

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      data: result,
    });
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      res.status(503).json({
        success: false,
        error: {
          code: "DATABASE_UNAVAILABLE",
          message: "Database service is not configured. Please supply valid Supabase credentials.",
        },
      });
      return;
    }

    logger.error({ error }, "Error submitting feedback");
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to submit feedback. Please try again later.",
      },
    });
  }
};

export const getMyFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication is required to view your feedback history.",
        },
      });
      return;
    }

    const { page, limit } = (req.query as unknown) as FeedbackPaginationQuery;
    const result = await feedbackService.getUserFeedback(req.user.id, page, limit);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      res.status(503).json({
        success: false,
        error: {
          code: "DATABASE_UNAVAILABLE",
          message: "Database service is not configured. Please supply valid Supabase credentials.",
        },
      });
      return;
    }

    logger.error({ error }, "Error fetching user feedback history");
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve feedback history.",
      },
    });
  }
};

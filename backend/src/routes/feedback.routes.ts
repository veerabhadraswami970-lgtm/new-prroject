import { Router } from "express";
import { submitFeedback, getMyFeedback } from "../controllers/feedback.controller.js";
import { validateBody, validateQuery } from "../middleware/validateRequest.js";
import { feedbackSchema, feedbackPaginationSchema } from "../schemas/feedback.schema.js";
import { authenticate } from "../middleware/authenticate.js";
import { feedbackRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// POST /api/feedback - Supports anonymous or authenticated submissions
router.post(
  "/feedback",
  feedbackRateLimiter,
  authenticate({ requireAuth: false }),
  validateBody(feedbackSchema),
  submitFeedback
);

// GET /api/feedback/mine - Requires authentication; strictly returns authenticated user's records
router.get(
  "/feedback/mine",
  authenticate({ requireAuth: true }),
  validateQuery(feedbackPaginationSchema),
  getMyFeedback
);

export default router;

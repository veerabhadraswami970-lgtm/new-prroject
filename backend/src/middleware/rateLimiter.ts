import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

export const feedbackRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests. Please try again after a few minutes.",
    },
  },
  statusCode: 429,
});

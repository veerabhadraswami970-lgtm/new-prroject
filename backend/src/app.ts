import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import healthRoutes from "./routes/health.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

export const createApp = (): Express => {
  const app = express();

  // Security headers
  app.use(helmet());

  // Strict CORS configuration with origin allowlist
  app.use(
    cors({
      origin: [env.FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  // Request body parsing with strict size limits
  app.use(express.json({ limit: env.JSON_BODY_LIMIT }));
  app.use(express.urlencoded({ extended: false, limit: env.JSON_BODY_LIMIT }));

  // Mount API endpoints under /api
  app.use("/api", healthRoutes);
  app.use("/api", feedbackRoutes);

  // 404 Handler for undefined routes
  app.use(notFoundHandler);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};

export const app = createApp();

import { Request, Response, NextFunction } from "express";
import { supabaseServer } from "../lib/supabase.js";
import { AuthenticatedUser } from "../types/index.js";
import { logger } from "../lib/logger.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser | null;
    }
  }
}

export const authenticate = (options: { requireAuth: boolean } = { requireAuth: true }) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      if (options.requireAuth) {
        res.status(401).json({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication is required to access this resource.",
          },
        });
        return;
      }
      req.user = null;
      next();
      return;
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
      if (options.requireAuth) {
        res.status(401).json({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication token missing.",
          },
        });
        return;
      }
      req.user = null;
      next();
      return;
    }

    if (!supabaseServer) {
      logger.error("[Auth] Supabase server is not configured with live credentials.");
      res.status(503).json({
        success: false,
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Authentication service is temporarily unavailable.",
        },
      });
      return;
    }

    try {
      const { data, error } = await supabaseServer.auth.getUser(token);

      if (error || !data.user) {
        // Reject invalid or expired tokens rather than silently downgrading
        res.status(401).json({
          success: false,
          error: {
            code: "INVALID_TOKEN",
            message: "Invalid or expired authentication session.",
          },
        });
        return;
      }

      req.user = {
        id: data.user.id,
        email: data.user.email,
      };

      next();
    } catch (err) {
      logger.error({ err }, "[Auth] Unexpected error during token verification.");
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while verifying your session.",
        },
      });
    }
  };
};

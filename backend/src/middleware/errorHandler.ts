import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger.js";
import { env } from "../config/env.js";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist.`,
    },
  });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error({ err, path: req.path, method: req.method }, "Unhandled server error");

  // Handle malformed JSON body
  if (err instanceof SyntaxError && "body" in err && (err as any).status === 400) {
    res.status(400).json({
      success: false,
      error: {
        code: "MALFORMED_JSON",
        message: "The request body contains invalid JSON.",
      },
    });
    return;
  }

  // Handle payload too large
  if (err.type === "entity.too.large" || err.status === 413) {
    res.status(413).json({
      success: false,
      error: {
        code: "PAYLOAD_TOO_LARGE",
        message: "The request payload exceeds the maximum allowed size limit.",
      },
    });
    return;
  }

  // General internal server error
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected internal server error occurred.",
      ...(env.NODE_ENV === "development" ? { details: err.message } : {}),
    },
  });
};

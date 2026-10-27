import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";

const server = app.listen(env.PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  logger.info(`Allowed CORS origin: ${env.FRONTEND_URL}`);
  logger.info(`Health check: http://localhost:${env.PORT}/api/health`);
});

// Graceful shutdown handling
const handleShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0);
  });

  // Force exit after 10 seconds if hanging
  setTimeout(() => {
    logger.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));

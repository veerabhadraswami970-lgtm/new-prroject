import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("API Routes Integration Tests", () => {
  describe("GET /api/health", () => {
    it("should return 200 and healthy status", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        data: {
          status: "ok",
          service: "feedback-api",
        },
      });
    });
  });

  describe("POST /api/feedback - Validation and Security", () => {
    it("should return 400 when body is missing required fields", async () => {
      const res = await request(app).post("/api/feedback").send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
      expect(Array.isArray(res.body.error.details)).toBe(true);
    });

    it("should return 400 when rating is outside 1-5 range", async () => {
      const res = await request(app)
        .post("/api/feedback")
        .send({
          category: "general_feedback",
          rating: 7,
          message: "A completely valid feedback message that is long enough.",
          consent: true,
        });
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 when consent is not true", async () => {
      const res = await request(app)
        .post("/api/feedback")
        .send({
          category: "general_feedback",
          rating: 4,
          message: "A completely valid feedback message that is long enough.",
          consent: false,
        });
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should reject client-supplied user_id or unexpected parameters (strict schema)", async () => {
      const res = await request(app)
        .post("/api/feedback")
        .send({
          user_id: "spoofed-user-id",
          category: "general_feedback",
          rating: 5,
          message: "Trying to inject user_id directly from the client.",
          consent: true,
        });
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/feedback/mine - Authentication Enforcement", () => {
    it("should reject unauthenticated requests with 401 UNAUTHORIZED", async () => {
      const res = await request(app).get("/api/feedback/mine");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("UNAUTHORIZED");
    });

    it("should reject invalid authorization tokens", async () => {
      const res = await request(app)
        .get("/api/feedback/mine")
        .set("Authorization", "Bearer invalid-or-malformed-token");
      // Depending on whether Supabase is live or in placeholder mode, returns 401 or 503
      expect([401, 503]).toContain(res.status);
      expect(res.body.success).toBe(false);
    });
  });

  describe("Undefined Routes Handling", () => {
    it("should return 404 with standard ROUTE_NOT_FOUND error", async () => {
      const res = await request(app).get("/api/unknown-endpoint");
      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({
        success: false,
        error: {
          code: "ROUTE_NOT_FOUND",
        },
      });
    });
  });
});

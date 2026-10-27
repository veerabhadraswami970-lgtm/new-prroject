import { describe, it, expect } from "vitest";
import {
  feedbackSchema,
  feedbackPaginationSchema,
  FEEDBACK_CATEGORIES,
} from "../src/schemas/feedback.schema.js";

describe("Feedback Schema Validation", () => {
  const validPayload = {
    name: "Farmer Ramesh",
    email: "ramesh@example.com",
    category: "agriculture_advisory",
    rating: 5,
    message: "The advisory recommendations for wheat crop cultivation are very clear and helpful.",
    consent: true,
  };

  it("should validate a correct feedback payload", () => {
    const result = feedbackSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Farmer Ramesh");
      expect(result.data.email).toBe("ramesh@example.com");
      expect(result.data.category).toBe("agriculture_advisory");
      expect(result.data.rating).toBe(5);
      expect(result.data.consent).toBe(true);
    }
  });

  it("should normalize empty string name and email to null", () => {
    const payload = {
      ...validPayload,
      name: "   ",
      email: "",
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBeNull();
      expect(result.data.email).toBeNull();
    }
  });

  it("should allow omitting optional name and email", () => {
    const payload = {
      category: "bug_report",
      rating: 4,
      message: "Found an issue with the page responsiveness on mobile devices.",
      consent: true,
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBeNull();
      expect(result.data.email).toBeNull();
    }
  });

  it("should reject invalid email formats", () => {
    const payload = {
      ...validPayload,
      email: "not-an-email",
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject email longer than 254 characters", () => {
    const longEmail = "a".repeat(250) + "@domain.com";
    const payload = {
      ...validPayload,
      email: longEmail,
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject name longer than 100 characters", () => {
    const payload = {
      ...validPayload,
      name: "x".repeat(101),
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should support all allowed feedback categories", () => {
    for (const cat of FEEDBACK_CATEGORIES) {
      const payload = { ...validPayload, category: cat };
      const result = feedbackSchema.safeParse(payload);
      expect(result.success).toBe(true);
    }
  });

  it("should reject invalid category", () => {
    const payload = {
      ...validPayload,
      category: "invalid_category",
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject non-integer ratings", () => {
    const payload = {
      ...validPayload,
      rating: 4.5,
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject ratings less than 1 or greater than 5", () => {
    expect(feedbackSchema.safeParse({ ...validPayload, rating: 0 }).success).toBe(false);
    expect(feedbackSchema.safeParse({ ...validPayload, rating: 6 }).success).toBe(false);
  });

  it("should reject message shorter than 10 characters or longer than 2000 characters", () => {
    expect(feedbackSchema.safeParse({ ...validPayload, message: "Too short" }).success).toBe(false);
    expect(
      feedbackSchema.safeParse({ ...validPayload, message: "x".repeat(2001) }).success
    ).toBe(false);
  });

  it("should reject consent when false or omitted", () => {
    expect(feedbackSchema.safeParse({ ...validPayload, consent: false }).success).toBe(false);
    const withoutConsent = { ...validPayload };
    delete (withoutConsent as any).consent;
    expect(feedbackSchema.safeParse(withoutConsent).success).toBe(false);
  });

  it("should reject unexpected properties (strict mode)", () => {
    const payload = {
      ...validPayload,
      user_id: "malicious-user-id",
      is_admin: true,
    };
    const result = feedbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe("Feedback Pagination Schema", () => {
  it("should parse default values when omitted", () => {
    const result = feedbackPaginationSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.limit).toBe(10);
    }
  });

  it("should accept valid custom page and limit", () => {
    const result = feedbackPaginationSchema.safeParse({ page: "3", limit: "25" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(3);
      expect(result.data.limit).toBe(25);
    }
  });

  it("should reject limit exceeding 50", () => {
    const result = feedbackPaginationSchema.safeParse({ limit: "51" });
    expect(result.success).toBe(false);
  });

  it("should reject non-positive page numbers", () => {
    const result = feedbackPaginationSchema.safeParse({ page: "0" });
    expect(result.success).toBe(false);
  });
});

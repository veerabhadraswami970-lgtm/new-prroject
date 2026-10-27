import { z } from "zod";

export const FEEDBACK_CATEGORIES = [
  "general_feedback",
  "feature_request",
  "bug_report",
  "user_experience",
  "agriculture_advisory",
  "other",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export const feedbackSchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(100, "Name must not exceed 100 characters.")
      .optional()
      .nullable()
      .transform((val) => (val && val.length > 0 ? val : null)),

    email: z
      .string()
      .trim()
      .max(254, "Email must not exceed 254 characters.")
      .optional()
      .nullable()
      .transform((val) => (val && val.length > 0 ? val : null))
      .refine(
        (val) => val === null || z.string().email().safeParse(val).success,
        "Please provide a valid email address."
      ),

    category: z.enum(FEEDBACK_CATEGORIES, {
      errorMap: () => ({ message: "Please select a valid feedback category." }),
    }),

    rating: z
      .number({ invalid_type_error: "Rating must be a number." })
      .int("Rating must be an integer.")
      .min(1, "Rating must be at least 1.")
      .max(5, "Rating cannot exceed 5."),

    message: z
      .string({ required_error: "Feedback message is required." })
      .trim()
      .min(10, "Message must be at least 10 characters.")
      .max(2000, "Message must not exceed 2000 characters."),

    consent: z.literal(true, {
      errorMap: () => ({ message: "You must consent to feedback storage and processing." }),
    }),
  })
  .strict({
    message: "Request contains unrecognized properties.",
  });

export type FeedbackInput = z.infer<typeof feedbackSchema>;

export const feedbackPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "Page must be a positive integer greater than or equal to 1.",
    }),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 50, {
      message: "Limit must be an integer between 1 and 50.",
    }),
});

export type FeedbackPaginationQuery = z.infer<typeof feedbackPaginationSchema>;

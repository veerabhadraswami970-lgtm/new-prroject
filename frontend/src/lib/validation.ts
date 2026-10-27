import { z } from "zod";
import { FEEDBACK_CATEGORIES } from "../types";

export const feedbackFormSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, "Name cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .max(254, "Email cannot exceed 254 characters")
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Please enter a valid email address",
    }),

  category: z.enum(FEEDBACK_CATEGORIES, {
    errorMap: () => ({ message: "Please select a feedback category" }),
  }),

  rating: z
    .number({ invalid_type_error: "Please choose a rating" })
    .int()
    .min(1, "Please select at least 1 star")
    .max(5, "Rating cannot exceed 5 stars"),

  message: z
    .string({ required_error: "Feedback message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2,000 characters"),

  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the storage and processing consent" }),
  }),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export const authFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .max(254, "Email cannot exceed 254 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;

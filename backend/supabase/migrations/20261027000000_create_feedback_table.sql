-- Migration: 20261027000000_create_feedback_table.sql
-- Description: Creates the feedback table with constraints, indexes, and Row Level Security policies
-- Application: AI-Powered Agriculture Crop Advisory Assistant (Feedback Management Module)

BEGIN;

CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NULL
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    name TEXT NULL,
    email TEXT NULL,

    category TEXT NOT NULL
        CHECK (
            category IN (
                'general_feedback',
                'feature_request',
                'bug_report',
                'user_experience',
                'agriculture_advisory',
                'other'
            )
        ),

    rating SMALLINT NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    message TEXT NOT NULL
        CHECK (
            char_length(trim(message)) BETWEEN 10 AND 2000
        ),

    consent_at TIMESTAMPTZ NOT NULL
        DEFAULT now(),

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL
        DEFAULT now(),

    CONSTRAINT feedback_name_length_check
        CHECK (name IS NULL OR char_length(name) <= 100),

    CONSTRAINT feedback_email_length_check
        CHECK (email IS NULL OR char_length(email) <= 254)
);

-- Optimize user history retrieval ordered by newest first
CREATE INDEX IF NOT EXISTS
    feedback_user_id_created_at_idx
ON public.feedback (user_id, created_at DESC);

-- Optimize general chronological ordering
CREATE INDEX IF NOT EXISTS
    feedback_created_at_idx
ON public.feedback (created_at DESC);

-- Optimize categorization queries and reporting
CREATE INDEX IF NOT EXISTS
    feedback_category_created_at_idx
ON public.feedback (category, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.feedback
    ENABLE ROW LEVEL SECURITY;

-- Policy 1: Authenticated users may read only their own records.
DROP POLICY IF EXISTS
    "Users can read their own feedback"
ON public.feedback;

CREATE POLICY "Users can read their own feedback"
ON public.feedback
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy 2: Authenticated users may insert only records associated
-- with their own authenticated identity.
DROP POLICY IF EXISTS
    "Users can insert their own feedback"
ON public.feedback;

CREATE POLICY "Users can insert their own feedback"
ON public.feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users may update only their own records.
DROP POLICY IF EXISTS
    "Users can update their own feedback"
ON public.feedback;

CREATE POLICY "Users can update their own feedback"
ON public.feedback
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Note: Anonymous users cannot query or mutate the feedback table directly via client SDK.
-- Anonymous feedback submissions are handled exclusively through the validated Express API backend.

COMMIT;

-- Migration to enforce single CV per user and fix possible duplicates

-- 1. Identify and delete duplicates keeping only the latest records
DELETE FROM public.user_cvs a
USING public.user_cvs b
WHERE a.id < b.id
  AND a.user_id = b.user_id;

-- 2. Add Unique constraint
ALTER TABLE public.user_cvs ADD CONSTRAINT user_cvs_user_id_unique UNIQUE (user_id);

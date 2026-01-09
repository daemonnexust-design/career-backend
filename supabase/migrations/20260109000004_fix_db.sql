-- 1. FIX USER CVS (Duplicates)
-- Keep only the most recent CV for each user
delete from public.user_cvs a
using public.user_cvs b
where a.id < b.id
  and a.user_id = b.user_id;

-- Add Unique Constraint to prevent future duplicates
alter table public.user_cvs 
drop constraint if exists user_cvs_user_id_unique;

alter table public.user_cvs 
add constraint user_cvs_user_id_unique unique (user_id);


-- 2. FIX ACTIVITY LOGS
-- Ensure table exists
create table if not exists public.activity_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  action_type text not null,
  title text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.activity_logs enable row level security;

-- Drop existing policies to ensure clean slate
drop policy if exists "Users can view own activity" on public.activity_logs;
drop policy if exists "Service role inserts" on public.activity_logs;

-- Re-create Policies
create policy "Users can view own activity"
  on public.activity_logs for select
  using ( auth.uid() = user_id );

-- Explicitly allow potential frontend inserts if needed (for debugging), 
-- OR rely on Service Role (which bypasses RLS). 
-- Added mainly to verify if RLS was blocking anything.
create policy "Users can insert own activity"
  on public.activity_logs for insert
  with check ( auth.uid() = user_id );


-- 3. STORAGE PERMISSIONS (Just in case)
-- Ensure buckets exist
insert into storage.buckets (id, name, public)
values ('cv-uploads', 'cv-uploads', false)
on conflict (id) do nothing;

-- Allow Service Role full access (implicit, but good to know)
-- Allow Users to Read their own files? 
-- No, we stick to Signed URLs.

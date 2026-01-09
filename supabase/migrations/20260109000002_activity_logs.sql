-- Create activity_logs table
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

-- Policies
create policy "Users can view own activity"
  on public.activity_logs for select
  using ( auth.uid() = user_id );

-- Allow users to insert (e.g. from frontend for interactions)?
-- Let's stick to Server-Side logging where possible, but allow simple frontend logging if needed.
-- For now, NO INSERT policy for users. Only Service Role.

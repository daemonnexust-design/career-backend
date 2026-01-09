-- Migration: Add Wishlist System

-- 1. Create wishlist table
create table if not exists public.wishlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  company_name text not null,
  role_title text not null,
  created_at timestamptz default now()
);

-- 2. Enable RLS
alter table public.wishlist enable row level security;

-- 3. RLS Policies
create policy "Users can view own wishlist"
  on public.wishlist for select
  using ( auth.uid() = user_id );

create policy "Users can insert own wishlist"
  on public.wishlist for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own wishlist"
  on public.wishlist for update
  using ( auth.uid() = user_id );

create policy "Users can delete own wishlist"
  on public.wishlist for delete
  using ( auth.uid() = user_id );

-- 4. Grant access to authenticated users
grant all on public.wishlist to authenticated;

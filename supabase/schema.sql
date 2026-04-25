-- Running Coach — Supabase Schema
-- Run this in your Supabase project's SQL editor after adding env vars.

-- ─── Profiles ────────────────────────────────────────────────────────────────

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  active_plan_id text not null default '10k-12w',
  plan_start_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can upsert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- ─── Session Logs ─────────────────────────────────────────────────────────────

create table if not exists session_logs (
  id text primary key,                          -- matches localStorage id
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null,
  week_number int not null,
  session_id text not null,
  completed_at timestamptz not null,
  actual_distance_km numeric(5,2),
  actual_pace text,                             -- "mm:ss/km"
  interval_paces jsonb,                         -- {0: "3:30/km", 1: "3:32/km", ...}
  notes text,
  created_at timestamptz not null default now()
);

alter table session_logs enable row level security;

create policy "Users can read own logs"
  on session_logs for select using (auth.uid() = user_id);

create policy "Users can insert own logs"
  on session_logs for insert with check (auth.uid() = user_id);

create policy "Users can update own logs"
  on session_logs for update using (auth.uid() = user_id);

create policy "Users can delete own logs"
  on session_logs for delete using (auth.uid() = user_id);

-- Index for fast per-plan queries
create index if not exists session_logs_user_plan
  on session_logs(user_id, plan_id, week_number);

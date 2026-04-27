import type { SessionLog } from "@/types/training";
import { getSupabaseClient } from "./supabase";
import { getSessionLogs, addSessionLog } from "./storage";

// ─── Push a single log to Supabase ───────────────────────────────────────────

export async function pushSessionLog(log: SessionLog, userId: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.from("session_logs").upsert({
    id: log.id,
    user_id: userId,
    plan_id: log.planId,
    week_number: log.weekNumber,
    session_id: log.sessionId,
    completed_at: log.completedAt,
    actual_distance_km: log.actual_distance_km ?? null,
    actual_pace: log.actual_pace ?? null,
    interval_paces: log.interval_paces ?? null,
    notes: log.notes ?? null,
  });
}

// ─── Pull all logs from Supabase and merge into localStorage ─────────────────

export async function pullAndMergeSessionLogs(): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  const { data, error } = await supabase.from("session_logs").select("*");
  if (error || !data) return;
  for (const row of data) {
    const log: SessionLog = {
      id: row.id,
      planId: row.plan_id,
      weekNumber: row.week_number,
      sessionId: row.session_id,
      completedAt: row.completed_at,
      actual_distance_km: row.actual_distance_km ?? undefined,
      actual_pace: row.actual_pace ?? undefined,
      interval_paces: row.interval_paces ?? undefined,
      notes: row.notes ?? undefined,
    };
    addSessionLog(log);
  }
}

// ─── Push all localStorage logs to Supabase (initial sync) ───────────────────

export async function pushAllLocalLogs(userId: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  const logs = getSessionLogs();
  if (logs.length === 0) return;
  const rows = logs.map((log) => ({
    id: log.id,
    user_id: userId,
    plan_id: log.planId,
    week_number: log.weekNumber,
    session_id: log.sessionId,
    completed_at: log.completedAt,
    actual_distance_km: log.actual_distance_km ?? null,
    actual_pace: log.actual_pace ?? null,
    interval_paces: log.interval_paces ?? null,
    notes: log.notes ?? null,
  }));
  await supabase.from("session_logs").upsert(rows);
}

// ─── Delete a log from Supabase ───────────────────────────────────────────────

export async function deleteRemoteLog(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.from("session_logs").delete().eq("id", id);
}

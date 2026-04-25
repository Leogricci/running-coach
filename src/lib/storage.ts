import type { SessionLog } from "@/types/training";

const KEYS = {
  activePlanId: "rc_active_plan_id",
  planStartDate: "rc_plan_start_date",
  sessionLogs: "rc_session_logs",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// ─── Active plan ──────────────────────────────────────────────────────────────

export function getActivePlanId(): string {
  return safeGet<string>(KEYS.activePlanId, "10k-12w");
}

export function setActivePlanId(id: string): void {
  safeSet(KEYS.activePlanId, id);
}

// ─── Plan start date ──────────────────────────────────────────────────────────

export function getPlanStartDate(): string {
  // Default: most recent Monday
  const fallback = getMostRecentMonday();
  return safeGet<string>(KEYS.planStartDate, fallback);
}

export function setPlanStartDate(isoDate: string): void {
  safeSet(KEYS.planStartDate, isoDate);
}

function getMostRecentMonday(): string {
  const d = new Date();
  const day = d.getDay(); // 0=Sun, 1=Mon ...
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

// ─── Session logs ─────────────────────────────────────────────────────────────

export function getSessionLogs(): SessionLog[] {
  return safeGet<SessionLog[]>(KEYS.sessionLogs, []);
}

export function addSessionLog(log: SessionLog): void {
  const logs = getSessionLogs();
  // Replace if same session already logged today
  const existing = logs.findIndex((l) => l.sessionId === log.sessionId && l.planId === log.planId);
  if (existing >= 0) {
    logs[existing] = log;
  } else {
    logs.push(log);
  }
  safeSet(KEYS.sessionLogs, logs);
}

export function deleteSessionLog(id: string): void {
  const logs = getSessionLogs().filter((l) => l.id !== id);
  safeSet(KEYS.sessionLogs, logs);
}

export function isSessionCompleted(planId: string, sessionId: string): boolean {
  return getSessionLogs().some((l) => l.planId === planId && l.sessionId === sessionId);
}

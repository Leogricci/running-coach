// ─── Session types ────────────────────────────────────────────────────────────

export type SessionType = "easy_run" | "speed" | "threshold" | "specific" | "rest";

export interface Interval {
  repetitions: number;
  /** Distance in metres — provide this OR duration_s */
  distance_m?: number;
  /** Duration in seconds — provide this OR distance_m */
  duration_s?: number;
  /** Target pace as "mm:ss/km" string, e.g. "3:35/km" */
  target_pace: string;
  /** Recovery time in seconds */
  recovery_s: number;
  notes?: string;
}

export interface Session {
  id: string;
  type: SessionType;
  /** Day of the week: 0 = Monday … 6 = Sunday */
  dayOfWeek: number;
  /** Total distance in km (0 for rest) */
  distance_km: number;
  /** Target pace range as "mm:ss–mm:ss/km", e.g. "5:30–6:00/km" */
  target_pace?: string;
  intervals?: Interval[];
  /** Warm-up instructions shown before intervals */
  warmup_notes?: string;
  notes?: string;
}

// ─── Week / Phase ─────────────────────────────────────────────────────────────

export type Phase = "base" | "threshold" | "specific";

export interface Week {
  weekNumber: number;
  phase: Phase;
  sessions: Session[];
}

// ─── Plan ─────────────────────────────────────────────────────────────────────

export type Distance = "10k" | "half" | "marathon";

export interface Plan {
  id: string;
  name: string;
  distance: Distance;
  durationWeeks: number;
  weeks: Week[];
}

// ─── Session log (completed sessions) ────────────────────────────────────────

export interface SessionLog {
  id: string;
  planId: string;
  weekNumber: number;
  sessionId: string;
  completedAt: string; // ISO 8601
  /** Actual distance run in km */
  actual_distance_km?: number;
  /** Actual average pace "mm:ss/km" */
  actual_pace?: string;
  /** Per-interval actual paces, keyed by interval index */
  interval_paces?: Record<number, string>;
  notes?: string;
}

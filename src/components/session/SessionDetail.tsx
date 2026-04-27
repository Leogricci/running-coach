"use client";

import { useEffect, useRef } from "react";
import type { Session } from "@/types/training";
import { SessionChip } from "@/components/calendar/SessionChip";
import { IntervalList } from "./IntervalList";
import { sessionDate, formatShortDate } from "@/utils/date";
import { useRouter } from "next/navigation";

interface Props {
  session: Session;
  weekNumber: number;
  planId: string;
  planStartDate: string;
  completed: boolean;
  onClose: () => void;
  onMarkComplete: () => void;
  onMarkIncomplete: () => void;
}

const SESSION_LABELS: Record<string, string> = {
  easy_run: "Easy Run",
  speed: "Speed Session",
  threshold: "Threshold",
  specific: "Specific Pace",
  rest: "Rest Day",
};

export function SessionDetail({
  session,
  weekNumber,
  planStartDate,
  completed,
  onClose,
  onMarkComplete,
  onMarkIncomplete,
}: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Slide-up animation
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.transform = "translateY(100%)";
    requestAnimationFrame(() => {
      sheet.style.transition = "transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)";
      sheet.style.transform = "translateY(0)";
    });
  }, []);

  const date = sessionDate(planStartDate, weekNumber, session.dayOfWeek);
  const hasTimer = (session.intervals?.length ?? 0) > 0;

  function launchTimer() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("timerSession", JSON.stringify({ session, weekNumber }));
    }
    onClose();
    router.push("/timer");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />

      {/* Sheet — absolutely pinned to bottom of viewport, independent of any flex ancestor */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex-shrink-0 flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full" style={{ backgroundColor: "var(--border)" }} />
        </div>

        {/* Header */}
        <div
          className="flex-shrink-0 px-5 pb-4 flex items-start justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SessionChip type={session.type} />
              {completed && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#22c55e22", color: "#22c55e" }}
                >
                  Done
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {SESSION_LABELS[session.type]}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {formatShortDate(date)}
              {session.distance_km > 0 && ` · ${session.distance_km} km`}
              {session.target_pace && ` · ${session.target_pace}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content — flex-1 + overflow-y-auto works reliably when parent has a fixed height */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
          style={{ overscrollBehavior: "contain" }}
        >
          {session.warmup_notes && (
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "var(--bg-elevated)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
                Warm-up
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {session.warmup_notes}
              </p>
            </div>
          )}

          {session.intervals && session.intervals.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2.5" style={{ color: "var(--text-muted)" }}>
                Intervals
              </p>
              <IntervalList intervals={session.intervals} />
            </div>
          )}

          {session.notes && (
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "var(--bg-elevated)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
                Notes
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {session.notes}
              </p>
            </div>
          )}

          <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "var(--bg-elevated)" }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
              Reminders
            </p>
            {session.type === "easy_run" && (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Easy = conversational. You should be able to say full sentences.</p>
            )}
            {session.type === "speed" && (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Generous recovery between reps — quality over fatigue.</p>
            )}
            {session.type === "threshold" && (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Controlled effort — not all-out. A few words per breath, not a conversation.</p>
            )}
            {session.type === "specific" && (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Race pace. Focused and controlled — not a time trial.</p>
            )}
          </div>
        </div>

        {/* Action buttons — flex-shrink-0 footer, always visible */}
        <div
          className="flex-shrink-0 flex flex-col gap-2.5 px-5 pt-3"
          style={{
            borderTop: "1px solid var(--border)",
            paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
          }}
        >
          {hasTimer && (
            <button
              onClick={launchTimer}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold"
              style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l3 3M9.5 3h5M12 1v2" />
              </svg>
              Start Timer
            </button>
          )}
          {!completed ? (
            <button
              onClick={onMarkComplete}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold"
              style={{ backgroundColor: "#22c55e33", color: "#22c55e" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Mark Done
            </button>
          ) : (
            <button
              onClick={onMarkIncomplete}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
            >
              Undo
            </button>
          )}
        </div>
      </div>
    </>
  );
}

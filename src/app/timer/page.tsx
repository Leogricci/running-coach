"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@/types/training";
import { IntervalTimer } from "@/components/timer/IntervalTimer";
import { useSessionLog } from "@/hooks/useSessionLog";
import { useActivePlan } from "@/hooks/useActivePlan";
import type { SessionLog } from "@/types/training";

interface StoredTimerSession {
  session: Session;
  weekNumber: number;
}

export default function TimerPage() {
  const router = useRouter();
  const { plan } = useActivePlan();
  const { logSession } = useSessionLog();
  const [timerSession, setTimerSession] = useState<StoredTimerSession | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("timerSession");
    if (raw) {
      try {
        setTimerSession(JSON.parse(raw) as StoredTimerSession);
      } catch {
        // ignore
      }
    }
    setLoaded(true);
  }, []);

  function handleDone() {
    if (!timerSession) return;
    const log: SessionLog = {
      id: `${plan.id}-${timerSession.session.id}-${Date.now()}`,
      planId: plan.id,
      weekNumber: timerSession.weekNumber,
      sessionId: timerSession.session.id,
      completedAt: new Date().toISOString(),
    };
    logSession(log);
    sessionStorage.removeItem("timerSession");
    router.push("/calendar");
  }

  if (!loaded) return null;

  if (!timerSession) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 px-6 text-center">
        <div className="text-5xl mb-4">⏱</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          No session selected
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Open a session from the Calendar and tap "Start Timer".
        </p>
        <button
          onClick={() => router.push("/calendar")}
          className="rounded-xl px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-secondary)" }}
        >
          Go to Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-3 flex items-center justify-between"
        style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Interval Timer
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Week {timerSession.weekNumber} — {timerSession.session.intervals?.length ?? 0} interval set(s)
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <IntervalTimer
        session={timerSession.session}
        weekNumber={timerSession.weekNumber}
        onDone={handleDone}
      />
    </div>
  );
}

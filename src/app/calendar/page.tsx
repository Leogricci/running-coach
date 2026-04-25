"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Session, SessionLog } from "@/types/training";
import { PLANS } from "@/data";
import { useActivePlan } from "@/hooks/useActivePlan";
import { useSessionLog } from "@/hooks/useSessionLog";
import { currentWeekNumber } from "@/utils/date";
import { WeekCard } from "@/components/calendar/WeekCard";
import { PlanFilter } from "@/components/calendar/PlanFilter";
import { SessionDetail } from "@/components/session/SessionDetail";

export default function CalendarPage() {
  const { plan, planStartDate, setActivePlan } = useActivePlan();
  const { logs, isCompleted, logSession, removeLog } = useSessionLog();
  const currentWeek = planStartDate ? currentWeekNumber(planStartDate, plan.durationWeeks) : null;

  const [selectedSession, setSelectedSession] = useState<{ session: Session; weekNumber: number } | null>(null);

  // Scroll current week into view on mount
  const currentWeekRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentWeekRef.current) {
      setTimeout(() => {
        currentWeekRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [planStartDate]);

  const handleMarkComplete = useCallback(() => {
    if (!selectedSession) return;
    const log: SessionLog = {
      id: `${plan.id}-${selectedSession.session.id}-${Date.now()}`,
      planId: plan.id,
      weekNumber: selectedSession.weekNumber,
      sessionId: selectedSession.session.id,
      completedAt: new Date().toISOString(),
    };
    logSession(log);
    setSelectedSession(null);
  }, [selectedSession, plan.id, logSession]);

  const handleMarkIncomplete = useCallback(() => {
    if (!selectedSession) return;
    const log = logs.find(
      (l) => l.planId === plan.id && l.sessionId === selectedSession.session.id,
    );
    if (log) removeLog(log.id);
    setSelectedSession(null);
  }, [selectedSession, plan.id, logs, removeLog]);

  const completedIds = new Set(
    logs.filter((l) => l.planId === plan.id).map((l) => l.sessionId),
  );

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-3 space-y-3"
        style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Training Plan
        </h1>
        <PlanFilter
          plans={PLANS}
          activePlanId={plan.id}
          onSelect={setActivePlan}
        />
      </div>

      {/* Weeks list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {plan.weeks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🏃</div>
            <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
              Coming Soon
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              This plan is being built. Check back later.
            </p>
          </div>
        ) : (
          plan.weeks.map((week) => {
            const isCurrent = week.weekNumber === currentWeek;
            return (
              <div
                key={week.weekNumber}
                ref={isCurrent ? currentWeekRef : undefined}
              >
                <WeekCard
                  week={week}
                  planStartDate={planStartDate}
                  isCurrent={isCurrent}
                  completedSessionIds={completedIds}
                  onSessionTap={(session, weekNumber) =>
                    setSelectedSession({ session, weekNumber })
                  }
                />
              </div>
            );
          })
        )}
        {/* Bottom padding for safe area */}
        <div className="h-4" />
      </div>

      {/* Session detail sheet */}
      {selectedSession && (
        <SessionDetail
          session={selectedSession.session}
          weekNumber={selectedSession.weekNumber}
          planId={plan.id}
          planStartDate={planStartDate}
          completed={isCompleted(plan.id, selectedSession.session.id)}
          onClose={() => setSelectedSession(null)}
          onMarkComplete={handleMarkComplete}
          onMarkIncomplete={handleMarkIncomplete}
        />
      )}
    </div>
  );
}

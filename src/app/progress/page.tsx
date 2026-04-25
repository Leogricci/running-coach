"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useActivePlan } from "@/hooks/useActivePlan";
import { useSessionLog } from "@/hooks/useSessionLog";
import { kmPaceToSeconds, secondsToKmPace } from "@/utils/pace";

export default function ProgressPage() {
  const { plan } = useActivePlan();
  const { logs } = useSessionLog();

  const planLogs = useMemo(() => logs.filter((l) => l.planId === plan.id), [logs, plan.id]);

  // Volume per week (planned vs completed)
  const weeklyData = useMemo(() => {
    return plan.weeks.map((week) => {
      const planned = week.sessions.reduce((sum, s) => sum + s.distance_km, 0);
      const completedIds = new Set(
        planLogs.filter((l) => l.weekNumber === week.weekNumber).map((l) => l.sessionId),
      );
      const completed = week.sessions
        .filter((s) => completedIds.has(s.id))
        .reduce((sum, s) => sum + s.distance_km, 0);
      return { week: `W${week.weekNumber}`, planned: +planned.toFixed(1), completed: +completed.toFixed(1) };
    });
  }, [plan.weeks, planLogs]);

  // Session completion rate per week
  const completionData = useMemo(() => {
    return plan.weeks.map((week) => {
      const planned = week.sessions.filter((s) => s.type !== "rest").length;
      const completedIds = new Set(
        planLogs.filter((l) => l.weekNumber === week.weekNumber).map((l) => l.sessionId),
      );
      const done = week.sessions.filter((s) => completedIds.has(s.id) && s.type !== "rest").length;
      return { week: `W${week.weekNumber}`, planned, done };
    });
  }, [plan.weeks, planLogs]);

  const totalPlanned = plan.weeks.reduce(
    (sum, w) => sum + w.sessions.filter((s) => s.type !== "rest").length,
    0,
  );
  const totalDone = planLogs.length;
  const totalKm = planLogs.reduce((sum, l) => sum + (l.actual_distance_km ?? 0), 0);

  const tooltipStyle = {
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text-primary)",
    fontSize: 12,
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-3"
        style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Progress
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
          {plan.name}
        </p>
      </div>

      <div className="px-4 py-5 space-y-6 pb-8">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Sessions", value: `${totalDone}/${totalPlanned}` },
            { label: "Km logged", value: totalKm > 0 ? `${totalKm.toFixed(0)} km` : "—" },
            {
              label: "Completion",
              value:
                totalPlanned > 0
                  ? `${Math.round((totalDone / totalPlanned) * 100)}%`
                  : "—",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl px-3 py-4 text-center"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {label}
              </p>
              <p className="text-xl font-bold mt-1 tabular-nums" style={{ color: "var(--text-primary)" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Weekly volume */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Weekly Volume (km)
          </h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} barGap={2}>
              <XAxis
                dataKey="week"
                tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="planned" fill="var(--border)" radius={[4, 4, 0, 0]} name="Planned" />
              <Bar dataKey="completed" fill="var(--easy)" radius={[4, 4, 0, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[
              { color: "var(--border)", label: "Planned" },
              { color: "var(--easy)", label: "Completed" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions completed vs planned */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Sessions Completed vs Planned
          </h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={completionData} barGap={2}>
              <XAxis
                dataKey="week"
                tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="planned" fill="var(--border)" radius={[4, 4, 0, 0]} name="Planned" />
              <Bar dataKey="done" fill="var(--specific)" radius={[4, 4, 0, 0]} name="Done" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {planLogs.length === 0 && (
          <div
            className="rounded-2xl px-4 py-8 text-center"
            style={{ backgroundColor: "var(--bg-card)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Complete sessions to see pace trends here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

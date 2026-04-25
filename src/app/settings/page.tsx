"use client";

import { useState } from "react";
import { useActivePlan } from "@/hooks/useActivePlan";

export default function SettingsPage() {
  const { plan, planStartDate, updateStartDate } = useActivePlan();
  const [saved, setSaved] = useState(false);
  const [dateInput, setDateInput] = useState(planStartDate);

  // Sync input when planStartDate loads from storage
  if (planStartDate && !dateInput) setDateInput(planStartDate);

  function handleSave() {
    if (!dateInput) return;
    updateStartDate(dateInput);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-3"
        style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Settings
        </h1>
      </div>

      <div className="px-4 py-5 space-y-4 pb-8">
        {/* Plan start date */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Plan Start Date
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            Set the Monday of Week 1. Adjust this if you started mid-plan or are changing your schedule.
          </p>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label
                htmlFor="start-date"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Week 1 starts on
              </label>
              <input
                id="start-date"
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  colorScheme: "dark",
                }}
              />
            </div>
            <button
              onClick={handleSave}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
              style={{
                backgroundColor: saved ? "var(--easy)22" : "var(--text-primary)",
                color: saved ? "var(--easy)" : "var(--bg)",
              }}
            >
              {saved ? "Saved ✓" : "Save"}
            </button>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            Current plan: <span style={{ color: "var(--text-secondary)" }}>{plan.name}</span>
          </p>
        </div>

        {/* Training reminders */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Training Rules
          </h2>
          <ul className="space-y-2.5">
            {[
              "Easy runs = conversational pace. Full sentences, always.",
              "No super long runs (keep under 15 km in this plan).",
              "Never run fast two days in a row.",
              "Generous recovery between intervals — quality > fatigue.",
              "Respect the phase progression: build before you sharpen.",
            ].map((rule, i) => (
              <li key={i} className="flex gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-0.5 flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}>
                  {i + 1}
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* App info */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            About
          </h2>
          <div className="space-y-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
            <p>Running Coach — Personal Training PWA</p>
            <p>10K plan · 12 weeks · 3 phases</p>
            <p>Half marathon and marathon plans coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

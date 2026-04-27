"use client";

import { useState } from "react";
import { useActivePlan } from "@/hooks/useActivePlan";
import { useAuth } from "@/lib/auth-context";

export default function SettingsPage() {
  const { plan, planStartDate, updateStartDate } = useActivePlan();
  const { user, loading: authLoading, signInWithEmail, signOut, syncNow, syncing } = useAuth();

  const [dateSaved, setDateSaved] = useState(false);
  const [dateInput, setDateInput] = useState(planStartDate);
  const [email, setEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  if (planStartDate && !dateInput) setDateInput(planStartDate);

  function handleSaveDate() {
    if (!dateInput) return;
    updateStartDate(dateInput);
    setDateSaved(true);
    setTimeout(() => setDateSaved(false), 2000);
  }

  async function handleSignIn() {
    if (!email) return;
    setSigningIn(true);
    setAuthError(null);
    const { error } = await signInWithEmail(email);
    setSigningIn(false);
    if (error) {
      setAuthError(error);
    } else {
      setMagicLinkSent(true);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-3"
        style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Settings
        </h1>
      </div>

      <div className="px-4 py-5 space-y-4 pb-8">

        {/* ── Account ── */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Account
          </h2>

          {authLoading ? (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading…</p>
          ) : user ? (
            /* Signed in */
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-secondary)" }}
                >
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {user.email}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Signed in</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={syncNow}
                  disabled={syncing}
                  className="flex-1 rounded-xl py-2.5 text-sm font-medium transition-opacity"
                  style={{ backgroundColor: "var(--bg-elevated)", color: syncing ? "var(--text-muted)" : "var(--text-secondary)" }}
                >
                  {syncing ? "Syncing…" : "Sync Now"}
                </button>
                <button
                  onClick={signOut}
                  className="flex-1 rounded-xl py-2.5 text-sm font-medium"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : magicLinkSent ? (
            /* Magic link sent */
            <div className="text-center py-2 space-y-2">
              <p className="text-2xl">📬</p>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Check your email
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                We sent a sign-in link to {email}. Tap it on any device.
              </p>
              <button
                onClick={() => { setMagicLinkSent(false); setEmail(""); }}
                className="text-xs mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Use a different email
              </button>
            </div>
          ) : (
            /* Sign in form */
            <div className="space-y-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Sign in to sync your progress across all your devices.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                }}
              />
              {authError && (
                <p className="text-xs" style={{ color: "var(--speed)" }}>{authError}</p>
              )}
              <button
                onClick={handleSignIn}
                disabled={signingIn || !email}
                className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity"
                style={{
                  backgroundColor: "var(--text-primary)",
                  color: "var(--bg)",
                  opacity: signingIn || !email ? 0.5 : 1,
                }}
              >
                {signingIn ? "Sending…" : "Send Magic Link"}
              </button>
              <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                No password needed — we email you a sign-in link.
              </p>
            </div>
          )}
        </div>

        {/* ── Plan start date ── */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Plan Start Date
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            Set the Monday of Week 1. Adjust this if you started mid-plan.
          </p>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
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
              onClick={handleSaveDate}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
              style={{
                backgroundColor: dateSaved ? "var(--easy)22" : "var(--text-primary)",
                color: dateSaved ? "var(--easy)" : "var(--bg)",
              }}
            >
              {dateSaved ? "Saved ✓" : "Save"}
            </button>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            Current plan: <span style={{ color: "var(--text-secondary)" }}>{plan.name}</span>
          </p>
        </div>

        {/* ── Training rules ── */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Training Rules
          </h2>
          <ul className="space-y-2.5">
            {[
              "Easy runs = conversational pace. Full sentences, always.",
              "No super long runs (keep under 15 km in this plan).",
              "Never run fast two days in a row.",
              "Generous recovery between intervals — quality over fatigue.",
              "Respect the phase progression: build before you sharpen.",
            ].map((rule, i) => (
              <li key={i} className="flex gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span
                  className="mt-0.5 flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
                >
                  {i + 1}
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* ── About ── */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            About
          </h2>
          <div className="space-y-1 text-sm" style={{ color: "var(--text-muted)" }}>
            <p>Running Coach — Personal Training PWA</p>
            <p>10K plan · 12 weeks · 3 phases</p>
            <p>Half marathon and marathon plans coming soon.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

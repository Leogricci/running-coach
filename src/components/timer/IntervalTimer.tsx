"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Session, Interval } from "@/types/training";
import { calcRepDuration, formatDistance, secondsToDisplay } from "@/utils/pace";
import { useWakeLock } from "@/hooks/useWakeLock";
import { useAudioCues } from "@/hooks/useAudioCues";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";

type Phase = "idle" | "countdown" | "work" | "recovery" | "done";

interface RepState {
  intervalIndex: number;
  repIndex: number; // 1-based within this interval set
  totalReps: number; // total flattened reps
  currentRep: number; // 1-based overall
}

/** Flatten intervals into individual reps */
function flattenReps(intervals: Interval[]): Array<{ interval: Interval; repWithinSet: number }> {
  const result: Array<{ interval: Interval; repWithinSet: number }> = [];
  for (const interval of intervals) {
    for (let r = 1; r <= interval.repetitions; r++) {
      result.push({ interval, repWithinSet: r });
    }
  }
  return result;
}

interface Props {
  session: Session;
  weekNumber: number;
  onDone: () => void;
}

export function IntervalTimer({ session, weekNumber, onDone }: Props) {
  const reps = flattenReps(session.intervals ?? []);
  const { acquire, release } = useWakeLock();
  const { playCountdown, playGo, playStop, playRecoveryEnd, resume } = useAudioCues();

  const [repCursor, setRepCursor] = useState(0); // index into reps[]
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef(phase);
  const timeLeftRef = useRef(timeLeft);
  const repCursorRef = useRef(repCursor);

  phaseRef.current = phase;
  timeLeftRef.current = timeLeft;
  repCursorRef.current = repCursor;

  const currentRep = reps[repCursor];
  const interval = currentRep?.interval;

  const workDuration = interval
    ? interval.duration_s ?? (interval.distance_m ? calcRepDuration(interval.distance_m, interval.target_pace) : 0)
    : 0;
  const recoveryDuration = interval?.recovery_s ?? 0;

  function clearTick() {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }

  const advancePhase = useCallback(() => {
    const p = phaseRef.current;
    const cursor = repCursorRef.current;

    if (p === "idle" || p === "countdown") {
      // Start work
      setPhase("work");
      setTimeLeft(workDuration);
      playGo();
    } else if (p === "work") {
      playStop();
      if (cursor < reps.length - 1) {
        // Move to recovery
        setPhase("recovery");
        setTimeLeft(recoveryDuration);
      } else {
        // Last rep done
        setPhase("done");
        setIsRunning(false);
        clearTick();
        release();
      }
    } else if (p === "recovery") {
      // Next rep
      const nextCursor = cursor + 1;
      setRepCursor(nextCursor);
      repCursorRef.current = nextCursor;
      setPhase("work");
      const nextInterval = reps[nextCursor]?.interval;
      const dur = nextInterval?.duration_s ?? (nextInterval?.distance_m ? calcRepDuration(nextInterval.distance_m, nextInterval.target_pace) : 0);
      setTimeLeft(dur);
      playGo();
    }
  }, [workDuration, recoveryDuration, reps, playGo, playStop, release]);

  // Tick every second
  useEffect(() => {
    if (!isRunning) {
      clearTick();
      return;
    }
    tickRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advancePhase();
          return 0;
        }
        // Audio cues near end
        if (phaseRef.current === "recovery" && prev === 4) {
          playRecoveryEnd();
        }
        return prev - 1;
      });
    }, 1000);
    return clearTick;
  }, [isRunning, advancePhase, playRecoveryEnd]);

  async function handlePlayPause() {
    await resume();
    if (phase === "idle") {
      // Start countdown
      setPhase("countdown");
      setTimeLeft(3);
      setIsRunning(true);
      playCountdown();
      await acquire();
    } else {
      setIsRunning((r) => !r);
    }
  }

  function handleSkip() {
    clearTick();
    advancePhase();
    if (isRunning) {
      tickRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { advancePhase(); return 0; }
          if (phaseRef.current === "recovery" && prev === 4) playRecoveryEnd();
          return prev - 1;
        });
      }, 1000);
    }
  }

  function handleStop() {
    clearTick();
    setIsRunning(false);
    setPhase("idle");
    setRepCursor(0);
    setTimeLeft(0);
    release();
  }

  if (!currentRep && phase !== "done") {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24">
        <p style={{ color: "var(--text-muted)" }}>No intervals in this session.</p>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 px-6 text-center">
        <div className="text-6xl">🎯</div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Session Complete!
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {reps.length} reps done
          </p>
        </div>
        <button
          onClick={onDone}
          className="rounded-xl px-8 py-3.5 text-sm font-semibold"
          style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
        >
          Mark Complete & Finish
        </button>
      </div>
    );
  }

  const label = phase === "recovery" ? "Recovery" : "Work";
  const duration = phase === "recovery" ? recoveryDuration : (phase === "countdown" ? 3 : workDuration);
  const distanceLabel = interval?.distance_m ? formatDistance(interval.distance_m) : undefined;

  return (
    <div className="flex flex-col items-center gap-10 px-6 py-8">
      {/* Rep progress bar */}
      <div className="w-full flex gap-1">
        {reps.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-colors"
            style={{
              backgroundColor:
                i < repCursor
                  ? "var(--easy)"
                  : i === repCursor
                  ? "var(--text-secondary)"
                  : "var(--border)",
            }}
          />
        ))}
      </div>

      <TimerDisplay
        repIndex={phase === "recovery" ? repCursor + 1 : repCursor + 1}
        totalReps={reps.length}
        timeLeft={timeLeft}
        totalDuration={duration}
        targetPace={interval?.target_pace ?? ""}
        label={label}
        distanceLabel={distanceLabel}
      />

      <TimerControls
        isRunning={isRunning}
        onPlayPause={handlePlayPause}
        onSkip={handleSkip}
        onStop={handleStop}
      />

      {/* Upcoming reps */}
      <div className="w-full space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
          Up Next
        </p>
        {reps.slice(repCursor + 1, repCursor + 4).map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl px-4 py-2.5"
            style={{ backgroundColor: "var(--bg-elevated)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Rep {repCursor + 2 + i}
            </span>
            <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text-primary)" }}>
              {r.interval.distance_m ? formatDistance(r.interval.distance_m) : secondsToDisplay(r.interval.duration_s ?? 0)}
              {" @ "}
              {r.interval.target_pace}
            </span>
          </div>
        ))}
        {reps.length - repCursor - 1 > 3 && (
          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            +{reps.length - repCursor - 4} more
          </p>
        )}
      </div>
    </div>
  );
}

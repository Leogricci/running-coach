import { secondsToDisplay } from "@/utils/pace";

interface Props {
  repIndex: number;
  totalReps: number;
  timeLeft: number;
  totalDuration: number;
  targetPace: string;
  label: string; // "Work" or "Recovery"
  distanceLabel?: string;
}

export function TimerDisplay({
  repIndex,
  totalReps,
  timeLeft,
  totalDuration,
  targetPace,
  label,
  distanceLabel,
}: Props) {
  const progress = totalDuration > 0 ? 1 - timeLeft / totalDuration : 0;
  const isWork = label === "Work";

  // SVG circle progress
  const R = 88;
  const circumference = 2 * Math.PI * R;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Rep counter */}
      <div className="text-center">
        <p className="text-sm font-medium tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
        <p className="text-base font-semibold mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Rep {repIndex} of {totalReps}
        </p>
        {distanceLabel && (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {distanceLabel}
          </p>
        )}
      </div>

      {/* Circular timer */}
      <div className="relative flex items-center justify-center">
        <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
          {/* Track */}
          <circle
            cx="110" cy="110" r={R}
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            cx="110" cy="110" r={R}
            fill="none"
            stroke={isWork ? "var(--speed)" : "var(--easy)"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.5s linear" }}
          />
        </svg>
        {/* Time inside circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-bold tabular-nums tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {secondsToDisplay(timeLeft)}
          </span>
          <span className="text-sm mt-1 font-medium" style={{ color: "var(--text-muted)" }}>
            {isWork ? targetPace : "Recovery"}
          </span>
        </div>
      </div>

      {/* Pace chip */}
      {isWork && (
        <div
          className="rounded-full px-4 py-1.5"
          style={{ backgroundColor: "var(--bg-elevated)" }}
        >
          <span className="text-base font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
            {targetPace}
          </span>
        </div>
      )}
    </div>
  );
}

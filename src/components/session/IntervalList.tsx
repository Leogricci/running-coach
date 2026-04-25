import type { Interval } from "@/types/training";
import { formatDistance, calcRepDuration, secondsToDisplay } from "@/utils/pace";

interface Props {
  intervals: Interval[];
}

export function IntervalList({ intervals }: Props) {
  return (
    <div className="space-y-2">
      {intervals.map((interval, i) => {
        const label = interval.distance_m
          ? formatDistance(interval.distance_m)
          : interval.duration_s
          ? secondsToDisplay(interval.duration_s)
          : "—";

        const repDuration = interval.distance_m
          ? calcRepDuration(interval.distance_m, interval.target_pace)
          : interval.duration_s ?? 0;

        return (
          <div
            key={i}
            className="rounded-xl px-4 py-3 flex items-center justify-between gap-3"
            style={{ backgroundColor: "var(--bg-elevated)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                {interval.repetitions}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {interval.repetitions} × {label}
                </div>
                {interval.notes && (
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {interval.notes}
                  </div>
                )}
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold tabular-nums" style={{ color: "var(--text-primary)" }}>
                {interval.target_pace}
              </div>
              <div className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
                {repDuration > 0 ? `~${secondsToDisplay(repDuration)}` : ""}
                {" · "}
                {Math.round(interval.recovery_s / 60)}min rest
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

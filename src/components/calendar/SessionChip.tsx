import type { SessionType } from "@/types/training";

const CONFIG: Record<SessionType, { label: string; color: string }> = {
  easy_run: { label: "Easy", color: "var(--easy)" },
  speed: { label: "Speed", color: "var(--speed)" },
  threshold: { label: "Threshold", color: "var(--threshold)" },
  specific: { label: "Specific", color: "var(--specific)" },
  rest: { label: "Rest", color: "var(--rest)" },
};

interface Props {
  type: SessionType;
  size?: "sm" | "md";
}

export function SessionChip({ type, size = "md" }: Props) {
  const { label, color } = CONFIG[type];
  const isSm = size === "sm";
  return (
    <span
      className={`inline-block rounded-full font-semibold tracking-wide ${isSm ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}
      style={{ backgroundColor: `${color}22`, color }}
    >
      {label}
    </span>
  );
}

export function sessionColor(type: SessionType): string {
  return CONFIG[type].color;
}

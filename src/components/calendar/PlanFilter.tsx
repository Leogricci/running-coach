import type { Plan } from "@/types/training";

interface Props {
  plans: Plan[];
  activePlanId: string;
  onSelect: (id: string) => void;
}

export function PlanFilter({ plans, activePlanId, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {plans.map((plan) => {
        const active = plan.id === activePlanId;
        const stub = plan.weeks.length === 0;
        return (
          <button
            key={plan.id}
            onClick={() => !stub && onSelect(plan.id)}
            disabled={stub}
            className="relative flex-shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: active ? "var(--text-primary)" : "var(--bg-elevated)",
              color: active ? "var(--bg)" : stub ? "var(--text-muted)" : "var(--text-secondary)",
              cursor: stub ? "not-allowed" : "pointer",
            }}
          >
            {plan.distance.toUpperCase()}
            {stub && (
              <span
                className="ml-1.5 text-[10px] font-normal"
                style={{ color: "var(--text-muted)" }}
              >
                Soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
